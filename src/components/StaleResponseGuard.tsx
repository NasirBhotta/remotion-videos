import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RC_COLORS, RC_SCENES } from "../data/searchRequestControlData";
import { RequestControlSearchBar } from "./RequestControlSearchBar";

export const StaleResponseGuard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < RC_SCENES.intercept - 4 || frame >= RC_SCENES.payoff) {
    return null;
  }

  const enter = spring({
    frame: frame - RC_SCENES.intercept,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const fadeOut = interpolate(
    frame,
    [RC_SCENES.payoff - 8, RC_SCENES.payoff],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Stale interception trigger (frame 315+)
  const isIntercepted = frame >= RC_SCENES.intercept + 16;
  const interceptSpring = spring({
    frame: frame - (RC_SCENES.intercept + 16),
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
          top: 180,
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: RC_COLORS.cyan,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 5,
            marginBottom: 10,
          }}
        >
          THE SOLUTION
        </div>
        <div
          style={{
            color: RC_COLORS.text,
            fontSize: 54,
            fontWeight: 900,
            letterSpacing: -1.5,
          }}
        >
          REQUEST CONTROL GUARD
        </div>
      </div>

      {/* 2. Top Search Input */}
      <div style={{ position: "absolute", top: 320 }}>
        <RequestControlSearchBar
          fixedQuery="iphone 15"
          badge="ACTIVE ID: #3"
          badgeColor={RC_COLORS.green}
        />
      </div>

      {/* 3. Central Guard Evaluation Box */}
      <div
        style={{
          position: "absolute",
          top: 480,
          width: 820,
          background: RC_COLORS.cardBg,
          border: `2px solid ${
            isIntercepted ? RC_COLORS.amber : RC_COLORS.cyan
          }`,
          boxShadow: isIntercepted
            ? `0 0 45px ${RC_COLORS.amberGlow}`
            : `0 0 35px ${RC_COLORS.cyanGlow}`,
          borderRadius: 24,
          padding: "28px 32px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>🛡️</span>
            <div>
              <div
                style={{
                  color: RC_COLORS.muted,
                  fontSize: 15,
                  fontWeight: 800,
                  letterSpacing: 2,
                }}
              >
                STALE RESPONSE INTERCEPTOR
              </div>
              <div
                style={{
                  color: RC_COLORS.text,
                  fontSize: 24,
                  fontWeight: 900,
                }}
              >
                Tracking Request IDs: #1, #2, #3
              </div>
            </div>
          </div>

          <div
            style={{
              background: isIntercepted
                ? `${RC_COLORS.amber}33`
                : `${RC_COLORS.cyan}22`,
              border: `1px solid ${
                isIntercepted ? RC_COLORS.amber : RC_COLORS.cyan
              }`,
              color: isIntercepted ? RC_COLORS.amber : RC_COLORS.cyan,
              fontSize: 16,
              fontWeight: 900,
              padding: "6px 14px",
              borderRadius: 10,
            }}
          >
            {isIntercepted ? "STALE INTERCEPTED" : "EVALUATING"}
          </div>
        </div>

        {/* Incoming Stale Response A Attempting Delivery */}
        <div
          style={{
            background: "#080c14",
            border: `1.5px solid ${
              isIntercepted ? RC_COLORS.amber : RC_COLORS.cardBorder
            }`,
            borderRadius: 16,
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: RC_COLORS.cyan, fontFamily: "monospace", fontSize: 20, fontWeight: 800 }}>
              RESPONSE A (&quot;iphone&quot;)
            </span>
            <span style={{ color: RC_COLORS.muted, fontSize: 14, fontWeight: 700 }}>
              [ID: #1]
            </span>
          </div>

          {isIntercepted ? (
            <div
              style={{
                background: `${RC_COLORS.amber}33`,
                border: `1px solid ${RC_COLORS.amber}`,
                color: RC_COLORS.amber,
                fontSize: 15,
                fontWeight: 900,
                padding: "4px 12px",
                borderRadius: 8,
                transform: `scale(${0.9 + interceptSpring * 0.1})`,
              }}
            >
              ✕ STALE → DISCARDED
            </div>
          ) : (
            <div style={{ color: RC_COLORS.muted, fontSize: 14, fontWeight: 700 }}>
              Arriving...
            </div>
          )}
        </div>

        {/* Guard Comparison Rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: `${RC_COLORS.panelStrong}`,
            border: `1px solid ${RC_COLORS.border}`,
            borderRadius: 14,
            padding: "14px 20px",
            fontSize: 18,
            fontFamily: "monospace",
          }}
        >
          <span style={{ color: RC_COLORS.muted }}>
            Check: Req_ID (1) &lt; Latest_ID (3)
          </span>
          <span style={{ color: RC_COLORS.green, fontWeight: 800 }}>
            Result: DO NOT APPLY
          </span>
        </div>
      </div>

      {/* 4. Important Architectural Distinction Card */}
      <div
        style={{
          position: "absolute",
          top: 890,
          width: 820,
          background: `${RC_COLORS.panelStrong}ee`,
          border: `1.5px solid ${RC_COLORS.cardBorder}`,
          borderRadius: 20,
          padding: "22px 28px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            color: RC_COLORS.cyan,
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: 1.5,
          }}
        >
          KEY CONCEPT:
        </div>
        <div
          style={{
            color: RC_COLORS.text,
            fontSize: 20,
            fontWeight: 600,
            lineHeight: 1.4,
          }}
        >
          Request A technically succeeded (HTTP 200 OK), but it is safely
          ignored because the user has already typed a newer query.
        </div>
      </div>

      {/* 5. Active Protected State Card */}
      <div
        style={{
          position: "absolute",
          top: 1140,
          width: 820,
          background: RC_COLORS.serverNodeBg,
          border: `2px solid ${RC_COLORS.green}`,
          boxShadow: `0 0 40px ${RC_COLORS.greenGlow}`,
          borderRadius: 24,
          padding: "24px 32px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: RC_COLORS.green,
              boxShadow: `0 0 12px ${RC_COLORS.green}`,
            }}
          />
          <div>
            <div
              style={{
                color: RC_COLORS.text,
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: -0.5,
              }}
            >
              UI STATE: PROTECTED
            </div>
            <div
              style={{
                color: RC_COLORS.green,
                fontSize: 16,
                fontWeight: 700,
                marginTop: 2,
              }}
            >
              Only Response C (#3) can update the UI view
            </div>
          </div>
        </div>

        <div
          style={{
            background: `${RC_COLORS.green}33`,
            border: `1px solid ${RC_COLORS.green}`,
            color: RC_COLORS.green,
            fontSize: 16,
            fontWeight: 900,
            padding: "8px 16px",
            borderRadius: 10,
          }}
        >
          ✓ SAFE
        </div>
      </div>
    </div>
  );
};
