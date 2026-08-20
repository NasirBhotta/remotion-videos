import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../data/searchData";
import { NORMALIZATION_SCENES } from "../data/searchNormalizationData";

export const SearchPipelineFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring at frame 180
  const enter = spring({
    frame: frame - NORMALIZATION_SCENES.search,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Exit fade at CTA (frame 238)
  const exit = interpolate(
    frame,
    [NORMALIZATION_SCENES.cta - 5, NORMALIZATION_SCENES.cta + 6],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Data packet beam animation
  const packetCycle = ((frame - NORMALIZATION_SCENES.search) % 18) / 18;
  const packetY1 = 660 + packetCycle * 280;
  const packetY2 = 660 + ((packetCycle + 0.5) % 1) * 280;

  if (frame < NORMALIZATION_SCENES.search - 5 || frame > NORMALIZATION_SCENES.cta + 8) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        opacity: enter * exit,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Connecting Data Bus Line */}
      <div
        style={{
          position: "absolute",
          top: 650,
          width: 4,
          height: 300,
          background: `linear-gradient(to bottom, ${COLORS.cyan}, ${COLORS.violet})`,
          boxShadow: `0 0 16px ${COLORS.cyan}`,
        }}
      />

      {/* Downward Data Flow Packets */}
      <div
        style={{
          position: "absolute",
          top: packetY1,
          left: "50%",
          transform: "translateX(-50%)",
          width: 16,
          height: 32,
          borderRadius: 8,
          background: COLORS.cyan,
          boxShadow: `0 0 20px ${COLORS.cyan}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: packetY2,
          left: "50%",
          transform: "translateX(-50%)",
          width: 14,
          height: 24,
          borderRadius: 6,
          background: COLORS.violet,
          boxShadow: `0 0 16px ${COLORS.violet}`,
        }}
      />

      {/* Downward Direction Arrow */}
      <div
        style={{
          position: "absolute",
          top: 920,
          fontSize: 32,
          color: COLORS.cyan,
        }}
      >
        ↓
      </div>

      {/* Search Engine Node */}
      <div
        style={{
          position: "absolute",
          top: 980,
          width: 820,
          height: 230,
          boxSizing: "border-box",
          borderRadius: 24,
          padding: "24px 32px",
          background: COLORS.panelStrong,
          border: `2px solid ${COLORS.violet}`,
          boxShadow: `0 0 45px ${COLORS.violet}33, 0 20px 50px rgba(0,0,0,0.5)`,
          transform: `scale(${enter})`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 36 }}>🔎</span>
            <div>
              <div style={{ color: COLORS.text, fontSize: 26, fontWeight: 900, letterSpacing: 2 }}>
                PRODUCTION SEARCH
              </div>
              <div style={{ color: COLORS.muted, fontSize: 16, marginTop: 4, letterSpacing: 1 }}>
                DATABASE & INDEXING ENGINE
              </div>
            </div>
          </div>
          <div
            style={{
              background: `${COLORS.violet}22`,
              border: `1px solid ${COLORS.violet}77`,
              color: COLORS.violet,
              padding: "6px 14px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            INDEX READY
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: `${COLORS.background}99`,
            borderRadius: 14,
            padding: "12px 20px",
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <div>
            <div style={{ color: COLORS.muted, fontSize: 13, letterSpacing: 1 }}>QUERY MATCH</div>
            <div style={{ color: COLORS.cyan, fontSize: 18, fontWeight: 700, fontFamily: "monospace" }}>
              canonical: &quot;iphone 15&quot;
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: COLORS.muted, fontSize: 13, letterSpacing: 1 }}>INDEX EFFICIENCY</div>
            <div style={{ color: COLORS.green, fontSize: 18, fontWeight: 800 }}>
              100% CACHEABLE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
