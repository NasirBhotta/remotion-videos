import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RC_COLORS, SEARCH_REQUESTS } from "../data/searchRequestControlData";

interface RequestControlSearchBarProps {
  startFrame?: number;
  fixedQuery?: string;
  badge?: string;
  badgeColor?: string;
}

export const RequestControlSearchBar: React.FC<RequestControlSearchBarProps> = ({
  startFrame = 0,
  fixedQuery,
  badge,
  badgeColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  // Calculate active query based on frame if not fixed
  let currentQuery = SEARCH_REQUESTS[0].query;
  let activeReq = SEARCH_REQUESTS[0];

  if (fixedQuery) {
    currentQuery = fixedQuery;
  } else {
    for (let i = 0; i < SEARCH_REQUESTS.length; i++) {
      if (frame >= SEARCH_REQUESTS[i].startFrame) {
        currentQuery = SEARCH_REQUESTS[i].query;
        activeReq = SEARCH_REQUESTS[i];
      }
    }
  }

  const displayBadge = badge || `REQ ${activeReq.id}${activeReq.isLatest ? " (LATEST)" : ""}`;
  const displayColor = badgeColor || activeReq.color;
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
        background: RC_COLORS.cardBg,
        border: `2px solid ${displayColor}aa`,
        boxShadow: `0 0 45px ${displayColor}22`,
        transform: `scale(${0.92 + enter * 0.08})`,
        opacity: enter,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <span
          style={{
            color: displayColor,
            fontSize: 42,
            lineHeight: 1,
          }}
        >
          ⌕
        </span>
        <span
          style={{
            color: RC_COLORS.text,
            fontSize: 38,
            fontWeight: 600,
            letterSpacing: -0.5,
            display: "flex",
            alignItems: "center",
          }}
        >
          {currentQuery}
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
        </span>
      </div>

      <div
        style={{
          background: `${displayColor}22`,
          border: `1px solid ${displayColor}88`,
          borderRadius: 12,
          padding: "6px 16px",
          color: displayColor,
          fontSize: 16,
          fontWeight: 900,
          letterSpacing: 1.5,
        }}
      >
        {displayBadge}
      </div>
    </div>
  );
};
