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
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bytesPerSample * 8, 34);

  // data subchunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < numFrames; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      let sample = samples[ch][i];
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
  console.log(`Saved refined sound: ${filePath} (${(samples[0].length / SAMPLE_RATE).toFixed(2)}s)`);
}

// Low-pass filter helper (single-pole smooth filter)
function lowpassFilter(input: Float32Array, cutoffFreq: number): Float32Array {
  const output = new Float32Array(input.length);
  const rc = 1.0 / (2.0 * Math.PI * cutoffFreq);
  const dt = 1.0 / SAMPLE_RATE;
  const alpha = dt / (rc + dt);
  let prev = 0;
  for (let i = 0; i < input.length; i++) {
    prev = prev + alpha * (input[i] - prev);
    output[i] = prev;
  }
  return output;
}

// 1. Soft Tactile Keystroke Click ("Thock" - short 25ms warm keyboard tap, zero harsh clicks)
function generateKeyClick(): Float32Array[] {
  const duration = 0.035; // 35ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const raw = new Float32Array(numFrames);

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 180);
    // Warm low-mid thud (320Hz to 180Hz)
    const body = Math.sin(2 * Math.PI * (320 - t * 2500) * t) * env * 0.4;
    // Muted micro tactile pop
    const pop = (Math.random() * 2 - 1) * Math.exp(-t * 600) * 0.15;
    raw[i] = body + pop;
  }

  const filtered = lowpassFilter(raw, 1600);
  return [filtered, filtered];
}

// 2. Soft Airy Whoosh (velvety smooth pink noise breath, no synthetic tones)
function generateWhoosh(): Float32Array[] {
  const duration = 0.35; // 350ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const leftRaw = new Float32Array(numFrames);
  const rightRaw = new Float32Array(numFrames);

  // Pink noise generator state
  let b0 = 0, b1 = 0, b2 = 0;

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / duration;
    // Bell curve envelope with smooth attack and decay
    const env = Math.pow(Math.sin(Math.PI * progress), 3.0);

    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    const pink = b0 + b1 + b2 + white * 0.5362;

    const pan = progress;
    leftRaw[i] = pink * env * 0.15 * (1.2 - pan * 0.4);
    rightRaw[i] = pink * env * 0.15 * (0.8 + pan * 0.4);
  }

  const left = lowpassFilter(leftRaw, 1400);
  const right = lowpassFilter(rightRaw, 1400);
  return [left, right];
}

// 3. Warm UI Landing Thud (pure warm 60Hz acoustic thump, no harsh digital click)
function generateImpact(): Float32Array[] {
  const duration = 0.28; // 280ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const raw = new Float32Array(numFrames);

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    // Smooth 75Hz -> 45Hz sub decay
    const freq = 45 + 30 * Math.exp(-t * 20);
    const sub = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 14);
    // Soft low-mid warmth
    const body = Math.sin(2 * Math.PI * 130 * t) * Math.exp(-t * 28) * 0.3;
    raw[i] = (sub * 0.7 + body) * 0.45;
  }

  const filtered = lowpassFilter(raw, 600);
  return [filtered, filtered];
}

// 4. Soft Sub-Bass Pulse (deep muted low-end cue)
function generateBassHit(): Float32Array[] {
  const duration = 0.35; // 350ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const raw = new Float32Array(numFrames);

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    const freq = 42 + 25 * Math.exp(-t * 12);
    const sub = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 9);
    raw[i] = sub * 0.4;
  }

  const filtered = lowpassFilter(raw, 350);
  return [filtered, filtered];
}

// 5. Soft Tech Accent / Transition (subtle warm tone, no screeching sine sweeps)
function generateTransition(): Float32Array[] {
  const duration = 0.3; // 300ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const left = new Float32Array(numFrames);
  const right = new Float32Array(numFrames);

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 14);
    // Soft pure warm chord (A4 + E5: 440Hz + 659Hz)
    const tone1 = Math.sin(2 * Math.PI * 440 * t) * env * 0.18;
    const tone2 = Math.sin(2 * Math.PI * 659.25 * t) * env * 0.12;
    const val = tone1 + tone2;
    left[i] = val;
    right[i] = val;
  }

  return [lowpassFilter(left, 1800), lowpassFilter(right, 1800)];
}

