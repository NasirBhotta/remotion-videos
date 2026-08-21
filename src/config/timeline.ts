// Timeline configuration for 58-second vertical NIZAAM promo video

export const VIDEO_FPS = 30;
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;

export const TIMELINE = {
  SCENE_1_PROBLEM: {
    from: 0,
    duration: 210, // 7.0s
  },
  SCENE_2_LOGO_REVEAL: {
    from: 210,
    duration: 180, // 6.0s
  },
  SCENE_3A_POS: {
    from: 390,
    duration: 180, // 6.0s
  },
  SCENE_3B_INVENTORY: {
    from: 570,
    duration: 180, // 6.0s
  },
  SCENE_3C_UDHAAR: {
    from: 750,
    duration: 180, // 6.0s
  },
  SCENE_3D_REPAIR: {
    from: 930,
    duration: 180, // 6.0s
  },
  SCENE_3E_PROFIT: {
    from: 1110,
    duration: 180, // 6.0s
  },
  SCENE_3F_SUPPLIERS: {
    from: 1290,
    duration: 180, // 6.0s
  },
  SCENE_3G_RECEIPTS: {
    from: 1470,
    duration: 180, // 6.0s
  },
  SCENE_4_ECOSYSTEM: {
    from: 1650,
    duration: 240, // 8.0s
  },
  SCENE_5_OUTRO: {
    from: 1890,
    duration: 210, // 7.0s
  },
} as const;

export const TOTAL_DURATION_IN_FRAMES = 2100; // 70.0s
