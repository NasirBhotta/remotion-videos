import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RC_COLORS, SEARCH_REQUESTS } from "../data/searchRequestControlData";

interface RequestControlSearchBarProps {
  fixedQuery?: string;
  badge?: string;
  badgeColor?: string;
}

export const RequestControlSearchBar: React.FC<RequestControlSearchBarProps> = ({
  fixedQuery,
  badge,
  badgeColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Calculate active query based on frame if not fixed
  let currentQuery = "";
  let activeReq = SEARCH_REQUESTS[0];

  if (fixedQuery) {
    currentQuery = fixedQuery;
  } else {
    if (frame < 15) {
      currentQuery = "";
    } else if (frame < 55) {
      // Type "iphone"
      const typeProgress = interpolate(frame, [15, 35], [0, 6], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      currentQuery = "iphone".slice(0, Math.floor(typeProgress));
      activeReq = SEARCH_REQUESTS[0];
    } else {
      // Type " 15"
      const typeProgress = interpolate(frame, [55, 75], [6, 9], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      currentQuery = "iphone 15".slice(0, Math.floor(typeProgress));
      activeReq = SEARCH_REQUESTS[1];
    }
  }

  const displayBadge = badge || (currentQuery ? `ACTIVE: ${activeReq.label}` : "SEARCH INPUT");
  const displayColor = badgeColor || (currentQuery ? activeReq.color : RC_COLORS.muted);
  const cursorBlink = Math.floor(frame / 8) % 2 === 0;

  return (
    <div
      style={{
        width: 840,
        height: 100,
        boxSizing: "border-box",
        borderRadius: 22,
        padding: "0 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: RC_COLORS.cardBg,
        border: `2px solid ${displayColor}aa`,
        boxShadow: `0 10px 40px ${displayColor}25`,
        transform: `scale(${0.92 + enter * 0.08})`,
        opacity: enter,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <span
          style={{
            color: displayColor,
            fontSize: 38,
            lineHeight: 1,
          }}
        >
          ⌕
        </span>
        <span
          style={{
            color: RC_COLORS.text,
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: -0.5,
            display: "flex",
            alignItems: "center",
          }}
        >
          {currentQuery || <span style={{ color: RC_COLORS.muted, fontWeight: 500 }}>Search products...</span>}
          {currentQuery && (
            <span
              style={{
                color: displayColor,
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

      <div
        style={{
          background: `${displayColor}22`,
          border: `1.5px solid ${displayColor}88`,
          borderRadius: 12,
          padding: "6px 16px",
          color: displayColor,
          fontSize: 15,
          fontWeight: 900,
          letterSpacing: 1.5,
        }}
      >
        {displayBadge}
      </div>
    </div>
  );
};
