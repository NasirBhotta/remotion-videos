import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  RC_COLORS,
  RC_SCENES,
  SEARCH_REQUESTS,
} from "../data/searchRequestControlData";
import { RequestControlSearchBar } from "./RequestControlSearchBar";

export const ConcurrentNetworkFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame >= RC_SCENES.raceWhy) {
    return null;
  }

  const fadeOut = interpolate(
    frame,
    [RC_SCENES.raceWhy - 10, RC_SCENES.raceWhy],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: fadeOut,
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
            color: RC_COLORS.cyan,
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 4,
            marginBottom: 10,
          }}
        >
          PART 04 / REQUEST CONTROL
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
          Rapid Typing Dispatches Concurrent Requests
        </div>
      </div>

      {/* 2. Top Search Bar */}
      <div style={{ position: "absolute", top: 340 }}>
        <RequestControlSearchBar />
      </div>

      {/* 3. The 2 Dispatched Requests (Spaced out & High Contrast) */}
      <div
        style={{
          position: "absolute",
          top: 480,
          width: 840,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {SEARCH_REQUESTS.map((req) => {
          const cardEnter = spring({
            frame: frame - req.startFrame,
            fps,
            config: { damping: 14, stiffness: 130 },
          });

          if (frame < req.startFrame) {
            return null;
          }

          // Packet progress from Client to Server
          const packetProgress = interpolate(
            frame,
            [req.startFrame + 5, req.startFrame + 40],
            [0, 100],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={req.id}
              style={{
                background: RC_COLORS.cardBg,
                border: `2px solid ${req.color}`,
                boxShadow: `0 10px 40px ${req.glowColor}`,
                borderRadius: 22,
                padding: "22px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                transform: `scale(${0.92 + cardEnter * 0.08})`,
                opacity: cardEnter,
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
                      width: 38,
                      height: 38,
                      borderRadius: 12,
                      background: `${req.color}33`,
                      border: `2px solid ${req.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: req.color,
                      fontWeight: 900,
                      fontSize: 18,
                    }}
                  >
                    #{req.id}
                  </div>
                  <span
                    style={{
                      color: RC_COLORS.text,
                      fontSize: 26,
                      fontFamily: "monospace",
                      fontWeight: 800,
                    }}
                  >
                    GET /search?q={req.query}
                  </span>
                </div>

                <div
                  style={{
                    background: req.isLatest
                      ? `${RC_COLORS.green}33`
                      : `${RC_COLORS.cyan}22`,
                    border: `1px solid ${
                      req.isLatest ? RC_COLORS.green : RC_COLORS.cyan
                    }`,
                    color: req.isLatest ? RC_COLORS.green : RC_COLORS.cyan,
                    fontSize: 15,
                    fontWeight: 900,
                    padding: "6px 14px",
                    borderRadius: 10,
                    letterSpacing: 1,
                  }}
                >
                  {req.isLatest ? "LATEST (USER TARGET)" : "EARLIER KEYSTROKE"}
                </div>
              </div>

              {/* Progress Bar with Latency Annotation */}
              <div
                style={{
                  background: "#080c14",
                  border: `1px solid ${RC_COLORS.border}`,
                  borderRadius: 14,
                  padding: "12px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  <span style={{ color: RC_COLORS.muted }}>
                    Network Latency:{" "}
                    <strong style={{ color: req.color }}>
                      {req.latencyMs}ms {req.latencyMs > 200 ? "(High Jitter 🐌)" : "(Fast Response ⚡)"}
                    </strong>
                  </span>
                  <span style={{ color: req.color, fontWeight: 800 }}>
                    DISPATCHED
                  </span>
                </div>

                {/* Visual Flight Bar */}
                <div
                  style={{
                    width: "100%",
                    height: 8,
                    background: "rgba(255, 255, 255, 0.08)",
                    borderRadius: 6,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${packetProgress}%`,
                      height: "100%",
                      background: req.color,
                      boxShadow: `0 0 12px ${req.color}`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Bottom Insight Callout */}
      <div
        style={{
          position: "absolute",
          top: 960,
          width: 840,
          background: `${RC_COLORS.panelStrong}f0`,
          border: `1.5px solid ${RC_COLORS.cardBorder}`,
          borderRadius: 20,
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxSizing: "border-box",
        }}
      >
        <span style={{ fontSize: 32 }}>⏱️</span>
        <div style={{ color: RC_COLORS.muted, fontSize: 19, lineHeight: 1.4, fontWeight: 600 }}>
          <strong style={{ color: RC_COLORS.text }}>Network Jitter: </strong>
          Request #1 is delayed on the network (350ms), while Request #2 will finish in only 100ms!
        </div>
      </div>
    </div>
  );
};
