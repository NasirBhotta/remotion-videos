import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RC_COLORS } from "../../data/searchRequestControlData";

export const RC_Screen3_FastResponseWins: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const fadeOut = interpolate(frame, [72, 85], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardEnter = spring({ frame: frame - 15, fps, config: { damping: 13, stiffness: 140 } });

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
        STEP 03 • FIRST RESPONSE ARRIVES
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
        Req #2 Returns 1st (100ms) ➔ UI Updates
      </div>

      {/* Results View Container */}
      <div
        style={{
          width: 820,
          background: RC_COLORS.panelStrong,
          border: `2px solid ${RC_COLORS.green}`,
          boxShadow: `0 10px 45px ${RC_COLORS.greenGlow}`,
          borderRadius: 24,
          padding: "24px 30px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          boxSizing: "border-box",
          transform: `scale(${0.94 + cardEnter * 0.06})`,
          opacity: cardEnter,
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: RC_COLORS.green, fontSize: 16, fontWeight: 800, letterSpacing: 1.5 }}>
            SEARCH RESULTS FOR &quot;iphone 15&quot;
          </span>
          <span
            style={{
              background: `${RC_COLORS.green}33`,
              color: RC_COLORS.green,
              fontSize: 14,
              fontWeight: 900,
              padding: "4px 12px",
              borderRadius: 8,
            }}
          >
            ✓ 1ST RESPONSE APPLIED
          </span>
        </div>

        {/* Product Items */}
        {[
          { name: "Apple iPhone 15 Pro Max (256GB)", price: "$1,199" },
          { name: "Apple iPhone 15 Plus (128GB)", price: "$899" },
        ].map((item, idx) => (
          <div
            key={item.name}
            style={{
              background: "#080c14",
              border: `1px solid ${RC_COLORS.border}`,
              borderRadius: 12,
              padding: "12px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: RC_COLORS.green, fontWeight: 900 }}>{idx + 1}.</span>
              <span style={{ color: RC_COLORS.text, fontSize: 18, fontWeight: 700 }}>{item.name}</span>
            </div>
            <span style={{ color: RC_COLORS.green, fontSize: 17, fontWeight: 900 }}>{item.price}</span>
          </div>
        ))}
      </div>

      {/* Note */}
      <div
        style={{
          width: 820,
          background: `${RC_COLORS.green}15`,
          border: `1px solid ${RC_COLORS.green}66`,
          borderRadius: 16,
          padding: "14px 20px",
          color: RC_COLORS.green,
          fontSize: 18,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        Everything looks perfect so far... but Req #1 is still on the way!
      </div>
    </div>
  );
};
