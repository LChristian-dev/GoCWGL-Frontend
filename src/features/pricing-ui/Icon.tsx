// A few line icons for the pricing pages (24×24, stroke = currentColor).
const PATHS = {
  shield: ["M12 3l7 3v5.5c0 4.4-2.9 7.9-7 9.5-4.1-1.6-7-5.1-7-9.5V6l7-3z", "M9 12l2 2 4-4"],
  pipeline: ["M4 6h16", "M4 12h11", "M4 18h6"],
  users: [
    "M16 20v-1.5a4 4 0 00-4-4H7a4 4 0 00-4 4V20",
    "M9.5 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7z",
    "M21 20v-1.5a4 4 0 00-3-3.85",
    "M15.5 4.15a3.5 3.5 0 010 6.7",
  ],
  bolt: ["M13 2L4 14h7l-1 8 9-12h-7l1-8z"],
  card: ["M3 6.5A1.5 1.5 0 014.5 5h15A1.5 1.5 0 0121 6.5v11a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 17.5v-11z", "M3 10h18", "M7 15h3"],
  rocket: [
    "M14 4.5c2.6-.9 5-.5 5.5 0s.9 2.9 0 5.5L12 17.5 6.5 12 14 4.5z",
    "M6.5 12L4 11.5l3-3.5h3.5",
    "M12 17.5l.5 2.5 3.5-3v-3.5",
    "M6 18c-1 0-2 1-2 2 1 0 2-1 2-2z",
  ],
  check: ["M5 12.5l4.5 4.5L19 7.5"],
  arrow: ["M5 12h14", "M13 6l6 6-6 6"],
  sparkle: ["M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"],
  clipboard: ["M9 4h6v3H9z", "M9 5.5H6.5A1.5 1.5 0 005 7v12.5A1.5 1.5 0 006.5 21h11a1.5 1.5 0 001.5-1.5V7a1.5 1.5 0 00-1.5-1.5H15", "M9 13l2 2 4-4"],
  lock: ["M6.5 11h11a1.5 1.5 0 011.5 1.5v7a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 015 19.5v-7A1.5 1.5 0 016.5 11z", "M8 11V7.5a4 4 0 018 0V11"],
  book: ["M5 4.5A1.5 1.5 0 016.5 3H19v15H6.5A1.5 1.5 0 005 19.5v-15z", "M5 19.5A1.5 1.5 0 006.5 21H19v-3", "M9 7.5h6"],
  clock: ["M12 21a9 9 0 100-18 9 9 0 000 18z", "M12 7.5V12l3 2"],
  star: ["M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5z"],
  receipt: ["M6 3h12v18l-3-2-3 2-3-2-3 2V3z", "M9 8h6", "M9 12h6"],
  graduation: ["M2.5 9L12 4.5 21.5 9 12 13.5 2.5 9z", "M6.5 11v4.5c1.5 1.5 3.5 2.5 5.5 2.5s4-1 5.5-2.5V11", "M21.5 9v5"],
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
