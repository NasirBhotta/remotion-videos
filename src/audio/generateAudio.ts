/* eslint-disable */
import * as fs from "fs";
import * as path from "path";

const SAMPLE_RATE = 44100;

function createWavBuffer(samples: Float32Array[]): Buffer {
  const numChannels = samples.length;
  const numFrames = samples[0].length;
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = SAMPLE_RATE * blockAlign;
  const dataSize = numFrames * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);

  // fmt subchunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // subchunk1 size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // audio format (1 = PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bytesPerSample * 8, 34); // bits per sample

  // data subchunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < numFrames; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      let sample = samples[ch][i];
      // soft clipping / clamping
      sample = Math.max(-1, Math.min(1, sample));
      const intSample = sample < 0 ? sample * 32768 : sample * 32767;
      buffer.writeInt16LE(Math.round(intSample), offset);
      offset += 2;
    }
  }

  return buffer;
}

function saveWav(filename: string, samples: Float32Array[]) {
  const buffer = createWavBuffer(samples);
  const outDir = path.resolve("public/audio");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const filePath = path.join(outDir, filename);
  fs.writeFileSync(filePath, buffer);
  console.log(`Saved: ${filePath} (${(samples[0].length / SAMPLE_RATE).toFixed(2)}s)`);
}

// 1. Keystroke click (mechanical switch typing sound: crisp transient + subtle 750Hz resonance)
function generateKeyClick(): Float32Array[] {
  const duration = 0.05; // 50ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const mono = new Float32Array(numFrames);

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    // Transient click (shaped white noise in first 5ms)
    const noise = (Math.random() * 2 - 1) * Math.exp(-t * 800);
    // Switch snap (1200Hz to 800Hz drop)
    const snap = Math.sin(2 * Math.PI * (1100 - t * 4000) * t) * Math.exp(-t * 220);
    // Thump
    const thump = Math.sin(2 * Math.PI * 220 * t) * Math.exp(-t * 150);

    mono[i] = noise * 0.45 + snap * 0.35 + thump * 0.2;
  }
  return [mono, mono];
}

// 2. Whoosh (clean digital air swoosh: bandpass filtered sweep)
function generateWhoosh(): Float32Array[] {
  const duration = 0.4; // 400ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const left = new Float32Array(numFrames);
  const right = new Float32Array(numFrames);

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / duration; // 0 to 1

    // Hann-like envelope centered at 0.45
    const env = Math.pow(Math.sin(Math.PI * progress), 2.2);

    // Center frequency sweep: 200Hz -> 2400Hz -> 400Hz
    const freq = 200 + 2200 * Math.sin(Math.PI * progress);
    const noise = Math.random() * 2 - 1;
    const tone = Math.sin(2 * Math.PI * freq * t);

    // Subtle stereo panning sweep (left to right)
    const pan = progress;
    left[i] = (noise * 0.6 + tone * 0.4) * env * (1 - pan * 0.6) * 0.6;
    right[i] = (noise * 0.6 + tone * 0.4) * env * (0.4 + pan * 0.6) * 0.6;
  }
  return [left, right];
}

// 3. UI Landing Impact (subtle punch for 1,000,000 PRODUCTS landing)
function generateImpact(): Float32Array[] {
  const duration = 0.38; // 380ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const left = new Float32Array(numFrames);
  const right = new Float32Array(numFrames);

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    // Fast frequency drop: 160Hz -> 50Hz
    const freq = 50 + 110 * Math.exp(-t * 25);
    const sub = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 12);
    // Transient click
    const click = (Math.random() * 2 - 1) * Math.exp(-t * 180) * 0.3;
    // Low mid body
    const body = Math.sin(2 * Math.PI * 180 * t) * Math.exp(-t * 20) * 0.25;

    const val = (sub * 0.7 + click + body) * 0.75;
    left[i] = val;
    right[i] = val;
  }
  return [left, right];
}

// 4. Sub-Bass Hit (for scale/overload problem moment)
function generateBassHit(): Float32Array[] {
  const duration = 0.45; // 450ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const left = new Float32Array(numFrames);
  const right = new Float32Array(numFrames);

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    // Deep 80Hz -> 40Hz sub punch
    const freq = 40 + 45 * Math.exp(-t * 10);
    const sub = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 8);
    // Soft saturated overtone
    const overtone = Math.sin(2 * Math.PI * (freq * 2) * t) * Math.exp(-t * 14) * 0.3;
    const val = (sub + overtone) * 0.8;
    left[i] = val;
    right[i] = val;
  }
  return [left, right];
}

