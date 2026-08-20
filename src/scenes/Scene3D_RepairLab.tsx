import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../config/brand";
import { Background } from "../components/Background";
import { PhoneMockup } from "../components/PhoneMockup";
import { KineticHeading } from "../components/KineticHeading";
import { FeatureBadge } from "../components/FeatureBadge";

const STATUS_STAGES = [
  { label: "Received", color: "#3E7CB1", icon: "📥" },
  { label: "Diagnosed", color: "#8E44AD", icon: "🔍" },
  { label: "In Progress", color: "#E3A335", icon: "⚙️" },
  { label: "Completed", color: "#1E9E64", icon: "✅" },
  { label: "Delivered", color: "#0E6F4E", icon: "📦" },
];

export const Scene3D_RepairLab: React.FC = () => {
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
  const phoneRotateY = interpolate(phoneEntrance, [0, 1], [-12, 3]);

  // Subtle continuous drift
  const driftRotateY = phoneRotateY + Math.sin(frame / 22) * 1.5;
  const driftTranslateY = phoneTranslateY + Math.cos(frame / 24) * 6;

  // Active status stage animation progression
  const stageIndex = Math.min(
    STATUS_STAGES.length - 1,
    Math.floor(interpolate(frame, [30, 140], [0, STATUS_STAGES.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }))
  );

  // Status update pill spring
  const statusUpdateSpring = spring({
    frame: Math.max(0, frame - 80),
    fps,
    config: { damping: 10, stiffness: 140 },
  });
  const statusScale = interpolate(statusUpdateSpring, [0, 1], [0.6, 1]);
  const statusOpacity = interpolate(statusUpdateSpring, [0, 1], [0, 1]);

  // Scene exit transition
  const exitProgress = interpolate(frame, [155, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.92]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background accentColor="#3E7CB1" glowIntensity={1.1} />

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
          tag="Repair Lab & Service Management"
          tagIcon="🔧"
          title="Track Every"
          highlight="Repair."
          subtitle="Intake tickets, parts tracking, status pipeline, and technician slips."
          delay={0}
          highlightColor="emerald"
          positionTop={120}
        />

        {/* 3D Floating Phone Mockup */}
        <PhoneMockup
          imageSrc={BRAND.assets.mobile.repairTicket}
          width={500}
          height={1000}
          scale={phoneScale}
          translateY={driftTranslateY}
          rotateY={driftRotateY}
          rotateX={4}
          cropY={0}
        >
          {/* Real-time Status Progression Overlay */}
          <div
            style={{
              position: "absolute",
              top: 140,
              left: 20,
              right: 20,
              background: "rgba(14, 28, 22, 0.92)",
              border: `2px solid ${STATUS_STAGES[stageIndex].color}`,
              borderRadius: 18,
              padding: "12px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: `0 10px 30px rgba(0,0,0,0.6), 0 0 20px ${STATUS_STAGES[stageIndex].color}60`,
              zIndex: 35,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>{STATUS_STAGES[stageIndex].icon}</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 12, color: BRAND.colors.textMuted, fontWeight: 600 }}>
                  CURRENT STAGE
                </span>
                <span
                  className="font-heading"
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: STATUS_STAGES[stageIndex].color,
                  }}
                >
                  {STATUS_STAGES[stageIndex].label}
                </span>
              </div>
            </div>

            <div
              style={{
                padding: "4px 12px",
                borderRadius: 12,
                backgroundColor: `${STATUS_STAGES[stageIndex].color}25`,
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              REP-20260820
            </div>
          </div>

          {/* Status Update Confirmation (frame 80+) */}
          {frame >= 80 && (
            <div
              style={{
                position: "absolute",
                bottom: 80,
                left: "50%",
                transform: `translateX(-50%) scale(${statusScale})`,
                opacity: statusOpacity,
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
              <span style={{ fontSize: 20 }}>📲</span>
              <span
                className="font-heading"
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#FFFFFF",
                }}
              >
                Customer Notified of Progress
              </span>
            </div>
          )}
        </PhoneMockup>

        {/* Bottom Feature Pill Badge */}
        <FeatureBadge
          icon="🛠️"
          label="Intake Slips • Spare Parts Tracking • Ready for Delivery Alerts"
          delay={25}
          variant="glass"
          bottom={110}
        />
      </div>
    </AbsoluteFill>
  );
};
