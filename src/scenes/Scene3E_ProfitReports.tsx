import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../config/brand";
import { Background } from "../components/Background";
import { PhoneMockup } from "../components/PhoneMockup";
import { KineticHeading } from "../components/KineticHeading";
import { FeatureBadge } from "../components/FeatureBadge";
import { MetricCounter } from "../components/MetricCounter";

export const Scene3E_ProfitReports: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance phone spring
  const phoneEntrance = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 90 },
  });

  const phoneScale = interpolate(phoneEntrance, [0, 1], [0.85, 1.05]);
  const phoneTranslateY = interpolate(phoneEntrance, [0, 1], [80, 50]);
  const phoneRotateY = interpolate(phoneEntrance, [0, 1], [15, -4]);

  // Subtle continuous drift
  const driftRotateY = phoneRotateY + Math.sin(frame / 22) * 1.5;
  const driftTranslateY = phoneTranslateY + Math.cos(frame / 20) * 6;

  // Floating metric cards animation
  const card1Spring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const card2Spring = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const card3Spring = spring({
    frame: Math.max(0, frame - 45),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Scene exit transition
  const exitProgress = interpolate(frame, [155, 180], [0, 1], {
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
          tag="Real-Time Analytics & Profit"
          tagIcon="📊"
          title="Know Your"
          highlight="True Numbers."
          subtitle="Realized gross profit, multi-account liquidity, and complete cash flow."
          delay={0}
          highlightColor="gold"
          positionTop={120}
        />

        {/* 3D Floating Phone Mockup */}
        <PhoneMockup
          imageSrc={BRAND.assets.mobile.dashboard}
          width={500}
          height={1000}
          scale={phoneScale}
          translateY={driftTranslateY}
          rotateY={driftRotateY}
          rotateX={4}
          cropY={0}
        />

        {/* Floating Real-Time Metric Overlay Cards */}
        {/* Metric 1: Today Sales */}
        <div
          style={{
            position: "absolute",
            top: 480,
            left: 50,
            zIndex: 35,
            transform: `translateX(${interpolate(card1Spring, [0, 1], [-80, 0])}px) scale(${interpolate(card1Spring, [0, 1], [0.8, 1])})`,
            opacity: interpolate(card1Spring, [0, 1], [0, 1]),
          }}
        >
          <MetricCounter
            targetValue={189200}
            label="Today Sales"
            icon="💳"
            duration={40}
            delay={15}
            highlightColor="#FFFFFF"
            style={{
              background: "linear-gradient(135deg, rgba(17, 137, 95, 0.9) 0%, rgba(10, 76, 53, 0.95) 100%)",
              border: "2px solid rgba(79, 174, 135, 0.6)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.6), 0 0 25px rgba(79, 174, 135, 0.4)",
            }}
          />
        </div>

        {/* Metric 2: Today Gross Profit */}
        <div
          style={{
            position: "absolute",
            top: 640,
            right: 50,
            zIndex: 35,
            transform: `translateX(${interpolate(card2Spring, [0, 1], [80, 0])}px) scale(${interpolate(card2Spring, [0, 1], [0.8, 1])})`,
            opacity: interpolate(card2Spring, [0, 1], [0, 1]),
          }}
        >
          <MetricCounter
            targetValue={60000}
            label="Gross Profit"
            icon="📈"
            duration={45}
            delay={30}
            highlightColor="#F5C874"
            style={{
              background: "linear-gradient(135deg, rgba(30, 24, 16, 0.92) 0%, rgba(18, 14, 10, 0.95) 100%)",
              border: "2px solid rgba(245, 200, 116, 0.6)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.6), 0 0 25px rgba(227, 163, 53, 0.4)",
            }}
          />
        </div>

        {/* Metric 3: Cash In Shop */}
        <div
          style={{
            position: "absolute",
            bottom: 230,
            left: 60,
            zIndex: 35,
            transform: `translateY(${interpolate(card3Spring, [0, 1], [50, 0])}px) scale(${interpolate(card3Spring, [0, 1], [0.8, 1])})`,
            opacity: interpolate(card3Spring, [0, 1], [0, 1]),
          }}
        >
          <MetricCounter
            targetValue={463200}
            label="Cash in Shop"
            icon="💵"
            duration={45}
            delay={45}
            highlightColor="#4FAE87"
            style={{
              background: "linear-gradient(135deg, rgba(14, 28, 22, 0.92) 0%, rgba(6, 16, 12, 0.95) 100%)",
              border: "1px solid rgba(79, 174, 135, 0.4)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
            }}
          />
        </div>

        {/* Bottom Feature Pill Badge */}
        <FeatureBadge
          icon="💰"
          label="Sales • Net Profit • Cash & Bank Wallets • P&L Reports"
          delay={35}
          variant="emerald"
          bottom={110}
        />
      </div>
    </AbsoluteFill>
  );
};