// 5. Tech Transition / Accent (for Question reveal)
function generateTransition(): Float32Array[] {
  const duration = 0.45; // 450ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const left = new Float32Array(numFrames);
  const right = new Float32Array(numFrames);

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 7);
    // Dual glassy sine with slight pitch dive
    const f1 = 880 - t * 300;
    const f2 = 1320 - t * 450;
    const tone = (Math.sin(2 * Math.PI * f1 * t) + 0.6 * Math.sin(2 * Math.PI * f2 * t)) * env * 0.4;
    const hiss = (Math.random() * 2 - 1) * Math.exp(-t * 30) * 0.15;

    left[i] = tone + hiss;
    right[i] = tone * 0.95 + hiss * 1.05;
  }
  return [left, right];
}

// 6. Tech Riser (subtle electronic rise for Series Hook)
function generateRiser(): Float32Array[] {
  const duration = 0.65; // 650ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const left = new Float32Array(numFrames);
  const right = new Float32Array(numFrames);

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / duration;
    const env = Math.pow(progress, 1.5) * (1 - Math.exp(-(duration - t) * 20));

    // Pitch rises exponentially from 180Hz to 680Hz
    const freq = 180 * Math.pow(680 / 180, progress);
    const sine = Math.sin(2 * Math.PI * freq * t);
    const noise = (Math.random() * 2 - 1) * 0.25;

    const val = (sine * 0.65 + noise) * env * 0.65;
    left[i] = val * (0.7 + 0.3 * Math.sin(progress * Math.PI));
    right[i] = val * (0.7 + 0.3 * Math.cos(progress * Math.PI));
  }
  return [left, right];
}

// 7. Micro Node Pop (for pipeline nodes: QUERY, SEARCH, RESULTS)
function generateNodePop(): Float32Array[] {
  const duration = 0.06; // 60ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const mono = new Float32Array(numFrames);

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 80);
    // Crisp pitch drop from 1800 to 900
    const freq = 900 + 900 * Math.exp(-t * 120);
    const tone = Math.sin(2 * Math.PI * freq * t) * env;
    mono[i] = tone * 0.4;
  }
  return [mono, mono];
}

// 8. Clean UI Confirmation Click / Soft CTA Chime
function generateUiClick(): Float32Array[] {
  const duration = 0.32; // 320ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const left = new Float32Array(numFrames);
  const right = new Float32Array(numFrames);

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 12);
    // Crisp transient click
    const click = (Math.random() * 2 - 1) * Math.exp(-t * 250) * 0.2;
    // Pleasant high tech chime chord (C6 & G6 -> 1046.5Hz & 1567.98Hz)
    const chime1 = Math.sin(2 * Math.PI * 1046.5 * t) * env * 0.35;
    const chime2 = Math.sin(2 * Math.PI * 1567.98 * t) * env * 0.25;

    left[i] = click + chime1 + chime2;
    right[i] = click + chime1 * 0.9 + chime2 * 1.1;
  }
  return [left, right];
}

