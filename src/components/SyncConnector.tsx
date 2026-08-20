import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface SyncConnectorProps {
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  delay?: number;
}

export const SyncConnector: React.FC<SyncConnectorProps> = ({
  startX = 380,
  startY = 850,
  endX = 700,
  endY = 1150,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);

  const waveOffset = (adjustedFrame * 4) % 100;
  const pulseOpacity = interpolate(
    Math.sin(adjustedFrame / 10),
    [-1, 1],
    [0.4, 0.9]
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 15,
      }}
    >
      <svg
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <defs>
          <linearGradient id="syncBeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4FAE87" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#F5C874" stopOpacity="1" />
            <stop offset="100%" stopColor="#1E9E64" stopOpacity="0.8" />
          </linearGradient>
          <filter id="syncGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer ambient glow line */}
        <path
          d={`M ${startX} ${startY} C ${startX + 100} ${startY + 150}, ${endX - 100} ${endY - 150}, ${endX} ${endY}`}
          fill="none"
          stroke="rgba(79, 174, 135, 0.3)"
          strokeWidth="10"
          filter="url(#syncGlow)"
        />

        {/* Animated dashed sync line */}
        <path
          d={`M ${startX} ${startY} C ${startX + 100} ${startY + 150}, ${endX - 100} ${endY - 150}, ${endX} ${endY}`}
          fill="none"
          stroke="url(#syncBeam)"
          strokeWidth="4"
          strokeDasharray="16 12"
          strokeDashoffset={-waveOffset}
          opacity={pulseOpacity}
        />
      </svg>
    </div>
  );
};
