"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createSeed,
  INCOMING_LEADS,
  newId,
  SAMPLE_TAGS,
  seedAutomations,
  today,
  type Automation,
  type AutomationTrigger,
  type Booking,
  type Contact,
  type DemoState,
  type Invoice,
  type Stage,
  stageInfo,
} from "./data";

// Everything the demo does lives in this browser only: there is no server
// behind it. Storage can be unavailable (private mode, blocked site data),
// so every read and write is guarded and the demo still works in memory.
const STORAGE_KEY = "gocwgl-crm-demo-v1";

function load(): DemoState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DemoState;
      if (parsed?.version === 1 && Array.isArray(parsed.contacts)) {
        // Fill in anything saved before tags or email automations existed.
        return {
          ...parsed,
          contacts: parsed.contacts.map((c) => ({
            ...c,
            tags: Array.isArray(c.tags) ? c.tags : [...(SAMPLE_TAGS.get(c.name) ?? [])],
          })),
          automations: Array.isArray(parsed.automations) ? parsed.automations : seedAutomations(),
        };
      }
    }
  } catch {
    // Fall through to fresh sample data.
  }
  return createSeed();
}

function save(state: DemoState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or blocked: keep working in memory.
  }
}

export type NewContact = Omit<Contact, "id" | "createdAt">;

// Runs every active automation for `trigger`: bumps its sent count and
// returns one activity line per email, like the real CRM's send log.
function fire(s: DemoState, trigger: AutomationTrigger, who: string): [DemoState, string[]] {
  const lines: string[] = [];
  const automations = s.automations.map((a) => {
    if (!a.active || a.trigger !== trigger) return a;
    lines.push(a.delayHours ? `“${a.name}” email scheduled for ${who}` : `“${a.name}” email sent to ${who}`);
    return { ...a, sent: a.sent + 1 };
  });
  return [{ ...s, automations }, lines];
}

