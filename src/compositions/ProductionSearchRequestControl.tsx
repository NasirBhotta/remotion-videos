import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { ProductionSearchRequestControlAudio } from "../audio/ProductionSearchRequestControlAudio";
import { RC_COLORS, RC_MICRO_SCENES } from "../data/searchRequestControlData";

// 10 Sequential Micro-Screens
import { RC_Screen1_FirstQuery } from "../components/request-control/RC_Screen1_FirstQuery";
import { RC_Screen2_SecondQuery } from "../components/request-control/RC_Screen2_SecondQuery";
import { RC_Screen3_FastResponseWins } from "../components/request-control/RC_Screen3_FastResponseWins";
import { RC_Screen4_StaleOverwriteBug } from "../components/request-control/RC_Screen4_StaleOverwriteBug";
import { RC_Screen5_WhyItHappens } from "../components/request-control/RC_Screen5_WhyItHappens";
import { RC_Screen6_SolutionId } from "../components/request-control/RC_Screen6_SolutionId";
import { RC_Screen7_GuardDiscard } from "../components/request-control/RC_Screen7_GuardDiscard";
import { RC_Screen8_AbortController } from "../components/request-control/RC_Screen8_AbortController";
import { RC_Screen9_CleanPayoff } from "../components/request-control/RC_Screen9_CleanPayoff";
import { RC_Screen10_Outro } from "../components/request-control/RC_Screen10_Outro";

export const ProductionSearchRequestControl: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        color: RC_COLORS.text,
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        background: `radial-gradient(circle at 50% 30%, #172440 0%, ${RC_COLORS.background} 55%)`,
      }}
    >
      {/* Subtle tech background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.15,
          backgroundImage:
            "linear-gradient(#33415e 1px, transparent 1px), linear-gradient(90deg, #33415e 1px, transparent 1px)",
          backgroundSize: "54px 54px",
        }}
      />

      {/* Screen 1: User types "iphone" (Req #1: Slow 350ms) */}
      <Sequence
        from={RC_MICRO_SCENES.screen1_req1.from}
        durationInFrames={RC_MICRO_SCENES.screen1_req1.duration}
        name="1_FirstQuery"
      >
        <RC_Screen1_FirstQuery />
      </Sequence>

      {/* Screen 2: User types "iphone 15" (Req #2: Fast 100ms) */}
      <Sequence
        from={RC_MICRO_SCENES.screen2_req2.from}
        durationInFrames={RC_MICRO_SCENES.screen2_req2.duration}
        name="2_SecondQuery"
      >
        <RC_Screen2_SecondQuery />
      </Sequence>

      {/* Screen 3: Req #2 finishes 1st ➔ UI correctly shows iPhone 15 */}
      <Sequence
        from={RC_MICRO_SCENES.screen3_fastArrive.from}
        durationInFrames={RC_MICRO_SCENES.screen3_fastArrive.duration}
        name="3_FastResponseWins"
      >
        <RC_Screen3_FastResponseWins />
      </Sequence>

      {/* Screen 4: Req #1 arrives LATER ➔ Boom! Stale overwrite bug */}
      <Sequence
        from={RC_MICRO_SCENES.screen4_bug.from}
        durationInFrames={RC_MICRO_SCENES.screen4_bug.duration}
        name="4_StaleOverwriteBug"
      >
        <RC_Screen4_StaleOverwriteBug />
      </Sequence>

      {/* Screen 5: The "Why" - Promise completion order != typing order */}
      <Sequence
        from={RC_MICRO_SCENES.screen5_why.from}
        durationInFrames={RC_MICRO_SCENES.screen5_why.duration}
        name="5_WhyItHappens"
      >
        <RC_Screen5_WhyItHappens />
      </Sequence>

      {/* Screen 6: Solution Part 1 - Tagging each request with an ID */}
      <Sequence
        from={RC_MICRO_SCENES.screen6_solutionId.from}
        durationInFrames={RC_MICRO_SCENES.screen6_solutionId.duration}
        name="6_SolutionId"
      >
        <RC_Screen6_SolutionId />
      </Sequence>

      {/* Screen 7: Solution Part 2 - Guard intercepts & discards stale Req 1 */}
      <Sequence
        from={RC_MICRO_SCENES.screen7_guardDiscard.from}
        durationInFrames={RC_MICRO_SCENES.screen7_guardDiscard.duration}
        name="7_GuardDiscard"
      >
        <RC_Screen7_GuardDiscard />
      </Sequence>

      {/* Screen 8: Solution Part 3 - AbortController network cancellation */}
      <Sequence
        from={RC_MICRO_SCENES.screen8_abortController.from}
        durationInFrames={RC_MICRO_SCENES.screen8_abortController.duration}
        name="8_AbortController"
      >
        <RC_Screen8_AbortController />
      </Sequence>

      {/* Screen 9: Clean Payoff - 100% UI consistency, 0 overwrites */}
      <Sequence
        from={RC_MICRO_SCENES.screen9_payoff.from}
        durationInFrames={RC_MICRO_SCENES.screen9_payoff.duration}
        name="9_CleanPayoff"
      >
        <RC_Screen9_CleanPayoff />
      </Sequence>

      {/* Screen 10: Outro Takeaway & Next Episode: Caching */}
      <Sequence
        from={RC_MICRO_SCENES.screen10_outro.from}
        durationInFrames={RC_MICRO_SCENES.screen10_outro.duration}
        name="10_Outro"
      >
        <RC_Screen10_Outro />
      </Sequence>

      {/* Synchronized Sound Design */}
      <ProductionSearchRequestControlAudio />
    </AbsoluteFill>
  );
};
