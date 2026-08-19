import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../data/searchData";

export const IntroSearchBar: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - start, fps, config: { damping: 16, stiffness: 130 } });
  const chars = Math.floor(interpolate(frame - start, [10, 31], [0, 9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const query = "iphone 15".slice(0, chars);
  return <div style={{ width: 780, height: 112, boxSizing: "border-box", borderRadius: 24, padding: "0 32px", display: "flex", alignItems: "center", background: COLORS.panelStrong, border: `1px solid ${COLORS.cyan}88`, boxShadow: `0 0 48px ${COLORS.cyan}22`, transform: `scale(${enter})`, opacity: enter }}>
    <span style={{ color: COLORS.cyan, fontSize: 44, marginRight: 23 }}>⌕</span>
    <span style={{ color: COLORS.text, fontSize: 37, fontWeight: 600, letterSpacing: -0.5 }}>{query}<span style={{ color: COLORS.cyan, opacity: Math.floor(frame / 10) % 2 }}>│</span></span>
  </div>;
};
