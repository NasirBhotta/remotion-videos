import { COLORS } from "./searchData";

export const REQUEST_CONTROL_FPS = 30;
export const REQUEST_CONTROL_DURATION_IN_FRAMES = 510; // 17.0 seconds

export const RC_SCENES = {
  queries: 0,        // 0.0s - 3.5s (0-105): 3 Progressive Queries (A, B, C)
  travel: 105,       // 3.5s - 6.5s (105-195): Concurrent requests in flight with latency
  race: 195,         // 6.5s - 10.0s (195-300): Out-of-order response race (C first, A late, B late)
  intercept: 300,    // 10.0s - 13.0s (300-390): Request Control Guard discards stale responses
  payoff: 390,       // 13.0s - 15.5s (390-465): Latest request wins, clean UI update
  outro: 465,        // 15.5s - 17.0s (465-510): Series takeaway & Next: Caching CTA
} as const;

export interface RequestItem {
  id: string;
  query: string;
  startFrame: number;
  color: string;
  glowColor: string;
  latencyMs: number;
  serverReturnFrame: number;
  uiArrivalFrame: number;
  isLatest: boolean;
}

export const SEARCH_REQUESTS: RequestItem[] = [
  {
    id: "A",
    query: "iphone",
    startFrame: 18,
    color: "#5EEBFF", // Cyan
    glowColor: "rgba(94, 235, 255, 0.35)",
    latencyMs: 320,
    serverReturnFrame: 235,
    uiArrivalFrame: 260,
    isLatest: false,
  },
  {
    id: "B",
    query: "iphone 1",
    startFrame: 48,
    color: "#9475FF", // Violet
    glowColor: "rgba(148, 117, 255, 0.35)",
    latencyMs: 240,
    serverReturnFrame: 265,
    uiArrivalFrame: 290,
    isLatest: false,
  },
  {
    id: "C",
    query: "iphone 15",
    startFrame: 78,
    color: "#55E6A5", // Emerald Green
    glowColor: "rgba(85, 230, 165, 0.35)",
    latencyMs: 110,
    serverReturnFrame: 195,
    uiArrivalFrame: 220,
    isLatest: true,
  },
];

export const RC_COLORS = {
  ...COLORS,
  red: "#FF4766",
  redGlow: "rgba(255, 71, 102, 0.35)",
  greenGlow: "rgba(85, 230, 165, 0.35)",
  cyanGlow: "rgba(94, 235, 255, 0.35)",
  amberGlow: "rgba(255, 199, 104, 0.35)",
  violetGlow: "rgba(148, 117, 255, 0.35)",
  cardBg: "#121826",
  cardBorder: "#232F48",
  serverNodeBg: "#0E1422",
};
