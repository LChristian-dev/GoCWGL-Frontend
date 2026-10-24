"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDemoStore } from "./useDemoStore";
import { morphClose, morphOpen, prefersReducedMotion } from "./morph";
import type { IconName, Tone } from "./theme";
import { Icon, IconTile } from "./ui";
import { Dashboard } from "./sections/Dashboard";
import { Contacts } from "./sections/Contacts";
import { Pipeline } from "./sections/Pipeline";
import { Calendar } from "./sections/Calendar";
import { Invoices } from "./sections/Invoices";
import { Automations } from "./sections/Automations";
import styles from "./CrmDemo.module.scss";

type Section = "dashboard" | "contacts" | "pipeline" | "calendar" | "invoices" | "automations";

type NavItem = { id: Section; label: string; icon: IconName; tone: Tone };

// Grouped like the real admin's sidebar; the first group has no heading.
const NAV_GROUPS: Array<{ title?: string; items: NavItem[] }> = [
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
];

/** When simulated leads arrive while the demo is open, in ms after opening. */
const ARRIVALS = [7000, 24000, 45000, 70000];

interface Toast {
  id: number;
  title: string;
  text: string;
  tone: Tone;
  icon: IconName;
}

interface CrmDemoProps {
  initialSection?: Section;
  /** The element the demo grows out of and shrinks back into (the hero preview). */
  getOrigin?: () => HTMLElement | null;
  onClose: () => void;
}

/**
 * A hands-on GoCWGL CRM demo in a modal. It has no backend: sample data is
 * generated in the browser and every change is kept in localStorage (see
 * useDemoStore), so visitors can click around freely. While open, a few
 * leads "arrive" on their own so it behaves like a live account.
 */
export default function CrmDemo({ initialSection = "dashboard", getOrigin, onClose }: CrmDemoProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closingRef = useRef(false);
  // Effects run twice in development; the zoom must only play once.
  const zoomedRef = useRef(false);
  const store = useDemoStore();
  const [section, setSection] = useState<Section>(initialSection);
  const [confirmReset, setConfirmReset] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Timers outlive renders, so they read the latest store through a ref.
  const storeRef = useRef(store);
  useEffect(() => {
    storeRef.current = store;
  });

  const pushToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((ts) => [...ts.slice(-2), { ...toast, id }]);
    setTimeout(() => setToasts((ts) => ts.filter((t) => t.id !== id)), 5200);
  }, []);

  useEffect(() => {
    const timers = ARRIVALS.map((ms) =>
      setTimeout(() => {
        const current = storeRef.current;
        const name = current.receiveLead();
        if (!name) return;
        pushToast({ title: "New lead", text: `${name} just signed up`, tone: "purple", icon: "users" });
        const welcome = current.state.automations.find((a) => a.active && a.trigger === "lead");
        if (welcome) {
          setTimeout(
            () => pushToast({ title: "Email sent", text: `“${welcome.name}” to ${name.split(" ")[0]}`, tone: "sky", icon: "mail" }),
            1600,
          );
        }
      }, ms),
    );
    return () => timers.forEach(clearTimeout);
  }, [pushToast]);

  // showModal() gives us the top layer, focus trapping and Esc for free.
  // The page behind is locked so scrolling inside the demo can't move it.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const origin = getOrigin?.();
    if (origin && !zoomedRef.current && !prefersReducedMotion()) {
      zoomedRef.current = true;
      morphOpen(dialog, origin);
    }
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
    // Mount-only: the zoom plays once, when the demo first opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Every way out (close button, backdrop, Esc) shrinks back into the
  // preview first, then closes for real.
  const requestClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || closingRef.current) return;
    const origin = getOrigin?.();
    if (!origin || prefersReducedMotion()) {
      dialog.close();
      return;
    }
    closingRef.current = true;
    dialog.dataset.closing = "";
    morphClose(dialog, origin, () => dialog.close());
  }, [getOrigin]);

  // If the demo unmounts mid-animation, never leave the preview hidden.
  // Checked a tick later: development's extra effect pass keeps the dialog
  // on the page, a real unmount doesn't.
  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      queueMicrotask(() => {
        const origin = getOrigin?.();
        if (origin && !dialog?.isConnected) origin.style.visibility = "";
      });
    };
  }, [getOrigin]);

  const content = {
    dashboard: <Dashboard store={store} />,
    contacts: <Contacts store={store} />,
    pipeline: <Pipeline store={store} />,
    calendar: <Calendar store={store} />,
    invoices: <Invoices store={store} />,
    automations: <Automations store={store} />,
  }[section];

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      // Opening from an origin zooms in via JS; otherwise CSS fades it in.
      data-zoom={getOrigin ? "" : undefined}
      aria-label="GoCWGL CRM demo"
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      // A click on the dimmed backdrop lands on the <dialog> itself.
      onClick={(e) => e.target === e.currentTarget && requestClose()}
    >
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <span className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true">
              <Icon name="sparkle" size={14} />
            </span>
            <span className={styles.brandText}>
              crm.<strong>yourbrand</strong>.com
            </span>
          </span>
          <span className={styles.demoBadge}>
            <span className={styles.liveDot} aria-hidden="true" />
            Live demo
          </span>
          <span className={styles.topbarSpacer} />
          {confirmReset ? (
            <span className={styles.confirm}>
              Reset all demo data?
              <button
                type="button"
                className={styles.btnSmall}
                onClick={() => {
                  store.reset();
                  setConfirmReset(false);
                }}
              >
                Reset
              </button>
              <button type="button" className={styles.btnGhost} onClick={() => setConfirmReset(false)}>
                Keep
              </button>
            </span>
          ) : (
            <button type="button" className={styles.btnGhost} onClick={() => setConfirmReset(true)}>
              <Icon name="refresh" size={14} />
              <span className={styles.hideSm}>Reset demo</span>
            </button>
          )}
          <button type="button" className={styles.iconBtn} onClick={requestClose} aria-label="Close demo">
            <Icon name="close" size={18} />
          </button>
        </header>

        <div className={styles.body}>
          <nav className={styles.nav} aria-label="Demo sections">
            {NAV_GROUPS.map((group) => (
              <div key={group.title ?? "main"} className={styles.navGroup} role="group" aria-label={group.title}>
                {group.title && <span className={styles.navLabel}>{group.title}</span>}
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={styles.navItem}
                    aria-current={section === item.id ? "page" : undefined}
                    onClick={() => setSection(item.id)}
                  >
                    <IconTile name={item.icon} tone={item.tone} size={14} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            ))}

            <div className={styles.navPromo}>
              <strong>Like what you see?</strong>
              <span>We build this for your business, on your domain, and you own it.</span>
              {/* Plain <a>, like the rest of the site: a full load to /book. */}
              <a href="/book" className={styles.promoLink}>
                Book a discovery call <Icon name="arrowRight" size={14} />
              </a>
            </div>
          </nav>

          <main className={styles.main}>
            <p className={styles.notice}>
              <Icon name="sparkle" size={14} />
              Sample data. Your changes are saved only in this browser, so nothing is sent anywhere.
            </p>
            {content}
          </main>
        </div>

        <div className={styles.toasts} role="status" aria-live="polite">
          {toasts.map((t) => (
            <div key={t.id} className={styles.toast}>
              <IconTile name={t.icon} tone={t.tone} size={14} />
              <span className={styles.toastText}>
                <strong>{t.title}</strong>
                <span>{t.text}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </dialog>
  );
}
