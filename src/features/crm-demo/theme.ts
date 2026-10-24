import type { CSSProperties } from "react";

// Tone colors copied from the real GoCWGL admin app's $tones map
// (gocwgl-admin abstracts/_variables.scss), so the hero preview and the
// demo read as the same product people get.
export const TONES = {
  cyan: { bg: "#e3f6fa", fg: "#0e7490", solid: "#0891b2" },
  purple: { bg: "#f3eeff", fg: "#6d28d9", solid: "#7c3aed" },
  pink: { bg: "#fdedf5", fg: "#be185d", solid: "#db2777" },
  orange: { bg: "#fff1e6", fg: "#c2410c", solid: "#ea580c" },
  green: { bg: "rgba(16, 185, 129, 0.12)", fg: "#047857", solid: "#10b981" },
  teal: { bg: "#e6f7f5", fg: "#0f766e", solid: "#0d9488" },
  sky: { bg: "#e0f2fe", fg: "#0369a1", solid: "#0284c7" },
  slate: { bg: "#eef0f3", fg: "#3b4a61", solid: "#8a909c" },
} as const;

export type Tone = keyof typeof TONES;

export const toneVars = (tone: Tone) =>
  ({
    "--tone-bg": TONES[tone].bg,
    "--tone-fg": TONES[tone].fg,
    "--tone-solid": TONES[tone].solid,
  }) as CSSProperties;

// Stroke paths in a 24×24 box, lucide-style like the admin app's icons.
export const ICONS = {
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  users:
    "M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 20v-2a4 4 0 0 0-3-3.9M16 2.1a4 4 0 0 1 0 7.8",
  pipeline: "M4 4h4v16H4zM10 4h4v10h-4zM16 4h4v6h-4z",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  invoice: "M6 2h12v20l-3-2-3 2-3-2-3 2zM9 7h6M9 11h6M9 15h4",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  plus: "M12 5v14M5 12h14",
  close: "M6 6l12 12M18 6L6 18",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14M21 21l-4.3-4.3",
  trash: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
  check: "M5 12l5 5 9-10",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  refresh: "M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  phone:
    "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  play: "M7 4l13 8-13 8z",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M12 7v5l3 2",
} as const;

export type IconName = keyof typeof ICONS;
