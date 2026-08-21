import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../config/brand";
import { Background } from "../components/Background";

export const Scene1_ProblemHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Top header entrance spring
  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 110 },
  });
  const headerY = interpolate(headerSpring, [0, 1], [-40, 0]);
  const headerOpacity = interpolate(headerSpring, [0, 1], [0, 1]);

  // Card 1: Khata Disaster (Entrance frame 12)
  const card1Spring = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 12, stiffness: 130 },
  });
  const card1Scale = interpolate(card1Spring, [0, 1], [0.75, 1]);
  const card1X = interpolate(card1Spring, [0, 1], [-140, 0]);
  const card1Opacity = interpolate(card1Spring, [0, 1], [0, 1]);

  // Card 2: Stockout Disaster (Entrance frame 32)
  const card2Spring = spring({
    frame: Math.max(0, frame - 32),
    fps,
    config: { damping: 12, stiffness: 130 },
  });
  const card2Scale = interpolate(card2Spring, [0, 1], [0.75, 1]);
  const card2X = interpolate(card2Spring, [0, 1], [140, 0]);
  const card2Opacity = interpolate(card2Spring, [0, 1], [0, 1]);

  // Card 3: Repair Dispute (Entrance frame 52)
  const card3Spring = spring({
    frame: Math.max(0, frame - 52),
    fps,
    config: { damping: 12, stiffness: 130 },
  });
  const card3Scale = interpolate(card3Spring, [0, 1], [0.75, 1]);
  const card3Y = interpolate(card3Spring, [0, 1], [80, 0]);
  const card3Opacity = interpolate(card3Spring, [0, 1], [0, 1]);

  // Live Loss Meter HUD (Frame 75+)
  const lossSpring = spring({
    frame: Math.max(0, frame - 75),
    fps,
    config: { damping: 11, stiffness: 140 },
  });
  const lossScale = interpolate(lossSpring, [0, 1], [0.65, 1]);
  const lossOpacity = interpolate(lossSpring, [0, 1], [0, 1]);

  // Loss counter animation from -Rs 15,000 to -Rs 85,000
  const lossValue = Math.floor(
    interpolate(frame, [75, 135], [15000, 85000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const lossProgress = interpolate(frame, [75, 135], [15, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dynamic danger pulse
  const dangerPulse = Math.sin(frame / 4) * 0.18 + 0.82;

  // Floating ambient micro-motion
  const float1 = Math.sin(frame / 12) * 5;
  const float2 = Math.cos(frame / 14) * 6;
  const float3 = Math.sin((frame + 20) / 10) * 4;

  // Resolution turning point (frame 142+)
  const resolutionSpring = spring({
    frame: Math.max(0, frame - 142),
    fps,
    config: { damping: 11, stiffness: 110 },
  });
  const resScale = interpolate(resolutionSpring, [0, 1], [0.75, 1]);
  const resOpacity = interpolate(resolutionSpring, [0, 1], [0, 1]);
  const resTranslateY = interpolate(resolutionSpring, [0, 1], [50, 0]);

  // Chaos elements fade down slightly during resolution reveal
  const chaosFade = interpolate(frame, [142, 175], [1, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene exit transition
  const exitProgress = interpolate(frame, [178, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 1.06]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background accentColor="#D3543F" glowIntensity={1.35} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${exitScale})`,
          opacity: exitOpacity,
        }}
      >
        {/* Subtle Ambient Red Alert Flare */}
        <div
          style={{
            position: "absolute",
            top: 220,
            width: 860,
            height: 860,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(227, 80, 53, 0.38) 0%, rgba(185, 40, 20, 0.15) 50%, transparent 75%)",
            filter: "blur(80px)",
            opacity: dangerPulse * chaosFade,
            pointerEvents: "none",
          }}
        />

        {/* Ambient Grid overlay for high-tech look */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(227, 80, 53, 0.12) 1.5px, transparent 1.5px)",
            backgroundSize: "36px 36px",
            opacity: 0.6 * chaosFade,
            pointerEvents: "none",
          }}
        />

        {/* Top Header */}
        <div
          style={{
            position: "absolute",
            top: 130,
            textAlign: "center",
            padding: "0 36px",
            transform: `translateY(${headerY}px)`,
            opacity: headerOpacity,
            zIndex: 10,
          }}
        >
          {/* Urgent Alert Pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 24px",
              borderRadius: 30,
              background: "rgba(227, 80, 53, 0.22)",
              border: "1.5px solid rgba(227, 80, 53, 0.65)",
              boxShadow: "0 0 30px rgba(227, 80, 53, 0.45)",
              color: "#FFA090",
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            <span style={{ transform: `scale(${dangerPulse})`, display: "inline-block" }}>🚨</span>
            <span>The Daily Retail Reality</span>
          </div>

          <h1
            className="font-heading"
            style={{
              fontSize: 54,
              fontWeight: 900,
              lineHeight: 1.16,
              color: BRAND.colors.textLight,
              margin: 0,
            }}
          >
            Still Running Your Mobile Shop on{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FFA090 0%, #FF5A36 50%, #FF2200 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 40px rgba(227, 80, 53, 0.7)",
              }}
            >
              Paper & Memory?
            </span>
          </h1>
        </div>

        {/* Dynamic Retail Chaos Visual Stage */}
        <div
          style={{
            position: "absolute",
            top: 385,
            width: "100%",
            maxWidth: 980,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 22,
            padding: "0 36px",
            boxSizing: "border-box",
            opacity: chaosFade,
          }}
        >
          {/* Card 1: Khata Disaster */}
          <div
            style={{
              width: "100%",
              borderRadius: 24,
              background: "linear-gradient(135deg, rgba(32, 14, 12, 0.95) 0%, rgba(18, 9, 8, 0.98) 100%)",
              border: "1.5px solid rgba(227, 80, 53, 0.55)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(227, 80, 53, 0.25)",
              padding: "20px 26px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transform: `translateX(${card1X}px) translateY(${float1}px) rotate(-1.5deg) scale(${card1Scale})`,
              opacity: card1Opacity,
              backdropFilter: "blur(18px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 20,
                  background: "rgba(227, 80, 53, 0.28)",
                  border: "1.5px solid rgba(227, 80, 53, 0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  flexShrink: 0,
                  boxShadow: "0 0 20px rgba(227, 80, 53, 0.4)",
                }}
              >
                📕
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  className="font-heading"
                  style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF" }}
                >
                  Lost Khatas & Forgotten Udhaar
                </span>
                <span style={{ fontSize: 16, color: "#FFA090", fontWeight: 500 }}>
                  "Kis se kitna lena tha? Register kahan gaya?"
                </span>
              </div>
            </div>

            <div
              style={{
                padding: "9px 18px",
                borderRadius: 14,
                background: "rgba(227, 80, 53, 0.35)",
                border: "1.5px solid rgba(227, 80, 53, 0.8)",
                color: "#FFA090",
                fontSize: 16,
                fontWeight: 800,
                whiteSpace: "nowrap",
                boxShadow: "0 0 15px rgba(227, 80, 53, 0.4)",
              }}
            >
              Rs 450,000+ Phansa Hua
            </div>
          </div>

          {/* Card 2: Blind Stockouts */}
          <div
            style={{
              width: "100%",
              borderRadius: 24,
              background: "linear-gradient(135deg, rgba(34, 20, 10, 0.95) 0%, rgba(18, 12, 6, 0.98) 100%)",
              border: "1.5px solid rgba(227, 163, 53, 0.55)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(227, 163, 53, 0.25)",
              padding: "20px 26px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transform: `translateX(${card2X}px) translateY(${float2}px) rotate(1.5deg) scale(${card2Scale})`,
              opacity: card2Opacity,
              backdropFilter: "blur(18px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 20,
                  background: "rgba(227, 163, 53, 0.28)",
                  border: "1.5px solid rgba(227, 163, 53, 0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  flexShrink: 0,
                  boxShadow: "0 0 20px rgba(227, 163, 53, 0.4)",
                }}
              >
                📦
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  className="font-heading"
                  style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF" }}
                >
                  Blind Stockouts & Missed Sales
                </span>
                <span style={{ fontSize: 16, color: "#F5C874", fontWeight: 500 }}>
                  Customer ready to buy, but product khatam!
                </span>
              </div>
            </div>

            <div
              style={{
                padding: "9px 18px",
                borderRadius: 14,
                background: "rgba(227, 163, 53, 0.35)",
                border: "1.5px solid rgba(227, 163, 53, 0.8)",
                color: "#F5C874",
                fontSize: 16,
                fontWeight: 800,
                whiteSpace: "nowrap",
                boxShadow: "0 0 15px rgba(227, 163, 53, 0.4)",
              }}
            >
              Lost Rs 85,000 Sale
            </div>
          </div>

          {/* Card 3: Repair Lab Disputes */}
          <div
            style={{
              width: "100%",
              borderRadius: 24,
              background: "linear-gradient(135deg, rgba(16, 24, 36, 0.95) 0%, rgba(10, 15, 24, 0.98) 100%)",
              border: "1.5px solid rgba(62, 124, 177, 0.55)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(62, 124, 177, 0.25)",
              padding: "20px 26px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transform: `translateY(${card3Y + float3}px) scale(${card3Scale})`,
              opacity: card3Opacity,
              backdropFilter: "blur(18px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 20,
                  background: "rgba(62, 124, 177, 0.28)",
                  border: "1.5px solid rgba(62, 124, 177, 0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  flexShrink: 0,
                  boxShadow: "0 0 20px rgba(62, 124, 177, 0.4)",
                }}
              >
                🔧
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  className="font-heading"
                  style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF" }}
                >
                  Untracked Repairs & Lost Slips
                </span>
                <span style={{ fontSize: 16, color: "#95C6EF", fontWeight: 500 }}>
                  "Bhai mera phone kab milega? Status kya hai?"
                </span>
              </div>
            </div>

            <div
              style={{
                padding: "9px 18px",
                borderRadius: 14,
                background: "rgba(62, 124, 177, 0.35)",
                border: "1.5px solid rgba(62, 124, 177, 0.8)",
                color: "#95C6EF",
                fontSize: 16,
                fontWeight: 800,
                whiteSpace: "nowrap",
                boxShadow: "0 0 15px rgba(62, 124, 177, 0.4)",
              }}
            >
              14 Disputed Tickets
            </div>
          </div>
        </div>

        {/* Bottom Financial Loss HUD (Frames 75 to 142) */}
        {frame >= 74 && frame < 148 && (
          <div
            style={{
              position: "absolute",
              bottom: 110,
              width: 820,
              transform: `scale(${lossScale})`,
              opacity: lossOpacity,
              background: "linear-gradient(135deg, rgba(42, 12, 10, 0.96) 0%, rgba(22, 8, 7, 0.98) 100%)",
              border: "2px solid rgba(227, 80, 53, 0.85)",
              boxShadow: "0 25px 70px rgba(0,0,0,0.9), 0 0 45px rgba(227, 80, 53, 0.55)",
              borderRadius: 32,
              padding: "20px 36px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              zIndex: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 36 }}>💸</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      letterSpacing: "1.5px",
                      color: "#FFA090",
                      textTransform: "uppercase",
                    }}
                  >
                    Estimated Monthly Loss From Chaos
                  </span>
                  <span
                    className="font-heading"
                    style={{
                      fontSize: 36,
                      fontWeight: 900,
                      color: "#FFFFFF",
                      letterSpacing: "0.5px",
                    }}
                  >
                    -Rs {lossValue.toLocaleString()}
                    <span style={{ fontSize: 18, color: "#FFA090", marginLeft: 6 }}>/ month</span>
                  </span>
                </div>
              </div>

              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: 12,
                  background: "rgba(227, 80, 53, 0.3)",
                  border: "1px solid rgba(227, 80, 53, 0.7)",
                  color: "#FFA090",
                  fontSize: 13,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                CRITICAL LOSS
              </div>
            </div>

            {/* Live Climbing Danger Progress Bar */}
            <div
              style={{
                width: "100%",
                height: 8,
                borderRadius: 8,
                background: "rgba(255, 255, 255, 0.1)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${lossProgress}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #FFA090 0%, #E35035 50%, #FF2200 100%)",
                  boxShadow: "0 0 15px #FF2200",
                }}
              />
            </div>
          </div>
        )}

        {/* Resolution Turning Point (Frames 142+) */}
        {frame >= 140 && (
          <div
            style={{
              position: "absolute",
              bottom: 130,
              transform: `translateY(${resTranslateY}px) scale(${resScale})`,
              opacity: resOpacity,
              background: "linear-gradient(135deg, rgba(14, 111, 78, 0.98) 0%, rgba(6, 61, 43, 0.98) 100%)",
              border: "2.5px solid rgba(79, 174, 135, 0.95)",
              boxShadow: "0 30px 70px rgba(14, 111, 78, 0.75), 0 0 50px rgba(245, 200, 116, 0.45)",
              borderRadius: 50,
              padding: "26px 54px",
              display: "flex",
              alignItems: "center",
              gap: 22,
              zIndex: 30,
            }}
          >
            <span style={{ fontSize: 40 }}>✨</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                className="font-heading"
                style={{
                  fontSize: 34,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  letterSpacing: "0.5px",
                }}
              >
                Stop The Chaos. Upgrade Your Shop.
              </span>
              <span
                style={{
                  fontSize: 17,
                  color: BRAND.colors.secondaryLight,
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                }}
              >
                Take 100% Control with NIZAAM
              </span>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
