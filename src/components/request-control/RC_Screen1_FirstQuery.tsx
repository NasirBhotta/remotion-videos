import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RC_COLORS } from "../../data/searchRequestControlData";

export const RC_Screen1_FirstQuery: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const fadeOut = interpolate(frame, [68, 80], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const typeProgress = interpolate(frame, [10, 35], [0, 6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const text = "iphone".slice(0, Math.floor(typeProgress));

  const packetFly = interpolate(frame, [38, 75], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: enter * fadeOut,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 40px",
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          color: RC_COLORS.cyan,
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 4,
          marginBottom: 12,
        }}
      >
        STEP 01 • USER TYPING
      </div>

      {/* Main Title */}
      <div
        style={{
          color: RC_COLORS.text,
          fontSize: 54,
          fontWeight: 900,
          letterSpacing: -1.5,
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        User Types &quot;iphone&quot;
      </div>

      {/* Search Input */}
      <div
        style={{
          width: 820,
          height: 100,
          borderRadius: 22,
          padding: "0 30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: RC_COLORS.cardBg,
          border: `2px solid ${RC_COLORS.cyan}`,
          boxShadow: `0 0 40px ${RC_COLORS.cyanGlow}`,
          marginBottom: 30,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: RC_COLORS.cyan, fontSize: 36 }}>⌕</span>
          <span style={{ color: RC_COLORS.text, fontSize: 38, fontWeight: 700 }}>
            {text}
            <span style={{ color: RC_COLORS.cyan, opacity: Math.floor(frame / 6) % 2 === 0 ? 1 : 0.2 }}>│</span>
          </span>
        </div>
        <div
          style={{
            background: `${RC_COLORS.cyan}22`,
            border: `1px solid ${RC_COLORS.cyan}`,
            color: RC_COLORS.cyan,
            fontSize: 15,
            fontWeight: 900,
            padding: "6px 14px",
            borderRadius: 8,
          }}
        >
          REQ #1
        </div>
      </div>

      {/* Dispatched Request Card */}
      <div
        style={{
          width: 820,
          background: RC_COLORS.panelStrong,
          border: `1.5px solid ${RC_COLORS.cardBorder}`,
          borderRadius: 20,
          padding: "22px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: RC_COLORS.cyan, fontFamily: "monospace", fontSize: 22, fontWeight: 800 }}>
            GET /search?q=iphone
          </span>
          <span style={{ color: RC_COLORS.muted, fontSize: 16, fontWeight: 700 }}>
            Latency: <strong style={{ color: RC_COLORS.cyan }}>350ms (Slow Network 🐌)</strong>
          </span>
        </div>

        <div
          style={{
            width: "100%",
            height: 8,
            background: "rgba(255, 255, 255, 0.08)",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${packetFly}%`,
              height: "100%",
              background: RC_COLORS.cyan,
              boxShadow: `0 0 14px ${RC_COLORS.cyan}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
