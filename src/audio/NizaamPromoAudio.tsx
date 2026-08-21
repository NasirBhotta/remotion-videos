import React from "react";
import { Audio, interpolate, Sequence, staticFile } from "remotion";
import { TIMELINE } from "../config/timeline";

interface NizaamPromoAudioProps {
  /** Optional custom voiceover audio file in public/audio (e.g. "audio/voiceover.mp3") */
  voiceoverSrc?: string;
  /** Volume multiplier for background music (default: 0.28) */
  bgmVolumeMultiplier?: number;
}

export const NizaamPromoAudio: React.FC<NizaamPromoAudioProps> = ({
  voiceoverSrc,
  bgmVolumeMultiplier = 1.0,
}) => {
  return (
    <>
      {/* 1. Master Background Music: 72s high-energy corporate tech promo track with dynamic ducking */}
      <Audio
        src={staticFile("audio/nizaam-bgm.wav")}
        volume={(frame) => {
          // Dynamic volume envelope across 70s (2100 frames)
          const baseVol = interpolate(
            frame,
            [0, 60, 200, 220, 1650, 1890, 2040, 2100],
            [0.22, 0.22, 0.35, 0.26, 0.28, 0.38, 0.32, 0.0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          // If voiceover is active, slightly duck music
          const voiceDuck = voiceoverSrc ? 0.65 : 1.0;
          return baseVol * bgmVolumeMultiplier * voiceDuck;
        }}
      />

      {/* Optional Voiceover Audio track if supplied */}
      {voiceoverSrc && (
        <Audio
          src={staticFile(voiceoverSrc)}
          volume={1.0}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. Synced Sound Effects (SFX) Matched to Visual Events */}
      {/* ------------------------------------------------------------- */}

      {/* SCENE 1: Problem Hook (0s - 7s | Frames 0 - 210) */}
      <Sequence from={15} durationInFrames={15}>
        <Audio src={staticFile("audio/bass-hit.wav")} volume={() => 0.16} />
      </Sequence>
      <Sequence from={35} durationInFrames={15}>
        <Audio src={staticFile("audio/bass-hit.wav")} volume={() => 0.16} />
      </Sequence>
      <Sequence from={55} durationInFrames={15}>
        <Audio src={staticFile("audio/bass-hit.wav")} volume={() => 0.16} />
      </Sequence>
      <Sequence from={80} durationInFrames={20}>
        <Audio src={staticFile("audio/sfx-stock-alert.wav")} volume={() => 0.18} />
      </Sequence>
      <Sequence from={145} durationInFrames={25}>
        <Audio src={staticFile("audio/transition.wav")} volume={() => 0.20} />
      </Sequence>
      <Sequence from={190} durationInFrames={22}>
        <Audio src={staticFile("audio/riser.wav")} volume={() => 0.16} />
      </Sequence>

      {/* SCENE 2: Logo Reveal & Brand Intro (7s - 13s | Frames 210 - 390) */}
      <Sequence from={TIMELINE.SCENE_2_LOGO_REVEAL.from} durationInFrames={35}>
        <Audio src={staticFile("audio/sfx-logo-reveal.wav")} volume={() => 0.28} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_2_LOGO_REVEAL.from + 46} durationInFrames={10}>
        <Audio src={staticFile("audio/node-pop.wav")} volume={() => 0.18} />
      </Sequence>

      {/* SCENE 3A: POS & Invoicing (13s - 19s | Frames 390 - 570) */}
      <Sequence from={TIMELINE.SCENE_3A_POS.from} durationInFrames={18}>
        <Audio src={staticFile("audio/whoosh.wav")} volume={() => 0.15} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_3A_POS.from + 15} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx-laser-scan.wav")} volume={() => 0.24} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_3A_POS.from + 105} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx-pos-success.wav")} volume={() => 0.28} />
      </Sequence>

      {/* SCENE 3B: Inventory & Stock Control (19s - 25s | Frames 570 - 750) */}
      <Sequence from={TIMELINE.SCENE_3B_INVENTORY.from} durationInFrames={18}>
        <Audio src={staticFile("audio/whoosh.wav")} volume={() => 0.15} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_3B_INVENTORY.from + 20} durationInFrames={20}>
        <Audio src={staticFile("audio/sfx-stock-alert.wav")} volume={() => 0.20} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_3B_INVENTORY.from + 95} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx-pos-success.wav")} volume={() => 0.22} />
      </Sequence>

      {/* SCENE 3C: Udhaar Khata & Reminders (25s - 31s | Frames 750 - 930) */}
      <Sequence from={TIMELINE.SCENE_3C_UDHAAR.from} durationInFrames={18}>
        <Audio src={staticFile("audio/whoosh.wav")} volume={() => 0.15} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_3C_UDHAAR.from + 70} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx-whatsapp-ping.wav")} volume={() => 0.26} />
      </Sequence>

      {/* SCENE 3D: Repair Lab & Service (31s - 37s | Frames 930 - 1110) */}
      <Sequence from={TIMELINE.SCENE_3D_REPAIR.from} durationInFrames={18}>
        <Audio src={staticFile("audio/whoosh.wav")} volume={() => 0.15} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_3D_REPAIR.from + 35} durationInFrames={10}>
        <Audio src={staticFile("audio/sfx-repair-step.wav")} volume={() => 0.16} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_3D_REPAIR.from + 65} durationInFrames={10}>
        <Audio src={staticFile("audio/sfx-repair-step.wav")} volume={() => 0.16} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_3D_REPAIR.from + 80} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx-whatsapp-ping.wav")} volume={() => 0.22} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_3D_REPAIR.from + 100} durationInFrames={10}>
        <Audio src={staticFile("audio/sfx-repair-step.wav")} volume={() => 0.16} />
      </Sequence>

      {/* SCENE 3E: Analytics & Profit (37s - 43s | Frames 1110 - 1290) */}
      <Sequence from={TIMELINE.SCENE_3E_PROFIT.from} durationInFrames={18}>
        <Audio src={staticFile("audio/whoosh.wav")} volume={() => 0.15} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_3E_PROFIT.from + 15} durationInFrames={10}>
        <Audio src={staticFile("audio/node-pop.wav")} volume={() => 0.18} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_3E_PROFIT.from + 30} durationInFrames={10}>
        <Audio src={staticFile("audio/node-pop.wav")} volume={() => 0.18} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_3E_PROFIT.from + 45} durationInFrames={10}>
        <Audio src={staticFile("audio/node-pop.wav")} volume={() => 0.18} />
      </Sequence>

      {/* SCENE 3F: Suppliers & Purchases (43s - 49s | Frames 1290 - 1470) */}
      <Sequence from={TIMELINE.SCENE_3F_SUPPLIERS.from} durationInFrames={18}>
        <Audio src={staticFile("audio/whoosh.wav")} volume={() => 0.15} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_3F_SUPPLIERS.from + 25} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx-pos-success.wav")} volume={() => 0.22} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_3F_SUPPLIERS.from + 85} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx-whatsapp-ping.wav")} volume={() => 0.22} />
      </Sequence>

      {/* SCENE 3G: Receipts & Returns (49s - 55s | Frames 1470 - 1650) */}
      <Sequence from={TIMELINE.SCENE_3G_RECEIPTS.from} durationInFrames={18}>
        <Audio src={staticFile("audio/whoosh.wav")} volume={() => 0.15} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_3G_RECEIPTS.from + 20} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx-printer-slip.wav")} volume={() => 0.26} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_3G_RECEIPTS.from + 85} durationInFrames={25}>
        <Audio src={staticFile("audio/transition.wav")} volume={() => 0.20} />
      </Sequence>

      {/* SCENE 4: Ecosystem Sync (55s - 63s | Frames 1650 - 1890) */}
      <Sequence from={TIMELINE.SCENE_4_ECOSYSTEM.from} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx-logo-reveal.wav")} volume={() => 0.24} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_4_ECOSYSTEM.from + 35} durationInFrames={35}>
        <Audio src={staticFile("audio/sfx-sync-beam.wav")} volume={() => 0.28} />
      </Sequence>

      {/* SCENE 5: Outro & Call to Action (63s - 70s | Frames 1890 - 2100) */}
      <Sequence from={TIMELINE.SCENE_5_OUTRO.from} durationInFrames={40}>
        <Audio src={staticFile("audio/sfx-logo-reveal.wav")} volume={() => 0.32} />
      </Sequence>
      <Sequence from={TIMELINE.SCENE_5_OUTRO.from + 48} durationInFrames={15}>
        <Audio src={staticFile("audio/node-pop.wav")} volume={() => 0.20} />
      </Sequence>
    </>
  );
};
