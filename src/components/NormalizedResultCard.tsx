import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../data/searchData";
import { NORMALIZATION_SCENES } from "../data/searchNormalizationData";

export const NormalizedResultCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring at frame 120
  const enter = spring({
    frame: frame - NORMALIZATION_SCENES.consistent,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Ring burst scale & opacity
  const burst = interpolate(
    frame - NORMALIZATION_SCENES.consistent,
    [0, 24],
    [0.7, 1.4],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const burstOpacity = interpolate(
    frame - NORMALIZATION_SCENES.consistent,
    [0, 6, 24],
    [0, 0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Transition into search scene (frames 175 to 190)
  const toSearchProgress = interpolate(
    frame,
    [NORMALIZATION_SCENES.search - 6, NORMALIZATION_SCENES.search + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const cardY = interpolate(toSearchProgress, [0, 1], [820, 520]);
  const cardScale = interpolate(toSearchProgress, [0, 1], [1, 0.88]);

  if (frame < NORMALIZATION_SCENES.consistent - 5 || frame > NORMALIZATION_SCENES.cta + 4) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Top Banner (frames 120 to 180) */}
      <div
        style={{
          position: "absolute",
          top: 660,
          textAlign: "center",
          opacity: enter * (1 - toSearchProgress),
          transform: `scale(${enter})`,
        }}
      >
        <div
          style={{
            color: COLORS.muted,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 4,
            marginBottom: 12,
          }}
        >
          CONSISTENT RESULT
        </div>
        <div
          style={{
            color: COLORS.green,
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: 2,
            background: `${COLORS.green}18`,
            padding: "8px 24px",
            borderRadius: 12,
            border: `1px solid ${COLORS.green}66`,
          }}
        >
          4 INPUTS → 1 CANONICAL QUERY
        </div>
      </div>

      {/* Energy Ring Burst */}
      <div
        style={{
          position: "absolute",
          top: cardY - 40,
          left: "50%",
          transform: "translateX(-50%)",
          width: 860 * burst,
          height: 140 * burst,
          borderRadius: 36,
          border: `2px solid ${COLORS.cyan}`,
          boxShadow: `0 0 50px ${COLORS.cyan}`,
          opacity: burstOpacity,
        }}
      />

      {/* The Clean Converged Query Card */}
      <div
        style={{
          position: "absolute",
          top: cardY,
          width: 820,
          height: 124,
          boxSizing: "border-box",
          borderRadius: 24,
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: COLORS.panelStrong,
          border: `2px solid ${COLORS.cyan}`,
          boxShadow: `0 0 60px ${COLORS.cyan}44, 0 16px 48px rgba(0,0,0,0.6)`,
          transform: `scale(${enter * cardScale})`,
          opacity: enter,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ color: COLORS.cyan, fontSize: 44, fontWeight: 300 }}>⌕</span>
          <span
            style={{
              fontFamily: "monospace, 'Courier New', monospace",
              color: COLORS.text,
              fontSize: 42,
              fontWeight: 800,
              letterSpacing: 0,
            }}
          >
            &quot;iphone 15&quot;
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: COLORS.green,
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 2,
            background: `${COLORS.green}22`,
            padding: "8px 16px",
            borderRadius: 10,
            border: `1px solid ${COLORS.green}88`,
          }}
        >
          <span>✓</span>
          <span>NORMALIZED</span>
        </div>
      </div>
    </div>
  );
};
