import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../config/brand";

interface KineticHeadingProps {
  tag?: string;
  tagIcon?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
  delay?: number;
  highlightColor?: "gold" | "emerald";
  positionTop?: number;
}

export const KineticHeading: React.FC<KineticHeadingProps> = ({
  tag,
  tagIcon,
  title,
  highlight,
  subtitle,
  align = "center",
  delay = 0,
  highlightColor = "gold",
  positionTop = 130,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  // Tag animation
  const tagSpring = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Title animation
  const titleSpring = spring({
    frame: Math.max(0, adjustedFrame - 4),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Subtitle animation
  const subSpring = spring({
    frame: Math.max(0, adjustedFrame - 10),
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const tagTranslateY = interpolate(tagSpring, [0, 1], [-20, 0]);
  const tagOpacity = interpolate(tagSpring, [0, 1], [0, 1]);

  const titleTranslateY = interpolate(titleSpring, [0, 1], [30, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  const subTranslateY = interpolate(subSpring, [0, 1], [20, 0]);
  const subOpacity = interpolate(subSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: positionTop,
        left: align === "center" ? 0 : 70,
        right: align === "center" ? 0 : 70,
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align === "center" ? "center" : "left",
        zIndex: 20,
        padding: "0 40px",
        pointerEvents: "none",
      }}
    >
      {/* Category / Feature Tag */}
      {tag && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 18px",
            borderRadius: 30,
            background: "rgba(14, 111, 78, 0.22)",
            border: "1px solid rgba(79, 174, 135, 0.4)",
            backdropFilter: "blur(12px)",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: BRAND.colors.primaryLight,
            marginBottom: 16,
            transform: `translateY(${tagTranslateY}px)`,
            opacity: tagOpacity,
            boxShadow: "0 8px 20px -4px rgba(0, 0, 0, 0.4)",
          }}
        >
          {tagIcon && <span>{tagIcon}</span>}
          <span>{tag}</span>
        </div>
      )}

      {/* Main Title */}
      <h1
        className="font-heading"
        style={{
          fontSize: 56,
          fontWeight: 800,
          lineHeight: 1.15,
          color: BRAND.colors.textLight,
          margin: 0,
          transform: `translateY(${titleTranslateY}px)`,
          opacity: titleOpacity,
          textShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
          letterSpacing: "-0.5px",
        }}
      >
        {title}{" "}
        {highlight && (
          <span
            style={{
              background:
                highlightColor === "gold"
                  ? BRAND.gradients.goldText
                  : BRAND.gradients.emeraldText,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            {highlight}
          </span>
        )}
      </h1>

      {/* Subtitle / Benefit */}
      {subtitle && (
        <p
          style={{
            fontSize: 24,
            fontWeight: 500,
            lineHeight: 1.4,
            color: BRAND.colors.textMuted,
            marginTop: 12,
            marginBottom: 0,
            maxWidth: 820,
            transform: `translateY(${subTranslateY}px)`,
            opacity: subOpacity,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
