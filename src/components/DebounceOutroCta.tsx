import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DEBOUNCE_COLORS, DEBOUNCE_SCENES } from "../data/searchDebounceData";

export const DebounceOutroCta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < DEBOUNCE_SCENES.outro - 4) {
    return null;
  }

  const enter = spring({
    frame: frame - DEBOUNCE_SCENES.outro,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

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
        padding: "0 40px",
      }}
    >
      {/* Part Tag */}
      <div
        style={{
          color: DEBOUNCE_COLORS.cyan,
          fontSize: 26,
          letterSpacing: 6,
          fontWeight: 800,
          marginBottom: 16,
        }}
      >
        PART 3
      </div>

      {/* Main takeaway */}
      <div
        style={{
          color: DEBOUNCE_COLORS.text,
          fontSize: 72,
          lineHeight: 1.05,
          fontWeight: 900,
          letterSpacing: -2,
          marginBottom: 14,
        }}
      >
        DEBOUNCING
      </div>

      <div
        style={{
          color: DEBOUNCE_COLORS.cyan,
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: 2,
          marginBottom: 44,
        }}
      >
        FEWER UNNECESSARY REQUESTS
      </div>

      {/* Series Roadmap */}
      <div
        style={{
          background: "#0d1322aa",
          border: `1px solid ${DEBOUNCE_COLORS.cardBorder}`,
          borderRadius: 20,
          padding: "16px 28px",
          display: "flex",
          gap: 18,
          marginBottom: 40,
        }}
      >
        <div style={{ color: DEBOUNCE_COLORS.muted, fontSize: 16, fontWeight: 700 }}>
          P1: Intro ✓
        </div>
        <div style={{ color: DEBOUNCE_COLORS.muted, fontSize: 16, fontWeight: 700 }}>
          P2: Normalization ✓
        </div>
        <div style={{ color: DEBOUNCE_COLORS.green, fontSize: 16, fontWeight: 800 }}>
          P3: Debouncing 🟢
        </div>
        <div style={{ color: DEBOUNCE_COLORS.amber, fontSize: 16, fontWeight: 800 }}>
          P4: Next →
        </div>
      </div>

      {/* Next Episode Box */}
      <div
        style={{
          background: `${DEBOUNCE_COLORS.panelStrong}ee`,
          border: `2px solid ${DEBOUNCE_COLORS.amber}`,
          boxShadow: `0 0 40px ${DEBOUNCE_COLORS.amberGlow}`,
          borderRadius: 22,
          padding: "18px 40px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 36,
        }}
      >
        <span
          style={{
            color: DEBOUNCE_COLORS.amber,
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: 2,
          }}
        >
          NEXT:
        </span>
        <span
          style={{
            color: DEBOUNCE_COLORS.text,
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          REQUEST CONTROL <span style={{ color: DEBOUNCE_COLORS.amber }}>→</span>
        </span>
      </div>

      {/* Follow CTA */}
      <div
        style={{
          color: DEBOUNCE_COLORS.muted,
          fontSize: 22,
          letterSpacing: 4,
          fontWeight: 800,
        }}
      >
        FOLLOW FOR THE SERIES
      </div>
    </div>
  );
};
