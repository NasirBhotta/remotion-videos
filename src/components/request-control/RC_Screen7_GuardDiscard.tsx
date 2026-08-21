import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RC_COLORS } from "../../data/searchRequestControlData";

export const RC_Screen7_GuardDiscard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const fadeOut = interpolate(frame, [78, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isDiscarded = frame >= 22;
  const discardSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 11, stiffness: 150 },
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
          color: RC_COLORS.amber,
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 4,
          marginBottom: 12,
        }}
      >
        🛑 SOLUTION IN ACTION • THE GUARD CHECK
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
        Discard Stale Responses Instantly
      </div>

      {/* Central Guard Card */}
      <div
        style={{
          width: 820,
          background: RC_COLORS.cardBg,
          border: `2px solid ${isDiscarded ? RC_COLORS.amber : RC_COLORS.cyan}`,
          boxShadow: isDiscarded ? `0 0 45px ${RC_COLORS.amberGlow}` : "none",
          borderRadius: 24,
          padding: "24px 30px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxSizing: "border-box",
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: RC_COLORS.cyan, fontFamily: "monospace", fontSize: 20, fontWeight: 800 }}>
            Response #1 Arrives (ID: 1)
          </span>
          <span
            style={{
              background: isDiscarded ? `${RC_COLORS.amber}33` : `${RC_COLORS.panel}`,
              border: `1px solid ${isDiscarded ? RC_COLORS.amber : RC_COLORS.border}`,
              color: isDiscarded ? RC_COLORS.amber : RC_COLORS.muted,
              fontSize: 15,
              fontWeight: 900,
              padding: "6px 14px",
              borderRadius: 8,
              transform: `scale(${isDiscarded ? 0.95 + discardSpring * 0.05 : 1})`,
            }}
          >
            {isDiscarded ? "🛑 DISCARDED (IGNORED)" : "EVALUATING..."}
          </span>
        </div>

        {/* Code Check Logic */}
        <div
          style={{
            background: RC_COLORS.codeBg,
            borderRadius: 14,
            padding: "16px 20px",
            fontFamily: "monospace",
            fontSize: 17,
            lineHeight: 1.5,
          }}
        >
          <div style={{ color: RC_COLORS.muted }}>// Guard check before touching UI state</div>
          <div>
            <span style={{ color: RC_COLORS.violet }}>if</span> (currentId === latestId.current) &#123;
          </div>
          <div style={{ paddingLeft: 20, color: RC_COLORS.green }}>
            setResults(data); <span style={{ color: RC_COLORS.muted }}>// Will NOT run for ID: 1</span>
          </div>
          <div>&#125;</div>
        </div>

        {/* Guard Comparison Result */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#080c14",
            padding: "12px 18px",
            borderRadius: 12,
            fontSize: 17,
            fontWeight: 800,
          }}
        >
          <span style={{ color: RC_COLORS.muted }}>Check: 1 === 2 ➔ FALSE</span>
          <span style={{ color: RC_COLORS.green }}>UI Stays 100% Protected! ✓</span>
        </div>
      </div>
    </div>
  );
};