// 6. Subtle Riser (smooth warm swelling air, no laser pitch screech)
function generateRiser(): Float32Array[] {
  const duration = 0.5; // 500ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const left = new Float32Array(numFrames);
  const right = new Float32Array(numFrames);

  let b0 = 0, b1 = 0;
  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / duration;
    const env = Math.pow(progress, 2.2) * (1 - Math.exp(-(duration - t) * 30));

    const white = Math.random() * 2 - 1;
    b0 = 0.99 * b0 + white * 0.08;
    b1 = 0.96 * b1 + white * 0.15;
    const noise = (b0 + b1) * 0.2;

    const tone = Math.sin(2 * Math.PI * (220 + 220 * progress) * t) * 0.1;
    const val = (noise + tone) * env * 0.25;

    left[i] = val * 0.9;
    right[i] = val * 1.1;
  }

  return [lowpassFilter(left, 1600), lowpassFilter(right, 1600)];
}

// 7. Soft Micro UI Tick (haptic tick for nodes, like iOS selection click)
function generateNodePop(): Float32Array[] {
  const duration = 0.025; // 25ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const raw = new Float32Array(numFrames);

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 280);
    const pop = Math.sin(2 * Math.PI * 680 * t) * env * 0.25;
    raw[i] = pop;
  }

  const filtered = lowpassFilter(raw, 1800);
  return [filtered, filtered];
}

// 8. Elegant Glassy UI Confirmation Tap (warm acoustic chime tap)
function generateUiClick(): Float32Array[] {
  const duration = 0.22; // 220ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const left = new Float32Array(numFrames);
  const right = new Float32Array(numFrames);

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 22);
    // Soft Rhodes/Kalimba-like acoustic bell tone (D5 587.3Hz & A5 880Hz)
    const t1 = Math.sin(2 * Math.PI * 587.33 * t) * env * 0.22;
    const t2 = Math.sin(2 * Math.PI * 880.0 * t) * env * 0.14;
    const val = t1 + t2;
    left[i] = val;
    right[i] = val;
  }

  return [lowpassFilter(left, 2400), lowpassFilter(right, 2400)];
}

