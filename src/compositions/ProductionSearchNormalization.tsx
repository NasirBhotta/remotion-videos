import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ProductionSearchNormalizationAudio } from "../audio/ProductionSearchNormalizationAudio";
import { MessyQueryCard } from "../components/MessyQueryCard";
import { NormalizationCta } from "../components/NormalizationCta";
import { NormalizedResultCard } from "../components/NormalizedResultCard";
import { NormalizeProcessor } from "../components/NormalizeProcessor";
import { SearchPipelineFlow } from "../components/SearchPipelineFlow";
import { COLORS } from "../data/searchData";
import { NORMALIZATION_SCENES, QUERY_VARIANTS } from "../data/searchNormalizationData";

export const ProductionSearchNormalization: React.FC = () => {
  const frame = useCurrentFrame();

  // Top header fade out as normalization starts (around frame 58-68)
  const headerFade = interpolate(
    frame,
    [NORMALIZATION_SCENES.normalize - 2, NORMALIZATION_SCENES.normalize + 10],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        color: COLORS.text,
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        background: `radial-gradient(circle at 50% 30%, #172440 0%, ${COLORS.background} 55%)`,
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

      {/* 1. Header for Scene 1 (Messy inputs: frames 0 to 65) */}
      <div
        style={{
          position: "absolute",
          top: 240,
          width: "100%",
          textAlign: "center",
          opacity: headerFade,
          transform: `scale(${0.95 + headerFade * 0.05})`,
        }}
      >
        <div
          style={{
            color: COLORS.cyan,
            letterSpacing: 5,
            fontSize: 22,
            fontWeight: 800,
            marginBottom: 12,
          }}
        >
          DIFFERENT USER INPUTS
        </div>
        <div
          style={{
            color: COLORS.text,
            fontSize: 56,
            fontWeight: 900,
            letterSpacing: -1.5,
          }}
        >
          ONE SEARCH INTENT
        </div>
      </div>

      {/* 2. Floating Query Variations (Frames 0 to 120) */}
      {QUERY_VARIANTS.map((item, idx) => (
        <MessyQueryCard key={item.id} item={item} index={idx} />
      ))}

      {/* 3. Central Normalization Processor (Frames 52 to 125) */}
      <NormalizeProcessor />

      {/* 4. Payoff Result: Canonical "iphone 15" Query (Frames 120 to 240) */}
      <NormalizedResultCard />

      {/* 5. Search Engine Data Flow (Frames 180 to 240) */}
      <SearchPipelineFlow />

      {/* 6. Series Part 2 CTA & Teaser (Frames 238 to 270) */}
      <NormalizationCta />

      {/* Synchronized Audio Layer */}
      <ProductionSearchNormalizationAudio />
    </AbsoluteFill>
  );
};
