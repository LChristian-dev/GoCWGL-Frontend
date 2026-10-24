"use client";

import { useEffect, useState } from "react";

// A scripted, endlessly repeating "day in the CRM" for the hero preview:
// new leads arrive, a cursor drags cards along the pipeline, and the stats
// and daily report tick up with them. Purely decorative, no real data.

export type PreviewStage = "lead" | "booked" | "paid";

export interface PreviewDeal {
  id: string;
  name: string;
  detail: string;
  stage: PreviewStage;
  value: number;
}

// Newest first within each column, like the real board.
const INITIAL: PreviewDeal[] = [
  { id: "dana", name: "Dana R.", detail: "Web form", stage: "lead", value: 2400 },
  { id: "kai", name: "Kai M.", detail: "Survey", stage: "lead", value: 1800 },
  { id: "priya", name: "Priya S.", detail: "Thu 10:30", stage: "booked", value: 3200 },
  { id: "leo", name: "Leo G.", detail: "Fri 2:00", stage: "booked", value: 1500 },
  { id: "ava", name: "Ava C.", detail: "$4,800", stage: "paid", value: 4800 },
  { id: "sam", name: "Sam O.", detail: "$1,200", stage: "paid", value: 1200 },
];

const INITIAL_STATS = { leads: 7, calls: 3, paid: 6000 };
const INITIAL_CHIP = "New lead · Dana R.";

type Step =
  | { type: "add"; deal: PreviewDeal; chip: string }
  | { type: "move"; id: string; to: PreviewStage; detail: string; chip: string };

const SCRIPT: Step[] = [
  { type: "add", deal: { id: "noor", name: "Noor H.", detail: "Instagram", stage: "lead", value: 3600 }, chip: "New lead · Noor H." },
  { type: "move", id: "dana", to: "booked", detail: "Mon 9:00", chip: "Call booked · Dana R." },
  { type: "move", id: "priya", to: "paid", detail: "$3,200", chip: "Paid · Priya S. · $3,200" },
  { type: "add", deal: { id: "ethan", name: "Ethan B.", detail: "Referral", stage: "lead", value: 2100 }, chip: "New lead · Ethan B." },
  { type: "move", id: "kai", to: "booked", detail: "Tue 1:30", chip: "Call booked · Kai M." },
  { type: "move", id: "leo", to: "paid", detail: "$1,500", chip: "Paid · Leo G. · $1,500" },
];

// Every deal's value, for ticking up the Paid stat when a card lands there.
const VALUE_OF = new Map(
  [...INITIAL, ...SCRIPT.flatMap((s) => (s.type === "add" ? [s.deal] : []))].map((d) => [d.id, d.value]),
);

/** How long each beat of a step lasts, in ms. */
const T = { start: 1400, add: 2300, reach: 750, carry: 500, settle: 900, after: 1100, restart: 2000 };

export function usePreviewLoop(active: boolean) {
  const [deals, setDeals] = useState(INITIAL);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [chip, setChip] = useState(INITIAL_CHIP);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [grabbed, setGrabbed] = useState(false);
  const [flashId, setFlashId] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    };

    let index = 0;
    const run = () => {
      if (index >= SCRIPT.length) {
        index = 0;
        setDeals(INITIAL);
        setStats(INITIAL_STATS);
        setChip(INITIAL_CHIP);
        setFocusId(null);
        setFlashId(null);
        later(run, T.restart);
        return;
      }
      const step = SCRIPT[index++];

      if (step.type === "add") {
        setDeals((ds) => [step.deal, ...ds]);
        setStats((s) => ({ ...s, leads: s.leads + 1 }));
        setChip(step.chip);
        setFlashId(step.deal.id);
        later(run, T.add);
        return;
      }

      // Cursor glides to the card, grabs it, carries it to the next column
      // (the card moves and the cursor follows it there), then lets go.
      setFocusId(step.id);
      later(() => setGrabbed(true), T.reach);
      later(() => {
        setDeals((ds) => {
          const card = ds.find((d) => d.id === step.id);
          if (!card) return ds;
          return [{ ...card, stage: step.to, detail: step.detail }, ...ds.filter((d) => d.id !== step.id)];
        });
        setStats((s) =>
          step.to === "booked"
            ? { ...s, calls: s.calls + 1 }
            : { ...s, paid: s.paid + (VALUE_OF.get(step.id) ?? 0) },
        );
        setChip(step.chip);
        setFlashId(step.id);
      }, T.reach + T.carry);
      later(() => setGrabbed(false), T.reach + T.carry + T.settle);
      later(() => setFocusId(null), T.reach + T.carry + T.settle + 300);
      later(run, T.reach + T.carry + T.settle + T.after);
    };

    later(run, T.start);

    // On pause, rewind so the next run starts the story from the top.
    return () => {
      timers.forEach(clearTimeout);
      setDeals(INITIAL);
      setStats(INITIAL_STATS);
      setChip(INITIAL_CHIP);
      setFocusId(null);
      setFlashId(null);
      setGrabbed(false);
    };
  }, [active]);

  return { deals, stats, chip, focusId, grabbed, flashId };
}
