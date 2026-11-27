import type { IconName, Tone } from "./theme";
import type { ModuleKey } from "./modules";

/** Pages with their own hands-on screen. */
export type BuiltInSection = "dashboard" | "contacts" | "pipeline" | "calendar" | "invoices" | "automations";
/** Any page the demo can show: a hands-on screen, or a sample module page (see modules.ts). */
export type Section = BuiltInSection | ModuleKey;

export type NavItem = {
  id: Section;
  label: string;
  icon: IconName;
  tone: Tone;
  /** Pages shown in a second sidebar when this item is open. Its id is the first child's. */
  children?: NavItem[];
};
export type NavGroup = { title?: string; items: NavItem[] };

/** Which sidebar the demo and its preview show. */
export type NavSet = "classic" | "full";

// Grouped like the real admin's sidebar; the first group has no heading.
export const NAV_SETS: Record<NavSet, NavGroup[]> = {
  // The landing page's short menu.
  classic: [
    { items: [{ id: "dashboard", label: "Dashboard", icon: "grid", tone: "cyan" }] },
    {
      title: "Sales",
      items: [
        { id: "contacts", label: "Contacts", icon: "users", tone: "purple" },
        { id: "pipeline", label: "Pipeline", icon: "pipeline", tone: "pink" },
        { id: "calendar", label: "Booking", icon: "calendar", tone: "orange" },
      ],
    },
    { title: "Payments", items: [{ id: "invoices", label: "Invoices", icon: "invoice", tone: "green" }] },
    { title: "Marketing", items: [{ id: "automations", label: "Email automations", icon: "mail", tone: "sky" }] },
  ],
  // The full menu of the Flagship and Premium CRM, on the CRM pricing page.
  full: [
    // Each category is one item that opens its pages in a second sidebar,
    // so the main sidebar fits on one screen.
    {
      items: [
        { id: "dashboard", label: "Dashboard", icon: "grid", tone: "cyan" },
        {
          id: "leads",
          label: "Sales",
          icon: "pipeline",
          tone: "pink",
          children: [
            { id: "leads", label: "Leads", icon: "target", tone: "purple" },
            { id: "contacts", label: "Contacts", icon: "users", tone: "cyan" },
            { id: "companies", label: "Companies", icon: "building", tone: "slate" },
            { id: "pipeline", label: "Sales Pipeline", icon: "pipeline", tone: "pink" },
            { id: "deals", label: "Deals", icon: "tag", tone: "orange" },
          ],
        },
        {
          id: "clients",
          label: "Clients",
          icon: "briefcase",
          tone: "teal",
          children: [
            { id: "clients", label: "Clients", icon: "briefcase", tone: "teal" },
            { id: "onboarding", label: "Client Onboarding", icon: "flag", tone: "green" },
            { id: "programs", label: "Programs & Services", icon: "box", tone: "purple" },
            { id: "calendar", label: "Appointments & Sessions", icon: "calendar", tone: "orange" },
            { id: "progress", label: "Client Progress", icon: "trend", tone: "sky" },
            { id: "courses", label: "Courses & Learning (basic)", icon: "graduation", tone: "pink" },
          ],
        },
        {
          id: "tasks",
          label: "Operations",
          icon: "tasks",
          tone: "cyan",
          children: [
            { id: "tasks", label: "Tasks & Calendar", icon: "tasks", tone: "cyan" },
            { id: "forms", label: "Forms & Pages", icon: "form", tone: "pink" },
            { id: "documents", label: "Documents", icon: "file", tone: "slate" },
          ],
        },
        {
          id: "automations",
          label: "Growth & Finance",
          icon: "invoice",
          tone: "green",
          children: [
            { id: "automations", label: "Marketing & Automations", icon: "megaphone", tone: "sky" },
            { id: "invoices", label: "Invoices & Payments", icon: "invoice", tone: "green" },
            { id: "reports", label: "Reports", icon: "chart", tone: "teal" },
          ],
        },
      ],
    },
    {
      title: "Administration",
      items: [{ id: "team", label: "Team & Settings", icon: "gear", tone: "purple" }],
    },
  ],
};
