import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { TIMELINE } from "../config/timeline";

// Scenes
import { Scene1_ProblemHook } from "../scenes/Scene1_ProblemHook";
import { Scene2_LogoReveal } from "../scenes/Scene2_LogoReveal";
import { Scene3A_POSBilling } from "../scenes/Scene3A_POSBilling";
import { Scene3B_Inventory } from "../scenes/Scene3B_Inventory";
import { Scene3C_UdhaarKhata } from "../scenes/Scene3C_UdhaarKhata";
import { Scene3D_RepairLab } from "../scenes/Scene3D_RepairLab";
import { Scene3E_ProfitReports } from "../scenes/Scene3E_ProfitReports";
import { Scene3F_SuppliersPurchases } from "../scenes/Scene3F_SuppliersPurchases";
import { Scene3G_ReceiptsReturns } from "../scenes/Scene3G_ReceiptsReturns";
import { Scene4_Ecosystem } from "../scenes/Scene4_Ecosystem";
import { Scene5_Outro } from "../scenes/Scene5_Outro";
import { NizaamPromoAudio } from "../audio/NizaamPromoAudio";

export const NizaamPromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#070E0B" }}>
      {/* Dynamic Background Music & Visual SFX Layer */}
      <NizaamPromoAudio />
      {/* 1. Problem / Hook (0s - 7s | 210 frames) */}
      <Sequence
        from={TIMELINE.SCENE_1_PROBLEM.from}
        durationInFrames={TIMELINE.SCENE_1_PROBLEM.duration}
        name="1_ProblemHook"
      >
        <Scene1_ProblemHook />
      </Sequence>

      {/* 2. NIZAAM Logo Reveal (7s - 13s | 180 frames) */}
      <Sequence
        from={TIMELINE.SCENE_2_LOGO_REVEAL.from}
        durationInFrames={TIMELINE.SCENE_2_LOGO_REVEAL.duration}
        name="2_LogoReveal"
      >
        <Scene2_LogoReveal />
      </Sequence>

      {/* 3A. Product Showcase: POS & Billing (13s - 19s | 180 frames) */}
      <Sequence
        from={TIMELINE.SCENE_3A_POS.from}
        durationInFrames={TIMELINE.SCENE_3A_POS.duration}
        name="3A_POSBilling"
      >
        <Scene3A_POSBilling />
      </Sequence>

      {/* 3B. Product Showcase: Inventory & Alerts (19s - 25s | 180 frames) */}
      <Sequence
        from={TIMELINE.SCENE_3B_INVENTORY.from}
        durationInFrames={TIMELINE.SCENE_3B_INVENTORY.duration}
        name="3B_Inventory"
      >
        <Scene3B_Inventory />
      </Sequence>

      {/* 3C. Product Showcase: Udhaar & Khata (25s - 31s | 180 frames) */}
      <Sequence
        from={TIMELINE.SCENE_3C_UDHAAR.from}
        durationInFrames={TIMELINE.SCENE_3C_UDHAAR.duration}
        name="3C_UdhaarKhata"
      >
        <Scene3C_UdhaarKhata />
      </Sequence>

      {/* 3D. Product Showcase: Repair Lab (31s - 37s | 180 frames) */}
      <Sequence
        from={TIMELINE.SCENE_3D_REPAIR.from}
        durationInFrames={TIMELINE.SCENE_3D_REPAIR.duration}
        name="3D_RepairLab"
      >
        <Scene3D_RepairLab />
      </Sequence>

      {/* 3E. Product Showcase: Live Profit & Cash Flow (37s - 43s | 180 frames) */}
      <Sequence
        from={TIMELINE.SCENE_3E_PROFIT.from}
        durationInFrames={TIMELINE.SCENE_3E_PROFIT.duration}
        name="3E_ProfitReports"
      >
        <Scene3E_ProfitReports />
      </Sequence>

      {/* 3F. Product Showcase: Suppliers & Purchase Orders (43s - 49s | 180 frames) */}
      <Sequence
        from={TIMELINE.SCENE_3F_SUPPLIERS.from}
        durationInFrames={TIMELINE.SCENE_3F_SUPPLIERS.duration}
        name="3F_SuppliersPurchases"
      >
        <Scene3F_SuppliersPurchases />
      </Sequence>

      {/* 3G. Product Showcase: Thermal Receipts & Returns (49s - 55s | 180 frames) */}
      <Sequence
        from={TIMELINE.SCENE_3G_RECEIPTS.from}
        durationInFrames={TIMELINE.SCENE_3G_RECEIPTS.duration}
        name="3G_ReceiptsReturns"
      >
        <Scene3G_ReceiptsReturns />
      </Sequence>

      {/* 4. Mobile + Desktop Ecosystem (55s - 63s | 240 frames) */}
      <Sequence
        from={TIMELINE.SCENE_4_ECOSYSTEM.from}
        durationInFrames={TIMELINE.SCENE_4_ECOSYSTEM.duration}
        name="4_Ecosystem"
      >
        <Scene4_Ecosystem />
      </Sequence>

      {/* 5. Final Brand / Outro (63s - 70s | 210 frames) */}
      <Sequence
        from={TIMELINE.SCENE_5_OUTRO.from}
        durationInFrames={TIMELINE.SCENE_5_OUTRO.duration}
        name="5_Outro"
      >
        <Scene5_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