// 9. Background Music (Unchanged - user confirmed it is good)
function generateBackgroundMusic(): Float32Array[] {
  const duration = 9.5;
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const left = new Float32Array(numFrames);
  const right = new Float32Array(numFrames);

  const bpm = 120;
  const beatSec = 60 / bpm;
  const sixteenthSec = beatSec / 4;

  const chords = [
    { root: 146.83, notes: [293.66, 349.23, 440.0, 587.33, 698.46] },
    { root: 116.54, notes: [233.08, 293.66, 349.23, 466.16, 587.33] },
    { root: 174.61, notes: [261.63, 349.23, 440.0, 523.25, 698.46] },
    { root: 130.81, notes: [261.63, 329.63, 392.0, 523.25, 659.25] },
    { root: 146.83, notes: [293.66, 349.23, 440.0, 587.33, 698.46] },
  ];

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    const chordIndex = Math.min(Math.floor(t / 2.0), chords.length - 1);
    const chord = chords[chordIndex];
    const beatInBar = (t % 2.0) / beatSec;

    const sixteenthIndex = Math.floor(t / sixteenthSec) % chord.notes.length;
    const arpFreq = chord.notes[sixteenthIndex];
    const arpTimeInNote = t % sixteenthSec;
    const arpEnv = Math.exp(-arpTimeInNote * 22);
    const arpOsc1 = Math.sin(2 * Math.PI * arpFreq * t);
    const arpOsc2 = Math.sin(2 * Math.PI * (arpFreq * 2.005) * t) * 0.35;
    const arpSound = (arpOsc1 + arpOsc2) * arpEnv * 0.22;
    const arpPan = (sixteenthIndex % 2 === 0) ? 0.35 : 0.65;

    const beatTime = t % beatSec;
    const bassEnv = Math.sin(Math.PI * Math.min(1, beatTime / beatSec));
    const bassOsc = Math.sin(2 * Math.PI * chord.root * t) + 0.3 * Math.sin(2 * Math.PI * (chord.root * 2) * t);
    const bassSound = bassOsc * (0.3 + 0.7 * Math.pow(bassEnv, 1.5)) * 0.28;

    let padSound = 0;
    for (let n = 0; n < 3; n++) {
      const noteFreq = chord.notes[n];
      padSound += Math.sin(2 * Math.PI * noteFreq * t + n * 1.5) * 0.05;
    }

    let kick = 0;
    const isKickBeat = (Math.floor(beatInBar) === 0 || Math.floor(beatInBar) === 2);
    if (isKickBeat && beatTime < 0.12) {
      const kickFreq = 55 + 90 * Math.exp(-beatTime * 45);
      kick = Math.sin(2 * Math.PI * kickFreq * beatTime) * Math.exp(-beatTime * 28) * 0.32;
    }

    const shakerTime = t % (sixteenthSec / 2);
    const shaker = (Math.random() * 2 - 1) * Math.exp(-shakerTime * 140) * 0.04;

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

// 10. Merge Confirmation (warm acoustic chord bloom: D4 + A4 + F#5)
function generateMergeChime(): Float32Array[] {
  const duration = 0.45; // 450ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const left = new Float32Array(numFrames);
  const right = new Float32Array(numFrames);

  const freqs = [293.66, 440.0, 739.99]; // D4, A4, F#5 (warm major triad)

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    let val = 0;
    freqs.forEach((f, idx) => {
      const env = Math.exp(-t * (8 + idx * 2));
      val += Math.sin(2 * Math.PI * f * t) * env * (0.18 / (idx + 1));
    });
    left[i] = val;
    right[i] = val;
  }

  return [lowpassFilter(left, 2000), lowpassFilter(right, 2000)];
}

// 11. Subtle Processing flutter (soft filtered ambient micro-breath)
function generateProcessSound(): Float32Array[] {
  const duration = 0.35; // 350ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const left = new Float32Array(numFrames);
  const right = new Float32Array(numFrames);

  let b0 = 0;
  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.sin(Math.PI * (t / duration));
    const white = Math.random() * 2 - 1;
    b0 = 0.98 * b0 + white * 0.08;
    const tone = Math.sin(2 * Math.PI * 340 * t) * 0.08;
    const val = (b0 + tone) * env * 0.16;
    left[i] = val;
    right[i] = val;
  }

  return [lowpassFilter(left, 900), lowpassFilter(right, 900)];
}

// 12. Soft Data Flow (gentle low-mid filtered breeze)
function generateDataFlow(): Float32Array[] {
  const duration = 0.28; // 280ms
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const left = new Float32Array(numFrames);
  const right = new Float32Array(numFrames);

  let b0 = 0;
  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / duration;
    const env = Math.pow(Math.sin(Math.PI * progress), 2.0);
    const white = Math.random() * 2 - 1;
    b0 = 0.97 * b0 + white * 0.1;
    const val = b0 * env * 0.18;
    left[i] = val;
    right[i] = val;
  }

  return [lowpassFilter(left, 1100), lowpassFilter(right, 1100)];
}

console.log("Generating velvety refined audio assets in public/audio/ ...");
saveWav("key-click.wav", generateKeyClick());
saveWav("whoosh.wav", generateWhoosh());
saveWav("impact.wav", generateImpact());
saveWav("bass-hit.wav", generateBassHit());
saveWav("transition.wav", generateTransition());
saveWav("riser.wav", generateRiser());
saveWav("node-pop.wav", generateNodePop());
saveWav("ui-click.wav", generateUiClick());
saveWav("background.wav", generateBackgroundMusic());
saveWav("merge-chime.wav", generateMergeChime());
saveWav("process.wav", generateProcessSound());
saveWav("dataflow.wav", generateDataFlow());
console.log("All audio assets successfully updated!");
