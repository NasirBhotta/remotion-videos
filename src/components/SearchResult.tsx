import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../data/searchData";

export const SearchResult: React.FC<{ name: string; score: number; color: string; y: number; start: number }> = ({ name, score, color, y, start }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - start, fps, config: { damping: 15, stiffness: 120 } });
  return <div style={{ position: "absolute", left: 120, top: y, width: 840, height: 105, borderRadius: 18, background: COLORS.panel, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", padding: "0 28px", boxSizing: "border-box", opacity: enter, transform: `translateX(${(1 - enter) * 100}px)` }}><span style={{ width: 15, height: 15, background: color, borderRadius: 99, marginRight: 22, boxShadow: `0 0 16px ${color}` }} /><span style={{ color: COLORS.text, fontSize: 30, fontWeight: 700, flex: 1 }}>{name}</span><span style={{ color, fontSize: 29, fontWeight: 800 }}>{score}%</span></div>;
};
