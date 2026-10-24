import type { Tone } from "./theme";

export type Stage = "lead" | "booked" | "paid";

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  stage: Stage;
  /** Deal value in whole dollars. */
  value: number;
  notes: string;
  tags: string[];
  /** YYYY-MM-DD */
  createdAt: string;
}

export interface Booking {
  id: string;
  contactId: string;
  /** YYYY-MM-DD */
  date: string;
  /** HH:MM, 24-hour */
  time: string;
}

export type InvoiceStatus = "sent" | "paid";

export interface Invoice {
  id: string;
  number: number;
  contactId: string;
  amount: number;
  status: InvoiceStatus;
  /** YYYY-MM-DD */
  dueDate: string;
}

export type AutomationTrigger = "lead" | "booked" | "beforeCall" | "paid" | "overdue";

export interface Automation {
  id: string;
  name: string;
  trigger: AutomationTrigger;
  /** Hours to wait after the trigger before sending. */
  delayHours: number;
  subject: string;
  active: boolean;
  sent: number;
}

export const TRIGGERS: Array<{ id: AutomationTrigger; label: string }> = [
  { id: "lead", label: "A new lead signs up" },
  { id: "booked", label: "A call gets booked" },
  { id: "beforeCall", label: "Before a booked call" },
  { id: "paid", label: "An invoice is paid" },
  { id: "overdue", label: "An invoice is overdue" },
];

export const triggerLabel = (trigger: AutomationTrigger) =>
  TRIGGERS.find((t) => t.id === trigger)?.label ?? trigger;

export const formatDelay = (hours: number) =>
  hours === 0 ? "Right away" : hours % 24 === 0 ? `${hours / 24} day${hours === 24 ? "" : "s"}` : `${hours} hours`;

export interface Activity {
  id: string;
  text: string;
  /** ISO timestamp */
  at: string;
}

export interface DemoState {
  version: 1;
  contacts: Contact[];
  bookings: Booking[];
  invoices: Invoice[];
  automations: Automation[];
  activity: Activity[];
}

export const STAGES: Array<{ id: Stage; label: string; tone: Tone }> = [
  { id: "lead", label: "Lead", tone: "purple" },
  { id: "booked", label: "Call booked", tone: "orange" },
  { id: "paid", label: "Paid", tone: "green" },
];

export const stageInfo = (stage: Stage) => STAGES.find((s) => s.id === stage) ?? STAGES[0];

export const SOURCES = ["Web form", "Survey", "Booking page", "Referral", "Instagram"];

export const SUGGESTED_TAGS = ["hot lead", "website", "referral", "call booked", "client", "vip", "follow up"];

export const newId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

// ------------------------------------------------------------------ Dates
// All demo dates are local calendar days, kept as YYYY-MM-DD strings.

const pad = (n: number) => String(n).padStart(2, "0");

export const isoDay = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const today = () => isoDay(new Date());

export const addDays = (iso: string, days: number) => {
  const [y, m, d] = iso.split("-").map(Number);
  return isoDay(new Date(y, m - 1, d + days));
};

export const parseDay = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const formatDay = (iso: string, opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }) =>
  parseDay(iso).toLocaleDateString(undefined, opts);

export const formatTime = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return new Date(2000, 0, 1, h, m).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
};

export const formatMoney = (dollars: number) =>
  dollars.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

// ------------------------------------------------------------------ Seed
// Dates are relative to the visitor's today so the dashboard always looks
// like a live account rather than a snapshot from the day it was written.

export const SEED_CONTACTS: Array<Omit<Contact, "id" | "createdAt" | "notes"> & { daysAgo: number }> = [
  { name: "Dana Ruiz", email: "dana@ruizstudio.co", phone: "(415) 555-0142", source: "Web form", stage: "lead", value: 2400, tags: ["website", "hot lead"], daysAgo: 0 },
  { name: "Kai Morgan", email: "kai@morganfit.com", phone: "(312) 555-0187", source: "Survey", stage: "lead", value: 1800, tags: ["survey"], daysAgo: 1 },
  { name: "Noor Haddad", email: "noor@haddadlaw.com", phone: "(646) 555-0119", source: "Instagram", stage: "lead", value: 3600, tags: ["instagram", "legal"], daysAgo: 3 },
  { name: "Ethan Brooks", email: "ethan@brooksroofing.com", phone: "(214) 555-0163", source: "Referral", stage: "lead", value: 2100, tags: ["referral"], daysAgo: 5 },
  { name: "Priya Shah", email: "priya@shahdental.com", phone: "(408) 555-0155", source: "Booking page", stage: "booked", value: 3200, tags: ["call booked", "dental"], daysAgo: 4 },
  { name: "Leo Grant", email: "leo@grantcoaching.io", phone: "(503) 555-0128", source: "Web form", stage: "booked", value: 1500, tags: ["call booked"], daysAgo: 6 },
  { name: "Mia Torres", email: "mia@torresbakery.com", phone: "(305) 555-0171", source: "Survey", stage: "booked", value: 2700, tags: ["call booked", "food"], daysAgo: 8 },
  { name: "Ava Chen", email: "ava@chenmedspa.com", phone: "(206) 555-0134", source: "Referral", stage: "paid", value: 4800, tags: ["client", "vip"], daysAgo: 12 },
  { name: "Sam Ortiz", email: "sam@ortizplumbing.com", phone: "(602) 555-0196", source: "Web form", stage: "paid", value: 1200, tags: ["client"], daysAgo: 13 },
];

