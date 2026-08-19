import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../data/searchData";
import { PipelineNode } from "./PipelineNode";
import { DataFlow } from "./DataFlow";

export const CursorPagination: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame(); const token = interpolate(frame, [start + 14, start + 31], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div><PipelineNode label="TOP RESULTS" x={400} y={475} start={start} color={COLORS.cyan} /><PipelineNode label="PAGE 1" x={400} y={670} start={start + 5} color={COLORS.violet} /><PipelineNode label="NEXT CURSOR" sublabel="eyJpZCI6OTg..." x={400} y={865} start={start + 10} color={COLORS.amber} /><PipelineNode label="PAGE 2" x={400} y={1060} start={start + 15} color={COLORS.green} /><DataFlow x1={540} y1={585} x2={540} y2={670} start={start + 4} /><DataFlow x1={540} y1={780} x2={540} y2={865} start={start + 9} color={COLORS.amber} /><DataFlow x1={540} y1={975} x2={540} y2={1060} start={start + 14} color={COLORS.green} /><div style={{ position: "absolute", left: 578, top: 802 + token * 72, color: COLORS.amber, fontSize: 28, opacity: token }}>↳</div></div>;
};