// 9. Modern Minimal Ambient Tech Background Music Track (9.5s, 120 BPM)
function generateBackgroundMusic(): Float32Array[] {
  const duration = 9.5; // 9.5 seconds (covers full 270 frames + fadeout)
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const left = new Float32Array(numFrames);
  const right = new Float32Array(numFrames);

  const bpm = 120;
  const beatSec = 60 / bpm; // 0.5 sec per beat
  const sixteenthSec = beatSec / 4; // 0.125 sec per 16th note

  // Chord progression: Dm (D F A), Bb (Bb D F), F (F A C), C (C E G)
  // Each chord lasts 4 beats (2 seconds)
  const chords = [
    { root: 146.83, notes: [293.66, 349.23, 440.0, 587.33, 698.46] }, // Dm (D4, F4, A4, D5, F5)
    { root: 116.54, notes: [233.08, 293.66, 349.23, 466.16, 587.33] }, // Bb (Bb3, D4, F4, Bb4, D5)
    { root: 174.61, notes: [261.63, 349.23, 440.0, 523.25, 698.46] }, // F (C4, F4, A4, C5, F5)
    { root: 130.81, notes: [261.63, 329.63, 392.0, 523.25, 659.25] }, // C (C4, E4, G4, C5, E5)
    { root: 146.83, notes: [293.66, 349.23, 440.0, 587.33, 698.46] }, // Dm back for end
  ];

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    const chordIndex = Math.min(Math.floor(t / 2.0), chords.length - 1);
    const chord = chords[chordIndex];
    const beatInBar = (t % 2.0) / beatSec; // 0 to 4 beats

    // 1. Tech Arpeggio (16th notes)
    const sixteenthIndex = Math.floor(t / sixteenthSec) % chord.notes.length;
    const arpFreq = chord.notes[sixteenthIndex];
    const arpTimeInNote = t % sixteenthSec;
    const arpEnv = Math.exp(-arpTimeInNote * 22); // Plucky synth decay
    // Dual osc synth pluck with soft warmth
    const arpOsc1 = Math.sin(2 * Math.PI * arpFreq * t);
    const arpOsc2 = Math.sin(2 * Math.PI * (arpFreq * 2.005) * t) * 0.35;
    const arpSound = (arpOsc1 + arpOsc2) * arpEnv * 0.22;

    // Subtle stereo ping-pong for arpeggio
    const arpPan = (sixteenthIndex % 2 === 0) ? 0.35 : 0.65;

    // 2. Warm Pulsing Bass Synth (Pulsing every quarter note with sidechain ducking feel)
    const beatTime = t % beatSec;
    // Bass note: root frequency
    const bassEnv = Math.sin(Math.PI * Math.min(1, beatTime / beatSec));
    const bassOsc = Math.sin(2 * Math.PI * chord.root * t) + 0.3 * Math.sin(2 * Math.PI * (chord.root * 2) * t);
    const bassSound = bassOsc * (0.3 + 0.7 * Math.pow(bassEnv, 1.5)) * 0.28;

    // 3. Subtle Ambient Pad chord (warm background wash)
    let padSound = 0;
    for (let n = 0; n < 3; n++) {
      const noteFreq = chord.notes[n];
      padSound += Math.sin(2 * Math.PI * noteFreq * t + n * 1.5) * 0.05;
    }

    // 4. Subtle Minimal Percussion (soft kick on beats 1 & 3, micro tech shaker on 16ths)
    let kick = 0;
    const isKickBeat = (Math.floor(beatInBar) === 0 || Math.floor(beatInBar) === 2);
    if (isKickBeat && beatTime < 0.12) {
      const kickFreq = 55 + 90 * Math.exp(-beatTime * 45);
      kick = Math.sin(2 * Math.PI * kickFreq * beatTime) * Math.exp(-beatTime * 28) * 0.32;
    }

    const shakerTime = t % (sixteenthSec / 2);
    const shaker = (Math.random() * 2 - 1) * Math.exp(-shakerTime * 140) * 0.04;

    // Overall Master Envelope (smooth fade-in at 0-0.2s, smooth fade-out at 8.8-9.5s)
    let masterEnv = 1;
    if (t < 0.2) {
      masterEnv = t / 0.2;
    } else if (t > 8.8) {
      masterEnv = Math.max(0, (9.5 - t) / 0.7);
    }

    const mixedLeft = (arpSound * (1 - arpPan) + bassSound * 0.5 + padSound * 0.5 + kick * 0.5 + shaker * 0.4) * masterEnv;
    const mixedRight = (arpSound * arpPan + bassSound * 0.5 + padSound * 0.5 + kick * 0.5 + shaker * 0.6) * masterEnv;

    left[i] = mixedLeft;
    right[i] = mixedRight;
  }

  return [left, right];
}

console.log("Generating audio assets in public/audio/ ...");
saveWav("key-click.wav", generateKeyClick());
saveWav("whoosh.wav", generateWhoosh());
saveWav("impact.wav", generateImpact());
saveWav("bass-hit.wav", generateBassHit());
saveWav("transition.wav", generateTransition());
saveWav("riser.wav", generateRiser());
saveWav("node-pop.wav", generateNodePop());
saveWav("ui-click.wav", generateUiClick());
saveWav("background.wav", generateBackgroundMusic());
console.log("All audio assets successfully generated!");
