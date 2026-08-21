import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RC_COLORS } from "../../data/searchRequestControlData";

export const RC_Screen10_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });

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
          color: RC_COLORS.cyan,
          fontSize: 24,
          letterSpacing: 6,
          fontWeight: 800,
          marginBottom: 14,
        }}
      >
        PART 04 COMPLETE
      </div>

      {/* Main Title */}
      <div
        style={{
          color: RC_COLORS.text,
          fontSize: 64,
          lineHeight: 1.05,
          fontWeight: 900,
          letterSpacing: -2,
          marginBottom: 12,
        }}
      >
        REQUEST CONTROL
      </div>

      {/* Slogan */}
      <div
        style={{
          color: RC_COLORS.green,
          fontSize: 32,
          fontWeight: 900,
          letterSpacing: 2,
          marginBottom: 6,
        }}
      >
        LATEST REQUEST WINS
      </div>

      <div
        style={{
          color: RC_COLORS.cyan,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 2,
          marginBottom: 36,
        }}
      >
        CANCEL &amp; DISCARD STALE RESPONSES
      </div>

      {/* Series Roadmap */}
      <div
        style={{
          background: "#0d1322aa",
          border: `1px solid ${RC_COLORS.cardBorder}`,
          borderRadius: 20,
          padding: "16px 24px",
          display: "flex",
          gap: 14,
          marginBottom: 36,
        }}
      >
        <div style={{ color: RC_COLORS.muted, fontSize: 15, fontWeight: 700 }}>P1: Intro ✓</div>
        <div style={{ color: RC_COLORS.muted, fontSize: 15, fontWeight: 700 }}>P2: Normalization ✓</div>
        <div style={{ color: RC_COLORS.muted, fontSize: 15, fontWeight: 700 }}>P3: Debouncing ✓</div>
        <div style={{ color: RC_COLORS.green, fontSize: 15, fontWeight: 800 }}>P4: Request Control 🟢</div>
        <div style={{ color: RC_COLORS.amber, fontSize: 15, fontWeight: 800 }}>P5: Next →</div>
      </div>

      {/* Next Episode Box */}
      <div
        style={{
          background: `${RC_COLORS.panelStrong}ee`,
          border: `2px solid ${RC_COLORS.amber}`,
          boxShadow: `0 0 40px ${RC_COLORS.amberGlow}`,
          borderRadius: 22,
          padding: "18px 40px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 32,
        }}
      >
        <span style={{ color: RC_COLORS.amber, fontSize: 24, fontWeight: 900, letterSpacing: 2 }}>
          NEXT:
        </span>
        <span style={{ color: RC_COLORS.text, fontSize: 24, fontWeight: 800, letterSpacing: 1 }}>
          CACHING &amp; INDEXING <span style={{ color: RC_COLORS.amber }}>→</span>
        </span>
      </div>

      {/* Follow CTA */}
      <div style={{ color: RC_COLORS.muted, fontSize: 19, letterSpacing: 4, fontWeight: 800 }}>
        FOLLOW FOR THE FULL SERIES
      </div>
    </div>
  );
};
