export const FPS = 30;
export const DURATION_IN_FRAMES = FPS * 9;

export const COLORS = {
  background: "#090B12",
  panel: "#101522",
  panelStrong: "#151C2C",
  border: "#273149",
  text: "#F3F6FF",
  muted: "#8D9AB5",
  cyan: "#5EEBFF",
  violet: "#9475FF",
  green: "#55E6A5",
  amber: "#FFC768",
} as const;

export const SCENE = {
  problem: 0,
  optimize: 62,
  backend: 118,
  ranking: 165,
  pagination: 213,
  finale: 246,
} as const;

export const MESSY_QUERIES = ["\" iPhone 15 \"", "\"IPHONE 15\"", "\"iphone   15\"", "\"iphone-15\""];

export const RESULTS = [
  { name: "Result A", score: 98, color: COLORS.cyan },
  { name: "Result B", score: 91, color: COLORS.violet },
  { name: "Result C", score: 84, color: COLORS.green },
  { name: "Result D", score: 52, color: COLORS.amber },
];
