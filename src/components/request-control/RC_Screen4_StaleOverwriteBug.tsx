import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RC_COLORS } from "../../data/searchRequestControlData";

export const RC_Screen4_StaleOverwriteBug: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const fadeOut = interpolate(frame, [78, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glitch / Overwrite hit at frame 20
  const isOverwritten = frame >= 20;
  const glitchSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10, stiffness: 160 },
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
          color: RC_COLORS.red,
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 4,
          marginBottom: 12,
        }}
      >
        🚨 STEP 04 • THE RACE CONDITION DISASTER
      </div>

      {/* Main Title */}
      <div
        style={{
          color: RC_COLORS.text,
          fontSize: 52,
          fontWeight: 900,
          letterSpacing: -1.5,
          marginBottom: 35,
          textAlign: "center",
        }}
      >
        Slow Req #1 Arrives Late (350ms)...
      </div>

      {/* Corrupted Results View Container */}
      <div
        style={{
          width: 820,
          background: isOverwritten ? "linear-gradient(135deg, #240c14 0%, #14070a 100%)" : RC_COLORS.panelStrong,
          border: `2.5px solid ${isOverwritten ? RC_COLORS.red : RC_COLORS.green}`,
          boxShadow: isOverwritten ? `0 0 50px ${RC_COLORS.redGlow}` : "none",
          borderRadius: 24,
          padding: "24px 30px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          boxSizing: "border-box",
          transform: `scale(${isOverwritten ? 0.95 + glitchSpring * 0.05 : 1})`,
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              color: isOverwritten ? RC_COLORS.red : RC_COLORS.green,
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 1.5,
            }}
          >
            {isOverwritten ? "⚠️ OVERWRITTEN BY OLD REQ #1 (\"iphone\")" : "SEARCH RESULTS FOR \"iphone 15\""}
          </span>
          <span
            style={{
              background: `${RC_COLORS.red}33`,
              color: RC_COLORS.red,
              fontSize: 14,
              fontWeight: 900,
              padding: "4px 12px",
              borderRadius: 8,
            }}
          >
            {isOverwritten ? "💥 STATE OVERWRITTEN" : "WAITING..."}
          </span>
        </div>

        {/* Stale Overwritten Product Items */}
        {isOverwritten ? (
          [
            { name: "Apple iPhone 13 (Old Stock)", price: "$599" },
            { name: "iPhone 12 Protective Case", price: "$19" },
          ].map((item, idx) => (
            <div
              key={item.name}
              style={{
                background: "#080c14",
                border: `1px solid ${RC_COLORS.red}66`,
                borderRadius: 12,
                padding: "12px 18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: RC_COLORS.red, fontWeight: 900 }}>{idx + 1}.</span>
                <span style={{ color: RC_COLORS.text, fontSize: 18, fontWeight: 700 }}>{item.name}</span>
              </div>
              <span style={{ color: RC_COLORS.red, fontSize: 17, fontWeight: 900 }}>{item.price}</span>
            </div>
          ))
        ) : (
          <div style={{ color: RC_COLORS.muted, padding: "20px 0", textAlign: "center" }}>
            Showing iPhone 15 results...
          </div>
        )}
      </div>

      {/* Huge Glitch Warning Box */}
      {isOverwritten && (
        <div
          style={{
            width: 820,
            background: `${RC_COLORS.red}22`,
            border: `2px solid ${RC_COLORS.red}`,
            borderRadius: 20,
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxSizing: "border-box",
          }}
        >
          <span style={{ fontSize: 36 }}>💥</span>
          <div style={{ color: RC_COLORS.text, fontSize: 19, fontWeight: 700, lineHeight: 1.35 }}>
            User typed <strong style={{ color: RC_COLORS.green }}>&quot;iphone 15&quot;</strong>, but the screen is now showing outdated results for <strong style={{ color: RC_COLORS.red }}>&quot;iphone&quot;</strong>!
          </div>
        </div>
      )}
    </div>
  );
};
