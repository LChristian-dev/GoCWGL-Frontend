// Copy for the CRM pricing page. Package details mirror the client portal's
// "Get a CRM" page (gocwgl-admin src/data/portal.ts: CRM_PACKAGES,
// CRM_PAYMENT_PLANS, CRM_WHY_OWN, CRM_CARE_PLAN, CRM_PRICE_BREAKDOWN, CRM_STEPS). Update both together.
// The two packages follow the "GoCWGL Modern CRM Product & Package Blueprint":
// Growth (Business Growth CRM) and Premium (Advanced Business CRM).

import { PACKAGE_BUILDS, type CrmPackageKey } from "@/features/landing/CrmCost/data";
import type { IconName } from "@/features/pricing-ui/Icon";

/** The client app, where new clients sign up and request their CRM. */
export const APP_URL = "https://app.gocwgl.com";

export type PaymentPlanKey = "one_time" | "12_months" | "6_months";
export type PaymentPlan = { key: PaymentPlanKey; label: string; payments: number; paymentCents: number };

/** Cents as whole dollars, e.g. 139700 → "$1,397". */
export const usd = (cents: number) => `$${(cents / 100).toLocaleString("en-US")}`;
export const planTotalCents = (p: { payments: number; paymentCents: number }) => p.payments * p.paymentCents;

const buildCents = (key: CrmPackageKey) => PACKAGE_BUILDS.find((p) => p.key === key)?.buildCents ?? 0;

/** How a client pays for a package: once, or a set monthly payment. Same as the portal's CRM_PAYMENT_PLANS. */
const plans = (key: CrmPackageKey, twelveCents: number, sixCents: number): PaymentPlan[] => [
  { key: "one_time", label: "One-time payment", payments: 1, paymentCents: buildCents(key) },
  { key: "12_months", label: "12-month plan", payments: 12, paymentCents: twelveCents },
  { key: "6_months", label: "6-month plan", payments: 6, paymentCents: sixCents },
];

export type CrmPackage = {
  key: CrmPackageKey;
  name: string;
  subtitle: string;
  bestFor: string;
  featured?: boolean;
  plans: PaymentPlan[];
  groups: Array<{ icon: IconName; title: string; items: string[] }>;
  /** What the package leaves out, or how its scope is set. */
  note: string;
};

// Grouped like the CRM's own menu (crm-demo nav.ts), with each package's
// capabilities from the blueprint's Part 3 (Growth) and Part 4 (Premium).
export const PACKAGES: CrmPackage[] = [
  {
    key: "growth",
    name: "Growth CRM",
    subtitle: "Business Growth CRM",
    bestFor:
      "Independent business, executive and online coaches, business consultants, and small coaching or consulting firms. A complete, polished CRM for your leads, clients, sales, sessions and daily work.",
    plans: plans("growth", 79_700, 152_700),
    groups: [
      {
        icon: "pipeline",
        title: "Sales",
        items: [
          "A dashboard with your key numbers",
          "Leads with sources, scoring and follow-up reminders",
          "Contacts, companies (basic), sales pipeline and deals",
        ],
      },
      {
        icon: "users",
        title: "Clients",
        items: [
          "Client records and onboarding checklists",
          "Programs & services, appointments & sessions",
          "Client progress (basic): goals and milestones",
          "A simple client portal: session recordings, announcements, shared documents and appointments",
        ],
      },
      {
        icon: "graduation",
        title: "Courses & learning",
        items: [
          "Course sales pages with descriptions and pricing",
          "Course inquiry and registration forms",
        ],
      },
      {
        icon: "clipboard",
        title: "Operations",
        items: ["Tasks and a shared calendar", "Forms, landing pages and your website pages", "Documents, stored with the right client"],
      },
      {
        icon: "card",
        title: "Growth & finance",
        items: [
          "Basic email campaigns and communication integrations",
          "Standard automation workflows",
          "Products & packages, invoices, payment tracking and standard online payments",
          "Lead, sales, revenue and client reports",
        ],
      },
      {
        icon: "rocket",
        title: "Setup & administration",
        items: [
          "Your logo, accent colors and wording (“Coaching Sessions” or “Consultations”)",
          "Custom fields, pipeline and dashboard set up for you",
          "Team members and standard roles, with unlimited logins",
          "Selected integrations, workspace settings, and help & support",
          "Team training and 90 days of priority support",
        ],
      },
    ],
    note:
      "Needs Premium or a custom quote: fully custom modules, complex automations, advanced reports, a full course platform with quizzes and certificates, complex integrations, advanced permissions, and large or complex data moves.",
  },
  {
    key: "premium",
    name: "Premium CRM",
    subtitle: "Advanced Business CRM",
    bestFor:
      "Established coaching companies, growing consulting firms, multi-coach organizations and businesses with several teams, and coaches or consultants selling online courses or memberships.",
    featured: true,
    plans: plans("premium", 139_700, 269_700),
    groups: [
      {
        icon: "pipeline",
        title: "Sales: everything in Growth, plus",
        items: [
          "Custom CRM modules built for your business",
          "Advanced pipeline, lead and deal management",
          "Richer links between contacts, companies, deals and clients",
        ],
      },
      {
        icon: "users",
        title: "Clients: everything in Growth, plus",
        items: [
          "Advanced client lifecycle and custom client records",
          "Custom onboarding workflows",
          "Advanced client progress tracking",
          "An advanced client portal, with courses, lessons, quizzes and certificates",
        ],
      },
      {
        icon: "graduation",
        title: "Courses & learning",
        items: [
          "Course and lesson management",
          "Student accounts, enrollments and course access",
          "Learning progress tracking and course automations",
          "Optional, as scoped: quizzes, assignments, certificates, memberships and subscription courses",
        ],
      },
      {
        icon: "clipboard",
        title: "Operations: everything in Growth, plus",
        items: ["Advanced forms and page customization", "Complex document workflows", "Advanced team operations"],
      },
      {
        icon: "bolt",
        title: "Growth & finance",
        items: [
          "Advanced automation builder: multi-step workflows, conditions and branching",
          "Automation monitoring and error handling",
          "Subscriptions, recurring payments and custom invoice processes",
          "Custom dashboards, KPIs, forecasting, and course and team reports",
        ],
      },
      {
        icon: "rocket",
        title: "Setup & administration",
        items: [
          "Custom roles, detailed permissions, and security and audit features as scoped",
          "Multiple advanced integrations",
          "Fuller branding, custom data structures and terminology",
          "Your data moved over, as agreed",
          "Dedicated implementation, team training and 90 days of priority support",
        ],
      },
    ],
    note:
      "Premium is a starting point for advanced work, not unlimited development. The number of custom modules, integrations, automations and courses, and the size of any data move, are agreed and quoted in your blueprint.",
  },
];

