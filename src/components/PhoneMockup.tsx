import React from "react";
import { Img, staticFile } from "remotion";
import { BRAND } from "../config/brand";

interface PhoneMockupProps {
  imageSrc: string;
  width?: number;
  height?: number;
  scale?: number;
  translateX?: number;
  translateY?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  opacity?: number;
  cropY?: number; // percentage offset for vertical scrolling in screenshot
  cropX?: number;
  zoom?: number;
  borderGlow?: boolean;
  children?: React.ReactNode;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  imageSrc,
  width = 460,
  height = 940,
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
          perspective(1200px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          rotateZ(${rotateZ}deg)
        `,
        opacity,
        zIndex: 10,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Outer Glow */}
      {borderGlow && (
        <div
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: 56,
            background: `radial-gradient(ellipse at 50% 50%, ${BRAND.colors.primaryGlow}, transparent 75%)`,
            filter: "blur(20px)",
            opacity: 0.8,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Titanium Outer Frame */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 50,
          background: "linear-gradient(145deg, #2D3D35 0%, #15241D 40%, #0A1410 100%)",
          padding: 12,
          boxShadow: `
            0 25px 60px -15px rgba(0, 0, 0, 0.85),
            0 0 0 1px rgba(79, 174, 135, 0.3),
            inset 0 1px 2px rgba(255, 255, 255, 0.2),
            inset 0 -1px 2px rgba(0, 0, 0, 0.6)
          `,
          boxSizing: "border-box",
        }}
      >
        {/* Inner Screen Bezel */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: 40,
            overflow: "hidden",
            backgroundColor: "#F7F5F0",
            boxShadow: "inset 0 0 8px rgba(0,0,0,0.8)",
          }}
        >
          {/* iOS System Status Bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 24px",
              zIndex: 35,
              backgroundColor: "#F7F5F0",
            }}
          >
            {/* Time */}
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#16201C",
                letterSpacing: "-0.2px",
              }}
            >
              9:41
            </span>

            {/* Dynamic Island Notch */}
            <div
              style={{
                position: "absolute",
                top: 10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 96,
                height: 24,
                backgroundColor: "#050706",
                borderRadius: 16,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: 8,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 35%, #1F362C 0%, #030805 80%)",
                  boxShadow: "inset 0 0 1px #4FAE87",
                }}
              />
            </div>

            {/* Status Icons: Signal & Battery */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: "#16201C",
                fontWeight: 600,
              }}
            >
              <span>5G</span>
              <div
                style={{
                  width: 20,
                  height: 10,
                  borderRadius: 3,
                  border: "1.5px solid #16201C",
                  padding: 1,
                  display: "flex",
                }}
              >
                <div
                  style={{
                    width: "80%",
                    height: "100%",
                    backgroundColor: "#1E9E64",
                    borderRadius: 1,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Screenshot Container with Pan/Zoom and status bar offset */}
          <div
            style={{
              position: "absolute",
              top: 48,
              left: 0,
              right: 0,
              bottom: 0,
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
                objectPosition: `${50 + cropX}% ${cropY}%`,
                transform: `scale(${zoom})`,
                transformOrigin: "center top",
                display: "block",
              }}
            />

            {/* Custom interactive overlays/highlights if provided */}
            {children}
          </div>

          {/* Screen Glass Reflection Gradient */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "45%",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 60%)",
              pointerEvents: "none",
              zIndex: 25,
            }}
          />

          {/* Home indicator bar at bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 4,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              borderRadius: 4,
              zIndex: 30,
            }}
          />
        </div>
      </div>
    </div>
  );
};
