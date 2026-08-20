import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../config/brand";
import { Background } from "../components/Background";

const PROBLEMS = [
  {
    icon: "🧾",
    title: "Manual Paper Invoices",
    subtitle: "Lost records & slow checkout",
    color: "#E3A335",
  },
  {
    icon: "📦",
    title: "Unseen Low-Stock Items",
    subtitle: "Missed sales on high-demand stock",
    color: "#D3543F",
  },
  {
    icon: "💸",
    title: "Forgotten Udhaar Khata",
    subtitle: "Uncollected cash bleeding the shop",
    color: "#E3A335",
  },
  {
    icon: "🔧",
    title: "Untracked Phone Repairs",
    subtitle: "Customer disputes & delayed deliveries",
    color: "#3E7CB1",
  },
  {
    icon: "📉",
    title: "Zero Profit Visibility",
    subtitle: "Guessing daily gross profit & cash flow",
    color: "#D3543F",
  },
];

export const Scene1_ProblemHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Intro heading animation
  const headingSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const headingY = interpolate(headingSpring, [0, 1], [40, 0]);
  const headingOpacity = interpolate(headingSpring, [0, 1], [0, 1]);

  // Outro transition before Scene 2 (fade to clear center)
  const exitProgress = interpolate(frame, [170, 205], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const overallScale = interpolate(exitProgress, [0, 1], [1, 1.1]);
  const overallOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  // Resolution statement at the end of Scene 1
  const resolutionSpring = spring({
    frame: Math.max(0, frame - 135),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const resScale = interpolate(resolutionSpring, [0, 1], [0.85, 1]);
  const resOpacity = interpolate(resolutionSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background accentColor="#D3543F" glowIntensity={0.8} />

      {/* Main Container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${overallScale})`,
          opacity: overallOpacity,
        }}
      >
        {/* Top Problem Header */}
        <div
          style={{
            position: "absolute",
            top: 150,
            textAlign: "center",
            padding: "0 40px",
            transform: `translateY(${headingY}px)`,
            opacity: headingOpacity,
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 18px",
              borderRadius: 30,
              background: "rgba(211, 84, 63, 0.2)",
              border: "1px solid rgba(211, 84, 63, 0.4)",
              color: "#F58774",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            <span>⚠️</span> The Reality of Mobile Retail
          </div>

          <h1
            className="font-heading"
            style={{
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.1,
              color: BRAND.colors.textLight,
              margin: 0,
            }}
          >
            Running a shop on paper{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #F58774 0%, #D3543F 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              is costing you.
            </span>
          </h1>
        </div>

        {/* Problem Stack Cards */}
        <div
          style={{
            position: "absolute",
            top: 420,
            width: "100%",
            maxWidth: 920,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            padding: "0 40px",
            boxSizing: "border-box",
          }}
        >
          {PROBLEMS.map((prob, idx) => {
            const cardDelay = 22 + idx * 14;
            const cardSpring = spring({
              frame: Math.max(0, frame - cardDelay),
              fps,
              config: { damping: 13, stiffness: 120 },
            });

            const cardX = interpolate(cardSpring, [0, 1], [idx % 2 === 0 ? -60 : 60, 0]);
            const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);
            const cardScale = interpolate(cardSpring, [0, 1], [0.94, 1]);

            // Slight dynamic float
            const floatOffset = Math.sin((frame + idx * 20) / 15) * 3;

            return (
              <div
                key={prob.title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "22px 28px",
                  borderRadius: 22,
                  background: "linear-gradient(135deg, rgba(22, 18, 16, 0.85) 0%, rgba(12, 10, 8, 0.9) 100%)",
                  border: `1px solid ${prob.color}40`,
                  boxShadow: `0 14px 35px -8px rgba(0, 0, 0, 0.7), 0 0 20px ${prob.color}15`,
                  transform: `translateX(${cardX}px) translateY(${floatOffset}px) scale(${cardScale})`,
                  opacity: cardOpacity,
                  backdropFilter: "blur(14px)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      backgroundColor: `${prob.color}25`,
                      border: `1px solid ${prob.color}60`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 28,
                      flexShrink: 0,
                    }}
                  >
                    {prob.icon}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div
                      className="font-heading"
                      style={{
                        fontSize: 26,
                        fontWeight: 700,
                        color: BRAND.colors.textLight,
                      }}
                    >
                      {prob.title}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        color: BRAND.colors.textMuted,
                        fontWeight: 500,
                      }}
                    >
                      {prob.subtitle}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: "rgba(211, 84, 63, 0.2)",
                    border: "1px solid rgba(211, 84, 63, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#F58774",
                    fontSize: 16,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  ✕
                </div>
              </div>
            );
          })}
        </div>

        {/* Resolution Statement Badge */}
        {frame > 130 && (
          <div
            style={{
              position: "absolute",
              bottom: 140,
              transform: `scale(${resScale})`,
              opacity: resOpacity,
              background: "linear-gradient(135deg, rgba(14, 111, 78, 0.95) 0%, rgba(6, 61, 43, 0.95) 100%)",
              border: "2px solid rgba(79, 174, 135, 0.8)",
              boxShadow: "0 20px 50px rgba(14, 111, 78, 0.6), 0 0 30px rgba(245, 200, 116, 0.3)",
              borderRadius: 50,
              padding: "20px 44px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              zIndex: 20,
            }}
          >
            <span style={{ fontSize: 32 }}>✨</span>
            <span
              className="font-heading"
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "0.5px",
              }}
            >
              Time to upgrade your shop.
            </span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
