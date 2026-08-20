import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  DEBOUNCE_COLORS,
  DEBOUNCE_SCENES,
  NAIVE_KEYSTROKES,
} from "../data/searchDebounceData";
import { DebounceSearchBar } from "./DebounceSearchBar";

export const RequestPacketFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Determine current typed text for Scene 1
  let currentText = "";
  let typedCount = 0;
  for (let i = 0; i < NAIVE_KEYSTROKES.length; i++) {
    if (frame >= NAIVE_KEYSTROKES[i].frame) {
      currentText = NAIVE_KEYSTROKES[i].text;
      typedCount = i + 1;
    }
  }

  // Calculate packet positions
  const startY = 460;
  const targetY = 1240;

  // Server node entrance spring
  const serverEnter = spring({
    frame: frame - 6,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  // Scene 2 Overload phase (frame 90+)
  const isOverload = frame >= DEBOUNCE_SCENES.overload;
  const overloadSpring = spring({
    frame: frame - DEBOUNCE_SCENES.overload,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Scene transition out fade
  const sceneFade = interpolate(
    frame,
    [DEBOUNCE_SCENES.debounceIntro - 8, DEBOUNCE_SCENES.debounceIntro],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (frame >= DEBOUNCE_SCENES.debounceIntro) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: sceneFade,
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
            color: DEBOUNCE_COLORS.red,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 5,
            marginBottom: 10,
          }}
        >
          THE PROBLEM: NAIVE SEARCH
        </div>
        <div
          style={{
            color: DEBOUNCE_COLORS.text,
            fontSize: 54,
            fontWeight: 900,
            letterSpacing: -1.5,
          }}
        >
          REQUEST ON EVERY KEYSTROKE
        </div>
      </div>

      {/* 2. Top Search Input */}
      <div style={{ position: "absolute", top: 320 }}>
        <DebounceSearchBar
          startFrame={4}
          text={currentText}
          badgeText={typedCount > 0 ? `${typedCount} KEYSTROKES` : "TYPE QUERY"}
          badgeColor={DEBOUNCE_COLORS.amber}
          borderColor={`${DEBOUNCE_COLORS.amber}99`}
          glowColor={DEBOUNCE_COLORS.amberGlow}
          isTyping={frame < 75}
        />
      </div>

      {/* 3. Connecting Vertical Data Path */}
      <div
        style={{
          position: "absolute",
          top: 430,
          bottom: 680,
          width: 3,
          background: `linear-gradient(180deg, ${DEBOUNCE_COLORS.amber}66, ${DEBOUNCE_COLORS.red}88)`,
          borderRadius: 2,
        }}
      />

      {/* 4. Request Packets flying down */}
      {!isOverload &&
        NAIVE_KEYSTROKES.map((k, index) => {
          const packetStart = k.frame;
          const flightDuration = 16;
          if (frame < packetStart) return null;

          const progress = interpolate(
            frame,
            [packetStart, packetStart + flightDuration],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const yPos = interpolate(progress, [0, 1], [startY, targetY - 40]);
          const isArrived = progress >= 1;
          const arrivalPulse = spring({
            frame: frame - (packetStart + flightDuration),
            fps,
            config: { damping: 10, stiffness: 200 },
          });

          return (
            <div
              key={k.char}
              style={{
                position: "absolute",
                top: yPos,
                transform: `scale(${isArrived ? 1 + arrivalPulse * 0.15 : 1})`,
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: DEBOUNCE_COLORS.panelStrong,
                border: `1.5px solid ${DEBOUNCE_COLORS.red}`,
                boxShadow: `0 0 20px ${DEBOUNCE_COLORS.redGlow}`,
                borderRadius: 20,
                padding: "8px 20px",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: DEBOUNCE_COLORS.red,
                  boxShadow: `0 0 10px ${DEBOUNCE_COLORS.red}`,
                }}
              />
              <span
                style={{
                  color: DEBOUNCE_COLORS.text,
                  fontSize: 20,
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
              >
                GET /search?q={k.text}
              </span>
              <span
                style={{
                  color: DEBOUNCE_COLORS.red,
                  fontSize: 16,
                  fontWeight: 800,
                  background: `${DEBOUNCE_COLORS.red}22`,
                  padding: "2px 8px",
                  borderRadius: 8,
                }}
              >
                REQ #{index + 1}
              </span>
            </div>
          );
        })}

      {/* 5. Scene 2 Overload Impact Banner (frames 90–150) */}
      {isOverload && (
        <div
          style={{
            position: "absolute",
            top: 500,
            width: 820,
            background: `${DEBOUNCE_COLORS.panelStrong}f5`,
            border: `2px solid ${DEBOUNCE_COLORS.red}`,
            boxShadow: `0 0 60px ${DEBOUNCE_COLORS.redGlow}`,
            borderRadius: 24,
            padding: "36px 32px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `scale(${0.85 + overloadSpring * 0.15})`,
            opacity: overloadSpring,
            zIndex: 30,
          }}
        >
          <div
            style={{
              color: DEBOUNCE_COLORS.amber,
              fontSize: 32,
              fontWeight: 900,
              letterSpacing: 3,
            }}
          >
            6 KEYSTROKES
          </div>
          <div
            style={{
              color: DEBOUNCE_COLORS.red,
              fontSize: 46,
              fontWeight: 900,
              margin: "8px 0",
            }}
          >
            ↓
          </div>
          <div
            style={{
              color: DEBOUNCE_COLORS.red,
              fontSize: 56,
              fontWeight: 900,
              letterSpacing: -1,
            }}
          >
            6 API REQUESTS
          </div>

          {/* Grid of 6 queued unnecessary requests */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              width: "100%",
              marginTop: 24,
              marginBottom: 20,
            }}
          >
            {NAIVE_KEYSTROKES.map((k, i) => (
              <div
                key={k.char}
                style={{
                  background: "#0a0e18",
                  border: `1px solid ${DEBOUNCE_COLORS.red}88`,
                  borderRadius: 12,
                  padding: "10px 14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: 16,
                  fontFamily: "monospace",
                }}
              >
                <span style={{ color: DEBOUNCE_COLORS.text, fontWeight: 700 }}>
                  ?q={k.text}
                </span>
                <span
                  style={{
                    color: DEBOUNCE_COLORS.red,
                    fontWeight: 900,
                    fontSize: 13,
                  }}
                >
                  REQ #{i + 1}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              background: `${DEBOUNCE_COLORS.red}22`,
              border: `1px solid ${DEBOUNCE_COLORS.red}88`,
              borderRadius: 14,
              padding: "12px 28px",
              color: "#FFF",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            ⚠️ UNNECESSARY SERVER LOAD
          </div>
        </div>
      )}

      {/* 6. Destination Server / API Node */}
      <div
        style={{
          position: "absolute",
          top: 1240,
          width: 820,
          background: DEBOUNCE_COLORS.serverNodeBg,
          border: `2px solid ${
            isOverload ? DEBOUNCE_COLORS.red : DEBOUNCE_COLORS.cardBorder
          }`,
          boxShadow: isOverload
            ? `0 0 50px ${DEBOUNCE_COLORS.redGlow}`
            : "0 20px 40px rgba(0,0,0,0.5)",
          borderRadius: 24,
          padding: "28px 36px",
          boxSizing: "border-box",
          transform: `scale(${0.92 + serverEnter * 0.08})`,
          opacity: serverEnter,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
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
                background: isOverload ? DEBOUNCE_COLORS.red : DEBOUNCE_COLORS.green,
                boxShadow: `0 0 12px ${
                  isOverload ? DEBOUNCE_COLORS.red : DEBOUNCE_COLORS.green
                }`,
              }}
            />
            <span
              style={{
                color: DEBOUNCE_COLORS.text,
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: -0.5,
              }}
            >
              API BACKEND SERVER
            </span>
          </div>

          <div
            style={{
              background: isOverload
                ? `${DEBOUNCE_COLORS.red}33`
                : `${DEBOUNCE_COLORS.cardBorder}`,
              border: `1px solid ${
                isOverload ? DEBOUNCE_COLORS.red : DEBOUNCE_COLORS.border
              }`,
              color: isOverload ? DEBOUNCE_COLORS.red : DEBOUNCE_COLORS.muted,
              fontSize: 16,
              fontWeight: 800,
              padding: "6px 14px",
              borderRadius: 10,
              letterSpacing: 1,
            }}
          >
            {isOverload ? "OVERLOADED: 6 REQUESTS" : `INCOMING: ${typedCount}/6`}
          </div>
        </div>

        <div
          style={{
            height: 12,
            background: "#080c14",
            borderRadius: 6,
            overflow: "hidden",
            border: `1px solid ${DEBOUNCE_COLORS.border}`,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(typedCount / 6) * 100}%`,
              background: isOverload
                ? DEBOUNCE_COLORS.red
                : `linear-gradient(90deg, ${DEBOUNCE_COLORS.amber}, ${DEBOUNCE_COLORS.red})`,
              transition: "width 0.1s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
};
