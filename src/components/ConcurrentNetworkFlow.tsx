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

  if (frame >= RC_SCENES.race) {
    return null;
  }

  const isTravelScene = frame >= RC_SCENES.travel;

  const sceneFade = interpolate(
    frame,
    [RC_SCENES.race - 8, RC_SCENES.race],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const serverEnter = spring({
    frame: frame - 12,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

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
            color: isTravelScene ? RC_COLORS.amber : RC_COLORS.cyan,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 5,
            marginBottom: 10,
          }}
        >
          {isTravelScene ? "NETWORK LATENCY VARIES" : "RAPID QUERY CHANGES"}
        </div>
        <div
          style={{
            color: RC_COLORS.text,
            fontSize: 54,
            fontWeight: 900,
            letterSpacing: -1.5,
          }}
        >
          {isTravelScene
            ? "3 ASYNC REQUESTS IN-FLIGHT"
            : "MULTIPLE ACTIVE REQUESTS"}
        </div>
      </div>

      {/* 2. Search Input */}
      <div style={{ position: "absolute", top: 320 }}>
        <RequestControlSearchBar />
      </div>

      {/* 3. Three Concurrent Request Cards / Lanes */}
      <div
        style={{
          position: "absolute",
          top: 480,
          width: 820,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {SEARCH_REQUESTS.map((req, idx) => {
          const cardEnter = spring({
            frame: frame - req.startFrame,
            fps,
            config: { damping: 14, stiffness: 130 },
          });

          if (frame < req.startFrame) {
            return null;
          }

          // In travel scene (105-195), animate travel progression
          const travelProgress = isTravelScene
            ? interpolate(
                frame,
                [RC_SCENES.travel + idx * 8, RC_SCENES.race - 10],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )
            : 0;

          return (
            <div
              key={req.id}
              style={{
                background: RC_COLORS.cardBg,
                border: `2px solid ${req.color}`,
                boxShadow: `0 0 35px ${req.glowColor}`,
                borderRadius: 20,
                padding: "20px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
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
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
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
                    {req.id}
                  </div>
                  <span
                    style={{
                      color: RC_COLORS.text,
                      fontSize: 24,
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
                      : `${RC_COLORS.panel}`,
                    border: `1px solid ${
                      req.isLatest ? RC_COLORS.green : RC_COLORS.border
                    }`,
                    color: req.isLatest ? RC_COLORS.green : RC_COLORS.muted,
                    fontSize: 15,
                    fontWeight: 900,
                    padding: "4px 12px",
                    borderRadius: 8,
                    letterSpacing: 1,
                  }}
                >
                  {req.isLatest ? "LATEST (TARGET)" : "STALE CANDIDATE"}
                </div>
              </div>

              {/* Latency / In-Flight Status Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#080c14",
                  border: `1px solid ${RC_COLORS.border}`,
                  borderRadius: 10,
                  padding: "8px 16px",
                  fontSize: 15,
                }}
              >
                <span style={{ color: RC_COLORS.muted, fontWeight: 700 }}>
                  Est. Latency:{" "}
                  <strong style={{ color: req.color }}>{req.latencyMs}ms</strong>
                </span>
                <span style={{ color: req.color, fontWeight: 800 }}>
                  {isTravelScene
                    ? `IN FLIGHT (${Math.round(travelProgress * 100)}%)`
                    : "DISPATCHED"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. API Backend Server Node */}
      <div
        style={{
          position: "absolute",
          top: 1240,
          width: 820,
          background: RC_COLORS.serverNodeBg,
          border: `2px solid ${RC_COLORS.cardBorder}`,
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          borderRadius: 24,
          padding: "26px 36px",
          boxSizing: "border-box",
          transform: `scale(${0.92 + serverEnter * 0.08})`,
          opacity: serverEnter,
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
              background: RC_COLORS.cyan,
              boxShadow: `0 0 12px ${RC_COLORS.cyan}`,
            }}
          />
          <div>
            <div
              style={{
                color: RC_COLORS.text,
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: -0.5,
              }}
            >
              API BACKEND SERVER
            </div>
            <div
              style={{
                color: RC_COLORS.muted,
                fontSize: 16,
                fontWeight: 700,
                marginTop: 2,
              }}
            >
              {isTravelScene
                ? "Processing 3 parallel concurrent requests..."
                : "Receiving async query stream..."}
            </div>
          </div>
        </div>

        <div
          style={{
            background: `${RC_COLORS.cardBorder}`,
            border: `1px solid ${RC_COLORS.border}`,
            color: RC_COLORS.muted,
            fontSize: 16,
            fontWeight: 800,
            padding: "8px 16px",
            borderRadius: 10,
            letterSpacing: 1,
          }}
        >
          {isTravelScene ? "3 IN-FLIGHT" : "READY"}
        </div>
      </div>
    </div>
  );
};
