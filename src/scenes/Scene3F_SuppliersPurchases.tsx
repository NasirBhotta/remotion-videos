import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../config/brand";
import { Background } from "../components/Background";
import { PhoneMockup } from "../components/PhoneMockup";
import { KineticHeading } from "../components/KineticHeading";
import { FeatureBadge } from "../components/FeatureBadge";

export const Scene3F_SuppliersPurchases: React.FC = () => {
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
  const phoneRotateY = interpolate(phoneEntrance, [0, 1], [-12, 4]);

  // Subtle continuous drift
  const driftRotateY = phoneRotateY + Math.sin(frame / 22) * 1.5;
  const driftTranslateY = phoneTranslateY + Math.cos(frame / 20) * 6;

  // Switch between purchase orders and suppliers ledger
  const showSuppliers = frame >= 75;
  const activeImage = showSuppliers
    ? BRAND.assets.mobile.suppliers
    : BRAND.assets.mobile.purchaseOrders;

  // PO Received spring badge
  const poSpring = spring({
    frame: Math.max(0, frame - 25),
    fps,
    config: { damping: 11, stiffness: 130 },
  });
  const poScale = interpolate(poSpring, [0, 1], [0.6, 1]);
  const poOpacity = interpolate(poSpring, [0, 1], [0, 1]);

  // Supplier Khata balance spring toast
  const supplierSpring = spring({
    frame: Math.max(0, frame - 85),
    fps,
    config: { damping: 11, stiffness: 130 },
  });
  const supplierScale = interpolate(supplierSpring, [0, 1], [0.6, 1]);
  const supplierOpacity = interpolate(supplierSpring, [0, 1], [0, 1]);

  // Scene exit transition
  const exitProgress = interpolate(frame, [155, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.92]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background accentColor="#4FAE87" glowIntensity={1.2} />

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
          tag="Vendor & Purchase Management"
          tagIcon="📦"
          title="Buy Smart."
          highlight="Track Suppliers."
          subtitle="Purchase orders, wholesale cost tracking, supplier khata ledgers, and 1-tap stock in."
          delay={0}
          highlightColor="emerald"
          positionTop={120}
        />

        {/* 3D Floating Phone Mockup */}
        <PhoneMockup
          imageSrc={activeImage}
          width={500}
          height={1000}
          scale={phoneScale}
          translateY={driftTranslateY}
          rotateY={driftRotateY}
          rotateX={4}
          cropY={0}
        >
          {/* PO Received Overlay Banner */}
          {!showSuppliers && frame >= 25 && (
            <div
              style={{
                position: "absolute",
                top: 220,
                left: "50%",
                transform: `translateX(-50%) scale(${poScale})`,
                opacity: poOpacity,
                background: "rgba(14, 111, 78, 0.95)",
                border: "2px solid #4FAE87",
                borderRadius: 20,
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "0 12px 35px rgba(0,0,0,0.6), 0 0 25px rgba(79, 174, 135, 0.7)",
                zIndex: 40,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 20 }}>✅</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  className="font-heading"
                  style={{ fontSize: 16, fontWeight: 800, color: "#FFFFFF" }}
                >
                  PO-2026-004 Received
                </span>
                <span style={{ fontSize: 13, color: "#F5C874", fontWeight: 600 }}>
                  +50 Items Added to Inventory
                </span>
              </div>
            </div>
          )}

          {/* Supplier Due Balance Toast */}
          {showSuppliers && frame >= 85 && (
            <div
              style={{
                position: "absolute",
                bottom: 80,
                left: "50%",
                transform: `translateX(-50%) scale(${supplierScale})`,
                opacity: supplierOpacity,
                background: "rgba(30, 24, 16, 0.95)",
                border: "2px solid #F5C874",
                borderRadius: 22,
                padding: "12px 24px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                boxShadow: "0 15px 40px rgba(0,0,0,0.7), 0 0 30px rgba(245, 200, 116, 0.4)",
                zIndex: 45,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 22 }}>🚚</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  className="font-heading"
                  style={{ fontSize: 16, fontWeight: 800, color: "#FFFFFF" }}
                >
                  Supplier Khata Synced
                </span>
                <span style={{ fontSize: 13, color: "#F5C874", fontWeight: 600 }}>
                  Royal Telecom: Rs 340,000 Due
                </span>
              </div>
            </div>
          )}
        </PhoneMockup>

        {/* Bottom Feature Pill Badge */}
        <FeatureBadge
          icon="🚚"
          label="Purchase Orders • Supplier Khata • Wholesale Costing • 1-Tap Stock In"
          delay={25}
          variant="emerald"
          bottom={110}
        />
      </div>
    </AbsoluteFill>
  );
};
