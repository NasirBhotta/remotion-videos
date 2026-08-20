import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  DEBOUNCE_COLORS,
  DEBOUNCE_SCENES,
  MERGE_COLLAPSE_FRAME,
} from "../data/searchDebounceData";

export const DebounceComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < DEBOUNCE_SCENES.comparison - 4 || frame >= DEBOUNCE_SCENES.outro + 4) {
    return null;
  }

  const enter = spring({
    frame: frame - DEBOUNCE_SCENES.comparison,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const fadeOut = interpolate(
    frame,
    [DEBOUNCE_SCENES.outro - 6, DEBOUNCE_SCENES.outro + 2],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Merge animation progress
  const mergeProgress = interpolate(
    frame,
    [MERGE_COLLAPSE_FRAME, MERGE_COLLAPSE_FRAME + 14],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const mergeSpring = spring({
    frame: frame - MERGE_COLLAPSE_FRAME,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const isMerged = frame >= MERGE_COLLAPSE_FRAME + 10;

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
            color: DEBOUNCE_COLORS.cyan,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 5,
            marginBottom: 10,
          }}
        >
          THE PAYOFF
        </div>
        <div
          style={{
            color: DEBOUNCE_COLORS.text,
            fontSize: 56,
            fontWeight: 900,
            letterSpacing: -1.5,
          }}
        >
          BEFORE vs AFTER
        </div>
      </div>

      {/* 2. Before Card (Without Debounce) */}
      <div
        style={{
          position: "absolute",
          top: 340,
          width: 820,
          background: DEBOUNCE_COLORS.cardBg,
          border: `2px solid ${DEBOUNCE_COLORS.red}88`,
          boxShadow: `0 0 35px ${DEBOUNCE_COLORS.redGlow}`,
          borderRadius: 24,
          padding: "28px 32px",
          boxSizing: "border-box",
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
          <div
            style={{
              color: DEBOUNCE_COLORS.red,
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            WITHOUT DEBOUNCE
          </div>
          <div
            style={{
              background: `${DEBOUNCE_COLORS.red}22`,
              color: DEBOUNCE_COLORS.red,
              fontSize: 16,
              fontWeight: 900,
              padding: "4px 14px",
              borderRadius: 10,
            }}
          >
            6 REQUESTS
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ color: DEBOUNCE_COLORS.muted, fontSize: 24, fontWeight: 700 }}>
            6 Keystrokes
          </div>
          <div style={{ color: DEBOUNCE_COLORS.red, fontSize: 28, fontWeight: 900 }}>
            →
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end", maxWidth: 450 }}>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                style={{
                  background: `${DEBOUNCE_COLORS.red}33`,
                  border: `1.5px solid ${DEBOUNCE_COLORS.red}`,
                  borderRadius: 10,
                  padding: "6px 10px",
                  color: DEBOUNCE_COLORS.text,
                  fontSize: 15,
                  fontWeight: 800,
                  fontFamily: "monospace",
                }}
              >
                🔴 #{num}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. After Card (With Debounce & Collapsing Animation) */}
      <div
        style={{
          position: "absolute",
          top: 590,
          width: 820,
          background: DEBOUNCE_COLORS.cardBg,
          border: `2px solid ${DEBOUNCE_COLORS.green}`,
          boxShadow: `0 0 50px ${DEBOUNCE_COLORS.greenGlow}`,
          borderRadius: 24,
          padding: "32px 32px",
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
          <div
            style={{
              color: DEBOUNCE_COLORS.green,
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            WITH DEBOUNCE (300ms)
          </div>
          <div
            style={{
              background: `${DEBOUNCE_COLORS.green}33`,
              color: DEBOUNCE_COLORS.green,
              fontSize: 18,
              fontWeight: 900,
              padding: "6px 16px",
              borderRadius: 10,
            }}
          >
            1 REQUEST ONLY
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ color: DEBOUNCE_COLORS.text, fontSize: 26, fontWeight: 800 }}>
            6 Keystrokes
          </div>
          <div style={{ color: DEBOUNCE_COLORS.green, fontSize: 32, fontWeight: 900 }}>
            →
          </div>

          {/* Animated collapsing request pills */}
          <div
            style={{
              position: "relative",
              width: 440,
              height: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!isMerged ? (
              [0, 1, 2, 3, 4, 5].map((idx) => {
                const initialOffset = (idx - 2.5) * 70;
                const currentOffset = interpolate(
                  mergeProgress,
                  [0, 1],
                  [initialOffset, 0]
                );
                const scale = interpolate(mergeProgress, [0, 1], [1, 0.5]);
                const op = interpolate(mergeProgress, [0.7, 1], [1, 0]);

                return (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      transform: `translateX(${currentOffset}px) scale(${scale})`,
                      opacity: op,
                      background: `${DEBOUNCE_COLORS.green}33`,
                      border: `1.5px solid ${DEBOUNCE_COLORS.green}`,
                      borderRadius: 10,
                      padding: "6px 12px",
                      color: DEBOUNCE_COLORS.text,
                      fontSize: 15,
                      fontWeight: 800,
                      fontFamily: "monospace",
                    }}
                  >
                    🟢 #{idx + 1}
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  background: `${DEBOUNCE_COLORS.green}33`,
                  border: `2.5px solid ${DEBOUNCE_COLORS.green}`,
                  boxShadow: `0 0 35px ${DEBOUNCE_COLORS.greenGlow}`,
                  borderRadius: 16,
                  padding: "10px 28px",
                  color: DEBOUNCE_COLORS.text,
                  fontSize: 22,
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  transform: `scale(${0.85 + mergeSpring * 0.15})`,
                }}
              >
                <span>🚀</span>
                <span>1 OPTIMIZED REQUEST</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Payoff Metric Badge */}
      <div
        style={{
          position: "absolute",
          top: 920,
          width: 820,
          background: `${DEBOUNCE_COLORS.panelStrong}ee`,
          border: `2px solid ${DEBOUNCE_COLORS.amber}`,
          boxShadow: `0 0 45px ${DEBOUNCE_COLORS.amberGlow}`,
          borderRadius: 24,
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          boxSizing: "border-box",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ color: DEBOUNCE_COLORS.muted, fontSize: 16, fontWeight: 800, letterSpacing: 2 }}>
            SAVED CALLS
          </div>
          <div style={{ color: DEBOUNCE_COLORS.amber, fontSize: 44, fontWeight: 900 }}>
            -83%
          </div>
        </div>

        <div style={{ width: 2, height: 60, background: DEBOUNCE_COLORS.border }} />

        <div style={{ textAlign: "center" }}>
          <div style={{ color: DEBOUNCE_COLORS.muted, fontSize: 16, fontWeight: 800, letterSpacing: 2 }}>
            SERVER LOAD
          </div>
          <div style={{ color: DEBOUNCE_COLORS.green, fontSize: 44, fontWeight: 900 }}>
            MINIMAL
          </div>
        </div>
      </div>

      {/* 5. Key Concept Highlight Card */}
      <div
        style={{
          position: "absolute",
          top: 1140,
          width: 820,
          background: "#0d1322dd",
          border: `1px solid ${DEBOUNCE_COLORS.cyan}66`,
          boxShadow: `0 0 35px ${DEBOUNCE_COLORS.cyanGlow}`,
          borderRadius: 20,
          padding: "20px 32px",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        <div style={{ color: DEBOUNCE_COLORS.cyan, fontSize: 24, fontWeight: 800 }}>
          💡 &quot;Wait until typing stops before sending the query.&quot;
        </div>
      </div>
    </div>
  );
};
