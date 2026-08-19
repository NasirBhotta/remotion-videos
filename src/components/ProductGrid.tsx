import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../data/searchData";

const COLUMNS = 11;
const ROWS = 17;

export const ProductGrid: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame - start, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scan = ((frame - start - 18) % 42) / 42;
  return <div style={{ position: "absolute", left: 86, top: 510, width: 908, height: 810, opacity: reveal }}>
    {Array.from({ length: COLUMNS * ROWS }, (_, i) => {
      const column = i % COLUMNS; const row = Math.floor(i / COLUMNS);
      const x = column * 83; const y = row * 48;
      const scanY = scan * 810;
      const active = Math.abs(y - scanY) < 50;
      return <div key={i} style={{ position: "absolute", left: x, top: y, width: 67, height: 32, borderRadius: 7, background: active ? `${COLORS.amber}66` : COLORS.panel, border: `1px solid ${active ? COLORS.amber : COLORS.border}`, boxShadow: active ? `0 0 18px ${COLORS.amber}55` : "none" }} />;
    })}
    <div style={{ position: "absolute", top: scan * 810, width: "100%", height: 2, background: COLORS.amber, boxShadow: `0 0 18px ${COLORS.amber}` }} />
  </div>;
};
