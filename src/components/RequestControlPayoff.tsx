import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RC_COLORS, RC_SCENES } from "../data/searchRequestControlData";
import { RequestControlSearchBar } from "./RequestControlSearchBar";

export const RequestControlPayoff: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < RC_SCENES.payoff - 6 || frame >= RC_SCENES.outro + 4) {
    return null;
  }

  const enter = spring({
    frame: frame - RC_SCENES.payoff,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const fadeOut = interpolate(
    frame,
    [RC_SCENES.outro - 8, RC_SCENES.outro + 2],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const resultsEnter = spring({
    frame: frame - (RC_SCENES.payoff + 8),
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
          top: 160,
          width: "100%",
          textAlign: "center",
          padding: "0 30px",
        }}
      >
        <div
          style={{
            color: RC_COLORS.green,
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 4,
            marginBottom: 10,
          }}
        >
          THE PAYOFF
        </div>
        <div
          style={{
            color: RC_COLORS.text,
            fontSize: 52,
            fontWeight: 900,
            letterSpacing: -1.5,
            lineHeight: 1.15,
          }}
        >
          Latest Request Wins Every Time
        </div>
      </div>

      {/* 2. Top Search Bar */}
      <div style={{ position: "absolute", top: 340 }}>
        <RequestControlSearchBar
          fixedQuery="iphone 15"
          badge="✓ UI IN SYNC"
          badgeColor={RC_COLORS.green}
        />
      </div>

      {/* 3. Search Results for "iphone 15" */}
      <div
        style={{
          position: "absolute",
          top: 480,
          width: 840,
          background: `${RC_COLORS.panelStrong}`,
          border: `2px solid ${RC_COLORS.green}`,
          boxShadow: `0 15px 45px ${RC_COLORS.greenGlow}`,
          borderRadius: 24,
          padding: "26px 32px",
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
          <div
            style={{
              background: `${RC_COLORS.green}22`,
              border: `1px solid ${RC_COLORS.green}66`,
              color: RC_COLORS.green,
              fontSize: 14,
              fontWeight: 800,
              padding: "4px 12px",
              borderRadius: 8,
            }}
          >
            REQ #2 (VERIFIED)
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
              <span style={{ color: RC_COLORS.text, fontSize: 20, fontWeight: 700 }}>
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

      {/* 4. Bottom Metrics Banner */}
      <div
        style={{
          position: "absolute",
          top: 920,
          width: 840,
          background: `${RC_COLORS.cardBg}`,
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
          <div style={{ color: RC_COLORS.muted, fontSize: 14, fontWeight: 800, letterSpacing: 2 }}>
            STALE OVERWRITES
          </div>
          <div style={{ color: RC_COLORS.green, fontSize: 40, fontWeight: 900, marginTop: 4 }}>
            0 (BLOCKED)
          </div>
        </div>

        <div style={{ width: 2, height: 60, background: RC_COLORS.border }} />

        <div style={{ textAlign: "center" }}>
          <div style={{ color: RC_COLORS.muted, fontSize: 14, fontWeight: 800, letterSpacing: 2 }}>
            SEARCH CONSISTENCY
          </div>
          <div style={{ color: RC_COLORS.green, fontSize: 40, fontWeight: 900, marginTop: 4 }}>
            100%
          </div>
        </div>
      </div>
    </div>
  );
};
