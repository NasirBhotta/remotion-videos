import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../config/brand";

interface FeatureBadgeProps {
  icon: string;
  label: string;
  delay?: number;
  variant?: "emerald" | "gold" | "glass";
  bottom?: number;
}

export const FeatureBadge: React.FC<FeatureBadgeProps> = ({
  icon,
  label,
  delay = 0,
  variant = "glass",
  bottom = 120,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  const entrance = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const translateY = interpolate(entrance, [0, 1], [30, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.92, 1]);

  const getBackground = () => {
    switch (variant) {
      case "emerald":
        return "linear-gradient(135deg, rgba(14, 111, 78, 0.35) 0%, rgba(6, 61, 43, 0.45) 100%)";
      case "gold":
        return "linear-gradient(135deg, rgba(227, 163, 53, 0.35) 0%, rgba(185, 121, 26, 0.45) 100%)";
      case "glass":
      default:
        return "linear-gradient(135deg, rgba(22, 38, 30, 0.8) 0%, rgba(10, 20, 15, 0.85) 100%)";
    }
  };

  const getBorder = () => {
    switch (variant) {
      case "emerald":
        return "1px solid rgba(79, 174, 135, 0.45)";
      case "gold":
        return "1px solid rgba(245, 200, 116, 0.45)";
      case "glass":
      default:
        return "1px solid rgba(79, 174, 135, 0.25)";
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        left: "50%",
        transform: `translateX(-50%) translateY(${translateY}px) scale(${scale})`,
        opacity,
        background: getBackground(),
        border: getBorder(),
        backdropFilter: "blur(16px)",
        borderRadius: 40,
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(14, 111, 78, 0.2)",
        zIndex: 25,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: 24 }}>{icon}</span>
      <span
        className="font-heading"
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: BRAND.colors.textLight,
          letterSpacing: "0.2px",
        }}
      >
        {label}
      </span>
    </div>
  );
};
