import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CursorPagination } from "../components/CursorPagination";
import { DataFlow } from "../components/DataFlow";
import { PipelineNode } from "../components/PipelineNode";
import { QueryCard } from "../components/QueryCard";
import { RankingList } from "../components/RankingList";
import { SectionTitle } from "../components/SectionTitle";
import { COLORS, MESSY_QUERIES, SCENE } from "../data/searchData";

const fade = (frame: number, start: number, end: number) => interpolate(frame, [start, start + 8, end - 8, end], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const Scene: React.FC<{ start: number; end: number; children: React.ReactNode }> = ({ start, end, children }) => { const f = useCurrentFrame(); return <div style={{ opacity: fade(f, start, end) }}>{children}</div>; };

export const ProductionSearch: React.FC = () => {
  const frame = useCurrentFrame();
  const finalScale = 0.88 + interpolate(frame, [SCENE.finale, SCENE.finale + 16], [0, 0.12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 38%, #16213b 0%, ${COLORS.background} 53%)`, fontFamily: "Inter, Arial, sans-serif", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, opacity: 0.2, backgroundImage: "linear-gradient(#26324b 1px, transparent 1px), linear-gradient(90deg, #26324b 1px, transparent 1px)", backgroundSize: "54px 54px" }} />
    <Scene start={0} end={SCENE.optimize}><SectionTitle eyebrow="01 / QUERY INPUT" title="Messy in. Clean out." start={0} />{MESSY_QUERIES.map((text, i) => <QueryCard key={text} text={text} index={i} start={9} />)}<div style={{ position: "absolute", top: 965, left: 230, width: 620, padding: 30, borderRadius: 24, textAlign: "center", fontSize: 40, fontWeight: 800, color: COLORS.cyan, background: COLORS.panelStrong, border: `1px solid ${COLORS.cyan}77`, opacity: interpolate(frame, [43, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>NORMALIZE<div style={{ color: COLORS.text, fontSize: 30, marginTop: 16 }}>&quot;iphone 15&quot;</div></div></Scene>
    <Scene start={SCENE.optimize} end={SCENE.backend}><SectionTitle eyebrow="02 / REQUEST OPTIMIZATION" title="Only send what matters." start={SCENE.optimize} /><PipelineNode label="NORMALIZE" x={400} y={470} start={SCENE.optimize + 4} /><PipelineNode label="DEBOUNCE" sublabel="8 keystrokes → 1 request" x={400} y={690} start={SCENE.optimize + 14} color={COLORS.violet} /><PipelineNode label="REQUEST CONTROL" sublabel="dedupe · cancel · retry" x={400} y={910} start={SCENE.optimize + 26} color={COLORS.green} /><DataFlow x1={540} y1={580} x2={540} y2={690} start={SCENE.optimize + 12} /><DataFlow x1={540} y1={800} x2={540} y2={910} start={SCENE.optimize + 24} color={COLORS.violet} /></Scene>
    <Scene start={SCENE.backend} end={SCENE.ranking}><SectionTitle eyebrow="03 / BACKEND SEARCH" title="Skip the scan." start={SCENE.backend} /><PipelineNode label="CACHE" sublabel="fast path" x={140} y={650} start={SCENE.backend + 5} color={COLORS.amber} /><PipelineNode label="INDEXED SEARCH" sublabel="jump to relevant data" x={660} y={650} start={SCENE.backend + 17} color={COLORS.green} /><DataFlow x1={420} y1={705} x2={660} y2={705} start={SCENE.backend + 14} color={COLORS.amber} /><div style={{ position: "absolute", top: 900, left: 155, color: COLORS.muted, fontSize: 26, letterSpacing: 1 }}>QUERY → INDEX → RELEVANT RECORDS</div></Scene>
    <Scene start={SCENE.ranking} end={SCENE.pagination}><SectionTitle eyebrow="04 / RANKING" title="Most relevant, first." start={SCENE.ranking} /><RankingList start={SCENE.ranking + 8} /><div style={{ position: "absolute", top: 1110, left: 275, width: 530, padding: 22, color: COLORS.cyan, fontWeight: 800, fontSize: 31, textAlign: "center", border: `1px solid ${COLORS.cyan}55`, borderRadius: 18, opacity: interpolate(frame, [SCENE.ranking + 38, SCENE.ranking + 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>TOP RESULTS</div></Scene>
    <Scene start={SCENE.pagination} end={SCENE.finale}><SectionTitle eyebrow="05 / PAGINATION" title="Continue with context." start={SCENE.pagination} /><CursorPagination start={SCENE.pagination + 5} /></Scene>
    <Scene start={SCENE.finale} end={280}><div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", transform: `scale(${finalScale})` }}><div style={{ color: COLORS.cyan, fontSize: 72, textShadow: `0 0 45px ${COLORS.cyan}` }}>⚡</div><div style={{ marginTop: 20, fontSize: 78, fontWeight: 900, letterSpacing: -3, color: COLORS.text, textAlign: "center" }}>PRODUCTION<br /><span style={{ color: COLORS.cyan }}>SEARCH</span></div><div style={{ marginTop: 30, fontSize: 21, letterSpacing: 4, color: COLORS.muted }}>FAST · RELEVANT · RESILIENT</div></div></Scene>
  </AbsoluteFill>;
};
