import React from "react";
import { Audio, interpolate, Sequence, staticFile } from "remotion";
import {
  DEBOUNCE_SCENES,
  DEBOUNCED_KEYSTROKES,
  MERGE_COLLAPSE_FRAME,
  NAIVE_KEYSTROKES,
  SINGLE_REQUEST_FIRE_FRAME,
  TIMER_COMPLETION_FRAME,
} from "../data/searchDebounceData";

export const ProductionSearchDebouncingAudio: React.FC = () => {
  return (
    <>
      {/* 1. Background Music with Dynamic Ducking & Swelling */}
      <Audio
        src={staticFile("audio/background.wav")}
        volume={(f) =>
          interpolate(
            f,
            [0, 80, 94, 150, 212, 218, 230, 236, 320, 358],
            [0.22, 0.24, 0.28, 0.24, 0.20, 0.04, 0.04, 0.30, 0.25, 0.0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )
        }
      />

      {/* 2. Scene 1 (0–3s): Naive Typing Clicks & Immediate API Request sounds */}
      {NAIVE_KEYSTROKES.map((k, idx) => (
        <React.Fragment key={`naive-audio-${idx}`}>
          {/* Keystroke typing click */}
          <Sequence from={k.frame} durationInFrames={4}>
            <Audio
              src={staticFile("audio/key-click.wav")}
              volume={() => 0.12 + (idx % 2) * 0.03}
            />
          </Sequence>

          {/* Immediate request emit click */}
          <Sequence from={k.frame + 2} durationInFrames={6}>
            <Audio
              src={staticFile("audio/node-pop.wav")}
              volume={() => 0.10}
            />
          </Sequence>

          {/* Request packet hitting the server (flight ~16 frames) */}
          <Sequence from={k.frame + 16} durationInFrames={6}>
            <Audio
              src={staticFile("audio/ui-click.wav")}
              volume={() => 0.08}
            />
          </Sequence>
        </React.Fragment>
      ))}

      {/* 3. Scene 2 (3–5s): 6 Keystrokes -> 6 Requests Overload Alert */}
      <Sequence from={DEBOUNCE_SCENES.overload} durationInFrames={20}>
        <Audio src={staticFile("audio/bass-hit.wav")} volume={() => 0.22} />
      </Sequence>
      <Sequence from={DEBOUNCE_SCENES.overload + 2} durationInFrames={20}>
        <Audio src={staticFile("audio/impact.wav")} volume={() => 0.18} />
      </Sequence>
      <Sequence from={DEBOUNCE_SCENES.overload + 8} durationInFrames={16}>
        <Audio src={staticFile("audio/process.wav")} volume={() => 0.12} />
      </Sequence>

      {/* 4. Scene 3 (5–7s): Debounce Reveal & Timer Resets on Typing */}
      <Sequence from={DEBOUNCE_SCENES.debounceIntro} durationInFrames={18}>
        <Audio src={staticFile("audio/whoosh.wav")} volume={() => 0.16} />
      </Sequence>

      {DEBOUNCED_KEYSTROKES.map((k, idx) => (
        <React.Fragment key={`debounced-audio-${idx}`}>
          {/* Typing click */}
          <Sequence from={k.frame} durationInFrames={4}>
            <Audio
              src={staticFile("audio/key-click.wav")}
              volume={() => 0.12 + (idx % 2) * 0.03}
            />
          </Sequence>

          {/* Timer reset sound on each keystroke after the first */}
          {idx > 0 && (
            <Sequence from={k.frame + 1} durationInFrames={6}>
              <Audio
                src={staticFile("audio/ui-click.wav")}
                volume={() => 0.12}
              />
            </Sequence>
          )}
        </React.Fragment>
      ))}

      {/* 5. Scene 4 (7–9s): Timer Completion & Single Request Payoff */}
      {/* 300ms Timer completes */}
      <Sequence from={TIMER_COMPLETION_FRAME} durationInFrames={14}>
        <Audio src={staticFile("audio/node-pop.wav")} volume={() => 0.16} />
      </Sequence>

      {/* 1 Single API request launches */}
      <Sequence from={SINGLE_REQUEST_FIRE_FRAME} durationInFrames={20}>
        <Audio src={staticFile("audio/dataflow.wav")} volume={() => 0.22} />
      </Sequence>
      <Sequence from={SINGLE_REQUEST_FIRE_FRAME + 2} durationInFrames={24}>
        <Audio src={staticFile("audio/merge-chime.wav")} volume={() => 0.18} />
      </Sequence>

      {/* Request arrives at server */}
      <Sequence from={SINGLE_REQUEST_FIRE_FRAME + 16} durationInFrames={16}>
        <Audio src={staticFile("audio/impact.wav")} volume={() => 0.16} />
      </Sequence>

      {/* 6. Scene 5 (9–10.5s): Collapsing Payoff: 6 Requests -> 1 Request */}
      <Sequence from={MERGE_COLLAPSE_FRAME} durationInFrames={25}>
        <Audio src={staticFile("audio/merge-chime.wav")} volume={() => 0.24} />
      </Sequence>
      <Sequence from={MERGE_COLLAPSE_FRAME + 2} durationInFrames={20}>
        <Audio src={staticFile("audio/impact.wav")} volume={() => 0.18} />
      </Sequence>

      {/* 7. Scene 6 (10.5–12s): Outro CTA */}
      <Sequence from={DEBOUNCE_SCENES.outro + 2} durationInFrames={18}>
        <Audio src={staticFile("audio/transition.wav")} volume={() => 0.16} />
      </Sequence>
      <Sequence from={DEBOUNCE_SCENES.outro + 8} durationInFrames={16}>
        <Audio src={staticFile("audio/ui-click.wav")} volume={() => 0.12} />
      </Sequence>
    </>
  );
};
