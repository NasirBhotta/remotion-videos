import React from "react";
import { Audio, interpolate, Sequence, staticFile } from "remotion";
import { NORMALIZATION_SCENES } from "../data/searchNormalizationData";

// Keystroke frames for the 4 query cards typing in
const TYPING_CLICKS = [6, 9, 12, 16, 19, 22, 26, 29, 32, 36, 39, 42];

export const ProductionSearchNormalizationAudio: React.FC = () => {
  return (
    <>
      {/* 1. Background Music: Ambient tech track with dynamic ducking & swelling */}
      <Audio
        src={staticFile("audio/background.wav")}
        volume={(f) =>
          interpolate(
            f,
            [0, 60, 75, 115, 125, 250, 270],
            [0.24, 0.24, 0.09, 0.09, 0.32, 0.30, 0.0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )
        }
      />

      {/* 2. Soft tactile typing taps during messy query arrivals (0–2s) */}
      {TYPING_CLICKS.map((frameNum, idx) => (
        <Sequence key={`type-${idx}`} from={frameNum} durationInFrames={4}>
          <Audio
            src={staticFile("audio/key-click.wav")}
            volume={() => 0.09 + (idx % 3) * 0.02}
          />
        </Sequence>
      ))}

      {/* 3. Normalization Phase (2–4s): Soft Airy Whoosh + Filtered Flutter */}
      <Sequence from={NORMALIZATION_SCENES.normalize} durationInFrames={18}>
        <Audio src={staticFile("audio/whoosh.wav")} volume={() => 0.14} />
      </Sequence>
      <Sequence from={NORMALIZATION_SCENES.normalize + 12} durationInFrames={20}>
        <Audio src={staticFile("audio/process.wav")} volume={() => 0.12} />
      </Sequence>
      <Sequence from={NORMALIZATION_SCENES.normalize + 32} durationInFrames={20}>
        <Audio src={staticFile("audio/process.wav")} volume={() => 0.10} />
      </Sequence>

      {/* 4. Payoff Moment (4–6s): 4 Inputs -> 1 Canonical Query Warm Triad + Soft Thud */}
      <Sequence from={NORMALIZATION_SCENES.consistent} durationInFrames={25}>
        <Audio src={staticFile("audio/merge-chime.wav")} volume={() => 0.20} />
      </Sequence>
      <Sequence from={NORMALIZATION_SCENES.consistent + 2} durationInFrames={18}>
        <Audio src={staticFile("audio/impact.wav")} volume={() => 0.16} />
      </Sequence>

      {/* 5. Search Pipeline Flow (6–8s): Soft Data flow + Search Accent */}
      <Sequence from={NORMALIZATION_SCENES.search} durationInFrames={16}>
        <Audio src={staticFile("audio/dataflow.wav")} volume={() => 0.15} />
      </Sequence>
      <Sequence from={NORMALIZATION_SCENES.search + 8} durationInFrames={20}>
        <Audio src={staticFile("audio/transition.wav")} volume={() => 0.14} />
      </Sequence>

      {/* 6. CTA (8–10s): Series Part 2 Confirmation Tap */}
      <Sequence from={NORMALIZATION_SCENES.cta + 2} durationInFrames={16}>
        <Audio src={staticFile("audio/ui-click.wav")} volume={() => 0.18} />
      </Sequence>
    </>
  );
};
