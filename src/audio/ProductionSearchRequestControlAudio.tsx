import React from "react";
import { Audio, interpolate, Sequence, staticFile } from "remotion";
import { RC_SCENES, SEARCH_REQUESTS } from "../data/searchRequestControlData";

export const ProductionSearchRequestControlAudio: React.FC = () => {
  return (
    <>
      {/* 1. Background Music with Dynamic Envelope */}
      <Audio
        src={staticFile("audio/background.wav")}
        volume={(f) =>
          interpolate(
            f,
            [0, 100, 195, 300, 390, 460, 508],
            [0.22, 0.24, 0.22, 0.20, 0.28, 0.24, 0.0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )
        }
      />

      {/* 2. Scene 1 (0–3.5s): Typing Clicks & Dispatch Blips */}
      {SEARCH_REQUESTS.map((req, idx) => (
        <React.Fragment key={`req-sound-${idx}`}>
          {/* Typing sounds */}
          <Sequence from={req.startFrame} durationInFrames={4}>
            <Audio src={staticFile("audio/key-click.wav")} volume={() => 0.12} />
          </Sequence>
          <Sequence from={req.startFrame + 4} durationInFrames={4}>
            <Audio src={staticFile("audio/key-click.wav")} volume={() => 0.14} />
          </Sequence>

          {/* Dispatch emit sound */}
          <Sequence from={req.startFrame + 8} durationInFrames={6}>
            <Audio src={staticFile("audio/node-pop.wav")} volume={() => 0.10} />
          </Sequence>
        </React.Fragment>
      ))}

      {/* 3. Scene 2 (3.5–6.5s): Network Travel Whooshes */}
      <Sequence from={RC_SCENES.travel} durationInFrames={18}>
        <Audio src={staticFile("audio/whoosh.wav")} volume={() => 0.14} />
      </Sequence>
      <Sequence from={RC_SCENES.travel + 8} durationInFrames={16}>
        <Audio src={staticFile("audio/dataflow.wav")} volume={() => 0.12} />
      </Sequence>

      {/* 4. Scene 3 (6.5–10s): Out-of-Order Response Arrivals */}
      {/* Response C arrives first */}
      <Sequence from={225} durationInFrames={16}>
        <Audio src={staticFile("audio/node-pop.wav")} volume={() => 0.16} />
      </Sequence>

      {/* Response A arrives late (Race Condition Danger cue) */}
      <Sequence from={255} durationInFrames={18}>
        <Audio src={staticFile("audio/process.wav")} volume={() => 0.14} />
      </Sequence>
      <Sequence from={260} durationInFrames={18}>
        <Audio src={staticFile("audio/bass-hit.wav")} volume={() => 0.15} />
      </Sequence>

      {/* 5. Scene 4 (10–13s): Request Guard Intercepts Stale Response A */}
      <Sequence from={RC_SCENES.intercept} durationInFrames={16}>
        <Audio src={staticFile("audio/whoosh.wav")} volume={() => 0.14} />
      </Sequence>
      <Sequence from={RC_SCENES.intercept + 16} durationInFrames={12}>
        <Audio src={staticFile("audio/ui-click.wav")} volume={() => 0.16} />
      </Sequence>

      {/* 6. Scene 5 (13–15.5s): Payoff — Latest Request C Updates UI */}
      <Sequence from={RC_SCENES.payoff} durationInFrames={25}>
        <Audio src={staticFile("audio/merge-chime.wav")} volume={() => 0.22} />
      </Sequence>
      <Sequence from={RC_SCENES.payoff + 4} durationInFrames={18}>
        <Audio src={staticFile("audio/impact.wav")} volume={() => 0.16} />
      </Sequence>

      {/* 7. Scene 6 (15.5–17s): Outro CTA */}
      <Sequence from={RC_SCENES.outro + 2} durationInFrames={18}>
        <Audio src={staticFile("audio/transition.wav")} volume={() => 0.16} />
      </Sequence>
      <Sequence from={RC_SCENES.outro + 10} durationInFrames={14}>
        <Audio src={staticFile("audio/ui-click.wav")} volume={() => 0.12} />
      </Sequence>
    </>
  );
};
