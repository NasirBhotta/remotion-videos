import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../data/searchData";

export const SectionTitle: React.FC<{ eyebrow: string; title: string; start: number }> = ({ eyebrow, title, start }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - start, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ opacity: progress, transform: `translateY(${(1 - progress) * 20}px)`, textAlign: "center" }}>
    <div style={{ color: COLORS.cyan, fontSize: 22, letterSpacing: 5, fontWeight: 800, marginBottom: 14 }}>{eyebrow}</div>
    <div style={{ color: COLORS.text, fontSize: 62, lineHeight: 1.04, fontWeight: 800, letterSpacing: -2 }}>{title}</div>
  </div>;
};
