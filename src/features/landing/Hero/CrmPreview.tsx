"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ICONS, toneVars, type IconName, type Tone } from "@/features/crm-demo/theme";
import { usePreviewLoop, type PreviewStage } from "./usePreviewLoop";
import styles from "./CrmPreview.module.scss";

// The interactive demo is only fetched once someone opens it, so the hero
// doesn't ship its code up front. ssr: false because it reads localStorage.
const CrmDemo = dynamic(() => import("@/features/crm-demo/CrmDemo"), { ssr: false });

// Mirrors the real GoCWGL admin app (gocwgl-admin): white sidebar with
// tinted icon tiles, grid-paper main column, mono kicker, stat tiles with a
// glowing bar and a pipeline board with toned count chips.
type NavItem = { label: string; icon: IconName; tone: Tone; active?: boolean };

// Same groups as the demo's sidebar (CrmDemo); the first has no heading.
const NAV_GROUPS: Array<{ title?: string; items: NavItem[] }> = [
  { items: [{ label: "Dashboard", icon: "grid", tone: "cyan" }] },
  {
    title: "Sales",
    items: [
      { label: "Contacts", icon: "users", tone: "purple" },
      { label: "Pipeline", icon: "pipeline", tone: "pink", active: true },
      { label: "Booking", icon: "calendar", tone: "orange" },
    ],
  },
  { title: "Payments", items: [{ label: "Invoices", icon: "invoice", tone: "green" }] },
  { title: "Marketing", items: [{ label: "Email automations", icon: "mail", tone: "sky" }] },
];

const STAGES: Array<{ id: PreviewStage; title: string; tone: Tone }> = [
  { id: "lead", title: "Lead", tone: "purple" },
  { id: "booked", title: "Booked", tone: "orange" },
  { id: "paid", title: "Paid", tone: "green" },
];

/** Cards shown per column; more just bump the count, so the height holds. */
const VISIBLE_PER_COLUMN = 2;

const shortMoney = (n: number) => `$${(n / 1000).toFixed(n % 1000 ? 1 : 0)}k`;

function NavIcon({ icon, tone }: { icon: IconName; tone: Tone }) {
  return (
    <span className={styles.iconTile} style={toneVars(tone)}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={ICONS[icon]} />
      </svg>
    </span>
  );
}

/**
 * The hero's "your own CRM" preview: a styled replica of the admin app that
 * plays a looping pipeline story (see usePreviewLoop). Clicking it opens the
 * hands-on demo (CrmDemo) in a modal.
 */
