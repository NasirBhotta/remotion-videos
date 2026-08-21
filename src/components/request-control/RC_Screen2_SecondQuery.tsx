import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RC_COLORS } from "../../data/searchRequestControlData";

export const RC_Screen2_SecondQuery: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const fadeOut = interpolate(frame, [68, 80], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const typeProgress = interpolate(frame, [8, 30], [6, 9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const text = "iphone 15".slice(0, Math.floor(typeProgress));

  const packetFly = interpolate(frame, [32, 72], [0, 100], {
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
          color: RC_COLORS.green,
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 4,
          marginBottom: 12,
        }}
      >
        STEP 02 • USER CONTINUES TYPING
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
        User Adds &quot;15&quot; ➔ &quot;iphone 15&quot;
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
          border: `2px solid ${RC_COLORS.green}`,
          boxShadow: `0 0 40px ${RC_COLORS.greenGlow}`,
          marginBottom: 30,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: RC_COLORS.green, fontSize: 36 }}>⌕</span>
          <span style={{ color: RC_COLORS.text, fontSize: 38, fontWeight: 700 }}>
            {text}
            <span style={{ color: RC_COLORS.green, opacity: Math.floor(frame / 6) % 2 === 0 ? 1 : 0.2 }}>│</span>
          </span>
        </div>
        <div
          style={{
            background: `${RC_COLORS.green}33`,
            border: `1px solid ${RC_COLORS.green}`,
            color: RC_COLORS.green,
            fontSize: 15,
            fontWeight: 900,
            padding: "6px 14px",
            borderRadius: 8,
          }}
        >
          REQ #2 (LATEST)
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
          <span style={{ color: RC_COLORS.green, fontFamily: "monospace", fontSize: 22, fontWeight: 800 }}>
            GET /search?q=iphone%2015
          </span>
          <span style={{ color: RC_COLORS.muted, fontSize: 16, fontWeight: 700 }}>
            Latency: <strong style={{ color: RC_COLORS.green }}>100ms (Fast Route ⚡)</strong>
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
              background: RC_COLORS.green,
              boxShadow: `0 0 14px ${RC_COLORS.green}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
