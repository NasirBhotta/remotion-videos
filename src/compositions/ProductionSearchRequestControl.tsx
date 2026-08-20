import React from "react";
import { AbsoluteFill } from "remotion";
import { ProductionSearchRequestControlAudio } from "../audio/ProductionSearchRequestControlAudio";
import { ConcurrentNetworkFlow } from "../components/ConcurrentNetworkFlow";
import { RequestControlOutro } from "../components/RequestControlOutro";
import { RequestControlPayoff } from "../components/RequestControlPayoff";
import { ResponseRaceVisualizer } from "../components/ResponseRaceVisualizer";
import { StaleResponseGuard } from "../components/StaleResponseGuard";
import { RC_COLORS } from "../data/searchRequestControlData";

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

      {/* 1. Scene 1 & 2: Concurrent queries & in-flight network latencies */}
      <ConcurrentNetworkFlow />

      {/* 2. Scene 3: Out-of-order response race condition */}
      <ResponseRaceVisualizer />

      {/* 3. Scene 4: Request Control Guard intercepts & discards stale responses */}
      <StaleResponseGuard />

      {/* 4. Scene 5: Latest request wins & clean UI payoff */}
      <RequestControlPayoff />

      {/* 5. Scene 6: Outro summary & Next: Caching CTA */}
      <RequestControlOutro />

      {/* Synchronized Sound Design */}
      <ProductionSearchRequestControlAudio />
    </AbsoluteFill>
  );
};
