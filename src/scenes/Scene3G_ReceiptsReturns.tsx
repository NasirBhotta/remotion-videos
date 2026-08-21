import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../config/brand";
import { Background } from "../components/Background";
import { PhoneMockup } from "../components/PhoneMockup";
import { KineticHeading } from "../components/KineticHeading";
import { FeatureBadge } from "../components/FeatureBadge";

export const Scene3G_ReceiptsReturns: React.FC = () => {
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
  const phoneRotateY = interpolate(phoneEntrance, [0, 1], [14, -4]);

  // Subtle continuous drift
  const driftRotateY = phoneRotateY + Math.sin(frame / 22) * 1.5;
  const driftTranslateY = phoneTranslateY + Math.cos(frame / 20) * 6;

  // Switch between Receipts and Returns
  const showReturn = frame >= 75;
  const activeImage = showReturn
    ? BRAND.assets.mobile.return
    : BRAND.assets.mobile.receipts;

  // Bluetooth printer connect spring
  const printSpring = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 11, stiffness: 130 },
  });
  const printScale = interpolate(printSpring, [0, 1], [0.6, 1]);
  const printOpacity = interpolate(printSpring, [0, 1], [0, 1]);

  // Return processed spring toast
  const returnSpring = spring({
    frame: Math.max(0, frame - 85),
    fps,
    config: { damping: 11, stiffness: 130 },
  });
  const returnScale = interpolate(returnSpring, [0, 1], [0.6, 1]);
  const returnOpacity = interpolate(returnSpring, [0, 1], [0, 1]);

  // Scene exit transition
  const exitProgress = interpolate(frame, [155, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.92]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background accentColor="#E3A335" glowIntensity={1.2} />

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
          tag="Receipts & Fast Returns"
          tagIcon="🖨️"
          title="Print Slips."
          highlight="Handle Returns."
          subtitle="Instant Bluetooth thermal printing, Urdu branding, and 1-tap customer returns."
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
          rotateX={4}
          cropY={0}
        >
          {/* Bluetooth Printing Overlay Indicator */}
          {!showReturn && frame >= 20 && (
            <div
              style={{
                position: "absolute",
                top: 240,
                left: "50%",
                transform: `translateX(-50%) scale(${printScale})`,
                opacity: printOpacity,
                background: "rgba(14, 28, 22, 0.95)",
                border: "2px solid #E3A335",
                borderRadius: 20,
                padding: "10px 22px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                boxShadow: "0 12px 35px rgba(0,0,0,0.6), 0 0 25px rgba(227, 163, 53, 0.5)",
                zIndex: 40,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 22 }}>🖨️</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  className="font-heading"
                  style={{ fontSize: 16, fontWeight: 800, color: "#FFFFFF" }}
                >
                  Bluetooth Printer Connected
                </span>
                <span style={{ fontSize: 13, color: "#F5C874", fontWeight: 600 }}>
                  58mm / 80mm Slip Printed Instantly
                </span>
              </div>
            </div>
          )}

          {/* Return & Refund Processed Toast */}
          {showReturn && frame >= 85 && (
            <div
              style={{
                position: "absolute",
                bottom: 80,
                left: "50%",
                transform: `translateX(-50%) scale(${returnScale})`,
                opacity: returnOpacity,
                background: "rgba(14, 111, 78, 0.95)",
                border: "2px solid #4FAE87",
                borderRadius: 22,
                padding: "12px 24px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                boxShadow: "0 15px 40px rgba(0,0,0,0.7), 0 0 30px rgba(79, 174, 135, 0.6)",
                zIndex: 45,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 22 }}>🔄</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  className="font-heading"
                  style={{ fontSize: 16, fontWeight: 800, color: "#FFFFFF" }}
                >
                  Return Processed
                </span>
                <span style={{ fontSize: 13, color: "#F5C874", fontWeight: 600 }}>
                  Rs 2,500 Refunded • Stock Restored
                </span>
              </div>
            </div>
          )}
        </PhoneMockup>

        {/* Bottom Feature Pill Badge */}
        <FeatureBadge
          icon="🖨️"
          label="58mm / 80mm Bluetooth Printers • Urdu Branding • 1-Tap Returns"
          delay={25}
          variant="gold"
          bottom={110}
        />
      </div>
    </AbsoluteFill>
  );
};
