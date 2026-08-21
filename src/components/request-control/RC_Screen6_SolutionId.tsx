import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RC_COLORS } from "../../data/searchRequestControlData";

export const RC_Screen6_SolutionId: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const fadeOut = interpolate(frame, [72, 85], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
        justifyContent: "center",
        padding: "0 40px",
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          color: RC_COLORS.cyan,
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 4,
          marginBottom: 12,
        }}
      >
        🛡️ SOLUTION PART 1 • REQUEST ID TRACKING
      </div>

      {/* Main Title */}
      <div
        style={{
          color: RC_COLORS.text,
          fontSize: 52,
          fontWeight: 900,
          letterSpacing: -1.5,
          marginBottom: 35,
          textAlign: "center",
        }}
      >
        Tag Every Request With An ID
      </div>

      {/* Code Snippet */}
      <div
        style={{
          width: 820,
          background: RC_COLORS.codeBg,
          border: `2px solid ${RC_COLORS.cyan}`,
          boxShadow: `0 0 35px ${RC_COLORS.cyanGlow}`,
          borderRadius: 22,
          padding: "24px 30px",
          fontFamily: "monospace",
          fontSize: 18,
          lineHeight: 1.6,
          boxSizing: "border-box",
          marginBottom: 24,
        }}
      >
        <div style={{ color: RC_COLORS.muted }}>// Track highest request ID in ref</div>
        <div>
          <span style={{ color: RC_COLORS.violet }}>const</span> latestId ={" "}
          <span style={{ color: RC_COLORS.cyan }}>useRef</span>(0);
        </div>
        <div style={{ marginTop: 10 }}>
          <span style={{ color: RC_COLORS.violet }}>const</span> handleSearch = (query) =&gt; &#123;
        </div>
        <div style={{ paddingLeft: 24 }}>
          <span style={{ color: RC_COLORS.violet }}>const</span> currentId = ++latestId.current;
        </div>
        <div>&#125;</div>
      </div>

      {/* Request ID Tag Badges */}
      <div
        style={{
          width: 820,
          display: "flex",
          gap: 20,
        }}
      >
        <div
          style={{
            flex: 1,
            background: RC_COLORS.cardBg,
            border: `1.5px solid ${RC_COLORS.cardBorder}`,
            borderRadius: 18,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `${RC_COLORS.cyan}22`,
              color: RC_COLORS.cyan,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
            }}
          >
            #1
          </div>
          <div>
            <div style={{ color: RC_COLORS.text, fontSize: 16, fontWeight: 700 }}>&quot;iphone&quot;</div>
            <div style={{ color: RC_COLORS.muted, fontSize: 13 }}>ID = 1 (Old)</div>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            background: RC_COLORS.cardBg,
            border: `2px solid ${RC_COLORS.green}`,
            boxShadow: `0 0 25px ${RC_COLORS.greenGlow}`,
            borderRadius: 18,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `${RC_COLORS.green}33`,
              color: RC_COLORS.green,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
            }}
          >
            #2
          </div>
          <div>
            <div style={{ color: RC_COLORS.text, fontSize: 16, fontWeight: 700 }}>&quot;iphone 15&quot;</div>
            <div style={{ color: RC_COLORS.green, fontSize: 13, fontWeight: 800 }}>ID = 2 (Active Target)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
