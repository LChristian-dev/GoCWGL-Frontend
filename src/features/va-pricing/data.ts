// Copy for the Virtual Assistant pricing page. What clients can do mirrors
// the client portal's VA menu (gocwgl-admin src/data/portal.ts: PORTAL_MENU
// and the page subtitles). No fees here on purpose: clients see the terms in
// the portal when they request a VA. The VA-side agreement (what GoCWGL keeps
// of a VA's rate) is confidential and never belongs on this site.

import type { IconName } from "@/features/pricing-ui/Icon";

// Estimated VA pay only. Each VA sets their own hourly rate; this range
// matches the typical rates in the client app, and a month is 52/12 weeks.
export const RATE_LOW = 6;
export const RATE_HIGH = 9;
const WEEKS_PER_MONTH = 52 / 12;

/** Monthly pay at an hourly rate, rounded to the nearest $10. */
const monthly = (rate: number, hours: number) =>
  `$${(Math.round((rate * hours * WEEKS_PER_MONTH) / 10) * 10).toLocaleString("en-US")}`;

export const ESTIMATES = [
  { hours: 10, label: "10 hours a week", tagline: "A few hours of help, every week." },
  { hours: 20, label: "20 hours a week", tagline: "Part-time support for a growing workload." },
  { hours: 40, label: "40 hours a week", tagline: "A full-time VA working with your business." },
].map((e) => ({ ...e, range: `${monthly(RATE_LOW, e.hours)}–${monthly(RATE_HIGH, e.hours)}` }));

export const HERO_FACTS = [
  { value: "10–40", label: "hours a week, or a one-off project" },
  { value: "Direct", label: "you pay your VA for their hours" },
  { value: "1 portal", label: "tasks, logins, SOPs and attendance" },
];

export const WHY_HIRE: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: "users",
    title: "Matched to your business",
    body: "Tell us the role, the hours and the pay range you have in mind. We match you with a VA who fits the work.",
  },
  {
    icon: "graduation",
    title: "Trained and kept current",
    body: "Your VA gets ongoing training from GoCWGL in the latest tools, AI included, so their skills keep growing with your business.",
  },
  {
    icon: "shield",
    title: "Supported by our team",
    body: "You're never on your own. Our team stays involved, supporting you and your VA so the work keeps running smoothly.",
  },
  {
    icon: "clipboard",
    title: "Run it all in one place",
    body: "Tasks, logins, SOPs, attendance and daily logs live in your client portal, instead of scattered chats and spreadsheets.",
  },
];

/** What a client does with their VA in the portal. */
export const PORTAL_FEATURES: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: "clipboard",
    title: "Tasks",
    body: "Request a task, pick the main VA and any backups, and follow its status.",
  },
  {
    icon: "lock",
    title: "Assets",
    body: "Logins, links and notes your VAs need. You choose which VA can see each one.",
  },
  {
    icon: "book",
    title: "SOPs",
    body: "Add your own SOPs, written, uploaded or linked, and pick which VAs see them.",
  },
  {
    icon: "clock",
    title: "Attendance",
    body: "See when your VAs clock in and out, and whether they're on time for the schedule you set.",
  },
  {
    icon: "pipeline",
    title: "VA tracker",
    body: "Everything your VAs logged for your business, day by day.",
  },
  {
    icon: "star",
    title: "Ratings",
    body: "Rate each VA on your team. Your ratings help us support them.",
  },
];

export const STEPS = [
  {
    title: "Become a client",
    body: "Create your free GoCWGL client account. It's where you hire and work with your VA.",
  },
  {
    title: "Request a VA",
    body: "Tell us the role, the hours a week (or a one-off project) and the pay range you have in mind.",
  },
  {
    title: "Get matched",
    body: "We match you with a trained VA for your business.",
  },
  {
    title: "Work together",
    body: "Assign tasks, share logins safely, add your SOPs, and follow the work in your portal.",
  },
];
