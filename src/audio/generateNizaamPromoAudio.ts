/* eslint-disable */
import * as fs from "fs";
import * as path from "path";

const SAMPLE_RATE = 44100;

function createWavBuffer(samples: Float32Array[]): Buffer {
  const numChannels = samples.length;
  const numFrames = samples[0].length;
  const bytesPerSample = 2; // 16-bit PCM
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
  buffer.writeUInt16LE(1, 20); // PCM
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
      // Soft saturation / mastering limiter
      sample = Math.tanh(sample * 1.15) * 0.92;
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
  console.log(`Saved audio: ${filePath} (${(samples[0].length / SAMPLE_RATE).toFixed(2)}s)`);
}

// 2-pole resonant lowpass filter
function createBiquadLowpass(cutoff: number, q = 0.707) {
  const w0 = (2 * Math.PI * cutoff) / SAMPLE_RATE;
  const cosw0 = Math.cos(w0);
  const sinw0 = Math.sin(w0);
  const alpha = sinw0 / (2 * q);

  const b0 = (1 - cosw0) / 2;
  const b1 = 1 - cosw0;
  const b2 = (1 - cosw0) / 2;
  const a0 = 1 + alpha;
  const a1 = -2 * cosw0;
  const a2 = 1 - alpha;

  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  return (sample: number): number => {
    const y0 = (b0 / a0) * sample + (b1 / a0) * x1 + (b2 / a0) * x2 - (a1 / a0) * y1 - (a2 / a0) * y2;
    x2 = x1;
    x1 = sample;
    y2 = y1;
    y1 = y0;
    return y0;
  };
}

// Anti-aliased Polyphonic / Detuned Sawtooth oscillator
function detunedSaw(freq: number, t: number, detune = 0.004): number {
  const phase1 = (freq * (1 - detune) * t) % 1;
  const phase2 = (freq * (1 + detune) * t) % 1;
  const saw1 = 2 * phase1 - 1;
  const saw2 = 2 * phase2 - 1;
  return (saw1 + saw2) * 0.5;
}

