import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { ProductionSearch } from "./compositions/ProductionSearch";
import { ProductionSearchDebouncing } from "./compositions/ProductionSearchDebouncing";
import { ProductionSearchIntro } from "./compositions/ProductionSearchIntro";
import { ProductionSearchNormalization } from "./compositions/ProductionSearchNormalization";
import { DURATION_IN_FRAMES, FPS } from "./data/searchData";
import { DEBOUNCE_DURATION_IN_FRAMES, DEBOUNCE_FPS } from "./data/searchDebounceData";
import { INTRO_DURATION_IN_FRAMES, INTRO_FPS } from "./data/searchIntroData";
import { NORMALIZATION_DURATION_IN_FRAMES, NORMALIZATION_FPS } from "./data/searchNormalizationData";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ProductionSearchDebouncing"
        component={ProductionSearchDebouncing}
        durationInFrames={DEBOUNCE_DURATION_IN_FRAMES}
        fps={DEBOUNCE_FPS}
        width={1080}
        height={1920}
      />

      <Composition
        id="ProductionSearchNormalization"
        component={ProductionSearchNormalization}
        durationInFrames={NORMALIZATION_DURATION_IN_FRAMES}
        fps={NORMALIZATION_FPS}
        width={1080}
        height={1920}
      />

      <Composition
        id="ProductionSearchIntro"
        component={ProductionSearchIntro}
        durationInFrames={INTRO_DURATION_IN_FRAMES}
        fps={INTRO_FPS}
        width={1080}
        height={1920}
      />

      <Composition
        id="ProductionSearch"
        component={ProductionSearch}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />

      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
    </>
  );
};
