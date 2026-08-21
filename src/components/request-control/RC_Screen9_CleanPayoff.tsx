import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RC_COLORS } from "../../data/searchRequestControlData";

export const RC_Screen9_CleanPayoff: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const fadeOut = interpolate(frame, [68, 80], [1, 0], {
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
        🚀 THE FINAL PAYOFF
      </div>

      {/* Main Title */}
      <div
        style={{
          color: RC_COLORS.text,
          fontSize: 54,
          fontWeight: 900,
          letterSpacing: -1.5,
          marginBottom: 35,
          textAlign: "center",
        }}
      >
        100% UI Consistency
      </div>

      {/* Protected Results View */}
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
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: RC_COLORS.green, fontSize: 16, fontWeight: 800, letterSpacing: 1.5 }}>
            SEARCH: &quot;iphone 15&quot;
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
            ✓ LATEST REQ WINS
          </span>
        </div>

        {/* Product Items */}
        {[
          { name: "Apple iPhone 15 Pro Max (256GB)", price: "$1,199" },
          { name: "Apple iPhone 15 Plus (128GB)", price: "$899" },
          { name: "Apple iPhone 15 Silicone Case", price: "$49" },
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

      {/* Metrics Banner */}
      <div
        style={{
          width: 820,
          background: RC_COLORS.cardBg,
          border: `2px solid ${RC_COLORS.amber}`,
          boxShadow: `0 0 35px ${RC_COLORS.amberGlow}`,
          borderRadius: 20,
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          boxSizing: "border-box",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ color: RC_COLORS.muted, fontSize: 13, fontWeight: 800, letterSpacing: 1.5 }}>
            STALE OVERWRITES
          </div>
          <div style={{ color: RC_COLORS.green, fontSize: 34, fontWeight: 900, marginTop: 2 }}>
            0 (BLOCKED)
          </div>
        </div>

        <div style={{ width: 2, height: 45, background: RC_COLORS.border }} />

        <div style={{ textAlign: "center" }}>
          <div style={{ color: RC_COLORS.muted, fontSize: 13, fontWeight: 800, letterSpacing: 1.5 }}>
            SEARCH ACCURACY
          </div>
          <div style={{ color: RC_COLORS.green, fontSize: 34, fontWeight: 900, marginTop: 2 }}>
            100%
          </div>
        </div>
      </div>
    </div>
  );
};
