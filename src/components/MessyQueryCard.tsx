import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../data/searchData";
import { MessyQueryItem, NORMALIZATION_SCENES } from "../data/searchNormalizationData";

interface MessyQueryCardProps {
  item: MessyQueryItem;
  index: number;
}

export const MessyQueryCard: React.FC<MessyQueryCardProps> = ({ item, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enter = spring({
    frame: frame - item.startFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Normalization movement towards center processor (frames 65 to 110)
  const convergeProgress = interpolate(
    frame,
    [NORMALIZATION_SCENES.normalize + 5, NORMALIZATION_SCENES.normalize + 45],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Inward movement: y moves from item.yOffset to 0, x moves toward 0
  const currentY = interpolate(convergeProgress, [0, 1], [item.yOffset, 0]);
  const currentX = interpolate(
    convergeProgress,
    [0, 1],
    [index % 2 === 0 ? -20 : 20, 0]
  );
  const currentScale = interpolate(convergeProgress, [0, 1], [1, 0.7]);
  const currentOpacity = interpolate(
    convergeProgress,
    [0, 0.75, 1],
    [1, 0.9, 0]
  );

  // Text transition inside the card as it approaches normalization
  const isTransforming = frame > NORMALIZATION_SCENES.normalize + 20;
  const displayText = isTransforming ? item.normalized : item.raw;

  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 880 + currentY,
        width: 880,
        height: 120,
        boxSizing: "border-box",
        borderRadius: 20,
        padding: "0 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: isTransforming ? `${COLORS.panelStrong}ee` : COLORS.panel,
        border: `1.5px solid ${isTransforming ? COLORS.cyan : COLORS.border}`,
        boxShadow: isTransforming
          ? `0 0 35px ${COLORS.cyan}33`
          : `0 8px 32px rgba(0,0,0,0.45)`,
        transform: `translate(${currentX}px, 0px) scale(${enter * currentScale})`,
        opacity: enter * currentOpacity,
      }}
    >
      {/* Left side: user badge + query text */}
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: `${COLORS.muted}22`,
            border: `1px solid ${COLORS.muted}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            color: COLORS.muted,
          }}
        >
          {`U${index + 1}`}
        </div>
        <div
          style={{
            fontFamily: "monospace, 'Courier New', monospace",
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 1,
            color: isTransforming ? COLORS.cyan : COLORS.text,
            background: `${COLORS.background}88`,
            padding: "8px 16px",
            borderRadius: 10,
            border: `1px dashed ${isTransforming ? COLORS.cyan + "66" : COLORS.amber + "55"}`,
          }}
        >
          &quot;{displayText}&quot;
        </div>
      </div>

      {/* Right side: Flaw / transformation tag */}
      <div
        style={{
          padding: "6px 14px",
          borderRadius: 8,
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: 1.5,
          color: isTransforming ? COLORS.cyan : COLORS.amber,
          background: isTransforming ? `${COLORS.cyan}18` : `${COLORS.amber}18`,
          border: `1px solid ${isTransforming ? COLORS.cyan + "55" : COLORS.amber + "55"}`,
        }}
      >
        {isTransforming ? "✓ NORMALIZED" : item.tag}
      </div>
    </div>
  );
};