// -------------------------------------------------------------
// MASTER HIGH-PRODUCTION PROMO MUSIC GENERATOR (72s)
// -------------------------------------------------------------
function generateNizaamBGMPro(): Float32Array[] {
  const duration = 72.0;
  const numFrames = Math.floor(SAMPLE_RATE * duration);
  const left = new Float32Array(numFrames);
  const right = new Float32Array(numFrames);

  const bpm = 124; // Modern energetic tempo
  const beatSec = 60 / bpm; // ~0.4838s
  const sixteenthSec = beatSec / 4; // ~0.1209s

  // Harmonic Progression: Uplifting Modern Tech Pop (Fm9 -> Dbmaj7 -> Abadd9 -> Eb/G)
  const chordProgression = [
    {
      root: 87.31, // F2
      pad: [174.61, 220.0, 261.63, 349.23, 440.0], // F3, A3, C4, F4, A4 (F major/minor sweet tech chord)
      bass: 43.65, // F1
      leadArp: [349.23, 523.25, 440.0, 698.46, 523.25, 698.46, 880.0, 523.25],
    },
    {
      root: 69.30, // Db2
      pad: [138.59, 207.65, 261.63, 349.23, 415.30], // Db, Ab, C, F, Ab
      bass: 34.65, // Db1
      leadArp: [277.18, 415.30, 349.23, 554.37, 415.30, 554.37, 698.46, 415.30],
    },
    {
      root: 103.83, // Ab2
      pad: [207.65, 261.63, 311.13, 415.30, 523.25], // Ab, C, Eb, Ab, C
      bass: 51.91, // Ab1
      leadArp: [415.30, 523.25, 622.25, 830.61, 622.25, 523.25, 622.25, 415.30],
    },
    {
      root: 77.78, // Eb2
      pad: [155.56, 233.08, 311.13, 392.0, 466.16], // Eb, Bb, Eb, G, Bb
      bass: 38.89, // Eb1
      leadArp: [311.13, 466.16, 392.0, 622.25, 466.16, 622.25, 783.99, 466.16],
    },
  ];

  // Filters for stereo channels
  const filterL = createBiquadLowpass(5800, 0.85);
  const filterR = createBiquadLowpass(5800, 0.85);
  const padFilterL = createBiquadLowpass(1600, 0.7);
  const padFilterR = createBiquadLowpass(1600, 0.7);

  // Ping-pong delay buffer (3/16th delay for lush stereo tech arps)
  const delaySamples = Math.floor(SAMPLE_RATE * (sixteenthSec * 3));
  const delayBufferL = new Float32Array(delaySamples);
  const delayBufferR = new Float32Array(delaySamples);
  let delayIdx = 0;

  for (let i = 0; i < numFrames; i++) {
    const t = i / SAMPLE_RATE;

    // Timeline Stages:
    // Stage 1: 0.0s - 7.0s | Problem Hook (lowpass, muted ticking pulse, sub drone, rising snare fill)
    // Stage 2: 7.0s - 55.0s | THE DROP - Energetic corporate tech beat, punchy kick, clap, bright plucks, rolling bass
    // Stage 3: 55.0s - 63.0s | Climax layer for Dual screen ecosystem
    // Stage 4: 63.0s - 72.0s | Outro Resolution & lush tail

    const isProblem = t < 7.0;
    const isBuild = t >= 5.2 && t < 7.0;
    const isDrop = t >= 7.0 && t < 63.0;
    const isClimax = t >= 55.0 && t < 63.0;
    const isOutro = t >= 63.0;

    // 2 measures per chord = 4 beats = ~1.935s per chord
    const barDuration = beatSec * 4;
    const chordIdx = Math.floor(t / barDuration) % chordProgression.length;
    const chord = chordProgression[chordIdx];

    const beatInBar = (t % (beatSec * 4)) / beatSec;
    const beatTime = t % beatSec;

    // ==========================================
    // 1. DRUMS & PERCUSSION
    // ==========================================
    let kick = 0;
    let clap = 0;
    let hat = 0;
    let openHat = 0;
    let snareBuild = 0;

    if (isDrop || isClimax) {
      // 4-on-the-floor Punchy Kick
      if (beatTime < 0.14) {
        // Punch click transient (800Hz decay) + fat 50Hz sub body
        const click = Math.sin(2 * Math.PI * (750 * Math.exp(-beatTime * 120)) * beatTime) * Math.exp(-beatTime * 60) * 0.45;
        const subFreq = 52 + 75 * Math.exp(-beatTime * 35);
        const sub = Math.sin(2 * Math.PI * subFreq * beatTime) * Math.exp(-beatTime * 20) * 0.55;
        kick = click + sub;
      }

      // Snare / Clap on beats 2 & 4
      const isClapBeat = Math.floor(beatInBar) === 1 || Math.floor(beatInBar) === 3;
      if (isClapBeat && beatTime < 0.22) {
        const white = (Math.random() * 2 - 1) * Math.exp(-beatTime * 24);
        const tone1 = Math.sin(2 * Math.PI * 220 * beatTime) * Math.exp(-beatTime * 30) * 0.35;
        const tone2 = Math.sin(2 * Math.PI * 380 * beatTime) * Math.exp(-beatTime * 45) * 0.25;
        clap = (white * 0.5 + tone1 + tone2) * 0.42;
      }

      // 16th note Shaker & Closed Hi-hat with velocity groove
      const sixteenthIdx = Math.floor(t / sixteenthSec) % 4;
      const hatTime = t % sixteenthSec;
      const vel = (sixteenthIdx === 0) ? 0.09 : ((sixteenthIdx === 2) ? 0.07 : 0.04);
      hat = (Math.random() * 2 - 1) * Math.exp(-hatTime * 95) * vel;

      // Open Hi-hat on the upbeat (& of every beat)
      const isUpbeat = (beatTime >= beatSec * 0.45 && beatTime < beatSec * 0.85);
      if (isUpbeat) {
        const openTime = beatTime - beatSec * 0.5;
        if (openTime >= 0) {
          openHat = (Math.random() * 2 - 1) * Math.exp(-openTime * 18) * 0.08;
        }
      }
    }

    // Snare roll & riser build up before the drop (5.2s - 7.0s)
    if (isBuild) {
      const buildProgress = (t - 5.2) / 1.8;
      const rollRate = buildProgress > 0.6 ? (sixteenthSec / 2) : sixteenthSec;
      const rollTime = (t - 5.2) % rollRate;
      snareBuild = ((Math.random() * 2 - 1) + Math.sin(2 * Math.PI * 200 * rollTime)) * Math.exp(-rollTime * 25) * (0.15 + 0.35 * buildProgress);
    }

    // ==========================================
    // 2. BASSLINE
    // ==========================================
    let bass = 0;
    if (isProblem) {
      // Deep dark sub-bass drone with slow pulse
      const subDrone = Math.sin(2 * Math.PI * 55 * t) * 0.25;
      const pulseTime = t % (beatSec * 2);
      const pulse = Math.sin(2 * Math.PI * 110 * t) * Math.exp(-pulseTime * 5) * 0.15;
      bass = subDrone + pulse;
    } else if (isDrop || isClimax) {
      // Modern sidechained fat bassline
      const sidechain = Math.pow(Math.min(1, beatTime / (beatSec * 0.65)), 1.8);
      const bassSaw = detunedSaw(chord.bass, t, 0.006) * 0.22;
      const bassSub = Math.sin(2 * Math.PI * chord.bass * t) * 0.38;
      bass = (bassSaw + bassSub) * (0.15 + 0.85 * sidechain) * 0.7;
    } else if (isOutro) {
      // Warm sustained sub bass
      bass = Math.sin(2 * Math.PI * 43.65 * t) * 0.28;
    }

    // ==========================================
    // 3. SYNTH PADS & CHORD PROGRESSION
    // ==========================================
    let padL = 0;
    let padR = 0;
    chord.pad.forEach((freq, pIdx) => {
      const pan = (pIdx % 2 === 0) ? 0.35 : 0.65;
      const osc1 = Math.sin(2 * Math.PI * freq * t + pIdx * 0.9);
      const osc2 = Math.sin(2 * Math.PI * (freq * 1.002) * t) * 0.4;
      const tone = (osc1 + osc2) * (isProblem ? 0.025 : 0.055);
      padL += tone * (1 - pan);
      padR += tone * pan;
    });

    // ==========================================
    // 4. TECH PLUCK ARPEGGIATOR (Catchy Modern Lead)
    // ==========================================
    let leadL = 0;
    let leadR = 0;
    if (isDrop || isClimax) {
      const stepIdx = Math.floor(t / sixteenthSec) % chord.leadArp.length;
      const arpFreq = chord.leadArp[stepIdx];
      const stepTime = t % sixteenthSec;
      // Snappy filter decay envelope
      const arpEnv = Math.exp(-stepTime * 20);
      const oscSaw = detunedSaw(arpFreq, t, 0.003) * 0.18;
      const oscSine = Math.sin(2 * Math.PI * arpFreq * t) * 0.22;
      const rawArp = (oscSaw + oscSine) * arpEnv;

      // Stereo spread
      const panLead = (stepIdx % 2 === 0) ? 0.28 : 0.72;
      leadL = rawArp * (1 - panLead);
      leadR = rawArp * panLead;

      // Add ping-pong delay feedback
      const delayedL = delayBufferL[delayIdx] * 0.35;
      const delayedR = delayBufferR[delayIdx] * 0.35;
      delayBufferL[delayIdx] = rawArp * panLead + delayedR * 0.25;
      delayBufferR[delayIdx] = rawArp * (1 - panLead) + delayedL * 0.25;
      delayIdx = (delayIdx + 1) % delaySamples;

      leadL += delayedL;
      leadR += delayedR;
    }

    // ==========================================
    // 5. CLIMAX HIGH CHIME COUNTER-MELODY (55s - 63s)
    // ==========================================
    let climaxBell = 0;
    if (isClimax) {
      const bellStep = Math.floor(t / (sixteenthSec * 2)) % 4;
      const bellFreqs = [1046.5, 1396.91, 1567.98, 1760.0]; // C6, F6, G6, A6
      const bFreq = bellFreqs[bellStep];
      const bTime = t % (sixteenthSec * 2);
      climaxBell = Math.sin(2 * Math.PI * bFreq * t) * Math.exp(-bTime * 12) * 0.14;
    }

    // ==========================================
    // 6. MASTER MIX & ENVELOPE
    // ==========================================
    let masterFade = 1.0;
    if (t < 0.2) {
      masterFade = t / 0.2;
    } else if (t > 68.5) {
      masterFade = Math.max(0, (72.0 - t) / 3.5);
    }

    const filteredPadL = padFilterL(padL);
    const filteredPadR = padFilterR(padR);

    const monoDrums = kick * 0.65 + clap * 0.55 + hat * 0.6 + openHat * 0.5 + snareBuild * 0.5;
    const bassMono = bass * 0.6;

    const outL = (monoDrums + bassMono + filteredPadL + leadL * 0.8 + climaxBell * 0.4) * masterFade;
    const outR = (monoDrums + bassMono + filteredPadR + leadR * 0.8 + climaxBell * 0.6) * masterFade;

    left[i] = filterL(outL);
    right[i] = filterR(outR);
  }

  return [left, right];
}

console.log("Generating remastered NIZAAM Promo audio assets in public/audio/ ...");
saveWav("nizaam-bgm.wav", generateNizaamBGMPro());
console.log("Remastered BGM successfully generated!");
