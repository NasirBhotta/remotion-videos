import { COLORS } from "./searchData";

export const DEBOUNCE_FPS = 30;
export const DEBOUNCE_DURATION_IN_FRAMES = 360; // 12.0 seconds

export const DEBOUNCE_SCENES = {
  problemTyping: 0,    // 0s - 3s: Naive typing & immediate 1:1 API requests
  overload: 90,        // 3s - 5s: 6 Keystrokes -> 6 API Requests overload alert
  debounceIntro: 150,  // 5s - 7s: Debounce concept, typing with 300ms timer resets
  timerSuccess: 210,   // 7s - 9s: User stops, timer completes, 1 request fires
  comparison: 270,     // 9s - 10.7s: 6 requests collapse into 1 request payoff
  outro: 320,          // 10.7s - 12s: Summary & Next: Request Control CTA
} as const;

// Naive typing timestamps (Scene 1)
export const NAIVE_KEYSTROKES = [
  { char: "i", text: "i", frame: 14 },
  { char: "p", text: "ip", frame: 24 },
  { char: "h", text: "iph", frame: 34 },
  { char: "o", text: "ipho", frame: 44 },
  { char: "n", text: "iphon", frame: 54 },
  { char: "e", text: "iphone", frame: 64 },
];

// Debounced typing timestamps (Scene 3)
export const DEBOUNCED_KEYSTROKES = [
  { char: "i", text: "i", frame: 166 },
  { char: "p", text: "ip", frame: 174 },
  { char: "h", text: "iph", frame: 182 },
  { char: "o", text: "ipho", frame: 190 },
  { char: "n", text: "iphon", frame: 198 },
  { char: "e", text: "iphone", frame: 206 },
];

export const TIMER_COMPLETION_FRAME = 230;
export const SINGLE_REQUEST_FIRE_FRAME = 234;
export const SINGLE_REQUEST_ARRIVE_FRAME = 250;
export const MERGE_COLLAPSE_FRAME = 282;

export const DEBOUNCE_COLORS = {
  ...COLORS,
  red: "#FF4766",
  redGlow: "rgba(255, 71, 102, 0.35)",
  greenGlow: "rgba(85, 230, 165, 0.35)",
  cyanGlow: "rgba(94, 235, 255, 0.35)",
  amberGlow: "rgba(255, 199, 104, 0.35)",
  cardBg: "#121826",
  cardBorder: "#232F48",
  serverNodeBg: "#0E1422",
};
