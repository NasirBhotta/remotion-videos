import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RC_COLORS } from "../../data/searchRequestControlData";

export const RC_Screen5_WhyItHappens: React.FC = () => {
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
          color: RC_COLORS.amber,
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 4,
          marginBottom: 12,
        }}
      >
        💡 THE ROOT CAUSE
      </div>

      {/* Main Title */}
      <div
        style={{
          color: RC_COLORS.text,
          fontSize: 54,
          fontWeight: 900,
          letterSpacing: -1.5,
          marginBottom: 35,
          textAlign: "center",
        }}
      >
        Why Did JavaScript Overwrite It?
      </div>

      {/* Code Snippet Card */}
      <div
        style={{
          width: 820,
          background: RC_COLORS.codeBg,
          border: `2px solid ${RC_COLORS.cardBorder}`,
          borderRadius: 22,
          padding: "24px 30px",
          fontFamily: "monospace",
          fontSize: 18,
          lineHeight: 1.6,
          boxSizing: "border-box",
          marginBottom: 24,
        }}
      >
        <div style={{ color: RC_COLORS.muted }}>// Naive search handler</div>
        <div>
          <span style={{ color: RC_COLORS.cyan }}>fetch</span>(&quot;/search?q=&quot; + query)
        </div>
        <div style={{ paddingLeft: 24 }}>
          .<span style={{ color: RC_COLORS.cyan }}>then</span>(res =&gt; <span style={{ color: RC_COLORS.red }}>setResults(res.data)</span>);
        </div>
      </div>

      {/* The Core Principle Box */}
      <div
        style={{
          width: 820,
          background: "linear-gradient(135deg, rgba(32, 24, 12, 0.95) 0%, rgba(18, 14, 8, 0.98) 100%)",
          border: `2px solid ${RC_COLORS.amber}`,
          boxShadow: `0 10px 40px ${RC_COLORS.amberGlow}`,
          borderRadius: 22,
          padding: "22px 28px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ color: RC_COLORS.amber, fontSize: 16, fontWeight: 900, letterSpacing: 1.5, marginBottom: 8 }}>
          KEY INSIGHT:
        </div>
        <div style={{ color: RC_COLORS.text, fontSize: 21, fontWeight: 600, lineHeight: 1.45 }}>
          <strong style={{ color: RC_COLORS.cyan }}>setResults()</strong> executes in <strong>Promise Resolution Order</strong>, NOT user typing order!
          Whichever network request finishes <strong style={{ color: RC_COLORS.red }}>last in time</strong> becomes the final screen state.
        </div>
      </div>
    </div>
  );
};
