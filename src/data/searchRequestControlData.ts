import { COLORS } from "./searchData";

export const REQUEST_CONTROL_FPS = 30;
export const REQUEST_CONTROL_DURATION_IN_FRAMES = 840; // 28.0 seconds total

// 10 Bite-Sized Sequential Micro-Screens (~2.5s - 3.0s each)
export const RC_MICRO_SCENES = {
  screen1_req1: { from: 0, duration: 80 },        // 0.0s - 2.6s: User types "iphone" ➔ Req #1 sent (Slow 350ms 🐌)
  screen2_req2: { from: 80, duration: 80 },       // 2.6s - 5.3s: User types "iphone 15" ➔ Req #2 sent (Fast 100ms ⚡)
  screen3_fastArrive: { from: 160, duration: 85 }, // 5.3s - 8.1s: Req #2 finishes 1st ➔ UI correctly shows iPhone 15 ✅
  screen4_bug: { from: 245, duration: 90 },        // 8.1s - 11.1s: 💥 Req #1 arrives LATER ➔ Overwrites UI with old iPhone 13!
  screen5_why: { from: 335, duration: 85 },        // 11.1s - 14.0s: 💡 WHY? In JS, Promise completion order != Typing order!
  screen6_solutionId: { from: 420, duration: 85 }, // 14.0s - 16.8s: 🛡️ Solution 1: Tag each request with an incrementing ID
  screen7_guardDiscard: { from: 505, duration: 90 }, // 16.8s - 19.8s: 🛑 Guard Rule: ID 1 < Latest 2 ➔ DISCARD STALE!
  screen8_abortController: { from: 595, duration: 85 }, // 19.8s - 22.6s: ⚡ Solution 2: AbortController cancels in-flight HTTP
  screen9_payoff: { from: 680, duration: 80 },     // 22.6s - 25.3s: 🚀 The Payoff: 100% UI Consistency, 0 Overwrites
  screen10_outro: { from: 760, duration: 80 },     // 25.3s - 28.0s: Summary & Next: Part 5 Caching →
} as const;

export interface RequestItem {
  id: number;
  label: string;
  query: string;
  startFrame: number;
  color: string;
  glowColor: string;
  latencyMs: number;
  isLatest: boolean;
}

export const SEARCH_REQUESTS: RequestItem[] = [
  {
    id: 1,
    label: "REQ #1",
    query: "iphone",
    startFrame: 15,
    color: "#5EEBFF",
    glowColor: "rgba(94, 235, 255, 0.4)",
    latencyMs: 350,
    isLatest: false,
  },
  {
    id: 2,
    label: "REQ #2",
    query: "iphone 15",
    startFrame: 55,
    color: "#55E6A5",
    glowColor: "rgba(85, 230, 165, 0.4)",
    latencyMs: 100,
    isLatest: true,
  },
];

export const RC_SCENES = {
  queries: 0,
  raceWhy: 105,
  solution: 255,
  payoff: 405,
  outro: 480,
} as const;

export const RC_COLORS = {
  ...COLORS,
  red: "#FF4766",
  redGlow: "rgba(255, 71, 102, 0.45)",
  greenGlow: "rgba(85, 230, 165, 0.45)",
  cyanGlow: "rgba(94, 235, 255, 0.45)",
  amberGlow: "rgba(255, 199, 104, 0.45)",
  violetGlow: "rgba(148, 117, 255, 0.45)",
  cardBg: "#101726",
  cardBorder: "#212D45",
  serverNodeBg: "#0C1220",
  codeBg: "#080C16",
};