export function CrmPreview() {
  const [demoOpen, setDemoOpen] = useState(false);
  // Brief bounce when the demo shrinks back into the preview.
  const [landed, setLanded] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  // Only animate while the preview is visible and the demo is closed, and
  // never for visitors who've asked for reduced motion.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.2 });
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => {
      query.removeEventListener("change", sync);
      observer.disconnect();
    };
  }, []);

  const loop = usePreviewLoop(onScreen && !demoOpen && !reducedMotion);

  // Park the fake cursor on whichever card the story is handling. Offsets
  // are layout coordinates inside .main, so the window's 3D tilt doesn't
  // throw them off.
  useLayoutEffect(() => {
    const main = mainRef.current;
    const card = loop.focusId ? main?.querySelector<HTMLElement>(`[data-deal="${loop.focusId}"]`) : null;
    if (!main || !card) {
      setCursor(null);
      return;
    }
    let x = card.offsetWidth * 0.62;
    let y = card.offsetHeight * 0.55;
    for (let el: HTMLElement | null = card; el && el !== main; el = el.offsetParent as HTMLElement | null) {
      x += el.offsetLeft;
      y += el.offsetTop;
    }
    setCursor({ x, y });
  }, [loop.focusId, loop.deals]);

  const getOrigin = useCallback(() => windowRef.current, []);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <span aria-hidden="true" data-motion="" className={styles.floatChip}>
        <span className={styles.floatDot} />
        {/* Keyed so each new message pops in. */}
        <span key={loop.chip} className={styles.floatText}>
          {loop.chip}
        </span>
      </span>

      <div
        ref={windowRef}
        className={styles.window}
        data-landed={landed || undefined}
        onAnimationEnd={(e) => e.target === e.currentTarget && setLanded(false)}
      >
        {/* One real button over the whole mock, so the decorative markup
            inside stays out of the accessibility tree. */}
        <button
          type="button"
          className={styles.launch}
          onClick={() => setDemoOpen(true)}
          aria-label="Open the interactive CRM demo"
        >
          <span className={styles.launchPill}>
            <span className={styles.launchIcon}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={ICONS.play} />
              </svg>
            </span>
            Try the live demo
          </span>
        </button>

        <div aria-hidden="true" className={styles.chrome}>
          <span className={styles.dots}>
            <span />
            <span />
            <span />
          </span>
          <span className={styles.address}>
            <span className={styles.lock} />
            <span>
              crm.<strong>yourbrand</strong>.com
            </span>
          </span>
          <span data-motion="" className={styles.liveDot} />
        </div>

        <div aria-hidden="true" className={styles.app}>
          <div className={styles.sidebar}>
            {NAV_GROUPS.map((group) => (
              <div key={group.title ?? "main"} className={styles.sidebarGroup}>
                {group.title && <span className={styles.sidebarLabel}>{group.title}</span>}
                {group.items.map((item) => (
                  <span
                    key={item.label}
                    className={[styles.navItem, item.active && styles.navItemActive]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <NavIcon icon={item.icon} tone={item.tone} />
                    <span className={styles.navLabel}>{item.label}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div ref={mainRef} className={styles.main}>
            <div className={styles.pageHeader}>
              <span className={styles.kicker}>
                <span className={styles.kickerDot} />
                YOURBRAND {"//"} PIPELINE
              </span>
              <span className={styles.pageTitle}>Sales pipeline</span>
            </div>

            <div className={styles.stats}>
              {[
                { label: "New leads", value: String(loop.stats.leads), tone: "purple" as const },
                { label: "Calls", value: String(loop.stats.calls), tone: "orange" as const },
                { label: "Paid", value: shortMoney(loop.stats.paid), tone: "green" as const },
              ].map((stat) => (
                <div key={stat.label} className={styles.stat} style={toneVars(stat.tone)}>
                  <span className={styles.statBar} />
                  <span className={styles.statBody}>
                    <span className={styles.statLabel}>{stat.label}</span>
                    {/* Keyed by value so each change ticks in. */}
                    <span key={stat.value} className={styles.statValue}>
                      {stat.value}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.board}>
              {STAGES.map((stage) => {
                const cards = loop.deals.filter((d) => d.stage === stage.id);
                return (
                  <div key={stage.id} className={styles.column} style={toneVars(stage.tone)}>
                    <div className={styles.columnHead}>
                      <span className={styles.columnDot} />
                      <span className={styles.columnTitle}>{stage.title}</span>
                      <span key={cards.length} className={styles.columnCount}>
                        {cards.length}
                      </span>
                    </div>
                    {cards.slice(0, VISIBLE_PER_COLUMN).map((deal) => (
                      <div
                        key={deal.id}
                        data-deal={deal.id}
                        data-flash={loop.flashId === deal.id || undefined}
                        data-grabbed={(loop.grabbed && loop.focusId === deal.id) || undefined}
                        className={styles.deal}
                      >
                        <span className={styles.dealText}>
                          <span className={styles.dealName}>{deal.name}</span>
                          <span className={styles.dealDetail}>{deal.detail}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            <span
              className={styles.cursor}
              data-visible={cursor ? "" : undefined}
              data-pressed={loop.grabbed || undefined}
              style={cursor ? { transform: `translate(${cursor.x}px, ${cursor.y}px)` } : undefined}
            >
              <svg viewBox="0 0 24 24">
                <path d="M4 3l15 7.5-6.5 1.8L10 19z" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.report}>
        <div className={styles.reportHead}>
          <Image src="/images/gocwgl-icon-v9.png" alt="" width={22} height={22} />
          <span className={styles.reportLabel}>Daily report · 7:00 AM your time</span>
        </div>
        <p className={styles.reportBody}>
          <strong key={`l${loop.stats.leads}`} className={styles.tick}>
            {loop.stats.leads}
          </strong>{" "}
          new leads ·{" "}
          <strong key={`c${loop.stats.calls}`} className={`${styles.reportAccent} ${styles.tick}`}>
            {loop.stats.calls}
          </strong>{" "}
          calls booked ·{" "}
          <strong key={`p${loop.stats.paid}`} className={styles.tick}>
            ${loop.stats.paid.toLocaleString("en-US")}
          </strong>{" "}
          paid
        </p>
      </div>

      <p className={styles.caption}>Click to try it. Your changes stay in your browser.</p>

      {demoOpen && (
        <CrmDemo
          getOrigin={getOrigin}
          onClose={() => {
            setDemoOpen(false);
            setLanded(true);
          }}
        />
      )}
    </div>
  );
}
