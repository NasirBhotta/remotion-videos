import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RC_COLORS, RC_SCENES } from "../data/searchRequestControlData";
import { RequestControlSearchBar } from "./RequestControlSearchBar";

export const StaleResponseGuard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < RC_SCENES.solution - 6 || frame >= RC_SCENES.payoff) {
    return null;
  }

  const enter = spring({
    frame: frame - RC_SCENES.solution,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const fadeOut = interpolate(
    frame,
    [RC_SCENES.payoff - 10, RC_SCENES.payoff],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Stale intercept animation trigger (frame 270+)
  const isIntercepted = frame >= RC_SCENES.solution + 15;
  const interceptSpring = spring({
    frame: frame - (RC_SCENES.solution + 15),
    fps,
    config: { damping: 12, stiffness: 150 },
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
            color: RC_COLORS.cyan,
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 4,
            marginBottom: 8,
          }}
        >
          HOW THE SOLUTION WORKS
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
          The Request Control Guard
        </div>
      </div>

      {/* 2. Top Search Bar */}
      <div style={{ position: "absolute", top: 310 }}>
        <RequestControlSearchBar
          fixedQuery="iphone 15"
          badge="LATEST ID: #2"
          badgeColor={RC_COLORS.green}
        />
      </div>

      {/* 3. Central Guard Architecture & Logic Box */}
      <div
        style={{
          position: "absolute",
          top: 450,
          width: 840,
          background: RC_COLORS.cardBg,
          border: `2px solid ${isIntercepted ? RC_COLORS.amber : RC_COLORS.cyan}`,
          boxShadow: isIntercepted
            ? `0 0 45px ${RC_COLORS.amberGlow}`
            : `0 0 35px ${RC_COLORS.cyanGlow}`,
          borderRadius: 24,
          padding: "24px 30px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 30 }}>🛡️</span>
            <div>
              <div style={{ color: RC_COLORS.muted, fontSize: 13, fontWeight: 800, letterSpacing: 2 }}>
                PATTERN 1: REQUEST ID TRACKING
              </div>
              <div style={{ color: RC_COLORS.text, fontSize: 22, fontWeight: 900 }}>
                Store <code style={{ color: RC_COLORS.cyan }}>latestRequestId = 2</code> in ref
              </div>
            </div>
          </div>

          <div
            style={{
              background: isIntercepted ? `${RC_COLORS.amber}33` : `${RC_COLORS.cyan}22`,
              border: `1px solid ${isIntercepted ? RC_COLORS.amber : RC_COLORS.cyan}`,
              color: isIntercepted ? RC_COLORS.amber : RC_COLORS.cyan,
              fontSize: 14,
              fontWeight: 900,
              padding: "6px 14px",
              borderRadius: 10,
            }}
          >
            {isIntercepted ? "STALE INTERCEPTED" : "GUARD ACTIVE"}
          </div>
        </div>

        {/* Incoming Stale Response Check */}
        <div
          style={{
            background: "#080c14",
            border: `1.5px solid ${isIntercepted ? RC_COLORS.amber : RC_COLORS.cardBorder}`,
            borderRadius: 14,
            padding: "14px 18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: RC_COLORS.cyan, fontFamily: "monospace", fontSize: 19, fontWeight: 800 }}>
              Response #1 arrives (ID: 1)
            </span>
          </div>

          {isIntercepted ? (
            <div
              style={{
                background: `${RC_COLORS.amber}33`,
                border: `1.5px solid ${RC_COLORS.amber}`,
                color: RC_COLORS.amber,
                fontSize: 14,
                fontWeight: 900,
                padding: "6px 14px",
                borderRadius: 8,
                transform: `scale(${0.92 + interceptSpring * 0.08})`,
              }}
            >
              🛑 ID (1) &lt; Latest (2) ➔ DISCARDED!
            </div>
          ) : (
            <span style={{ color: RC_COLORS.muted, fontSize: 14, fontWeight: 700 }}>Arriving...</span>
          )}
        </div>

        {/* Code Logic Snippet */}
        <div
          style={{
            background: `${RC_COLORS.codeBg}`,
            border: `1px solid ${RC_COLORS.border}`,
            borderRadius: 12,
            padding: "12px 18px",
            fontFamily: "monospace",
            fontSize: 16,
            lineHeight: 1.4,
          }}
        >
          <div style={{ color: RC_COLORS.muted }}>// Only commit state if request ID matches latest</div>
          <div>
            <span style={{ color: RC_COLORS.violet }}>if</span> (reqId === latestRequestId.current){" "}
            <span style={{ color: RC_COLORS.green }}>setResults(data)</span>;
          </div>
        </div>
      </div>

      {/* 4. Pattern 2: AbortController Box */}
      <div
        style={{
          position: "absolute",
          top: 830,
          width: 840,
          background: RC_COLORS.serverNodeBg,
          border: `2px solid ${RC_COLORS.green}`,
          boxShadow: `0 10px 35px ${RC_COLORS.greenGlow}`,
          borderRadius: 22,
          padding: "20px 28px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 28 }}>⚡</span>
          <div>
            <div style={{ color: RC_COLORS.green, fontSize: 14, fontWeight: 800, letterSpacing: 1.5 }}>
              PATTERN 2: ABORTCONTROLLER (HTTP CANCELLATION)
            </div>
            <div style={{ color: RC_COLORS.text, fontSize: 18, fontWeight: 600, marginTop: 2 }}>
              Call <code style={{ color: RC_COLORS.green }}>controller.abort()</code> on new keystroke to cancel in-flight HTTP requests.
            </div>
          </div>
        </div>

        <div
          style={{
            background: `${RC_COLORS.green}33`,
            border: `1px solid ${RC_COLORS.green}`,
            color: RC_COLORS.green,
            fontSize: 14,
            fontWeight: 900,
            padding: "6px 14px",
            borderRadius: 8,
            whiteSpace: "nowrap",
          }}
        >
          ✓ 0 OVERWRITES
        </div>
      </div>
    </div>
  );
};
