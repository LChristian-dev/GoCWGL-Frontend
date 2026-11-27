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
import { Module } from "./sections/Module";
import { NAV_SETS, type NavSet, type Section } from "./nav";
import styles from "./CrmDemo.module.scss";

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
  /** Which sidebar to show: the short classic menu, or the full CRM menu. */
  navSet?: NavSet;
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
export default function CrmDemo({ initialSection = "dashboard", navSet = "classic", getOrigin, onClose }: CrmDemoProps) {
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

  const groups = NAV_SETS[navSet];
  // The menu item whose second sidebar holds the current page, if any.
  const openParent = groups
    .flatMap((g) => g.items)
    .find((item) => item.children?.some((child) => child.id === section));

  // In the full menu, a hands-on screen takes its menu label as its title
  // (e.g. "Appointments & Sessions"); the classic menu keeps the originals.
  const label =
    navSet === "full"
      ? groups
          .flatMap((g) => g.items.flatMap((i) => i.children ?? [i]))
          .find((i) => i.id === section)?.label
      : undefined;

  const content =
    section === "dashboard" ? <Dashboard store={store} />
    : section === "contacts" ? <Contacts store={store} />
    : section === "pipeline" ? <Pipeline store={store} title={label} />
    : section === "calendar" ? <Calendar store={store} title={label} />
    : section === "invoices" ? <Invoices store={store} title={label} />
    : section === "automations" ? <Automations store={store} title={label} />
    : <Module id={section} />;

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

        <div className={styles.body} data-sub={openParent ? "" : undefined}>
          <nav className={styles.nav} aria-label="Demo sections">
            {groups.map((group, gi) => (
              <div key={group.title ?? gi} className={styles.navGroup} role="group" aria-label={group.title}>
                {group.title && <span className={styles.navLabel}>{group.title}</span>}
                {group.items.map((item) => {
                  const current = item.children ? item === openParent : section === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={styles.navItem}
                      aria-current={current ? "page" : undefined}
                      aria-expanded={item.children ? current : undefined}
                      onClick={() => setSection(item.id)}
                    >
                      <IconTile name={item.icon} tone={item.tone} size={14} />
                      <span className={styles.navText}>{item.label}</span>
                      {item.children && (
                        <span className={styles.navChevron}>
                          <Icon name="chevronRight" size={14} />
                        </span>
                      )}
                    </button>
                  );
                })}
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

          {openParent?.children && (
            // Keyed so it slides in each time it opens.
            <nav key={openParent.id} className={styles.subnav} aria-label={`${openParent.label} pages`}>
              <div className={styles.subnavHead}>
                <IconTile name={openParent.icon} tone={openParent.tone} size={15} />
                <span className={styles.subnavTitle}>{openParent.label}</span>
              </div>
              {openParent.children.map((child) => (
                <button
                  key={child.id}
                  type="button"
                  className={styles.subnavItem}
                  aria-current={section === child.id ? "page" : undefined}
                  onClick={() => setSection(child.id)}
                >
                  <IconTile name={child.icon} tone={child.tone} size={13} />
                  <span className={styles.navText}>{child.label}</span>
                </button>
              ))}
            </nav>
          )}

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
