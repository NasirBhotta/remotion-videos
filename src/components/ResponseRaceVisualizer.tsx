import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RC_COLORS, RC_SCENES } from "../data/searchRequestControlData";
import { RequestControlSearchBar } from "./RequestControlSearchBar";

export const ResponseRaceVisualizer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < RC_SCENES.race - 4 || frame >= RC_SCENES.intercept) {
    return null;
  }

  const enter = spring({
    frame: frame - RC_SCENES.race,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const fadeOut = interpolate(
    frame,
    [RC_SCENES.intercept - 8, RC_SCENES.intercept],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Response C arrives early (~frame 225)
  const isCArrived = frame >= 225;
  const cPulse = spring({
    frame: frame - 225,
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  // Response A finishes late (~frame 255)
  const isAFlying = frame >= 255;

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
            color: RC_COLORS.amber,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 5,
            marginBottom: 10,
          }}
        >
          THE RACE CONDITION
        </div>
        <div
          style={{
            color: RC_COLORS.text,
            fontSize: 54,
            fontWeight: 900,
            letterSpacing: -1.5,
          }}
        >
          RESPONSES ARRIVE OUT OF ORDER
        </div>
      </div>

      {/* 2. Top Search Input (User is already on "iphone 15") */}
      <div style={{ position: "absolute", top: 320 }}>
        <RequestControlSearchBar
          fixedQuery="iphone 15"
          badge="ACTIVE: REQ C"
          badgeColor={RC_COLORS.green}
        />
      </div>

      {/* 3. The Out-of-Order Response Stream */}
      <div
        style={{
          position: "absolute",
          top: 480,
          width: 820,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Item 1: Response C (Fastest - Arrived first) */}
        <div
          style={{
            background: isCArrived ? `${RC_COLORS.cardBg}` : "#0a0e18",
            border: `2px solid ${RC_COLORS.green}`,
            boxShadow: isCArrived
              ? `0 0 40px ${RC_COLORS.greenGlow}`
              : "0 10px 20px rgba(0,0,0,0.3)",
            borderRadius: 20,
            padding: "20px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transform: `scale(${isCArrived ? 0.95 + cPulse * 0.05 : 1})`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: `${RC_COLORS.green}33`,
                border: `2px solid ${RC_COLORS.green}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: RC_COLORS.green,
                fontWeight: 900,
                fontSize: 18,
              }}
            >
              C
            </div>
            <div>
              <div
                style={{
                  color: RC_COLORS.text,
                  fontSize: 22,
                  fontFamily: "monospace",
                  fontWeight: 800,
                }}
              >
                RESPONSE C: &quot;iphone 15&quot;
              </div>
              <div
                style={{
                  color: RC_COLORS.green,
                  fontSize: 15,
                  fontWeight: 700,
                  marginTop: 2,
                }}
              >
                1st to return (110ms) → UI Updated to iPhone 15 ✓
              </div>
            </div>
          </div>

          <div
            style={{
              background: `${RC_COLORS.green}33`,
              color: RC_COLORS.green,
              fontSize: 15,
              fontWeight: 900,
              padding: "6px 14px",
              borderRadius: 8,
              letterSpacing: 1,
            }}
          >
            ✓ 1st RETURN
          </div>
        </div>

        {/* Item 2: Response A (Slowest - Returns late) */}
        <div
          style={{
            background: RC_COLORS.cardBg,
            border: `2px solid ${isAFlying ? RC_COLORS.red : RC_COLORS.cyan}`,
            boxShadow: isAFlying
              ? `0 0 35px ${RC_COLORS.redGlow}`
              : "0 10px 20px rgba(0,0,0,0.3)",
            borderRadius: 20,
            padding: "20px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: `${RC_COLORS.cyan}33`,
                border: `2px solid ${RC_COLORS.cyan}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: RC_COLORS.cyan,
                fontWeight: 900,
                fontSize: 18,
              }}
            >
              A
            </div>
            <div>
              <div
                style={{
                  color: RC_COLORS.text,
                  fontSize: 22,
                  fontFamily: "monospace",
                  fontWeight: 800,
                }}
              >
                RESPONSE A: &quot;iphone&quot;
              </div>
              <div
                style={{
                  color: isAFlying ? RC_COLORS.red : RC_COLORS.muted,
                  fontSize: 15,
                  fontWeight: 700,
                  marginTop: 2,
                }}
              >
                {isAFlying
                  ? "2nd to return (320ms) — RETURNING OUT OF ORDER!"
                  : "Still calculating on server (320ms)..."}
              </div>
            </div>
          </div>

          <div
            style={{
              background: isAFlying
                ? `${RC_COLORS.red}33`
                : `${RC_COLORS.panel}`,
              border: `1px solid ${
                isAFlying ? RC_COLORS.red : RC_COLORS.border
              }`,
              color: isAFlying ? RC_COLORS.red : RC_COLORS.muted,
              fontSize: 15,
              fontWeight: 900,
              padding: "6px 14px",
              borderRadius: 8,
              letterSpacing: 1,
            }}
          >
            {isAFlying ? "⚠️ OUTDATED" : "IN FLIGHT"}
          </div>
        </div>

        {/* Item 3: Response B (Medium latency) */}
        <div
          style={{
            background: RC_COLORS.cardBg,
            border: `1px solid ${RC_COLORS.cardBorder}`,
            borderRadius: 20,
            padding: "20px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: 0.8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: `${RC_COLORS.violet}33`,
                border: `2px solid ${RC_COLORS.violet}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: RC_COLORS.violet,
                fontWeight: 900,
                fontSize: 18,
              }}
            >
              B
            </div>
            <div>
              <div
                style={{
                  color: RC_COLORS.text,
                  fontSize: 22,
                  fontFamily: "monospace",
                  fontWeight: 800,
                }}
              >
                RESPONSE B: &quot;iphone 1&quot;
              </div>
              <div
                style={{
                  color: RC_COLORS.muted,
                  fontSize: 15,
                  fontWeight: 700,
                  marginTop: 2,
                }}
              >
                3rd to return (240ms) — Also stale
              </div>
            </div>
          </div>

          <div
            style={{
              background: `${RC_COLORS.panel}`,
              border: `1px solid ${RC_COLORS.border}`,
              color: RC_COLORS.muted,
              fontSize: 15,
              fontWeight: 900,
              padding: "6px 14px",
              borderRadius: 8,
              letterSpacing: 1,
            }}
          >
            STALE
          </div>
        </div>
      </div>

      {/* 4. Danger Callout Card (When old Response A arrives out-of-order) */}
      {isAFlying && (
        <div
          style={{
            position: "absolute",
            top: 1040,
            width: 820,
            background: `${RC_COLORS.panelStrong}f5`,
            border: `2px solid ${RC_COLORS.red}`,
            boxShadow: `0 0 50px ${RC_COLORS.redGlow}`,
            borderRadius: 24,
            padding: "26px 32px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div style={{ fontSize: 44 }}>⚠️</div>
          <div>
            <div
              style={{
                color: RC_COLORS.red,
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: 1,
              }}
            >
              RACE CONDITION DANGER
            </div>
            <div
              style={{
                color: RC_COLORS.text,
                fontSize: 20,
                fontWeight: 600,
                marginTop: 4,
              }}
            >
              Old Response A (&quot;iphone&quot;) could overwrite new UI state (&quot;iphone 15&quot;)!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
