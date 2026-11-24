// Copy for the CRM pricing page. Package details mirror the client portal's
// "Get a CRM" page (gocwgl-admin src/data/portal.ts: CRM_PACKAGES.custom,
// CRM_PAYMENT_PLANS, CRM_WHY_OWN, CRM_CARE_PLAN, CRM_PRICE_BREAKDOWN, CRM_STEPS). Update both together.

import { BUILD_CENTS } from "@/features/landing/CrmCost/data";
import type { IconName } from "@/features/pricing-ui/Icon";

/** The client app, where new clients sign up and request their CRM. */
export const APP_URL = "https://app.gocwgl.com";

export type PaymentPlanKey = "one_time" | "12_months" | "6_months";

/** How a client pays for the Custom CRM: once, or a set monthly payment. Same as the portal's CRM_PAYMENT_PLANS. */
export const PAYMENT_PLANS: Array<{ key: PaymentPlanKey; label: string; payments: number; paymentCents: number }> = [
  { key: "one_time", label: "One-time payment", payments: 1, paymentCents: BUILD_CENTS },
  { key: "12_months", label: "12-month plan", payments: 12, paymentCents: 139_700 },
  { key: "6_months", label: "6-month plan", payments: 6, paymentCents: 269_700 },
];

/** Cents as whole dollars, e.g. 139700 → "$1,397". */
export const usd = (cents: number) => `$${(cents / 100).toLocaleString("en-US")}`;
export const planTotalCents = (p: { payments: number; paymentCents: number }) => p.payments * p.paymentCents;

export const PRICE = usd(BUILD_CENTS);
export const CARE_PRICE = "$500";
export const FEATURE_FROM = "$100";

export const HERO_FACTS = [
  { value: "$0", label: "subscription or per-login fees" },
  { value: "Unlimited", label: "team logins" },
  { value: "100%", label: "yours: the system and the data" },
];

export const WHY_OWN: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: "shield",
    title: "It's yours, not rented",
    body: "A rented CRM is a bill that never ends. Yours is an asset: nobody can raise your price, lock a feature behind a higher plan or close your account.",
  },
  {
    icon: "pipeline",
    title: "Built around how you sell",
    body: "No bending your process to fit generic software. Your stages, your records, your automations, set up the way your team already works.",
  },
  {
    icon: "users",
    title: "No per-seat fees",
    body: "Rented CRMs charge for every login, every month. Yours has unlimited logins, so hiring doesn't make your software bill grow.",
  },
  {
    icon: "bolt",
    title: "One place for everything",
    body: "Bookings, emails, invoices and your client portal in one system, instead of five tools held together with workarounds.",
  },
];

export const FEATURE_GROUPS: Array<{ icon: IconName; title: string; items: string[] }> = [
  {
    icon: "users",
    title: "Sales and contacts",
    items: [
      "Contacts, companies and sales pipelines, with tags and notes",
      "Custom records for your business (jobs, properties, cases, orders…)",
      "Custom reports and dashboards",
    ],
  },
  {
    icon: "bolt",
    title: "Automation and messaging",
    items: [
      "Automations, email campaigns, calendar booking and forms",
      "SMS reminders and call logging",
      "AI helpers: lead scoring, email drafts and call summaries",
    ],
  },
  {
    icon: "card",
    title: "Payments and portals",
    items: [
      "Invoicing and online payments",
      "A client portal for your own customers",
      "Roles and permissions, with unlimited team logins",
    ],
  },
  {
    icon: "rocket",
    title: "Setup and launch",
    items: [
      "Integrations with the tools you already use (accounting, Zapier, webhooks, API)",
      "Data moved over from your current CRM",
      "Your branding, on your own domain",
      "Team training and 90 days of priority support",
    ],
  },
];

export const PRICE_COVERS = [
  "Discovery call and a blueprint of every screen and automation",
  "12–15 weeks of design, building and testing by our team",
  "Your data moved over, and your branding on your own domain",
  "Team training and 90 days of priority support after launch",
];

export const CARE_PLAN = [
  "Security updates, backups and monitoring",
  "Code, libraries and hosting kept up to date",
  "Unlimited revisions to what's already built",
];

/** From sign-up to go-live: how a client gets their CRM. */
export const STEPS = [
  {
    title: "Sign up free",
    body: "Create your free GoCWGL client account. It's where you request, follow and run your CRM.",
  },
  {
    title: "Request your CRM",
    body: "Tell us what you need from Get a CRM in your portal, choose how you'll pay, and pick a time for your discovery call.",
  },
  {
    title: "Approve the blueprint",
    body: "You get a plan of every screen and automation, and the final quote. Nothing is billed until you approve it.",
  },
  {
    title: "We build it",
    body: "12–15 weeks of design, building and testing, with weekly updates in Build progress.",
  },
  {
    title: "Train and go live",
    body: "We move your data in, train your team and launch together.",
  },
];
