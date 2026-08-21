import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RC_COLORS, RC_SCENES } from "../data/searchRequestControlData";
import { RequestControlSearchBar } from "./RequestControlSearchBar";

export const ResponseRaceVisualizer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < RC_SCENES.raceWhy - 6 || frame >= RC_SCENES.solution) {
    return null;
  }

  const enter = spring({
    frame: frame - RC_SCENES.raceWhy,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const fadeOut = interpolate(
    frame,
    [RC_SCENES.solution - 10, RC_SCENES.solution],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Timeline events:
  // 1. Frame 115 (t=100ms equivalent): Req #2 resolves first
  const isReq2Resolved = frame >= 115;
  const req2Spring = spring({
    frame: frame - 115,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // 2. Frame 165 (t=350ms equivalent): Req #1 resolves late and overwrites!
  const isReq1Overwritten = frame >= 165;
  const req1Spring = spring({
    frame: frame - 165,
    fps,
    config: { damping: 11, stiffness: 140 },
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
          top: 150,
          width: "100%",
          textAlign: "center",
          padding: "0 30px",
        }}
      >
        <div
          style={{
            color: isReq1Overwritten ? RC_COLORS.red : RC_COLORS.amber,
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 4,
            marginBottom: 8,
          }}
        >
          {isReq1Overwritten ? "⚠️ ASYNC RACE CONDITION" : "THE RACE CONDITION"}
        </div>
        <div
          style={{
            color: RC_COLORS.text,
            fontSize: 50,
            fontWeight: 900,
            letterSpacing: -1.5,
            lineHeight: 1.15,
          }}
        >
          Why Does Stale Data Overwrite The UI?
        </div>
      </div>

      {/* 2. Top Search Bar */}
      <div style={{ position: "absolute", top: 310 }}>
        <RequestControlSearchBar
          fixedQuery="iphone 15"
          badge={isReq1Overwritten ? "⚠️ STATE CORRUPTED BY #1" : "USER QUERY: iphone 15"}
          badgeColor={isReq1Overwritten ? RC_COLORS.red : RC_COLORS.green}
        />
      </div>

      {/* 3. Step-by-Step Execution Timeline */}
      <div
        style={{
          position: "absolute",
          top: 450,
          width: 840,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Step 1: Promise #2 completes first */}
        <div
          style={{
            background: RC_COLORS.cardBg,
            border: `2px solid ${RC_COLORS.green}`,
            boxShadow: `0 8px 30px ${RC_COLORS.greenGlow}`,
            borderRadius: 20,
            padding: "18px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            transform: `scale(${isReq2Resolved ? 0.96 + req2Spring * 0.04 : 1})`,
            opacity: isReq2Resolved ? 1 : 0.3,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  background: `${RC_COLORS.green}33`,
                  border: `1.5px solid ${RC_COLORS.green}`,
                  color: RC_COLORS.green,
                  fontWeight: 900,
                  fontSize: 14,
                  padding: "4px 10px",
                  borderRadius: 8,
                }}
              >
                1ST EXECUTION • t=100ms
              </div>
              <span style={{ color: RC_COLORS.text, fontSize: 20, fontWeight: 800 }}>
                Promise #2 (&quot;iphone 15&quot;) Resolves
              </span>
            </div>
            <span style={{ color: RC_COLORS.green, fontWeight: 900, fontSize: 16 }}>✓ UI UPDATED</span>
          </div>

          <div
            style={{
              background: "#080c14",
              borderRadius: 10,
              padding: "8px 14px",
              fontFamily: "monospace",
              fontSize: 16,
              color: RC_COLORS.green,
            }}
          >
            setResults([&quot;iPhone 15 Pro&quot;, &quot;iPhone 15 Plus&quot;]) ➔ Rendered correctly
          </div>
        </div>

        {/* Step 2: Promise #1 completes late and overwrites */}
        <div
          style={{
            background: isReq1Overwritten ? "#1c0b14" : RC_COLORS.cardBg,
            border: `2px solid ${isReq1Overwritten ? RC_COLORS.red : RC_COLORS.cardBorder}`,
            boxShadow: isReq1Overwritten ? `0 0 40px ${RC_COLORS.redGlow}` : "none",
            borderRadius: 20,
            padding: "18px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            transform: `scale(${isReq1Overwritten ? 0.96 + req1Spring * 0.04 : 1})`,
            opacity: isReq1Overwritten ? 1 : 0.4,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  background: isReq1Overwritten ? `${RC_COLORS.red}33` : `${RC_COLORS.panel}`,
                  border: `1.5px solid ${isReq1Overwritten ? RC_COLORS.red : RC_COLORS.border}`,
                  color: isReq1Overwritten ? RC_COLORS.red : RC_COLORS.muted,
                  fontWeight: 900,
                  fontSize: 14,
                  padding: "4px 10px",
                  borderRadius: 8,
                }}
              >
                2ND EXECUTION • t=350ms
              </div>
              <span style={{ color: RC_COLORS.text, fontSize: 20, fontWeight: 800 }}>
                Promise #1 (&quot;iphone&quot;) Resolves LATER
              </span>
            </div>
            <span
              style={{
                color: isReq1Overwritten ? RC_COLORS.red : RC_COLORS.muted,
                fontWeight: 900,
                fontSize: 16,
              }}
            >
              {isReq1Overwritten ? "💥 BLIND OVERWRITE!" : "IN FLIGHT..."}
            </span>
          </div>

          <div
            style={{
              background: "#080c14",
              borderRadius: 10,
              padding: "8px 14px",
              fontFamily: "monospace",
              fontSize: 16,
              color: isReq1Overwritten ? RC_COLORS.red : RC_COLORS.muted,
            }}
          >
            setResults([&quot;iPhone 13&quot;, &quot;iPhone Case&quot;]) ➔ Overwrote new state!
          </div>
        </div>
      </div>

      {/* 4. The Core "WHY" Explanation Card */}
      <div
        style={{
          position: "absolute",
          top: 800,
          width: 840,
          background: "linear-gradient(135deg, rgba(22, 28, 42, 0.98) 0%, rgba(12, 16, 26, 0.98) 100%)",
          border: `2px solid ${isReq1Overwritten ? RC_COLORS.red : RC_COLORS.amber}`,
          boxShadow: isReq1Overwritten ? `0 15px 45px ${RC_COLORS.redGlow}` : "none",
          borderRadius: 22,
          padding: "22px 28px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 26 }}>💡</span>
          <span
            style={{
              color: isReq1Overwritten ? RC_COLORS.red : RC_COLORS.amber,
              fontSize: 17,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            WHY THIS HAPPENS IN JAVASCRIPT:
          </span>
        </div>

        <div style={{ color: RC_COLORS.text, fontSize: 19, lineHeight: 1.45, fontWeight: 600 }}>
          In standard frontend code, <strong style={{ color: RC_COLORS.cyan }}>setResults()</strong> has no memory of keystroke order. Whichever network request finishes <strong style={{ color: RC_COLORS.red }}>last in time</strong> becomes the final state on screen!
        </div>
      </div>
    </div>
  );
};
