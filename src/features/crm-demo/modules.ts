import type { IconName, Tone } from "./theme";

// Sample pages for the menus of the full CRM (nav.ts NAV_SETS.full) that
// don't have a hands-on screen of their own. Fixed sample data for a coaching
// and consulting business; nothing here is saved or changed.

export type ModuleKey =
  | "leads"
  | "companies"
  | "deals"
  | "clients"
  | "onboarding"
  | "programs"
  | "progress"
  | "courses"
  | "tasks"
  | "forms"
  | "documents"
  | "reports"
  | "team";

export interface ModulePage {
  title: string;
  subtitle: string;
  kpis: Array<{ label: string; value: string; icon: IconName; tone: Tone; foot: string }>;
  listTitle: string;
  rows: Array<{ title: string; sub: string; meta?: string; pill: [tone: Tone, text: string] }>;
}

export const MODULES: Record<ModuleKey, ModulePage> = {
  leads: {
    title: "Leads",
    subtitle: "Everyone interested in working with you, from their first inquiry until they become a client.",
    kpis: [
      { label: "New leads (30d)", value: "86", icon: "target", tone: "purple", foot: "Up 14% on last month" },
      { label: "Follow-ups due", value: "9", icon: "clock", tone: "orange", foot: "3 of them today" },
      { label: "Converted", value: "24%", icon: "check", tone: "green", foot: "Leads who became clients" },
    ],
    listTitle: "Newest leads",
    rows: [
      { title: "Olivia Bennett", sub: "Website form · wants executive coaching · Sarah", meta: "Score 92", pill: ["orange", "Hot"] },
      { title: "Marcus Hill", sub: "Referral from Maya Thompson · you", meta: "Score 78", pill: ["orange", "Hot"] },
      { title: "Hannah Lee", sub: "Webinar sign-up · Confident Leadership", meta: "Score 54", pill: ["sky", "Warm"] },
      { title: "Ravi Patel", sub: "LinkedIn · consulting inquiry · James", meta: "Score 31", pill: ["slate", "New"] },
    ],
  },
  deals: {
    title: "Deals",
    subtitle: "Every sales opportunity with its value, stage, owner and expected closing date.",
    kpis: [
      { label: "Open deals", value: "17", icon: "tag", tone: "orange", foot: "Worth $64,200 in total" },
      { label: "Closing this month", value: "$22,500", icon: "calendar", tone: "purple", foot: "Across 5 deals" },
      { label: "Won (30d)", value: "$31,800", icon: "invoice", tone: "green", foot: "8 deals won" },
    ],
    listTitle: "Open deals",
    rows: [
      { title: "Northwind Advisory – team coaching", sub: "Proposal sent · closes Dec 12 · Sarah", meta: "$18,000", pill: ["purple", "Proposal"] },
      { title: "Olivia Bennett – Executive Coaching", sub: "Discovery call booked · closes Dec 5 · you", meta: "$6,000", pill: ["orange", "Call booked"] },
      { title: "Brightpath Health – leadership workshop", sub: "Negotiating · closes Dec 20 · Sarah", meta: "$9,500", pill: ["sky", "Negotiation"] },
      { title: "Marcus Hill – VIP Day", sub: "Won yesterday · onboarding started", meta: "$1,800", pill: ["green", "Won"] },
    ],
  },
  onboarding: {
    title: "Client Onboarding",
    subtitle: "Welcome new clients with the same steps every time: agreement, intake form, payment and first session.",
    kpis: [
      { label: "Onboarding now", value: "5", icon: "flag", tone: "green", foot: "2 started this week" },
      { label: "Waiting on client", value: "2", icon: "clock", tone: "orange", foot: "Reminders sent automatically" },
      { label: "Avg. time to start", value: "4 days", icon: "check", tone: "teal", foot: "From payment to first session" },
    ],
    listTitle: "In onboarding",
    rows: [
      { title: "Marcus Hill", sub: "VIP Day · agreement signed, intake form next", meta: "2 of 5 steps", pill: ["orange", "Intake form"] },
      { title: "Daniel Okafor", sub: "Leadership Accelerator · intake form sent", meta: "3 of 5 steps", pill: ["orange", "Waiting"] },
      { title: "Grace Kim", sub: "Executive Coaching · first session booked", meta: "4 of 5 steps", pill: ["sky", "Session booked"] },
      { title: "Tom Alvarez", sub: "Business Strategy Intensive · all steps done", meta: "5 of 5 steps", pill: ["green", "Ready"] },
    ],
  },
  progress: {
    title: "Client Progress",
    subtitle: "Goals, milestones and session history for every client, so you can see how far each one has come.",
    kpis: [
      { label: "Goals in progress", value: "41", icon: "trend", tone: "sky", foot: "Across 32 clients" },
      { label: "Milestones hit (30d)", value: "23", icon: "check", tone: "green", foot: "Up from 17 last month" },
      { label: "Avg. progress", value: "68%", icon: "chart", tone: "teal", foot: "Across all active programs" },
    ],
    listTitle: "Recent progress",
    rows: [
      { title: "Priya Raman", sub: "Milestone 3 of 4: pricing strategy finished", meta: "75%", pill: ["green", "On track"] },
      { title: "Maya Thompson", sub: "Goal: lead the Q1 board meeting · session 7 of 12", meta: "58%", pill: ["green", "On track"] },
      { title: "Daniel Okafor", sub: "First goals set in onboarding", meta: "10%", pill: ["sky", "Starting"] },
      { title: "Chris Walker", sub: "Two action items overdue since last session", meta: "40%", pill: ["orange", "Needs attention"] },
    ],
  },
  companies: {
    title: "Companies",
    subtitle: "The businesses your contacts work for, with their people, deals and notes in one place. Solo coaches can hide this menu.",
    kpis: [
      { label: "Companies", value: "48", icon: "building", tone: "slate", foot: "6 added this month" },
      { label: "Open deals", value: "$64,200", icon: "pipeline", tone: "pink", foot: "Across 11 companies" },
      { label: "Active clients", value: "19", icon: "briefcase", tone: "teal", foot: "Companies you work with now" },
    ],
    listTitle: "Recently updated",
    rows: [
      { title: "Northwind Advisory", sub: "Consulting · 4 contacts", meta: "$18,000", pill: ["green", "Client"] },
      { title: "Brightpath Health", sub: "Healthcare · 2 contacts", meta: "$9,500", pill: ["orange", "In talks"] },
      { title: "Summit Ridge Realty", sub: "Real estate · 3 contacts", meta: "$12,400", pill: ["green", "Client"] },
      { title: "Copperleaf Studio", sub: "Design · 1 contact", meta: "$4,800", pill: ["purple", "Lead"] },
    ],
  },
  clients: {
    title: "Clients",
    subtitle: "Everyone who has bought from you: their onboarding, programs, sessions and payments.",
    kpis: [
      { label: "Active clients", value: "32", icon: "briefcase", tone: "teal", foot: "4 started this month" },
      { label: "Onboarding", value: "5", icon: "tasks", tone: "orange", foot: "2 waiting on intake forms" },
      { label: "Avg. progress", value: "68%", icon: "chart", tone: "green", foot: "Across all active programs" },
    ],
    listTitle: "Your clients",
    rows: [
      { title: "Maya Thompson", sub: "Executive Coaching · session 7 of 12", meta: "58%", pill: ["green", "Active"] },
      { title: "Daniel Okafor", sub: "Leadership Accelerator · intake form sent", meta: "10%", pill: ["orange", "Onboarding"] },
      { title: "Priya Raman", sub: "Business Strategy · milestone 3 done", meta: "75%", pill: ["green", "Active"] },
      { title: "Lucas Moreau", sub: "Career Transition · program complete", meta: "100%", pill: ["sky", "Completed"] },
    ],
  },
  courses: {
    title: "Courses & Learning (basic)",
    subtitle: "Sales pages for your courses, with descriptions, prices and registration forms. Full course hosting comes with Premium.",
    kpis: [
      { label: "Course pages", value: "4", icon: "graduation", tone: "pink", foot: "3 live, 1 draft" },
      { label: "Registrations (30d)", value: "37", icon: "users", tone: "purple", foot: "Each one added as a contact" },
      { label: "Course sales", value: "$12,450", icon: "invoice", tone: "green", foot: "Last 30 days" },
    ],
    listTitle: "Your course pages",
    rows: [
      { title: "Confident Leadership", sub: "Sales page · 1,240 visits · 16 registrations", meta: "$497", pill: ["green", "Live"] },
      { title: "Price Your Coaching", sub: "Sales page · 860 visits · 12 registrations", meta: "$297", pill: ["green", "Live"] },
      { title: "Client Attraction Bootcamp", sub: "Sales page · 540 visits · 9 registrations", meta: "$397", pill: ["green", "Live"] },
      { title: "Team Coaching Essentials", sub: "Sales page · not published yet", meta: "$197", pill: ["slate", "Draft"] },
    ],
  },
  programs: {
    title: "Programs & Services",
    subtitle: "The coaching programs, consulting services and packages you sell, with their prices and enrollments.",
    kpis: [
      { label: "Programs", value: "7", icon: "box", tone: "purple", foot: "5 open for enrollment" },
      { label: "Enrolled clients", value: "32", icon: "users", tone: "teal", foot: "Across all programs" },
      { label: "Program revenue", value: "$86,400", icon: "invoice", tone: "green", foot: "This year so far" },
    ],
    listTitle: "What you sell",
    rows: [
      { title: "Executive Coaching", sub: "12 sessions · 6 months · 11 clients", meta: "$6,000", pill: ["green", "Open"] },
      { title: "Leadership Accelerator", sub: "Group program · 12 weeks · 14 clients", meta: "$2,400", pill: ["green", "Open"] },
      { title: "Business Strategy Intensive", sub: "Consulting · 2 days on site · 4 clients", meta: "$4,500", pill: ["green", "Open"] },
      { title: "VIP Day", sub: "One day, one-to-one · waitlist", meta: "$1,800", pill: ["orange", "Waitlist"] },
    ],
  },
  tasks: {
    title: "Tasks & Calendar",
    subtitle: "Your team's to-dos and schedule in one place, linked to the contacts, clients and deals they're about.",
    kpis: [
      { label: "Due today", value: "6", icon: "tasks", tone: "cyan", foot: "2 already done" },
      { label: "Overdue", value: "2", icon: "clock", tone: "orange", foot: "Oldest is 3 days late" },
      { label: "Done this week", value: "27", icon: "check", tone: "green", foot: "Across 4 team members" },
    ],
    listTitle: "Today",
    rows: [
      { title: "Call back Daniel about his intake form", sub: "Daniel Okafor · assigned to you", meta: "10:00 AM", pill: ["orange", "High"] },
      { title: "Send proposal to Brightpath Health", sub: "Deal: Leadership workshop · Sarah", meta: "1:00 PM", pill: ["orange", "High"] },
      { title: "Prepare session notes for Maya", sub: "Maya Thompson · assigned to you", meta: "3:30 PM", pill: ["sky", "Normal"] },
      { title: "Team planning meeting", sub: "Calendar · whole team · weekly", meta: "4:00 PM", pill: ["purple", "Meeting"] },
    ],
  },
  forms: {
    title: "Forms & Pages",
    subtitle: "Lead capture forms, intake forms and landing pages, all feeding straight into your CRM.",
    kpis: [
      { label: "Submissions", value: "342", icon: "form", tone: "pink", foot: "Last 30 days" },
      { label: "Page visits", value: "5,870", icon: "chart", tone: "sky", foot: "Across 6 live pages" },
      { label: "Conversion", value: "5.8%", icon: "users", tone: "green", foot: "Visitors who filled a form" },
    ],
    listTitle: "Forms and pages",
    rows: [
      { title: "Free strategy call", sub: "Lead capture form · on your home page", meta: "128 this month", pill: ["green", "Live"] },
      { title: "New client intake", sub: "Intake form · sent after payment", meta: "14 this month", pill: ["green", "Live"] },
      { title: "Confident Leadership sales page", sub: "Course page · with checkout", meta: "2,140 visits", pill: ["green", "Live"] },
      { title: "Spring workshop registration", sub: "Registration page", meta: "Draft", pill: ["slate", "Draft"] },
    ],
  },
  documents: {
    title: "Documents",
    subtitle: "Contracts, worksheets and client files, stored with the client or deal they belong to.",
    kpis: [
      { label: "Documents", value: "418", icon: "file", tone: "slate", foot: "26 added this month" },
      { label: "Awaiting signature", value: "3", icon: "clock", tone: "orange", foot: "Oldest sent 2 days ago" },
      { label: "Shared with clients", value: "96", icon: "users", tone: "teal", foot: "Visible in their portal" },
    ],
    listTitle: "Recent documents",
    rows: [
      { title: "Coaching agreement – Daniel Okafor.pdf", sub: "Contract · Daniel Okafor", meta: "Today", pill: ["orange", "Awaiting signature"] },
      { title: "Goal-setting worksheet.pdf", sub: "Worksheet · shared with 14 clients", meta: "Yesterday", pill: ["green", "Shared"] },
      { title: "Northwind proposal v2.docx", sub: "Proposal · Northwind Advisory", meta: "Mon", pill: ["sky", "Internal"] },
      { title: "Session notes – Maya Thompson", sub: "Private notes · coaches only", meta: "Mon", pill: ["slate", "Private"] },
    ],
  },
  reports: {
    title: "Reports",
    subtitle: "How your leads, sales, revenue and clients are doing, from the data your CRM already holds.",
    kpis: [
      { label: "Revenue (30d)", value: "$38,900", icon: "invoice", tone: "green", foot: "Up 12% on last month" },
      { label: "Lead conversion", value: "24%", icon: "users", tone: "purple", foot: "Leads who became clients" },
      { label: "Client retention", value: "87%", icon: "briefcase", tone: "teal", foot: "Clients who renewed" },
    ],
    listTitle: "Saved reports",
    rows: [
      { title: "Lead sources this quarter", sub: "Website 41% · Referrals 33% · Events 26%", meta: "Updated today", pill: ["sky", "Leads"] },
      { title: "Sales by program", sub: "Executive Coaching leads with $66,000", meta: "Updated today", pill: ["green", "Sales"] },
      { title: "Outstanding invoices", sub: "4 invoices · $7,300 open", meta: "Updated today", pill: ["orange", "Finance"] },
      { title: "Client acquisition", sub: "11 new clients this quarter, 4 from referrals", meta: "Updated today", pill: ["purple", "Clients"] },
    ],
  },
  team: {
    title: "Team & Settings",
    subtitle: "Invite your team, choose what each person can see, and set up your branding, fields and integrations.",
    kpis: [
      { label: "Team members", value: "6", icon: "users", tone: "purple", foot: "Unlimited logins, no per-login fees" },
      { label: "Roles", value: "4", icon: "shield", tone: "teal", foot: "Admin, Manager, Coach, Staff" },
      { label: "Integrations", value: "3", icon: "plug", tone: "cyan", foot: "Google Calendar, Stripe, Zoom" },
    ],
    listTitle: "Team and workspace",
    rows: [
      { title: "You", sub: "Owner · full access", pill: ["purple", "Admin"] },
      { title: "Sarah Lin", sub: "Sales and pipeline · all contacts", pill: ["teal", "Manager"] },
      { title: "James Carter", sub: "Own clients and sessions only", pill: ["sky", "Coach"] },
      { title: "Branding, wording and domain", sub: "Your logo and colors · “Clients” shown as “Coaching Clients”", pill: ["green", "Complete"] },
      { title: "Custom fields and pipelines", sub: "18 fields · Coaching and Consulting pipelines", pill: ["sky", "Customized"] },
      { title: "Help & Support", sub: "User guides, and a direct line to the GoCWGL team", pill: ["sky", "Available"] },
    ],
  },
};
