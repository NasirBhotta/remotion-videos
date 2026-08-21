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

  const logoScale = interpolate(logoSpring, [0, 1], [0.35, 1.05]);
  const logoRotateY = interpolate(logoSpring, [0, 1], [-20, 0]);
  const logoRotateX = interpolate(logoSpring, [0, 1], [15, 0]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // Subtle breathing float for the logo
  const logoFloat = Math.sin(frame / 20) * 8;
  const ringRotate = (frame * 1.2) % 360;
  const ringRotateReverse = 360 - ((frame * 1.0) % 360);

  // Typography entrance
  const brandNameSpring = spring({
    frame: Math.max(0, frame - 16),
    fps,
    config: { damping: 13, stiffness: 95 },
  });

  const brandNameY = interpolate(brandNameSpring, [0, 1], [40, 0]);
  const brandNameOpacity = interpolate(brandNameSpring, [0, 1], [0, 1]);

  // Slogan entrance
  const sloganSpring = spring({
    frame: Math.max(0, frame - 28),
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const sloganY = interpolate(sloganSpring, [0, 1], [30, 0]);
  const sloganOpacity = interpolate(sloganSpring, [0, 1], [0, 1]);

  // CTA Button entrance
  const ctaSpring = spring({
    frame: Math.max(0, frame - 42),
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.75, 1]);
  const ctaOpacity = interpolate(ctaSpring, [0, 1], [0, 1]);
  const ctaY = interpolate(ctaSpring, [0, 1], [30, 0]);

  // Subtitle / platform chips entrance
  const chipsSpring = spring({
    frame: Math.max(0, frame - 55),
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  const chipsY = interpolate(chipsSpring, [0, 1], [25, 0]);
  const chipsOpacity = interpolate(chipsSpring, [0, 1], [0, 1]);

  // Trust badges entrance
  const trustSpring = spring({
    frame: Math.max(0, frame - 70),
    fps,
    config: { damping: 14, stiffness: 85 },
  });
  const trustOpacity = interpolate(trustSpring, [0, 1], [0, 1]);

  // Radiant flare expansion
  const flareScale = interpolate(frame, [0, 90], [0.8, 1.5], {
    extrapolateRight: "clamp",
  });
  const flareOpacity = interpolate(frame, [0, 35, 160], [0, 0.95, 0.75]);

  // Pulsing CTA glow
  const ctaPulse = Math.sin(frame / 6) * 0.08 + 0.92;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background accentColor={BRAND.colors.primaryLight} glowIntensity={1.55} />

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
            width: 850,
            height: 850,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(227, 163, 53, 0.42) 0%, rgba(14, 111, 78, 0.45) 45%, transparent 70%)",
            filter: "blur(65px)",
            transform: `scale(${flareScale})`,
            opacity: flareOpacity,
            pointerEvents: "none",
          }}
        />

        {/* 3D NIZAAM Logo Emblem with Rotating Halos */}
        <div
          style={{
            position: "relative",
            width: 340,
            height: 340,
            perspective: 1200,
            marginBottom: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Outer Golden Halo Ring */}
          <div
            style={{
              position: "absolute",
              width: 350,
              height: 350,
              borderRadius: "50%",
              border: "2px dashed rgba(227, 163, 53, 0.5)",
              transform: `rotate(${ringRotate}deg) scale(${logoScale})`,
              opacity: logoOpacity * 0.85,
              pointerEvents: "none",
            }}
          />

          {/* Inner Emerald Glow Ring */}
          <div
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              border: "1.5px solid rgba(79, 174, 135, 0.55)",
              boxShadow: "0 0 35px rgba(79, 174, 135, 0.4)",
              transform: `rotate(${ringRotateReverse}deg) scale(${logoScale})`,
              opacity: logoOpacity * 0.9,
              pointerEvents: "none",
            }}
          />

          {/* 3D Logo Core */}
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: `translateY(${logoFloat}px) scale(${logoScale}) rotateX(${logoRotateX}deg) rotateY(${logoRotateY}deg)`,
              opacity: logoOpacity,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              filter: "drop-shadow(0 30px 60px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 60px rgba(79, 174, 135, 0.65))",
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
            marginBottom: 12,
          }}
        >
          <h1
            className="font-heading"
            style={{
              fontSize: 92,
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
            marginBottom: 28,
          }}
        >
          <p
            className="font-heading"
            style={{
              fontSize: 36,
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
              fontSize: 21,
              fontWeight: 500,
              color: BRAND.colors.textMuted,
              marginTop: 8,
              margin: 0,
            }}
          >
            One unified platform for sales, stock, khata, and repairs.
          </p>
        </div>

        {/* Hero Call-To-Action Button */}
        <div
          style={{
            transform: `translateY(${ctaY}px) scale(${ctaScale * ctaPulse})`,
            opacity: ctaOpacity,
            marginBottom: 24,
            zIndex: 15,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "18px 44px",
              borderRadius: 40,
              background: "linear-gradient(135deg, #1E9E64 0%, #0E6F4E 100%)",
              border: "2px solid #4FAE87",
              boxShadow: "0 20px 50px rgba(14, 111, 78, 0.75), 0 0 35px rgba(79, 174, 135, 0.5)",
            }}
          >
            <span style={{ fontSize: 28 }}>🚀</span>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span
                className="font-heading"
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  letterSpacing: "0.5px",
                }}
              >
                Start Free Trial Today
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: "#F5C874",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                }}
              >
                No Credit Card Required • Instant Setup
              </span>
            </div>
          </div>
        </div>

        {/* Platform Ecosystem Pills */}
        <div
          style={{
            display: "flex",
            gap: 16,
            transform: `translateY(${chipsY}px)`,
            opacity: chipsOpacity,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 22px",
              borderRadius: 30,
              background: "rgba(14, 111, 78, 0.35)",
              border: "1px solid rgba(79, 174, 135, 0.5)",
              fontSize: 17,
              fontWeight: 700,
              color: "#FFFFFF",
              backdropFilter: "blur(12px)",
            }}
          >
            <span>📱</span>
            <span>Mobile App (Android & iOS)</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 22px",
              borderRadius: 30,
              background: "rgba(14, 111, 78, 0.35)",
              border: "1px solid rgba(79, 174, 135, 0.5)",
              fontSize: 17,
              fontWeight: 700,
              color: "#FFFFFF",
              backdropFilter: "blur(12px)",
            }}
          >
            <span>💻</span>
            <span>Desktop App (Windows & Mac)</span>
          </div>
        </div>

        {/* Trust & Guarantee Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: trustOpacity,
            color: BRAND.colors.textMuted,
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          <span>⚡ 5-Minute Setup</span>
          <span>•</span>
          <span>🔒 100% Cloud Backup</span>
          <span>•</span>
          <span>🇵🇰 Urdu & English</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
