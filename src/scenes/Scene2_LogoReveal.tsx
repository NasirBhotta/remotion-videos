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
    config: { damping: 11, stiffness: 85 },
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.3, 1.05]);
  const logoRotateY = interpolate(logoSpring, [0, 1], [-30, 0]);
  const logoRotateX = interpolate(logoSpring, [0, 1], [25, 0]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // Continuous subtle 3D float
  const logoFloatY = Math.sin(frame / 20) * 8;
  const ringRotate = (frame * 1.5) % 360;
  const ringRotateReverse = 360 - ((frame * 1.2) % 360);

  // Brand Name typography entrance
  const textSpring = spring({
    frame: Math.max(0, frame - 16),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const textY = interpolate(textSpring, [0, 1], [45, 0]);
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);

  // Subtitle entrance
  const subSpring = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 13, stiffness: 95 },
  });

  const subY = interpolate(subSpring, [0, 1], [35, 0]);
  const subOpacity = interpolate(subSpring, [0, 1], [0, 1]);

  // Pillar chips entrance
  const chipsSpring = spring({
    frame: Math.max(0, frame - 44),
    fps,
    config: { damping: 13, stiffness: 95 },
  });

  const chipsY = interpolate(chipsSpring, [0, 1], [25, 0]);
  const chipsOpacity = interpolate(chipsSpring, [0, 1], [0, 1]);

  // Radial light sweep & shockwave flare
  const flareScale = interpolate(frame, [0, 80], [0.6, 1.5], {
    extrapolateRight: "clamp",
  });
  const flareOpacity = interpolate(frame, [0, 25, 120, 180], [0, 0.95, 0.85, 0.55]);

  // Energy shockwave ring expansion
  const shockwave = interpolate(frame, [0, 45], [0.4, 1.6], {
    extrapolateRight: "clamp",
  });
  const shockwaveOpacity = interpolate(frame, [0, 15, 45], [0, 0.8, 0]);

  // Exit transition
  const exitProgress = interpolate(frame, [155, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 1.08]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background accentColor={BRAND.colors.primaryLight} glowIntensity={1.45} />

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
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(227, 163, 53, 0.4) 0%, rgba(14, 111, 78, 0.45) 42%, transparent 70%)",
            filter: "blur(60px)",
            transform: `scale(${flareScale})`,
            opacity: flareOpacity,
            pointerEvents: "none",
          }}
        />

        {/* Shockwave energy pulse ring */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            border: "3px solid rgba(245, 200, 116, 0.8)",
            boxShadow: "0 0 40px rgba(79, 174, 135, 0.8)",
            transform: `scale(${shockwave})`,
            opacity: shockwaveOpacity,
            pointerEvents: "none",
          }}
        />

        {/* 3D NIZAAM Logo Emblem with Rotating Aura Rings */}
        <div
          style={{
            position: "relative",
            width: 380,
            height: 380,
            perspective: 1200,
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Outer Golden Dotted Aura Ring */}
          <div
            style={{
              position: "absolute",
              width: 370,
              height: 370,
              borderRadius: "50%",
              border: "2px dashed rgba(227, 163, 53, 0.45)",
              transform: `rotate(${ringRotate}deg) scale(${logoScale})`,
              opacity: logoOpacity * 0.8,
              pointerEvents: "none",
            }}
          />

          {/* Inner Emerald Energy Ring */}
          <div
            style={{
              position: "absolute",
              width: 330,
              height: 330,
              borderRadius: "50%",
              border: "1.5px solid rgba(79, 174, 135, 0.5)",
              boxShadow: "0 0 30px rgba(79, 174, 135, 0.3)",
              transform: `rotate(${ringRotateReverse}deg) scale(${logoScale})`,
              opacity: logoOpacity * 0.85,
              pointerEvents: "none",
            }}
          />

          {/* 3D Logo Core */}
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: `translateY(${logoFloatY}px) scale(${logoScale}) rotateX(${logoRotateX}deg) rotateY(${logoRotateY}deg)`,
              opacity: logoOpacity,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              filter: "drop-shadow(0 30px 60px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 55px rgba(79, 174, 135, 0.6))",
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

        {/* Brand Name Title */}
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
              padding: "7px 20px",
              borderRadius: 20,
              background: "rgba(14, 111, 78, 0.3)",
              border: "1.5px solid rgba(79, 174, 135, 0.55)",
              boxShadow: "0 0 20px rgba(79, 174, 135, 0.35)",
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
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: "5px",
              margin: 0,
              color: "#FFFFFF",
              textShadow: "0 10px 40px rgba(0,0,0,0.9)",
              background: "linear-gradient(135deg, #FFFFFF 0%, #F5C874 45%, #E3A335 100%)",
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
            maxWidth: 880,
            padding: "0 40px",
            transform: `translateY(${subY}px)`,
            opacity: subOpacity,
            marginBottom: 36,
          }}
        >
          <p
            style={{
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.35,
              color: BRAND.colors.textLight,
              margin: 0,
            }}
          >
            The Complete Mobile Shop Management System
          </p>
          <p
            style={{
              fontSize: 21,
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
            gap: 14,
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
                padding: "11px 22px",
                borderRadius: 24,
                background: "rgba(14, 111, 78, 0.3)",
                border: "1.5px solid rgba(79, 174, 135, 0.5)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.5), 0 0 20px rgba(79, 174, 135, 0.25)",
                fontSize: 18,
                fontWeight: 700,
                color: BRAND.colors.textLight,
                backdropFilter: "blur(12px)",
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
