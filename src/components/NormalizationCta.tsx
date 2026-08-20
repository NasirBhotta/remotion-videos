import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../data/searchData";
import { NORMALIZATION_SCENES } from "../data/searchNormalizationData";

export const NormalizationCta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - (NORMALIZATION_SCENES.cta + 2),
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  if (frame < NORMALIZATION_SCENES.cta - 4) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        opacity: enter,
        transform: `scale(${0.92 + enter * 0.08})`,
      }}
    >
      <div
        style={{
          color: COLORS.cyan,
          fontSize: 26,
          letterSpacing: 6,
          fontWeight: 800,
          marginBottom: 20,
        }}
      >
        PART 2
      </div>

      <div
        style={{
          color: COLORS.text,
          fontSize: 66,
          lineHeight: 1.05,
          fontWeight: 900,
          letterSpacing: -2,
          marginBottom: 36,
        }}
      >
        QUERY<br />
        <span style={{ color: COLORS.cyan }}>NORMALIZATION</span>
      </div>

      <div
        style={{
          background: `${COLORS.panelStrong}ee`,
          border: `2px solid ${COLORS.amber}`,
          boxShadow: `0 0 35px ${COLORS.amber}33`,
          borderRadius: 20,
          padding: "16px 36px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ color: COLORS.amber, fontSize: 24, fontWeight: 900, letterSpacing: 2 }}>
          NEXT:
        </span>
        <span style={{ color: COLORS.text, fontSize: 24, fontWeight: 800, letterSpacing: 1 }}>
          DEBOUNCING <span style={{ color: COLORS.amber }}>→</span>
        </span>
      </div>
    </div>
  );
};