type CompareRow = [capability: string, growth: string, premium: string];

/** Growth vs Premium, row by row, in sections: the CRM itself (from the
 * package blueprint), then the portal your clients log in to. */
export const COMPARE_SECTIONS: Array<{ title: string; rows: CompareRow[] }> = [
  {
    title: "Your CRM",
    rows: [
      ["Modern CRM dashboard", "Included", "Included"],
      ["Leads and contacts", "Included", "Included"],
      ["Sales pipeline", "Standard", "Advanced"],
      ["Client management", "Included", "Advanced"],
      ["Client onboarding", "Standard", "Advanced"],
      ["Programs & Services", "Included", "Advanced"],
      ["Appointments & Sessions", "Included", "Advanced"],
      ["Client Progress", "Standard", "Advanced"],
      ["Course sales pages", "Included", "Included"],
      ["Full course management", "Not included by default", "Included within scope"],
      ["Student accounts", "Not included by default", "Included within scope"],
      ["Learning progress", "Not included by default", "Included within scope"],
      ["Tasks and calendar", "Included", "Advanced"],
      ["Forms and landing pages", "Standard", "Advanced"],
      ["Email campaigns", "Standard", "Advanced"],
      ["Automations", "Standard", "Advanced"],
      ["Invoices and payments", "Standard", "Advanced"],
      ["Reports and analytics", "Standard", "Custom"],
      ["Custom modules", "Separately quoted", "Included within agreed scope"],
      ["Roles and permissions", "Standard", "Advanced"],
      ["Integrations", "Selected", "Multiple, as scoped"],
      ["Branding", "Included", "Included"],
      ["Training", "Included", "Included"],
    ],
  },
  {
    title: "Client portal",
    rows: [
      ["Client Portal", "Simple portal", "Advanced portal"],
      ["Session recordings", "Included", "Included"],
      ["Announcements and updates", "Included", "Included"],
      ["Shared documents", "Included", "Included"],
      ["Appointments", "Included", "Included"],
      ["Learning management system", "—", "Included"],
      ["Lessons and course modules", "—", "Included"],
      ["Quizzes and certificates", "—", "Included"],
      ["Client tasks and action plans", "Basic or limited", "Advanced"],
    ],
  },
];

export const CARE_PRICE = "$800";

/** "What is a custom CRM?": plain words for someone who has never used one. */
export const WHAT_IS_DOES: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: "book",
    title: "It remembers everyone",
    body: "Every customer's name, phone number, and what you last talked about, all in one place. No more sticky notes or digging through old emails.",
  },
  {
    icon: "clock",
    title: "It reminds you",
    body: "It tells you who to call back today, whose appointment is tomorrow, and which bill hasn't been paid yet, so nothing slips through the cracks.",
  },
  {
    icon: "users",
    title: "It keeps your team on the same page",
    body: "Everyone who works with you sees the same up-to-date list, so no one has to ask, \u201cDid anyone call Mrs. Smith back?\u201d",
  },
];

export const WHAT_IS_COMPARE = {
  rented: {
    title: "A rented CRM is like a suit off the rack",
    body: "It's made for everybody, so it never quite fits. You pay for it every single month, and the bill goes up each time you add a person.",
  },
  custom: {
    title: "A custom CRM is like a suit made by a tailor",
    body: "It's measured and made just for your business. You pay for it once (or over a few months), and then it's yours to keep.",
  },
};

export const WHY_OWN: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: "shield",
    title: "It's yours, not rented",
    body: "A rented CRM is a bill that never ends. Yours is an asset: nobody can raise your price, lock a feature behind a higher plan or close your account.",
  },
  {
    icon: "pipeline",
    title: "Built around how you sell",
    body: "No bending your process to fit generic software. Your stages, fields and automations, and your own wording (“Coaching Sessions” or “Consultations”), set up the way your team already works. Menus you don’t use stay hidden.",
  },
  {
    icon: "users",
    title: "No per-seat fees",
    body: "Rented CRMs charge for every login, every month. Yours has unlimited logins, so hiring doesn't make your software bill grow.",
  },
  {
    icon: "bolt",
    title: "One place for everything",
    body: "Leads, clients, sessions, courses, emails and invoices in one system, instead of five tools held together with workarounds.",
  },
];

export const PRICE_COVERS = [
  "Discovery call and a blueprint of every screen and automation",
  "12–15 weeks of design, building and testing by our team",
  "Your data imported, and your branding on your own domain",
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
