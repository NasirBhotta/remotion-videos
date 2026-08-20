import React from "react";
import { Img, staticFile } from "remotion";
import { BRAND } from "../config/brand";

interface DesktopMockupProps {
  imageSrc: string;
  title?: string;
  width?: number;
  height?: number;
  scale?: number;
  translateX?: number;
  translateY?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  opacity?: number;
  cropY?: number;
  cropX?: number;
  zoom?: number;
  borderGlow?: boolean;
  children?: React.ReactNode;
}

export const DesktopMockup: React.FC<DesktopMockupProps> = ({
  imageSrc,
  title = "Nizaam — Shop Management System",
  width = 960,
  height = 580,
  scale = 1,
  translateX = 0,
  translateY = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  opacity = 1,
  cropY = 0,
  cropX = 0,
  zoom = 1,
  borderGlow = true,
  children,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width,
        height,
        transform: `
          translate(-50%, -50%)
          translate3d(${translateX}px, ${translateY}px, 0)
          scale(${scale})
          perspective(1400px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          rotateZ(${rotateZ}deg)
        `,
        opacity,
        zIndex: 8,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Outer Glow */}
      {borderGlow && (
        <div
          style={{
            position: "absolute",
            inset: -12,
            borderRadius: 28,
            background: `radial-gradient(ellipse at 50% 50%, ${BRAND.colors.primaryGlow}, transparent 75%)`,
            filter: "blur(28px)",
            opacity: 0.7,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Frame Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 20,
          background: "linear-gradient(180deg, #1C2B24 0%, #0D1914 100%)",
          border: "1px solid rgba(79, 174, 135, 0.3)",
          boxShadow: `
            0 30px 80px -20px rgba(0, 0, 0, 0.9),
            0 0 0 1px rgba(255, 255, 255, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Window Title Bar */}
        <div
          style={{
            height: 38,
            backgroundColor: "#101D17",
            borderBottom: "1px solid rgba(79, 174, 135, 0.15)",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          {/* Window Buttons */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#27C93F" }} />
          </div>

          {/* Window Title / URL Pill */}
          <div
            style={{
              padding: "3px 18px",
              borderRadius: 6,
              backgroundColor: "rgba(0, 0, 0, 0.35)",
              border: "1px solid rgba(79, 174, 135, 0.15)",
              fontSize: 12,
              fontWeight: 600,
              color: BRAND.colors.textMuted,
              letterSpacing: "0.2px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ color: BRAND.colors.primaryLight }}>🔒</span> {title}
          </div>

          {/* Right side spacer */}
          <div style={{ width: 40 }} />
        </div>

        {/* Screen Content */}
        <div
          style={{
            position: "relative",
            flex: 1,
            width: "100%",
            overflow: "hidden",
            backgroundColor: "#F7F5F0",
          }}
        >
          <Img
            src={staticFile(imageSrc)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: `${50 + cropX}% ${50 + cropY}%`,
              transform: `scale(${zoom})`,
              transformOrigin: "center center",
              display: "block",
            }}
          />

          {children}

          {/* Subtle reflection overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
};
