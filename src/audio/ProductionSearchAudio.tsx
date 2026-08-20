import React from "react";
import { Audio, interpolate, Sequence, staticFile } from "remotion";
import { INTRO_SCENES } from "../data/searchIntroData";

// Keystroke trigger frames matching exact character reveal timing in IntroSearchBar ("iphone 15")
const TYPING_KEY_FRAMES = [16, 18, 21, 23, 25, 28, 30, 32, 35];

// Pipeline node appearance frames
const NODE_FRAMES = [
  INTRO_SCENES.hook + 8, // 188 - QUERY
  INTRO_SCENES.hook + 14, // 194 - SEARCH
  INTRO_SCENES.hook + 20, // 200 - RESULTS
];

export const ProductionSearchAudio: React.FC = () => {
  return (
    <>
      {/* 1. Background Music: Ambient tech synth with dynamic ducking & swelling */}
      <Audio
        src={staticFile("audio/background.wav")}
        volume={(f) =>
          interpolate(
            f,
            [0, 110, 120, 175, 185, 250, 270],
            [0.24, 0.24, 0.08, 0.08, 0.32, 0.32, 0.0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )
        }
      />

      {/* 2. Soft tactile typing taps during search query typing (0–2s) */}
      {TYPING_KEY_FRAMES.map((keyFrame, i) => (
        <Sequence key={`key-${i}`} from={keyFrame} durationInFrames={4}>
          <Audio
            src={staticFile("audio/key-click.wav")}
            volume={() => 0.10 + (i % 3) * 0.02}
          />
        </Sequence>
      ))}

      {/* 3. 1,000,000 Products Reveal (~2s): Soft Airy Whoosh + Warm Landing Thud */}
      <Sequence from={INTRO_SCENES.scale - 5} durationInFrames={18}>
        <Audio src={staticFile("audio/whoosh.wav")} volume={() => 0.14} />
      </Sequence>
      <Sequence from={INTRO_SCENES.scale} durationInFrames={16}>
        <Audio src={staticFile("audio/impact.wav")} volume={() => 0.18} />
      </Sequence>

      {/* 4. Scale/Problem Moment (~3–4s): Muted Sub-Bass Cue */}
      <Sequence from={INTRO_SCENES.scale + 33} durationInFrames={18}>
        <Audio src={staticFile("audio/bass-hit.wav")} volume={() => 0.16} />
      </Sequence>

      {/* 5. Question Scene (4–6s): "HOW DOES PRODUCTION SEARCH WORK?" Warm Tech Accent */}
      <Sequence from={INTRO_SCENES.question} durationInFrames={20}>
        <Audio src={staticFile("audio/transition.wav")} volume={() => 0.15} />
      </Sequence>

      {/* 6. Series Hook (6–8s): "WE'LL BUILD IT STEP BY STEP" Soft Riser */}
      <Sequence from={INTRO_SCENES.hook - 6} durationInFrames={22}>
        <Audio src={staticFile("audio/riser.wav")} volume={() => 0.14} />
      </Sequence>

      {/* Pipeline Nodes: QUERY, SEARCH, RESULTS subtle micro-ticks */}
      {NODE_FRAMES.map((nodeFrame, i) => (
        <Sequence key={`node-${i}`} from={nodeFrame} durationInFrames={5}>
          <Audio
            src={staticFile("audio/node-pop.wav")}
            volume={() => 0.12 + i * 0.02}
          />
        </Sequence>
      ))}

      {/* 7. CTA (8–10s): "PART 1 FOLLOW FOR THE SERIES" Elegant UI Tap */}
      <Sequence from={INTRO_SCENES.cta + 4} durationInFrames={16}>
        <Audio src={staticFile("audio/ui-click.wav")} volume={() => 0.18} />
      </Sequence>
    </>
  );
};
