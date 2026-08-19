import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../data/searchData";

export const SeriesCta: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const p = spring({ frame: frame - start, fps, config: { damping: 15, stiffness: 120 } });
  return <div style={{ opacity: p, transform: `scale(${0.92 + p * 0.08})`, textAlign: "center" }}>
    <div style={{ color: COLORS.cyan, fontSize: 25, letterSpacing: 6, fontWeight: 800, marginBottom: 22 }}>PART 1</div>
    <div style={{ color: COLORS.text, fontSize: 62, lineHeight: 1.05, fontWeight: 900, letterSpacing: -2 }}>FOLLOW FOR<br />THE SERIES <span style={{ color: COLORS.cyan }}>→</span></div>
  </div>;
};
