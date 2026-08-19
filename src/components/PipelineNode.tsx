import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../data/searchData";

export const PipelineNode: React.FC<{ label: string; sublabel?: string; x: number; y: number; start: number; color?: string }> = ({ label, sublabel, x, y, start, color = COLORS.cyan }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - start, fps, config: { damping: 16, stiffness: 130 } });
  return <div style={{ position: "absolute", left: x, top: y, width: 280, minHeight: 108, boxSizing: "border-box", borderRadius: 22, padding: "22px 20px", background: COLORS.panelStrong, border: `1px solid ${color}55`, boxShadow: `0 0 30px ${color}18`, transform: `scale(${enter})`, opacity: enter, textAlign: "center" }}>
    <div style={{ color, fontSize: 24, fontWeight: 800, letterSpacing: 1 }}>{label}</div>
    {sublabel ? <div style={{ color: COLORS.muted, marginTop: 8, fontSize: 17 }}>{sublabel}</div> : null}
  </div>;
};
