import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  DEBOUNCE_COLORS,
  DEBOUNCE_SCENES,
  DEBOUNCED_KEYSTROKES,
  SINGLE_REQUEST_FIRE_FRAME,
  TIMER_COMPLETION_FRAME,
} from "../data/searchDebounceData";
import { DebounceSearchBar } from "./DebounceSearchBar";

export const DebounceTimerWidget: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance and fade logic
  if (frame < DEBOUNCE_SCENES.debounceIntro - 4 || frame >= DEBOUNCE_SCENES.comparison) {
    return null;
  }

  const enter = spring({
    frame: frame - DEBOUNCE_SCENES.debounceIntro,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const fadeOut = interpolate(
    frame,
    [DEBOUNCE_SCENES.comparison - 8, DEBOUNCE_SCENES.comparison],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Compute current typed text
  let currentText = "";
  let lastKeystrokeFrame = 0;
  let activeIndex = -1;

  for (let i = 0; i < DEBOUNCED_KEYSTROKES.length; i++) {
    if (frame >= DEBOUNCED_KEYSTROKES[i].frame) {
      currentText = DEBOUNCED_KEYSTROKES[i].text;
      lastKeystrokeFrame = DEBOUNCED_KEYSTROKES[i].frame;
      activeIndex = i;
    }
  }

  // Timer logic
  const isTypingActive = activeIndex >= 0 && activeIndex < DEBOUNCED_KEYSTROKES.length - 1;
  const isFinalWait = activeIndex === DEBOUNCED_KEYSTROKES.length - 1;
  const isTimerComplete = frame >= TIMER_COMPLETION_FRAME;
  const isRequestFired = frame >= SINGLE_REQUEST_FIRE_FRAME;

  // Calculate timer remaining ms and progress [0 to 1]
  let timerMs = 300;
  let timerProgress = 0; // 0 = full (300ms), 1 = expired (0ms)
  let showResetFlash = false;

  if (activeIndex >= 0) {
    const elapsedSinceLastKey = frame - lastKeystrokeFrame;

    // Reset flash for 5 frames after a keystroke (except first one)
    if (activeIndex > 0 && elapsedSinceLastKey < 6) {
      showResetFlash = true;
    }

    if (isTypingActive) {
      // During rapid typing: counts down partially then gets interrupted
      const durationToNext = 8;
      const fraction = Math.min(1, elapsedSinceLastKey / durationToNext);
      timerMs = Math.max(80, Math.round(300 - fraction * 180));
      timerProgress = fraction * 0.6;
    } else if (isFinalWait) {
      // User stopped typing at 'iphone' (frame 206)
      const countdownFrames = TIMER_COMPLETION_FRAME - lastKeystrokeFrame; // 24 frames
      const fraction = Math.min(1, Math.max(0, elapsedSinceLastKey / countdownFrames));
      timerMs = Math.max(0, Math.round(300 - fraction * 300));
      timerProgress = fraction;
    }
  }

  // Single request flight calculation (frames 234 to 250)
  const singlePacketProgress = interpolate(
    frame,
    [SINGLE_REQUEST_FIRE_FRAME, SINGLE_REQUEST_FIRE_FRAME + 16],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const singlePacketY = interpolate(singlePacketProgress, [0, 1], [680, 1240]);
  const isSinglePacketArrived = singlePacketProgress >= 1;

  const serverResponseSpring = spring({
    frame: frame - (SINGLE_REQUEST_FIRE_FRAME + 16),
    fps,
    config: { damping: 12, stiffness: 160 },
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
      {/* 1. Scene Header */}
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
            color: DEBOUNCE_COLORS.cyan,
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
            color: DEBOUNCE_COLORS.text,
            fontSize: 58,
            fontWeight: 900,
            letterSpacing: -1.5,
          }}
        >
          DEBOUNCE TIMER
        </div>
      </div>

      {/* 2. Search Input */}
      <div style={{ position: "absolute", top: 320 }}>
        <DebounceSearchBar
          startFrame={DEBOUNCE_SCENES.debounceIntro + 4}
          text={currentText}
          badgeText={isTimerComplete ? "TYPING COMPLETE" : "DEBOUNCING..."}
          badgeColor={isTimerComplete ? DEBOUNCE_COLORS.green : DEBOUNCE_COLORS.cyan}
          borderColor={
            isTimerComplete
              ? `${DEBOUNCE_COLORS.green}aa`
              : `${DEBOUNCE_COLORS.cyan}aa`
          }
          glowColor={
            isTimerComplete ? DEBOUNCE_COLORS.greenGlow : DEBOUNCE_COLORS.cyanGlow
          }
          isTyping={frame < 210}
        />
      </div>

      {/* 3. Central Debounce Timer Card */}
      <div
        style={{
          position: "absolute",
          top: 460,
          width: 820,
          background: DEBOUNCE_COLORS.cardBg,
          border: `2px solid ${
            showResetFlash
              ? DEBOUNCE_COLORS.amber
              : isTimerComplete
              ? DEBOUNCE_COLORS.green
              : DEBOUNCE_COLORS.cardBorder
          }`,
          boxShadow: showResetFlash
            ? `0 0 40px ${DEBOUNCE_COLORS.amberGlow}`
            : isTimerComplete
            ? `0 0 50px ${DEBOUNCE_COLORS.greenGlow}`
            : "0 10px 30px rgba(0,0,0,0.4)",
          borderRadius: 24,
          padding: "24px 32px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          zIndex: 10,
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
            <span style={{ fontSize: 30 }}>⏱</span>
            <div>
              <div
                style={{
                  color: DEBOUNCE_COLORS.muted,
                  fontSize: 16,
                  fontWeight: 800,
                  letterSpacing: 2,
                }}
              >
                DEBOUNCE WINDOW
              </div>
              <div
                style={{
                  color: isTimerComplete
                    ? DEBOUNCE_COLORS.green
                    : DEBOUNCE_COLORS.text,
                  fontSize: 32,
                  fontWeight: 900,
                  fontFamily: "monospace",
                }}
              >
                {isTimerComplete ? "300ms ELAPSED" : `WAIT: ${timerMs}ms`}
              </div>
            </div>
          </div>

          {/* Dynamic status chip */}
          {showResetFlash ? (
            <div
              style={{
                background: `${DEBOUNCE_COLORS.amber}33`,
                border: `1.5px solid ${DEBOUNCE_COLORS.amber}`,
                color: DEBOUNCE_COLORS.amber,
                fontSize: 18,
                fontWeight: 900,
                padding: "8px 18px",
                borderRadius: 12,
                letterSpacing: 1.5,
              }}
            >
              ⚡ RESET 300ms
            </div>
          ) : isTimerComplete ? (
            <div
              style={{
                background: `${DEBOUNCE_COLORS.green}33`,
                border: `1.5px solid ${DEBOUNCE_COLORS.green}`,
                color: DEBOUNCE_COLORS.green,
                fontSize: 18,
                fontWeight: 900,
                padding: "8px 18px",
                borderRadius: 12,
                letterSpacing: 1,
              }}
            >
              ✓ READY TO SEND
            </div>
          ) : (
            <div
              style={{
                background: `${DEBOUNCE_COLORS.cyan}22`,
                border: `1px solid ${DEBOUNCE_COLORS.cyan}88`,
                color: DEBOUNCE_COLORS.cyan,
                fontSize: 16,
                fontWeight: 800,
                padding: "6px 14px",
                borderRadius: 10,
                letterSpacing: 1,
              }}
            >
              RESET ON KEYSTROKE
            </div>
          )}
        </div>

        {/* Countdown progress bar */}
        <div
          style={{
            height: 14,
            background: "#080c14",
            borderRadius: 7,
            overflow: "hidden",
            border: `1px solid ${DEBOUNCE_COLORS.border}`,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(1 - timerProgress) * 100}%`,
              background: showResetFlash
                ? DEBOUNCE_COLORS.amber
                : isTimerComplete
                ? DEBOUNCE_COLORS.green
                : `linear-gradient(90deg, ${DEBOUNCE_COLORS.cyan}, ${DEBOUNCE_COLORS.violet})`,
              borderRadius: 7,
            }}
          />
        </div>
      </div>

      {/* 4. Architectural Debounce Rules Card (Fills mid-screen cleanly) */}
      {!isRequestFired && (
        <div
          style={{
            position: "absolute",
            top: 680,
            width: 820,
            background: `${DEBOUNCE_COLORS.panelStrong}`,
            border: `1px solid ${DEBOUNCE_COLORS.border}`,
            borderRadius: 24,
            padding: "28px 32px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            zIndex: 10,
          }}
        >
          <div
            style={{
              color: DEBOUNCE_COLORS.cyan,
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            HOW DEBOUNCING WORKS:
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: showResetFlash
                  ? `${DEBOUNCE_COLORS.amber}22`
                  : "#0a0e18",
                border: `1.5px solid ${
                  showResetFlash ? DEBOUNCE_COLORS.amber : DEBOUNCE_COLORS.cardBorder
                }`,
                borderRadius: 14,
                padding: "14px 20px",
                transition: "all 0.15s ease",
              }}
            >
              <span style={{ color: DEBOUNCE_COLORS.amber, fontSize: 24, fontWeight: 900 }}>
                1
              </span>
              <span style={{ color: DEBOUNCE_COLORS.text, fontSize: 21, fontWeight: 600 }}>
                Each keystroke cancels & resets the 300ms timer
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: isTimerComplete
                  ? `${DEBOUNCE_COLORS.green}22`
                  : "#0a0e18",
                border: `1.5px solid ${
                  isTimerComplete ? DEBOUNCE_COLORS.green : DEBOUNCE_COLORS.cardBorder
                }`,
                borderRadius: 14,
                padding: "14px 20px",
                transition: "all 0.15s ease",
              }}
            >
              <span style={{ color: DEBOUNCE_COLORS.green, fontSize: 24, fontWeight: 900 }}>
                2
              </span>
              <span style={{ color: DEBOUNCE_COLORS.text, fontSize: 21, fontWeight: 600 }}>
                When typing pauses 300ms → send exactly 1 API call
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5. Single Request Flight Track (Only shown when request is in flight) */}
      {isRequestFired && (
        <div
          style={{
            position: "absolute",
            top: 580,
            bottom: 680,
            width: 3,
            background: `linear-gradient(180deg, ${DEBOUNCE_COLORS.green}88, ${DEBOUNCE_COLORS.cyan}88)`,
            borderRadius: 2,
            zIndex: 5,
          }}
        />
      )}

      {/* 6. The Single Optimized Request Packet */}
      {isRequestFired && (
        <div
          style={{
            position: "absolute",
            top: singlePacketY,
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: DEBOUNCE_COLORS.panelStrong,
            border: `2px solid ${DEBOUNCE_COLORS.green}`,
            boxShadow: `0 0 35px ${DEBOUNCE_COLORS.greenGlow}`,
            borderRadius: 24,
            padding: "12px 28px",
            zIndex: 20,
            transform: `scale(${isSinglePacketArrived ? 1.05 : 1})`,
          }}
        >
          <span style={{ fontSize: 24 }}>🚀</span>
          <span
            style={{
              color: DEBOUNCE_COLORS.text,
              fontSize: 24,
              fontFamily: "monospace",
              fontWeight: 800,
            }}
          >
            GET /search?q=iphone
          </span>
          <div
            style={{
              background: `${DEBOUNCE_COLORS.green}33`,
              color: DEBOUNCE_COLORS.green,
              fontSize: 16,
              fontWeight: 900,
              padding: "4px 12px",
              borderRadius: 8,
            }}
          >
            1 REQUEST ONLY
          </div>
        </div>
      )}

      {/* 7. Payoff Callout Banner (Frame 246–270) */}
      {isSinglePacketArrived && (
        <div
          style={{
            position: "absolute",
            top: 780,
            background: `${DEBOUNCE_COLORS.panelStrong}ee`,
            border: `2px solid ${DEBOUNCE_COLORS.green}`,
            boxShadow: `0 0 50px ${DEBOUNCE_COLORS.greenGlow}`,
            borderRadius: 20,
            padding: "18px 40px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            transform: `scale(${0.9 + serverResponseSpring * 0.1})`,
            opacity: serverResponseSpring,
            zIndex: 30,
          }}
        >
          <span style={{ color: DEBOUNCE_COLORS.green, fontSize: 28 }}>✓</span>
          <span
            style={{
              color: DEBOUNCE_COLORS.text,
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            1 OPTIMIZED REQUEST SENT
          </span>
        </div>
      )}

      {/* 8. Destination API Server Node */}
      <div
        style={{
          position: "absolute",
          top: 1240,
          width: 820,
          background: DEBOUNCE_COLORS.serverNodeBg,
          border: `2px solid ${
            isSinglePacketArrived
              ? DEBOUNCE_COLORS.green
              : DEBOUNCE_COLORS.cardBorder
          }`,
          boxShadow: isSinglePacketArrived
            ? `0 0 50px ${DEBOUNCE_COLORS.greenGlow}`
            : "0 20px 40px rgba(0,0,0,0.5)",
          borderRadius: 24,
          padding: "26px 36px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: isSinglePacketArrived
                ? DEBOUNCE_COLORS.green
                : DEBOUNCE_COLORS.cyan,
              boxShadow: `0 0 12px ${
                isSinglePacketArrived
                  ? DEBOUNCE_COLORS.green
                  : DEBOUNCE_COLORS.cyan
              }`,
            }}
          />
          <div>
            <div
              style={{
                color: DEBOUNCE_COLORS.text,
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: -0.5,
              }}
            >
              API BACKEND SERVER
            </div>
            <div
              style={{
                color: DEBOUNCE_COLORS.muted,
                fontSize: 16,
                fontWeight: 700,
                marginTop: 2,
              }}
            >
              {isSinglePacketArrived
                ? "Status: 200 OK — Clean Single Execution"
                : "Awaiting final debounced query..."}
            </div>
          </div>
        </div>

        <div
          style={{
            background: isSinglePacketArrived
              ? `${DEBOUNCE_COLORS.green}33`
              : `${DEBOUNCE_COLORS.cardBorder}`,
            border: `1px solid ${
              isSinglePacketArrived
                ? DEBOUNCE_COLORS.green
                : DEBOUNCE_COLORS.border
            }`,
            color: isSinglePacketArrived
              ? DEBOUNCE_COLORS.green
              : DEBOUNCE_COLORS.muted,
            fontSize: 18,
            fontWeight: 800,
            padding: "8px 18px",
            borderRadius: 12,
            letterSpacing: 1,
            transform: `scale(${
              isSinglePacketArrived ? 0.9 + serverResponseSpring * 0.1 : 1
            })`,
          }}
        >
          {isSinglePacketArrived ? "1 TOTAL REQUEST" : "IDLE"}
        </div>
      </div>
    </div>
  );
};
