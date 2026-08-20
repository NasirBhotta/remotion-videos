import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../data/searchData";
import { NORMALIZATION_SCENES } from "../data/searchNormalizationData";

export const NormalizeProcessor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring around frame 52
  const enter = spring({
    frame: frame - (NORMALIZATION_SCENES.normalize - 8),
    fps,
    config: { damping: 15, stiffness: 110 },
  });

  // Fade out / scale down as result converges at frame 120
  const exit = interpolate(
    frame,
    [NORMALIZATION_SCENES.consistent - 8, NORMALIZATION_SCENES.consistent + 6],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Scanline beam cycling across processor
  const scan = ((frame - NORMALIZATION_SCENES.normalize) % 36) / 36;
  const scanY = scan * 240;

  // Pulse intensity as cards merge
  const pulse = Math.sin((frame / 4) * Math.PI) * 0.15 + 0.85;

  if (frame < NORMALIZATION_SCENES.normalize - 10 || frame > NORMALIZATION_SCENES.consistent + 10) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 750,
        width: 920,
        height: 260,
        boxSizing: "border-box",
        borderRadius: 28,
        padding: "24px 32px",
        background: `radial-gradient(ellipse at center, #1b2640 0%, ${COLORS.panelStrong} 80%)`,
        border: `2px solid ${COLORS.cyan}`,
        boxShadow: `0 0 50px ${COLORS.cyan}${Math.round(pulse * 40).toString(16).padStart(2, "0")}`,
        transform: `scale(${enter * (exit === 0 ? 0.9 : 1)})`,
        opacity: enter * exit,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      {/* Laser Scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: scanY,
          width: "100%",
          height: 3,
          background: COLORS.cyan,
          boxShadow: `0 0 20px ${COLORS.cyan}`,
          opacity: 0.8,
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${COLORS.border}`,
          paddingBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24, color: COLORS.cyan }}>⚙</span>
          <span
            style={{
              color: COLORS.text,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 4,
            }}
          >
            NORMALIZE PIPELINE
          </span>
        </div>
        <div
          style={{
            color: COLORS.cyan,
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: 2,
            background: `${COLORS.cyan}22`,
            padding: "4px 12px",
            borderRadius: 6,
            border: `1px solid ${COLORS.cyan}55`,
          }}
        >
          PROCESSING
        </div>
      </div>

      {/* Step Pills */}
      <div style={{ display: "flex", justifyContent: "space-around", gap: 16, marginTop: 10 }}>
        {[
          { label: ".trim()", desc: "Strip whitespace", color: COLORS.amber },
          { label: ".toLowerCase()", desc: "Uniform case", color: COLORS.violet },
          { label: ".sanitize()", desc: "Standardize symbols", color: COLORS.green },
        ].map((step, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: `${COLORS.panel}cc`,
              border: `1px solid ${step.color}55`,
              borderRadius: 14,
              padding: "12px 10px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "monospace",
                color: step.color,
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              {step.label}
            </div>
            <div
              style={{
                color: COLORS.muted,
                fontSize: 14,
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
