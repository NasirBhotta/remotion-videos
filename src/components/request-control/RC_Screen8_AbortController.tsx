import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RC_COLORS } from "../../data/searchRequestControlData";

export const RC_Screen8_AbortController: React.FC = () => {
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
          color: RC_COLORS.green,
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 4,
          marginBottom: 12,
        }}
      >
        ⚡ SOLUTION PART 3 • NETWORK CANCELLATION
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
        Or Use AbortController
      </div>

      {/* Code Snippet Card */}
      <div
        style={{
          width: 820,
          background: RC_COLORS.codeBg,
          border: `2px solid ${RC_COLORS.green}`,
          boxShadow: `0 0 35px ${RC_COLORS.greenGlow}`,
          borderRadius: 22,
          padding: "24px 30px",
          fontFamily: "monospace",
          fontSize: 17,
          lineHeight: 1.6,
          boxSizing: "border-box",
          marginBottom: 24,
        }}
      >
        <div style={{ color: RC_COLORS.muted }}>// Cancel previous in-flight HTTP request</div>
        <div>
          <span style={{ color: RC_COLORS.violet }}>const</span> controller ={" "}
          <span style={{ color: RC_COLORS.cyan }}>useRef</span>(new AbortController());
        </div>
        <div style={{ marginTop: 8 }}>
          controller.current.<span style={{ color: RC_COLORS.red }}>abort()</span>; <span style={{ color: RC_COLORS.muted }}>// 🛑 Cancel old!</span>
        </div>
        <div>
          fetch(url, &#123; <span style={{ color: RC_COLORS.green }}>signal</span>: controller.current.signal &#125;);
        </div>
      </div>

      {/* Benefit Box */}
      <div
        style={{
          width: 820,
          background: "linear-gradient(135deg, rgba(14, 28, 22, 0.95) 0%, rgba(8, 18, 14, 0.98) 100%)",
          border: `1.5px solid ${RC_COLORS.green}`,
          borderRadius: 20,
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxSizing: "border-box",
        }}
      >
        <span style={{ fontSize: 32 }}>🌐</span>
        <div style={{ color: RC_COLORS.text, fontSize: 18, fontWeight: 600, lineHeight: 1.4 }}>
          <strong>Network-Level Cleanup: </strong>
          The browser cancels the pending HTTP request immediately, saving client and server bandwidth!
        </div>
      </div>
    </div>
  );
};
