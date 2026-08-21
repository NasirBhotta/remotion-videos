import React from "react";
import { Audio, interpolate, Sequence, staticFile } from "remotion";
import { RC_MICRO_SCENES } from "../data/searchRequestControlData";

export const ProductionSearchRequestControlAudio: React.FC = () => {
  return (
    <>
      {/* 1. Master Background Music */}
      <Audio
        src={staticFile("audio/background.wav")}
        volume={(f) =>
          interpolate(
            f,
            [0, 100, 260, 420, 680, 760, 835],
            [0.22, 0.24, 0.18, 0.22, 0.28, 0.22, 0.0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )
        }
      />

      {/* Screen 1: Typing "iphone" (Req #1) */}
      <Sequence from={12} durationInFrames={4}>
        <Audio src={staticFile("audio/key-click.wav")} volume={() => 0.14} />
      </Sequence>
      <Sequence from={24} durationInFrames={4}>
        <Audio src={staticFile("audio/key-click.wav")} volume={() => 0.14} />
      </Sequence>
      <Sequence from={38} durationInFrames={12}>
        <Audio src={staticFile("audio/dataflow.wav")} volume={() => 0.12} />
      </Sequence>

      {/* Screen 2: Typing "15" (Req #2) */}
      <Sequence from={RC_MICRO_SCENES.screen2_req2.from + 10} durationInFrames={4}>
        <Audio src={staticFile("audio/key-click.wav")} volume={() => 0.14} />
      </Sequence>
      <Sequence from={RC_MICRO_SCENES.screen2_req2.from + 22} durationInFrames={4}>
        <Audio src={staticFile("audio/key-click.wav")} volume={() => 0.14} />
      </Sequence>
      <Sequence from={RC_MICRO_SCENES.screen2_req2.from + 32} durationInFrames={12}>
        <Audio src={staticFile("audio/whoosh.wav")} volume={() => 0.14} />
      </Sequence>

      {/* Screen 3: Fast Req #2 arrives first */}
      <Sequence from={RC_MICRO_SCENES.screen3_fastArrive.from + 15} durationInFrames={14}>
        <Audio src={staticFile("audio/node-pop.wav")} volume={() => 0.18} />
      </Sequence>

      {/* Screen 4: Slow Req #1 arrives late ➔ RACE BUG HIT! */}
      <Sequence from={RC_MICRO_SCENES.screen4_bug.from + 20} durationInFrames={18}>
        <Audio src={staticFile("audio/bass-hit.wav")} volume={() => 0.22} />
      </Sequence>
      <Sequence from={RC_MICRO_SCENES.screen4_bug.from + 22} durationInFrames={16}>
        <Audio src={staticFile("audio/process.wav")} volume={() => 0.16} />
      </Sequence>

      {/* Screen 5: The "Why" - Root Cause */}
      <Sequence from={RC_MICRO_SCENES.screen5_why.from + 4} durationInFrames={18}>
        <Audio src={staticFile("audio/transition.wav")} volume={() => 0.15} />
      </Sequence>

      {/* Screen 6: Solution Part 1 - Tagging IDs */}
      <Sequence from={RC_MICRO_SCENES.screen6_solutionId.from + 6} durationInFrames={12}>
        <Audio src={staticFile("audio/node-pop.wav")} volume={() => 0.16} />
      </Sequence>

      {/* Screen 7: Solution Part 2 - The Guard drops stale response */}
      <Sequence from={RC_MICRO_SCENES.screen7_guardDiscard.from + 4} durationInFrames={16}>
        <Audio src={staticFile("audio/whoosh.wav")} volume={() => 0.15} />
      </Sequence>
      <Sequence from={RC_MICRO_SCENES.screen7_guardDiscard.from + 22} durationInFrames={14}>
        <Audio src={staticFile("audio/ui-click.wav")} volume={() => 0.20} />
      </Sequence>

      {/* Screen 8: Solution Part 3 - AbortController */}
      <Sequence from={RC_MICRO_SCENES.screen8_abortController.from + 6} durationInFrames={16}>
        <Audio src={staticFile("audio/transition.wav")} volume={() => 0.15} />
      </Sequence>

      {/* Screen 9: Clean Payoff */}
      <Sequence from={RC_MICRO_SCENES.screen9_payoff.from} durationInFrames={25}>
        <Audio src={staticFile("audio/merge-chime.wav")} volume={() => 0.22} />
      </Sequence>
      <Sequence from={RC_MICRO_SCENES.screen9_payoff.from + 8} durationInFrames={16}>
        <Audio src={staticFile("audio/impact.wav")} volume={() => 0.16} />
      </Sequence>

      {/* Screen 10: Outro */}
      <Sequence from={RC_MICRO_SCENES.screen10_outro.from + 2} durationInFrames={18}>
        <Audio src={staticFile("audio/transition.wav")} volume={() => 0.16} />
      </Sequence>
    </>
  );
};
