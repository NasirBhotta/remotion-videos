import React from "react";
import { AbsoluteFill } from "remotion";
import { ProductionSearchDebouncingAudio } from "../audio/ProductionSearchDebouncingAudio";
import { DebounceComparison } from "../components/DebounceComparison";
import { DebounceOutroCta } from "../components/DebounceOutroCta";
import { DebounceTimerWidget } from "../components/DebounceTimerWidget";
import { RequestPacketFlow } from "../components/RequestPacketFlow";
import { DEBOUNCE_COLORS } from "../data/searchDebounceData";

export const ProductionSearchDebouncing: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        color: DEBOUNCE_COLORS.text,
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        background: `radial-gradient(circle at 50% 30%, #172440 0%, ${DEBOUNCE_COLORS.background} 55%)`,
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

      {/* 1. Scene 1 & 2: The Problem (Naive typing & immediate requests overload) */}
      <RequestPacketFlow />

      {/* 2. Scene 3 & 4: Debounce Solution & Single Request Payoff */}
      <DebounceTimerWidget />

      {/* 3. Scene 5: Payoff Comparison (6 requests collapse into 1) */}
      <DebounceComparison />

      {/* 4. Scene 6: Outro & Next Episode CTA */}
      <DebounceOutroCta />

      {/* Synchronized Sound Design */}
      <ProductionSearchDebouncingAudio />
    </AbsoluteFill>
  );
};
