import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../config/brand";
import { Background } from "../components/Background";

export const Scene5_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3D Logo entrance
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 85 },
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.4, 1]);
  const logoRotateY = interpolate(logoSpring, [0, 1], [-20, 0]);
  const logoRotateX = interpolate(logoSpring, [0, 1], [15, 0]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // Subtle breathing float for the logo
  const logoFloat = Math.sin(frame / 20) * 8;

  // Typography entrance
  const brandNameSpring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 13, stiffness: 95 },
  });

  const brandNameY = interpolate(brandNameSpring, [0, 1], [40, 0]);
  const brandNameOpacity = interpolate(brandNameSpring, [0, 1], [0, 1]);

  // Slogan entrance
  const sloganSpring = spring({
    frame: Math.max(0, frame - 32),
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const sloganY = interpolate(sloganSpring, [0, 1], [30, 0]);
  const sloganOpacity = interpolate(sloganSpring, [0, 1], [0, 1]);

  // Subtitle / platform chips entrance
  const chipsSpring = spring({
    frame: Math.max(0, frame - 48),
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  const chipsY = interpolate(chipsSpring, [0, 1], [25, 0]);
  const chipsOpacity = interpolate(chipsSpring, [0, 1], [0, 1]);

  // Radiant flare expansion
  const flareScale = interpolate(frame, [0, 90], [0.8, 1.5], {
    extrapolateRight: "clamp",
  });
  const flareOpacity = interpolate(frame, [0, 40, 160], [0, 0.9, 0.7]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background accentColor={BRAND.colors.primaryLight} glowIntensity={1.5} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Ambient Flare Behind Logo */}
        <div
          style={{
            position: "absolute",
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(227, 163, 53, 0.4) 0%, rgba(14, 111, 78, 0.45) 45%, transparent 70%)",
            filter: "blur(60px)",
            transform: `scale(${flareScale})`,
            opacity: flareOpacity,
            pointerEvents: "none",
          }}
        />

        {/* 3D NIZAAM Logo Emblem */}
        <div
          style={{
            position: "relative",
            width: 380,
            height: 380,
            perspective: 1200,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: `translateY(${logoFloat}px) scale(${logoScale}) rotateX(${logoRotateX}deg) rotateY(${logoRotateY}deg)`,
              opacity: logoOpacity,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              filter: "drop-shadow(0 30px 60px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 60px rgba(79, 174, 135, 0.6))",
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

        {/* NIZAAM Brand Title */}
        <div
          style={{
            textAlign: "center",
            transform: `translateY(${brandNameY}px)`,
            opacity: brandNameOpacity,
            marginBottom: 16,
          }}
        >
          <h1
            className="font-heading"
            style={{
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: "4px",
              margin: 0,
              background: "linear-gradient(135deg, #FFFFFF 0%, #F5C874 50%, #E3A335 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 10px 40px rgba(0,0,0,0.9)",
            }}
          >
            NIZAAM
          </h1>
        </div>

        {/* Core Slogan */}
        <div
          style={{
            textAlign: "center",
            transform: `translateY(${sloganY}px)`,
            opacity: sloganOpacity,
            marginBottom: 36,
          }}
        >
          <p
            className="font-heading"
            style={{
              fontSize: 38,
              fontWeight: 800,
              color: BRAND.colors.secondaryLight,
              margin: 0,
              letterSpacing: "0.5px",
            }}
          >
            Run your shop smarter.
          </p>
          <p
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: BRAND.colors.textMuted,
              marginTop: 10,
              margin: 0,
            }}
          >
            One system for sales, stock, khata, and repairs.
          </p>
        </div>

        {/* Platform Ecosystem Pills */}
        <div
          style={{
            display: "flex",
            gap: 16,
            transform: `translateY(${chipsY}px)`,
            opacity: chipsOpacity,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 24px",
              borderRadius: 30,
              background: "rgba(14, 111, 78, 0.35)",
              border: "1px solid rgba(79, 174, 135, 0.5)",
              fontSize: 18,
              fontWeight: 700,
              color: "#FFFFFF",
              backdropFilter: "blur(12px)",
            }}
          >
            <span>📱</span>
            <span>Mobile App</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 24px",
              borderRadius: 30,
              background: "rgba(14, 111, 78, 0.35)",
              border: "1px solid rgba(79, 174, 135, 0.5)",
              fontSize: 18,
              fontWeight: 700,
              color: "#FFFFFF",
              backdropFilter: "blur(12px)",
            }}
          >
            <span>💻</span>
            <span>Desktop Web</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