export const seedAutomations = (): Automation[] => [
  { id: "seed-m1", name: "Welcome new leads", trigger: "lead", delayHours: 0, subject: "Thanks for reaching out, {first_name}!", active: true, sent: 128 },
  { id: "seed-m2", name: "Call confirmation", trigger: "booked", delayHours: 0, subject: "You're booked: here's what to expect", active: true, sent: 64 },
  { id: "seed-m3", name: "Call reminder", trigger: "beforeCall", delayHours: 24, subject: "Reminder: our call is tomorrow", active: true, sent: 59 },
  { id: "seed-m4", name: "Thank-you after payment", trigger: "paid", delayHours: 0, subject: "Welcome aboard! Your next steps", active: true, sent: 31 },
  { id: "seed-m5", name: "Overdue invoice nudge", trigger: "overdue", delayHours: 72, subject: "Friendly reminder about invoice #{number}", active: false, sent: 7 },
];

export function createSeed(): DemoState {
  const now = today();
  const contacts: Contact[] = SEED_CONTACTS.map(({ daysAgo, ...c }, i) => ({
    ...c,
    id: `seed-c${i + 1}`,
    notes: "",
    createdAt: addDays(now, -daysAgo),
  }));
  const byName = (name: string) => contacts.find((c) => c.name === name)!.id;

  return {
    version: 1,
    contacts,
    bookings: [
      { id: "seed-b1", contactId: byName("Priya Shah"), date: now, time: "10:30" },
      { id: "seed-b2", contactId: byName("Leo Grant"), date: addDays(now, 1), time: "14:00" },
      { id: "seed-b3", contactId: byName("Mia Torres"), date: addDays(now, 3), time: "11:00" },
    ],
    invoices: [
      { id: "seed-i1", number: 1041, contactId: byName("Sam Ortiz"), amount: 1200, status: "paid", dueDate: addDays(now, -10) },
      { id: "seed-i2", number: 1042, contactId: byName("Ava Chen"), amount: 4800, status: "paid", dueDate: addDays(now, -6) },
      { id: "seed-i3", number: 1043, contactId: byName("Priya Shah"), amount: 3200, status: "sent", dueDate: addDays(now, 7) },
    ],
    automations: seedAutomations(),
    activity: [
      { id: "seed-a1", text: "Dana Ruiz submitted the web form", at: new Date().toISOString() },
      { id: "seed-a2", text: "Priya Shah booked a call", at: new Date(Date.now() - 36e5 * 5).toISOString() },
      { id: "seed-a3", text: "Invoice #1042 paid by Ava Chen", at: new Date(Date.now() - 864e5 * 2).toISOString() },
    ],
  };
}

// Leads that "arrive" on their own while the demo is open, so it feels
// like a live account. Picked in order, skipping names already present.
export const INCOMING_LEADS: Array<Omit<Contact, "id" | "createdAt" | "notes" | "stage">> = [
  { name: "Jordan Pike", email: "jordan@pikefitness.com", phone: "(720) 555-0148", source: "Web form", tags: ["website"], value: 1900 },
  { name: "Lena Okafor", email: "lena@okaforlaw.com", phone: "(470) 555-0122", source: "Booking page", tags: ["booking page", "legal"], value: 3400 },
  { name: "Marco Bellini", email: "marco@bellinicafe.com", phone: "(617) 555-0190", source: "Instagram", tags: ["instagram", "food"], value: 1600 },
  { name: "Hana Sato", email: "hana@satodesign.co", phone: "(808) 555-0177", source: "Survey", tags: ["survey"], value: 2800 },
];

/** Default tags for the sample people, to backfill data saved before tags existed. */
export const SAMPLE_TAGS = new Map([...SEED_CONTACTS, ...INCOMING_LEADS].map((c) => [c.name, c.tags]));

