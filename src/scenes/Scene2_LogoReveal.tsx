import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../config/brand";
import { Background } from "../components/Background";

export const Scene2_LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for 3D logo
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 80 },
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.35, 1]);
  const logoRotateY = interpolate(logoSpring, [0, 1], [-25, 0]);
  const logoRotateX = interpolate(logoSpring, [0, 1], [20, 0]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // Brand Name typography entrance
  const textSpring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const textY = interpolate(textSpring, [0, 1], [40, 0]);
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);

  // Subtitle entrance
  const subSpring = spring({
    frame: Math.max(0, frame - 32),
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const subY = interpolate(subSpring, [0, 1], [30, 0]);
  const subOpacity = interpolate(subSpring, [0, 1], [0, 1]);

  // Pillar chips entrance
  const chipsSpring = spring({
    frame: Math.max(0, frame - 46),
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const chipsY = interpolate(chipsSpring, [0, 1], [20, 0]);
  const chipsOpacity = interpolate(chipsSpring, [0, 1], [0, 1]);

  // Radial light sweep animation
  const flareScale = interpolate(frame, [0, 90], [0.6, 1.4], {
    extrapolateRight: "clamp",
  });
  const flareOpacity = interpolate(frame, [0, 30, 120, 180], [0, 0.9, 0.8, 0.5]);

  // Exit transition
  const exitProgress = interpolate(frame, [155, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 1.08]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background accentColor={BRAND.colors.primaryLight} glowIntensity={1.4} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${exitScale})`,
          opacity: exitOpacity,
        }}
      >
        {/* Glow Flare Backdrop */}
        <div
          style={{
            position: "absolute",
            width: 750,
            height: 750,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(227, 163, 53, 0.35) 0%, rgba(14, 111, 78, 0.4) 40%, transparent 70%)",
            filter: "blur(50px)",
            transform: `scale(${flareScale})`,
            opacity: flareOpacity,
            pointerEvents: "none",
          }}
        />

        {/* 3D NIZAAM Logo Emblem */}
        <div
          style={{
            position: "relative",
            width: 360,
            height: 360,
            perspective: 1100,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: `scale(${logoScale}) rotateX(${logoRotateX}deg) rotateY(${logoRotateY}deg)`,
              opacity: logoOpacity,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              filter: "drop-shadow(0 30px 60px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 50px rgba(79, 174, 135, 0.5))",
            }}
          >
            <Img
              src={staticFile(BRAND.assets.logo)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Brand Name */}
        <div
          style={{
            textAlign: "center",
            transform: `translateY(${textY}px)`,
            opacity: textOpacity,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 18px",
              borderRadius: 20,
              background: "rgba(14, 111, 78, 0.25)",
              border: "1px solid rgba(79, 174, 135, 0.4)",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: "3px",
              color: BRAND.colors.secondaryLight,
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            <span>✨</span> Introducing
          </div>
          <h1
            className="font-heading"
            style={{
              fontSize: 92,
              fontWeight: 900,
              letterSpacing: "4px",
              margin: 0,
              color: "#FFFFFF",
              textShadow: "0 10px 40px rgba(0,0,0,0.9)",
              background: "linear-gradient(135deg, #FFFFFF 0%, #F5C874 50%, #E3A335 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            NIZAAM
          </h1>
        </div>

        {/* Subtitle */}
        <div
          style={{
            textAlign: "center",
            maxWidth: 860,
            padding: "0 40px",
            transform: `translateY(${subY}px)`,
            opacity: subOpacity,
            marginBottom: 36,
          }}
        >
          <p
            style={{
              fontSize: 28,
              fontWeight: 600,
              lineHeight: 1.35,
              color: BRAND.colors.textLight,
              margin: 0,
            }}
          >
            The Complete Mobile Shop Management System
          </p>
          <p
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: BRAND.colors.textMuted,
              marginTop: 8,
              margin: 0,
            }}
          >
            Engineered for high-efficiency mobile retail & repair businesses.
          </p>
        </div>

        {/* Feature Capability Badges */}
        <div
          style={{
            display: "flex",
            gap: 12,
            transform: `translateY(${chipsY}px)`,
            opacity: chipsOpacity,
          }}
        >
          {[
            { icon: "⚡", label: "Fast POS" },
            { icon: "📦", label: "Smart Stock" },
            { icon: "💸", label: "Digital Khata" },
            { icon: "🔧", label: "Repair Lab" },
          ].map((chip) => (
            <div
              key={chip.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                borderRadius: 24,
                background: "rgba(14, 111, 78, 0.25)",
                border: "1px solid rgba(79, 174, 135, 0.4)",
                fontSize: 18,
                fontWeight: 700,
                color: BRAND.colors.textLight,
                backdropFilter: "blur(10px)",
              }}
            >
              <span>{chip.icon}</span>
              <span>{chip.label}</span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