export function useDemoStore() {
  // The demo is only ever rendered on the client (see CrmPreview's dynamic
  // import), so reading storage in the initializer is safe.
  const [state, setState] = useState<DemoState>(load);

  useEffect(() => save(state), [state]);

  // `fn` may return extra activity lines (e.g. from automations) after its
  // state; `activity` is the main line. Newest lines end up on top.
  const update = useCallback(
    (fn: (s: DemoState) => DemoState | [DemoState, string[]], activity?: string) => {
      setState((s) => {
        const result = fn(s);
        const [next, extra] = Array.isArray(result) ? result : [result, []];
        const texts = [...(activity ? [activity] : []), ...extra];
        if (!texts.length) return next;
        const at = new Date().toISOString();
        const lines = texts.reverse().map((text) => ({ id: newId(), text, at }));
        return { ...next, activity: [...lines, ...next.activity].slice(0, 40) };
      });
    },
    [],
  );

  const nameOf = (s: DemoState, id: string) => s.contacts.find((c) => c.id === id)?.name ?? "A contact";

  const addContact = (contact: NewContact, activity?: string) =>
    update(
      (s) => {
        const next = { ...s, contacts: [{ ...contact, id: newId(), createdAt: today() }, ...s.contacts] };
        return contact.stage === "lead" ? fire(next, "lead", contact.name) : next;
      },
      activity ?? `${contact.name} was added as a ${stageInfo(contact.stage).label.toLowerCase()}`,
    );

  /** A simulated lead "arrives". Returns its name, or null when the pool is used up. */
  const receiveLead = () => {
    const lead = INCOMING_LEADS.find((l) => !state.contacts.some((c) => c.name === l.name));
    if (!lead) return null;
    addContact({ ...lead, stage: "lead", notes: "" }, `${lead.name} submitted the ${lead.source.toLowerCase()}`);
    return lead.name;
  };

  const updateContact = (id: string, patch: Partial<Contact>) =>
    update((s) => ({ ...s, contacts: s.contacts.map((c) => (c.id === id ? { ...c, ...patch } : c)) }));

  const moveContact = (id: string, stage: Stage) =>
    update(
      (s) => ({ ...s, contacts: s.contacts.map((c) => (c.id === id ? { ...c, stage } : c)) }),
      `${nameOf(state, id)} moved to ${stageInfo(stage).label}`,
    );

  const deleteContact = (id: string) =>
    update(
      (s) => ({
        ...s,
        contacts: s.contacts.filter((c) => c.id !== id),
        bookings: s.bookings.filter((b) => b.contactId !== id),
        invoices: s.invoices.filter((i) => i.contactId !== id),
      }),
      `${nameOf(state, id)} was deleted`,
    );

  const deleteContacts = (ids: string[]) =>
    update(
      (s) => ({
        ...s,
        contacts: s.contacts.filter((c) => !ids.includes(c.id)),
        bookings: s.bookings.filter((b) => !ids.includes(b.contactId)),
        invoices: s.invoices.filter((i) => !ids.includes(i.contactId)),
      }),
      `${ids.length} contact${ids.length === 1 ? " was" : "s were"} deleted`,
    );

  const addTag = (ids: string[], tag: string) => {
    const clean = tag.trim().toLowerCase();
    if (!clean) return;
    update(
      (s) => ({
        ...s,
        contacts: s.contacts.map((c) =>
          ids.includes(c.id) && !c.tags.includes(clean) ? { ...c, tags: [...c.tags, clean] } : c,
        ),
      }),
      ids.length > 1 ? `Tag “${clean}” added to ${ids.length} contacts` : undefined,
    );
  };

  const removeTag = (id: string, tag: string) =>
    update((s) => ({
      ...s,
      contacts: s.contacts.map((c) => (c.id === id ? { ...c, tags: c.tags.filter((t) => t !== tag) } : c)),
    }));

  // Booking a call also moves a lead forward, like the real booking flow.
  const addBooking = (booking: Omit<Booking, "id">) =>
    update(
      (s) => {
        const next: DemoState = {
          ...s,
          bookings: [...s.bookings, { ...booking, id: newId() }],
          contacts: s.contacts.map((c) =>
            c.id === booking.contactId && c.stage === "lead" ? { ...c, stage: "booked" } : c,
          ),
        };
        const who = nameOf(s, booking.contactId);
        const [afterBooked, booked] = fire(next, "booked", who);
        const [afterReminder, reminder] = fire(afterBooked, "beforeCall", who);
        return [afterReminder, [...booked, ...reminder]];
      },
      `${nameOf(state, booking.contactId)} booked a call`,
    );

  const deleteBooking = (id: string) =>
    update((s) => ({ ...s, bookings: s.bookings.filter((b) => b.id !== id) }), "A call was canceled");

  const addInvoice = (invoice: Omit<Invoice, "id" | "number" | "status">) =>
    update((s) => {
      const number = Math.max(1040, ...s.invoices.map((i) => i.number)) + 1;
      return { ...s, invoices: [{ ...invoice, id: newId(), number, status: "sent" }, ...s.invoices] };
    }, `Invoice sent to ${nameOf(state, invoice.contactId)}`);

  // Paying an invoice marks the contact as a paid client.
  const markInvoicePaid = (id: string) => {
    const invoice = state.invoices.find((i) => i.id === id);
    if (!invoice) return;
    update(
      (s) =>
        fire(
          {
            ...s,
            invoices: s.invoices.map((i) => (i.id === id ? { ...i, status: "paid" } : i)),
            contacts: s.contacts.map((c) => (c.id === invoice.contactId ? { ...c, stage: "paid" } : c)),
          },
          "paid",
          nameOf(s, invoice.contactId),
        ),
      `Invoice #${invoice.number} paid by ${nameOf(state, invoice.contactId)}`,
    );
  };

  const deleteInvoice = (id: string) =>
    update((s) => ({ ...s, invoices: s.invoices.filter((i) => i.id !== id) }));

  const toggleAutomation = (id: string) =>
    update((s) => ({ ...s, automations: s.automations.map((a) => (a.id === id ? { ...a, active: !a.active } : a)) }));

  const addAutomation = (automation: Omit<Automation, "id" | "sent" | "active">) =>
    update(
      (s) => ({ ...s, automations: [...s.automations, { ...automation, id: newId(), sent: 0, active: true }] }),
      `Automation “${automation.name}” turned on`,
    );

  const deleteAutomation = (id: string) =>
    update((s) => ({ ...s, automations: s.automations.filter((a) => a.id !== id) }));

  const reset = () => setState(createSeed());

  return {
    state,
    addContact,
    updateContact,
    moveContact,
    deleteContact,
    deleteContacts,
    addTag,
    removeTag,
    addBooking,
    deleteBooking,
    addInvoice,
    markInvoicePaid,
    deleteInvoice,
    receiveLead,
    toggleAutomation,
    addAutomation,
    deleteAutomation,
    reset,
  };
}

export type DemoStore = ReturnType<typeof useDemoStore>;
