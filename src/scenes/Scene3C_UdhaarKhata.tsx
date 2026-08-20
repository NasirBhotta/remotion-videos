import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../config/brand";
import { Background } from "../components/Background";
import { PhoneMockup } from "../components/PhoneMockup";
import { KineticHeading } from "../components/KineticHeading";
import { FeatureBadge } from "../components/FeatureBadge";

export const Scene3C_UdhaarKhata: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance phone spring
  const phoneEntrance = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 90 },
  });

  const phoneScale = interpolate(phoneEntrance, [0, 1], [0.85, 1.08]);
  const phoneTranslateY = interpolate(phoneEntrance, [0, 1], [80, 50]);
  const phoneRotateY = interpolate(phoneEntrance, [0, 1], [14, -3]);

  // Subtle continuous drift
  const driftRotateY = phoneRotateY + Math.sin(frame / 22) * 1.5;
  const driftTranslateY = phoneTranslateY + Math.cos(frame / 20) * 6;

  // Zoom into Udhar section of dashboard-end
  const phoneZoom = interpolate(frame, [0, 45], [1, 1.2], {
    extrapolateRight: "clamp",
  });
  const phoneCropY = interpolate(frame, [0, 45], [0, 25], {
    extrapolateRight: "clamp",
  });

  // Reminder button pulse
  const reminderButtonPulse = Math.sin(frame / 5) * 0.1 + 0.9;

  // Reminder sent popover spring (frame 75+)
  const reminderSpring = spring({
    frame: Math.max(0, frame - 70),
    fps,
    config: { damping: 11, stiffness: 130 },
  });
  const reminderScale = interpolate(reminderSpring, [0, 1], [0.6, 1]);
  const reminderOpacity = interpolate(reminderSpring, [0, 1], [0, 1]);

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
          tag="Digital Khata & Collections"
          tagIcon="💸"
          title="Zero Udhaar"
          highlight="Forgotten."
          subtitle="Automated customer ledgers with 1-tap WhatsApp payment reminders."
          delay={0}
          highlightColor="gold"
          positionTop={120}
        />

        {/* 3D Floating Phone Mockup */}
        <PhoneMockup
          imageSrc={BRAND.assets.mobile.dashboardEnd}
          width={500}
          height={1000}
          scale={phoneScale}
          translateY={driftTranslateY}
          rotateY={driftRotateY}
          rotateX={4}
          zoom={phoneZoom}
          cropY={phoneCropY}
        >
          {/* Pulsing Highlight on [ Send Reminder ] button */}
          {frame >= 25 && frame < 70 && (
            <div
              style={{
                position: "absolute",
                top: 400,
                left: 30,
                width: 170,
                height: 48,
                borderRadius: 8,
                border: "2px solid #1E9E64",
                boxShadow: "0 0 25px rgba(30, 158, 100, 0.8)",
                transform: `scale(${reminderButtonPulse})`,
                pointerEvents: "none",
                zIndex: 35,
              }}
            />
          )}

          {/* Reminder Sent Toast Card */}
          {frame >= 70 && (
            <div
              style={{
                position: "absolute",
                top: 360,
                left: "50%",
                transform: `translateX(-50%) scale(${reminderScale})`,
                opacity: reminderOpacity,
                background: "rgba(14, 111, 78, 0.95)",
                border: "2px solid #F5C874",
                borderRadius: 20,
                padding: "12px 24px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                boxShadow: "0 15px 40px rgba(0,0,0,0.7), 0 0 30px rgba(245, 200, 116, 0.5)",
                zIndex: 45,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 24 }}>📲</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  className="font-heading"
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#FFFFFF",
                  }}
                >
                  Payment Reminder Sent!
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: "#F5C874",
                    fontWeight: 600,
                  }}
                >
                  Nasir • Due: Rs 410
                </span>
              </div>
            </div>
          )}
        </PhoneMockup>

        {/* Bottom Feature Pill Badge */}
        <FeatureBadge
          icon="💬"
          label="1-Tap WhatsApp Reminders • Lifetime Customer History • Khata Settlements"
          delay={25}
          variant="glass"
          bottom={110}
        />
      </div>
    </AbsoluteFill>
  );
};
