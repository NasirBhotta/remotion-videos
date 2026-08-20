import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../config/brand";
import { Background } from "../components/Background";
import { PhoneMockup } from "../components/PhoneMockup";
import { DesktopMockup } from "../components/DesktopMockup";
import { KineticHeading } from "../components/KineticHeading";
import { FeatureBadge } from "../components/FeatureBadge";
import { SyncConnector } from "../components/SyncConnector";

export const Scene4_Ecosystem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Desktop Mockup entrance
  const desktopEntrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  const desktopScale = interpolate(desktopEntrance, [0, 1], [0.65, 0.88]);
  const desktopTranslateY = interpolate(desktopEntrance, [0, 1], [150, -40]);
  const desktopTranslateX = interpolate(desktopEntrance, [0, 1], [-100, 0]);
  const desktopRotateX = interpolate(desktopEntrance, [0, 1], [15, 8]);
  const desktopOpacity = interpolate(desktopEntrance, [0, 1], [0, 1]);

  // Phone Mockup entrance (slides in over bottom-right of desktop)
  const phoneEntrance = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 13, stiffness: 95 },
  });

  const phoneScale = interpolate(phoneEntrance, [0, 1], [0.6, 0.86]);
  const phoneTranslateY = interpolate(phoneEntrance, [0, 1], [250, 220]);
  const phoneTranslateX = interpolate(phoneEntrance, [0, 1], [150, 160]);
  const phoneRotateY = interpolate(phoneEntrance, [0, 1], [-20, -10]);
  const phoneRotateX = interpolate(phoneEntrance, [0, 1], [10, 4]);
  const phoneOpacity = interpolate(phoneEntrance, [0, 1], [0, 1]);

  // Sync beam pulse
  const syncActive = frame >= 35;

  // Scene exit transition
  const exitProgress = interpolate(frame, [210, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.92]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background accentColor={BRAND.colors.primaryLight} glowIntensity={1.3} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${exitScale})`,
          opacity: exitOpacity,
        }}
      >
        {/* Kinetic Header */}
        <KineticHeading
          tag="Complete Ecosystem"
          tagIcon="🌐"
          title="One Unified"
          highlight="Platform."
          subtitle="Manage your entire shop in real-time on both mobile and desktop."
          delay={0}
          highlightColor="gold"
          positionTop={110}
        />

        {/* Dual Device Stage */}
        <div style={{ position: "absolute", inset: 0 }}>
          {/* Desktop Monitor Mockup in Background */}
          <DesktopMockup
            imageSrc={BRAND.assets.desktop.dashboard}
            title="Nizaam — Meri Dukaan (Dashboard)"
            width={940}
            height={560}
            scale={desktopScale}
            translateX={desktopTranslateX}
            translateY={desktopTranslateY}
            rotateX={desktopRotateX}
            opacity={desktopOpacity}
          />

          {/* Sync Connection Beam */}
          {syncActive && (
            <SyncConnector
              startX={380}
              startY={820}
              endX={680}
              endY={1080}
              delay={35}
            />
          )}

          {/* Phone Mockup in Foreground */}
          <PhoneMockup
            imageSrc={BRAND.assets.mobile.dashboard}
            width={440}
            height={900}
            scale={phoneScale}
            translateX={phoneTranslateX}
            translateY={phoneTranslateY}
            rotateY={phoneRotateY}
            rotateX={phoneRotateX}
            opacity={phoneOpacity}
          />
        </div>

        {/* Multi-Branch & Real-Time Sync Indicator */}
        {frame >= 50 && (
          <div
            style={{
              position: "absolute",
              top: 480,
              left: 50,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              zIndex: 30,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 20px",
                borderRadius: 20,
                background: "rgba(14, 28, 22, 0.9)",
                border: "1px solid rgba(79, 174, 135, 0.4)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              <span style={{ fontSize: 20 }}>🏪</span>
              <span>Multi-Branch Ready</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 20px",
                borderRadius: 20,
                background: "rgba(14, 28, 22, 0.9)",
                border: "1px solid rgba(245, 200, 116, 0.4)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              <span style={{ fontSize: 20 }}>🔄</span>
              <span>Instant Cloud Sync</span>
            </div>
          </div>
        )}

        {/* Bottom Feature Pill Badge */}
        <FeatureBadge
          icon="✨"
          label="Seamless on Mobile • Powerful on Desktop • Multi-Branch"
          delay={30}
          variant="emerald"
          bottom={100}
        />
      </div>
    </AbsoluteFill>
  );
};
