import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RC_COLORS, RC_SCENES } from "../data/searchRequestControlData";
import { RequestControlSearchBar } from "./RequestControlSearchBar";

export const RequestControlPayoff: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < RC_SCENES.payoff - 4 || frame >= RC_SCENES.outro + 4) {
    return null;
  }

  const enter = spring({
    frame: frame - RC_SCENES.payoff,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const fadeOut = interpolate(
    frame,
    [RC_SCENES.outro - 6, RC_SCENES.outro + 2],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const resultsEnter = spring({
    frame: frame - (RC_SCENES.payoff + 12),
    fps,
    config: { damping: 14, stiffness: 140 },
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
      }}
    >
      {/* 1. Header */}
      <div
        style={{
          position: "absolute",
          top: 180,
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: RC_COLORS.green,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 5,
            marginBottom: 10,
          }}
        >
          THE PAYOFF
        </div>
        <div
          style={{
            color: RC_COLORS.text,
            fontSize: 56,
            fontWeight: 900,
            letterSpacing: -1.5,
          }}
        >
          LATEST REQUEST WINS
        </div>
      </div>

      {/* 2. Top Search Input */}
      <div style={{ position: "absolute", top: 320 }}>
        <RequestControlSearchBar
          fixedQuery="iphone 15"
          badge="✓ UI UPDATED"
          badgeColor={RC_COLORS.green}
        />
      </div>

      {/* 3. Acceptance Pipeline Flow */}
      <div
        style={{
          position: "absolute",
          top: 480,
          width: 820,
          background: RC_COLORS.cardBg,
          border: `2px solid ${RC_COLORS.green}`,
          boxShadow: `0 0 45px ${RC_COLORS.greenGlow}`,
          borderRadius: 24,
          padding: "24px 32px",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28 }}>🚀</span>
          <div>
            <div style={{ color: RC_COLORS.muted, fontSize: 14, fontWeight: 800, letterSpacing: 1.5 }}>
              REQ C [ID: #3]
            </div>
            <div style={{ color: RC_COLORS.text, fontSize: 22, fontWeight: 900, fontFamily: "monospace" }}>
              RESPONSE C ACCEPTED
            </div>
          </div>
        </div>

        <div style={{ color: RC_COLORS.green, fontSize: 28, fontWeight: 900 }}>
          →
        </div>

        <div
          style={{
            background: `${RC_COLORS.green}33`,
            border: `1.5px solid ${RC_COLORS.green}`,
            color: RC_COLORS.green,
            fontSize: 18,
            fontWeight: 900,
            padding: "8px 20px",
            borderRadius: 12,
            letterSpacing: 1,
          }}
        >
          ✓ UPDATE UI
        </div>
      </div>

      {/* 4. Rendered Search Results Card for "iphone 15" */}
      <div
        style={{
          position: "absolute",
          top: 650,
          width: 820,
          background: `${RC_COLORS.panelStrong}`,
          border: `2px solid ${RC_COLORS.cardBorder}`,
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          borderRadius: 24,
          padding: "28px 32px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          transform: `scale(${0.92 + resultsEnter * 0.08})`,
          opacity: resultsEnter,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: RC_COLORS.cyan, fontSize: 16, fontWeight: 800, letterSpacing: 2 }}>
            SEARCH RESULTS: &quot;iphone 15&quot;
          </div>
          <div style={{ color: RC_COLORS.muted, fontSize: 14, fontWeight: 700 }}>
            3 Verified Products
          </div>
        </div>

        {/* Product Items */}
        {[
          { title: "Apple iPhone 15 Pro Max (256GB)", price: "$1,199", tag: "MATCH #1" },
          { title: "Apple iPhone 15 Plus (128GB)", price: "$899", tag: "MATCH #2" },
          { title: "Apple iPhone 15 Silicone Case", price: "$49", tag: "ACCESSORY" },
        ].map((item, idx) => (
          <div
            key={item.title}
            style={{
              background: "#080c14",
              border: `1px solid ${RC_COLORS.border}`,
              borderRadius: 14,
              padding: "14px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: `${RC_COLORS.cyan}22`,
                  border: `1px solid ${RC_COLORS.cyan}66`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: RC_COLORS.cyan,
                  fontSize: 14,
                  fontWeight: 900,
                }}
              >
                {idx + 1}
              </div>
              <span style={{ color: RC_COLORS.text, fontSize: 19, fontWeight: 700 }}>
                {item.title}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ color: RC_COLORS.green, fontSize: 18, fontWeight: 900 }}>
                {item.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Key Metric Card */}
      <div
        style={{
          position: "absolute",
          top: 1090,
          width: 820,
          background: `${RC_COLORS.panelStrong}ee`,
          border: `2px solid ${RC_COLORS.amber}`,
          boxShadow: `0 0 45px ${RC_COLORS.amberGlow}`,
          borderRadius: 24,
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          boxSizing: "border-box",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ color: RC_COLORS.muted, fontSize: 15, fontWeight: 800, letterSpacing: 2 }}>
            STALE OVERWRITES
          </div>
          <div style={{ color: RC_COLORS.green, fontSize: 42, fontWeight: 900 }}>
            0 (BLOCKED)
          </div>
        </div>

        <div style={{ width: 2, height: 60, background: RC_COLORS.border }} />

        <div style={{ textAlign: "center" }}>
          <div style={{ color: RC_COLORS.muted, fontSize: 15, fontWeight: 800, letterSpacing: 2 }}>
            UI ACCURACY
          </div>
          <div style={{ color: RC_COLORS.green, fontSize: 42, fontWeight: 900 }}>
            100%
          </div>
        </div>
      </div>
    </div>
  );
};
