import "./index.css";
import { Composition } from "remotion";
import { NizaamPromoVideo } from "./compositions/NizaamPromoVideo";
import { Scene1_ProblemHook } from "./scenes/Scene1_ProblemHook";
import { Scene2_LogoReveal } from "./scenes/Scene2_LogoReveal";
import { Scene3A_POSBilling } from "./scenes/Scene3A_POSBilling";
import { Scene3B_Inventory } from "./scenes/Scene3B_Inventory";
import { Scene3C_UdhaarKhata } from "./scenes/Scene3C_UdhaarKhata";
import { Scene3D_RepairLab } from "./scenes/Scene3D_RepairLab";
import { Scene3E_ProfitReports } from "./scenes/Scene3E_ProfitReports";
import { Scene3F_SuppliersPurchases } from "./scenes/Scene3F_SuppliersPurchases";
import { Scene3G_ReceiptsReturns } from "./scenes/Scene3G_ReceiptsReturns";
import { Scene4_Ecosystem } from "./scenes/Scene4_Ecosystem";
import { Scene5_Outro } from "./scenes/Scene5_Outro";
import { TIMELINE, TOTAL_DURATION_IN_FRAMES, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from "./config/timeline";

// Each <Composition> is an entry in the Remotion sidebar

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Primary Master Video (70s Vertical Promo) */}
      <Composition
        id="NizaamPromoVideo"
        component={NizaamPromoVideo}
        durationInFrames={TOTAL_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      {/* Individual Scene Compositions for Focused Previewing */}
      <Composition
        id="Scene1-ProblemHook"
        component={Scene1_ProblemHook}
        durationInFrames={TIMELINE.SCENE_1_PROBLEM.duration}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      <Composition
        id="Scene2-LogoReveal"
        component={Scene2_LogoReveal}
        durationInFrames={TIMELINE.SCENE_2_LOGO_REVEAL.duration}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      <Composition
        id="Scene3A-POSBilling"
        component={Scene3A_POSBilling}
        durationInFrames={TIMELINE.SCENE_3A_POS.duration}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      <Composition
        id="Scene3B-Inventory"
        component={Scene3B_Inventory}
        durationInFrames={TIMELINE.SCENE_3B_INVENTORY.duration}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      <Composition
        id="Scene3C-UdhaarKhata"
        component={Scene3C_UdhaarKhata}
        durationInFrames={TIMELINE.SCENE_3C_UDHAAR.duration}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      <Composition
        id="Scene3D-RepairLab"
        component={Scene3D_RepairLab}
        durationInFrames={TIMELINE.SCENE_3D_REPAIR.duration}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      <Composition
        id="Scene3E-ProfitReports"
        component={Scene3E_ProfitReports}
        durationInFrames={TIMELINE.SCENE_3E_PROFIT.duration}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      <Composition
        id="Scene3F-SuppliersPurchases"
        component={Scene3F_SuppliersPurchases}
        durationInFrames={TIMELINE.SCENE_3F_SUPPLIERS.duration}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      <Composition
        id="Scene3G-ReceiptsReturns"
        component={Scene3G_ReceiptsReturns}
        durationInFrames={TIMELINE.SCENE_3G_RECEIPTS.duration}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      <Composition
        id="Scene4-Ecosystem"
        component={Scene4_Ecosystem}
        durationInFrames={TIMELINE.SCENE_4_ECOSYSTEM.duration}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      <Composition
        id="Scene5-Outro"
        component={Scene5_Outro}
        durationInFrames={TIMELINE.SCENE_5_OUTRO.duration}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  );
};
