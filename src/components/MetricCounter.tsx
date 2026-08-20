import React from "react";
import { useCurrentFrame } from "remotion";
import { BRAND } from "../config/brand";

interface MetricCounterProps {
  targetValue: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  label?: string;
  icon?: string;
  highlightColor?: string;
  style?: React.CSSProperties;
}

export const MetricCounter: React.FC<MetricCounterProps> = ({
  targetValue,
  prefix = "Rs ",
  suffix = "",
  duration = 45,
  delay = 0,
  label,
  icon,
  highlightColor = BRAND.colors.primaryLight,
  style,
}) => {
  const frame = useCurrentFrame();

  const adjustedFrame = Math.max(0, frame - delay);
  const progress = Math.min(1, adjustedFrame / duration);

  // Smooth easeOutQuad curve
  const easeProgress = 1 - Math.pow(1 - progress, 3);
  const currentValue = Math.floor(easeProgress * targetValue);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: "16px 22px",
        borderRadius: 18,
        background: "rgba(14, 28, 22, 0.8)",
        border: "1px solid rgba(79, 174, 135, 0.25)",
        backdropFilter: "blur(14px)",
        boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
        ...style,
      }}
    >
      {label && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            fontWeight: 600,
            color: BRAND.colors.textMuted,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          {icon && <span>{icon}</span>}
          <span>{label}</span>
        </div>
      )}
      <div
        className="font-heading font-mono"
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: highlightColor,
          letterSpacing: "-0.5px",
        }}
      >
        {prefix}
        {currentValue.toLocaleString()}
        {suffix}
      </div>
    </div>
  );
};
