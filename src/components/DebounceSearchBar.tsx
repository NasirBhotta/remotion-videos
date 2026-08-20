import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DEBOUNCE_COLORS } from "../data/searchDebounceData";

interface DebounceSearchBarProps {
  startFrame: number;
  text: string;
  badgeText?: string;
  badgeColor?: string;
  borderColor?: string;
  glowColor?: string;
  isTyping?: boolean;
}

export const DebounceSearchBar: React.FC<DebounceSearchBarProps> = ({
  startFrame,
  text,
  badgeText,
  badgeColor = DEBOUNCE_COLORS.cyan,
  borderColor = `${DEBOUNCE_COLORS.cyan}88`,
  glowColor = `${DEBOUNCE_COLORS.cyan}22`,
  isTyping = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const cursorBlink = Math.floor(frame / 8) % 2 === 0;

  return (
    <div
      style={{
        width: 820,
        height: 110,
        boxSizing: "border-box",
        borderRadius: 24,
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: DEBOUNCE_COLORS.cardBg,
        border: `2px solid ${borderColor}`,
        boxShadow: `0 0 45px ${glowColor}`,
        transform: `scale(${0.9 + enter * 0.1})`,
        opacity: enter,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20, flex: 1 }}>
        <span
          style={{
            color: borderColor.replace(/[0-9a-fA-F]{2}$/, ""),
            fontSize: 42,
            lineHeight: 1,
          }}
        >
          ⌕
        </span>
        <span
          style={{
            color: DEBOUNCE_COLORS.text,
            fontSize: 38,
            fontWeight: 600,
            letterSpacing: -0.5,
            display: "flex",
            alignItems: "center",
          }}
        >
          {text}
          {isTyping && (
            <span
              style={{
                color: DEBOUNCE_COLORS.cyan,
                opacity: cursorBlink ? 1 : 0.2,
                marginLeft: 2,
                fontWeight: 300,
              }}
            >
              │
            </span>
          )}
        </span>
      </div>

      {badgeText && (
        <div
          style={{
            background: `${badgeColor}22`,
            border: `1px solid ${badgeColor}88`,
            borderRadius: 12,
            padding: "6px 14px",
            color: badgeColor,
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: 1.5,
          }}
        >
          {badgeText}
        </div>
      )}
    </div>
  );
};
