import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../data/searchData";

export const DataFlow: React.FC<{ x1: number; y1: number; x2: number; y2: number; start: number; color?: string }> = ({ x1, y1, x2, y2, start, color = COLORS.cyan }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - start, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const particle = ((frame - start) % 24) / 24;
  return <><div style={{ position: "absolute", left: x1, top: y1, width: Math.hypot(x2 - x1, y2 - y1) * p, height: 2, transformOrigin: "left", transform: `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`, background: `linear-gradient(90deg, ${color}22, ${color})` }} /><div style={{ position: "absolute", left: x1 + (x2 - x1) * particle - 8, top: y1 + (y2 - y1) * particle - 8, width: 16, height: 16, borderRadius: 99, background: color, opacity: p, boxShadow: `0 0 20px ${color}` }} /></>;
};
