export const NORMALIZATION_FPS = 30;
export const NORMALIZATION_DURATION_IN_FRAMES = NORMALIZATION_FPS * 9; // 270 frames = 9.0 seconds

export const NORMALIZATION_SCENES = {
  messyInputs: 0,
  normalize: 60,
  consistent: 120,
  search: 180,
  cta: 238,
} as const;

export interface MessyQueryItem {
  id: string;
  raw: string;
  normalized: string;
  tag: string;
  startFrame: number;
  yOffset: number;
}

export const QUERY_VARIANTS: MessyQueryItem[] = [
  {
    id: "lead-trail",
    raw: "  iPhone 15  ",
    normalized: "iphone 15",
    tag: "WHITESPACE TRIM",
    startFrame: 6,
    yOffset: -270,
  },
  {
    id: "uppercase",
    raw: "IPHONE 15",
    normalized: "iphone 15",
    tag: "LOWERCASE",
    startFrame: 16,
    yOffset: -90,
  },
  {
    id: "multi-space",
    raw: "iphone     15",
    normalized: "iphone 15",
    tag: "COLLAPSE SPACES",
    startFrame: 26,
    yOffset: 90,
  },
  {
    id: "hyphen",
    raw: "iPhone-15",
    normalized: "iphone 15",
    tag: "STANDARDIZE",
    startFrame: 36,
    yOffset: 270,
  },
];
