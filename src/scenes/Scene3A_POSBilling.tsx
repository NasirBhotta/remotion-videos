import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../config/brand";
import { Background } from "../components/Background";
import { PhoneMockup } from "../components/PhoneMockup";
import { KineticHeading } from "../components/KineticHeading";
import { FeatureBadge } from "../components/FeatureBadge";

export const Scene3A_POSBilling: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance phone spring
  const phoneEntrance = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 90 },
  });

  const phoneScale = interpolate(phoneEntrance, [0, 1], [0.8, 1.05]);
  const phoneTranslateY = interpolate(phoneEntrance, [0, 1], [80, 40]);
  const phoneRotateY = interpolate(phoneEntrance, [0, 1], [15, -4]);
  const phoneRotateX = interpolate(phoneEntrance, [0, 1], [10, 4]);

  // Subtle continuous 3D camera drift
  const driftRotateY = phoneRotateY + Math.sin(frame / 25) * 2;
  const driftTranslateY = phoneTranslateY + Math.cos(frame / 20) * 8;

  // Barcode scan laser animation
  const scanProgress = interpolate(frame, [15, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const laserY = interpolate(scanProgress, [0, 1], [60, 220]);
  const laserOpacity = interpolate(frame, [15, 25, 55, 65], [0, 1, 1, 0]);

  // Cart switch / zoom animation (frame 65+)
  const showCart = frame >= 50;
  const activeImage = showCart ? BRAND.assets.mobile.cart : BRAND.assets.mobile.sale;

  // Sale completed pulse check (frame 110+)
  const salePulseSpring = spring({
    frame: Math.max(0, frame - 105),
    fps,
    config: { damping: 10, stiffness: 140 },
  });
  const saleBadgeScale = interpolate(salePulseSpring, [0, 1], [0.5, 1]);
  const saleBadgeOpacity = interpolate(salePulseSpring, [0, 1], [0, 1]);

  // Scene exit transition
  const exitProgress = interpolate(frame, [155, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.92]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background accentColor={BRAND.colors.primaryLight} glowIntensity={1.2} />

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
          tag="POS & Fast Invoicing"
          tagIcon="⚡"
          title="Sell in"
          highlight="Seconds."
          subtitle="Barcode scan, flexible payments, and instant receipt generation."
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
          rotateX={phoneRotateX}
          cropY={0}
        >
          {/* Scanning laser beam overlay (during sale search) */}
          {!showCart && (
            <div
              style={{
                position: "absolute",
                top: laserY,
                left: 20,
                right: 20,
                height: 3,
                background: "linear-gradient(90deg, transparent 0%, #4FAE87 20%, #F5C874 50%, #4FAE87 80%, transparent 100%)",
                boxShadow: "0 0 15px #4FAE87, 0 0 30px #F5C874",
                opacity: laserOpacity,
                zIndex: 40,
                pointerEvents: "none",
              }}
            />
          )}

          {/* Sale Success Checkmark Overlay */}
          {frame >= 105 && (
            <div
              style={{
                position: "absolute",
                bottom: 85,
                left: "50%",
                transform: `translateX(-50%) scale(${saleBadgeScale})`,
                opacity: saleBadgeOpacity,
                background: "rgba(30, 158, 100, 0.95)",
                border: "2px solid #FFFFFF",
                borderRadius: 24,
                padding: "10px 22px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "0 10px 30px rgba(0,0,0,0.6), 0 0 25px rgba(30, 158, 100, 0.8)",
                zIndex: 45,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 20 }}>✅</span>
              <span
                className="font-heading"
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#FFFFFF",
                }}
              >
                Sale Completed: Rs 180,000
              </span>
            </div>
          )}
        </PhoneMockup>

        {/* Bottom Feature Pill Badge */}
        <FeatureBadge
          icon="⚡"
          label="Barcode Scanning • Cash & Khata • Instant Receipts"
          delay={25}
          variant="glass"
          bottom={110}
        />
      </div>
    </AbsoluteFill>
  );
};
