import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../config/brand";
import { Background } from "../components/Background";
import { PhoneMockup } from "../components/PhoneMockup";
import { KineticHeading } from "../components/KineticHeading";
import { FeatureBadge } from "../components/FeatureBadge";

export const Scene3B_Inventory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance phone spring
  const phoneEntrance = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 90 },
  });

  const phoneScale = interpolate(phoneEntrance, [0, 1], [0.85, 1.05]);
  const phoneTranslateY = interpolate(phoneEntrance, [0, 1], [80, 45]);
  const phoneRotateY = interpolate(phoneEntrance, [0, 1], [-12, 4]);

  // Subtle continuous drift
  const driftRotateY = phoneRotateY + Math.sin(frame / 22) * 2;
  const driftTranslateY = phoneTranslateY + Math.cos(frame / 24) * 6;

  // Switch from product edit to stock adjust after frame 85
  const showStockAdjust = frame >= 85;
  const activeImage = showStockAdjust
    ? BRAND.assets.mobile.stockAdjust
    : BRAND.assets.mobile.productEdit;

  // Amber Alert Banner Pulse (around frames 25-80)
  const alertPulse = Math.sin(frame / 6) * 0.15 + 0.85;

  // Stock In Badge entrance after switch
  const adjustSpring = spring({
    frame: Math.max(0, frame - 95),
    fps,
    config: { damping: 11, stiffness: 130 },
  });
  const adjustScale = interpolate(adjustSpring, [0, 1], [0.7, 1]);
  const adjustOpacity = interpolate(adjustSpring, [0, 1], [0, 1]);

  // Scene exit transition
  const exitProgress = interpolate(frame, [155, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.92]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background accentColor="#E3A335" glowIntensity={1.1} />

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
          tag="Inventory & Stock Control"
          tagIcon="📦"
          title="Never Run Out of"
          highlight="Stock."
          subtitle="Proactive low-stock warnings, cost tracking, and 1-tap adjustments."
          delay={0}
          highlightColor="gold"
          positionTop={120}
        />

        {/* 3D Floating Phone Mockup */}
        <PhoneMockup
          imageSrc={activeImage}
          width={500}
          height={1000}
          scale={phoneScale}
          translateY={driftTranslateY}
          rotateY={driftRotateY}
          rotateX={3}
          cropY={0}
        >
          {/* Highlight glow over Low Stock Banner on product-edit */}
          {!showStockAdjust && frame >= 20 && (
            <div
              style={{
                position: "absolute",
                top: 360,
                left: 16,
                right: 16,
                height: 80,
                borderRadius: 12,
                border: "2px solid #E3A335",
                boxShadow: "0 0 25px rgba(227, 163, 53, 0.6)",
                opacity: alertPulse,
                pointerEvents: "none",
                zIndex: 35,
              }}
            />
          )}

          {/* Quick Adjustment Pill */}
          {showStockAdjust && frame >= 95 && (
            <div
              style={{
                position: "absolute",
                bottom: 80,
                left: "50%",
                transform: `translateX(-50%) scale(${adjustScale})`,
                opacity: adjustOpacity,
                background: "rgba(14, 111, 78, 0.95)",
                border: "2px solid #4FAE87",
                borderRadius: 24,
                padding: "10px 22px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "0 10px 30px rgba(0,0,0,0.6), 0 0 25px rgba(79, 174, 135, 0.8)",
                zIndex: 45,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 20 }}>📦</span>
              <span
                className="font-heading"
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#FFFFFF",
                }}
              >
                Stock Updated Instantly
              </span>
            </div>
          )}
        </PhoneMockup>

        {/* Bottom Feature Pill Badge */}
        <FeatureBadge
          icon="⚠️"
          label="Custom Alert Limits • Profit Margins • 1-Tap Stock In/Out"
          delay={25}
          variant="gold"
          bottom={110}
        />
      </div>
    </AbsoluteFill>
  );
};
