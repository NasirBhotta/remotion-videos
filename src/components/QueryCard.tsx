import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../data/searchData";

export const QueryCard: React.FC<{ text: string; index: number; start: number }> = ({ text, index, start }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - start - index * 5, fps, config: { damping: 15, stiffness: 150 } });
  const merge = interpolate(frame, [start + 37, start + 54], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const offsets = [-190, -64, 64, 190];
  return <div style={{ position: "absolute", left: "50%", top: 515, width: 560, marginLeft: -280, padding: "24px 30px", borderRadius: 22, backgroundColor: COLORS.panel, border: `1px solid ${COLORS.border}`, color: COLORS.text, fontSize: 31, fontWeight: 600, opacity: enter * (1 - merge), transform: `translateY(${offsets[index] * (1 - merge) + (1 - enter) * 50}px) scale(${1 - merge * 0.12})`, boxShadow: `0 16px 45px rgba(0,0,0,0.28)` }}>
    <span style={{ color: COLORS.cyan, marginRight: 16 }}>⌕</span>{text}
  </div>;
};
