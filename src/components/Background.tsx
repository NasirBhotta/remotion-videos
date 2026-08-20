import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BRAND } from "../config/brand";

interface BackgroundProps {
  accentColor?: string;
  glowIntensity?: number;
  showGrid?: boolean;
}

export const Background: React.FC<BackgroundProps> = ({
  accentColor = BRAND.colors.primary,
  glowIntensity = 1,
  showGrid = true,
}) => {
  const frame = useCurrentFrame();

  // Subtle breathing pulse
  const pulse = Math.sin(frame / 20) * 0.08 + 1;
  const secondaryPulse = Math.cos(frame / 25) * 0.1 + 1;

  const orb1Y = interpolate(frame, [0, 300], [15, 35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const orb2Y = interpolate(frame, [0, 300], [75, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.colors.canvasDark,
        overflow: "hidden",
      }}
    >
      {/* Deep gradient base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 30%, #0D2B1F 0%, #081711 50%, #040A07 100%)",
        }}
      />

      {/* Primary animated emerald radial glow */}
      <div
        style={{
          position: "absolute",
          top: `${orb1Y}%`,
          left: "50%",
          width: 900,
          height: 900,
          transform: `translate(-50%, -50%) scale(${pulse * glowIntensity})`,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor} 0%, rgba(14, 111, 78, 0.25) 45%, transparent 70%)`,
          filter: "blur(60px)",
          opacity: 0.75 * glowIntensity,
          pointerEvents: "none",
        }}
      />

      {/* Secondary gold warmth glow at bottom right */}
      <div
        style={{
          position: "absolute",
          top: `${orb2Y}%`,
          right: "-10%",
          width: 700,
          height: 700,
          transform: `scale(${secondaryPulse})`,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(227, 163, 53, 0.2) 0%, rgba(185, 121, 26, 0.08) 40%, transparent 70%)",
          filter: "blur(70px)",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />

      {/* High-tech ambient grid lines */}
      {showGrid && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(79, 174, 135, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(79, 174, 135, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.8) 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.8) 20%, transparent 80%)",
          }}
        />
      )}

      {/* Vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(4, 10, 7, 0.85) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
