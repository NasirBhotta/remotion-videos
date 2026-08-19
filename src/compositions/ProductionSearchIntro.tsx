import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ProductionSearchAudio } from "../audio/ProductionSearchAudio";
import { IntroSearchBar } from "../components/IntroSearchBar";
import { PipelineNode } from "../components/PipelineNode";
import { ProductGrid } from "../components/ProductGrid";
import { SeriesCta } from "../components/SeriesCta";
import { COLORS } from "../data/searchData";
import { INTRO_SCENES } from "../data/searchIntroData";

const visible = (frame: number, from: number, to: number) => interpolate(frame, [from, from + 8, to - 8, to], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const Scene: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({ from, to, children }) => { const f = useCurrentFrame(); return <div style={{ opacity: visible(f, from, to) }}>{children}</div>; };

export const ProductionSearchIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const queryOut = interpolate(frame, [INTRO_SCENES.search + 39, INTRO_SCENES.scale], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ overflow: "hidden", color: COLORS.text, fontFamily: "Inter, Arial, sans-serif", background: `radial-gradient(circle at 50% 30%, #172440 0%, ${COLORS.background} 55%)` }}>
    <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: "linear-gradient(#33415e 1px, transparent 1px), linear-gradient(90deg, #33415e 1px, transparent 1px)", backgroundSize: "54px 54px" }} />
    <Scene from={0} to={INTRO_SCENES.scale + 8}><div style={{ position: "absolute", top: 440, left: 150, opacity: 1 - queryOut, transform: `scale(${1 - queryOut * 0.28})` }}><div style={{ color: COLORS.muted, letterSpacing: 4, fontSize: 21, fontWeight: 800, marginBottom: 22 }}>USER SEARCHES</div><IntroSearchBar start={6} /></div></Scene>
    <Scene from={INTRO_SCENES.scale - 8} to={INTRO_SCENES.question + 5}><ProductGrid start={INTRO_SCENES.scale} /><div style={{ position: "absolute", top: 280, width: "100%", textAlign: "center" }}><div style={{ color: COLORS.muted, fontSize: 22, letterSpacing: 5, fontWeight: 800 }}>ONE QUERY</div><div style={{ color: COLORS.cyan, fontSize: 66, letterSpacing: -2, fontWeight: 900, marginTop: 15 }}>1,000,000</div><div style={{ fontSize: 28, letterSpacing: 5, fontWeight: 800 }}>PRODUCTS</div></div><div style={{ position: "absolute", top: 1390, width: "100%", textAlign: "center", color: COLORS.amber, fontSize: 26, fontWeight: 800, letterSpacing: 2 }}>SCANNING DOESN&apos;T SCALE</div></Scene>
    <Scene from={INTRO_SCENES.question} to={INTRO_SCENES.hook + 8}><div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}><div style={{ transform: `scale(${0.95 + interpolate(frame, [INTRO_SCENES.question, INTRO_SCENES.question + 16], [0, 0.05], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})` }}><div style={{ color: COLORS.cyan, fontSize: 22, letterSpacing: 5, fontWeight: 800, marginBottom: 28 }}>THE ENGINEERING QUESTION</div><div style={{ fontSize: 67, lineHeight: 1.05, letterSpacing: -2, fontWeight: 900 }}>HOW DOES<br />PRODUCTION SEARCH<br /><span style={{ color: COLORS.cyan }}>WORK?</span></div></div></div></Scene>
    <Scene from={INTRO_SCENES.hook} to={INTRO_SCENES.cta + 5}><div style={{ position: "absolute", top: 505, width: "100%", textAlign: "center" }}><div style={{ fontSize: 70, lineHeight: 1.03, letterSpacing: -2, fontWeight: 900 }}>WE&apos;LL BUILD IT<br /><span style={{ color: COLORS.cyan }}>STEP BY STEP</span></div></div><PipelineNode label="QUERY" x={400} y={930} start={INTRO_SCENES.hook + 8} /><PipelineNode label="SEARCH" x={400} y={1080} start={INTRO_SCENES.hook + 14} color={COLORS.violet} /><PipelineNode label="RESULTS" x={400} y={1230} start={INTRO_SCENES.hook + 20} color={COLORS.green} /></Scene>
    <Scene from={INTRO_SCENES.cta} to={280}><div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center" }}><SeriesCta start={INTRO_SCENES.cta + 4} /></div></Scene>
    <ProductionSearchAudio />
  </AbsoluteFill>;
};

