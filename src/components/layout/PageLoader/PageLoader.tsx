"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo/Logo";
import styles from "./PageLoader.module.scss";

// Shortest time the loader stays up on arrival, so a fast (cached) load
// still reads as a deliberate transition rather than a one-frame flash.
const MIN_VISIBLE_MS = 650;

// How long the counter sits at 100% before the overlay fades, so the
// finished state actually registers.
const COMPLETE_HOLD_MS = 380;

// The counter can't know real progress for a full document load, so it
// eases toward this ceiling while waiting, then finishes the last stretch
// once the page reports it's loaded.
const WAITING_CEILING = 90;

// "entering" — server-rendered on every page, covers the first paint until
//              the page has finished loading.
// "hidden"   — page is ready; the overlay has faded out.
// "leaving"  — an internal link was clicked; cover the page again while the
//              browser fetches the next one.
type Phase = "entering" | "hidden" | "leaving";

// Every internal link on the site is a plain `<a>` (see Header.tsx for why),
// so each page change is a full document load. That means this one overlay
// covers both cases: it's in the server HTML for the *arriving* page, and a
// delegated click listener brings it back for the *departing* one.
function isPageChangingClick(event: MouseEvent): boolean {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return false;
  }

  const anchor = (event.target as Element | null)?.closest?.("a");
  if (!anchor || !anchor.href) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return false;

  // Same page, different hash (e.g. "/#pricing" while already on "/") —
  // the browser just scrolls, no load happens.
  const samePage =
    url.pathname === window.location.pathname && url.search === window.location.search;
  if (samePage && url.hash) return false;

  return true;
}

export function PageLoader() {
  const [phase, setPhase] = useState<Phase>("entering");
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const progress = useRef(0);
  const loaded = useRef(false);

  useEffect(() => {
    const mountedAt = performance.now();
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const hide = () => {
      loaded.current = true;
      const remaining = Math.max(
        COMPLETE_HOLD_MS,
        MIN_VISIBLE_MS - (performance.now() - mountedAt),
      );
      hideTimer = setTimeout(() => setPhase("hidden"), remaining);
    };

    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide, { once: true });

    const onClick = (event: MouseEvent) => {
      if (!isPageChangingClick(event)) return;
      progress.current = 0;
      loaded.current = false;
      setPhase("leaving");
    };

    // Back/forward restores from the bfcache keep the "leaving" overlay
    // that was up when the user navigated away — clear it.
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) setPhase("hidden");
    };

    document.addEventListener("click", onClick);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      clearTimeout(hideTimer);
      window.removeEventListener("load", hide);
      document.removeEventListener("click", onClick);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  // Drives the logo fill, bar and percentage. Written straight to the DOM
  // each frame rather than through state, to avoid a re-render per frame.
  useEffect(() => {
    if (phase === "hidden") return;

    let frame = 0;
    const tick = () => {
      const target = loaded.current ? 100 : WAITING_CEILING;
      const rate = loaded.current ? 0.2 : 0.035;
      progress.current += (target - progress.current) * rate;
      if (target - progress.current < 0.4) progress.current = target;

      rootRef.current?.style.setProperty("--progress", `${progress.current}%`);
      if (countRef.current) {
        countRef.current.textContent = String(Math.floor(progress.current)).padStart(2, "0");
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [phase]);

  const hidden = phase === "hidden";

  return (
    <div
      ref={rootRef}
      data-page-loader=""
      className={`${styles.loader} ${styles[phase]}`}
      role="status"
      aria-live="polite"
      aria-hidden={hidden}
    >
      <div aria-hidden="true" className={styles.mesh}>
        <span className={`${styles.blob} ${styles.blobAmber}`} />
        <span className={`${styles.blob} ${styles.blobPeach}`} />
        <span className={`${styles.blob} ${styles.blobNavy}`} />
      </div>
      <div aria-hidden="true" className={styles.veil} />

      <div className={styles.stack}>
        <div className={styles.logoFill}>
          <Logo height={60} priority className={styles.logoGhost} />
          <div aria-hidden="true" className={styles.logoReveal}>
            <Logo height={60} priority />
          </div>
          <span aria-hidden="true" className={styles.scanEdge} />
        </div>
        <div className={styles.meter}>
          <span className={styles.caption}>{hidden ? "" : "Loading"}</span>
          <span aria-hidden="true" className={styles.count}>
            <span ref={countRef}>00</span>%
          </span>
        </div>
        <div aria-hidden="true" className={styles.track}>
          <span className={styles.bar} />
        </div>
      </div>

      {/* Without JS nothing would ever lift the overlay — skip it entirely. */}
      <noscript>
        <style>{"[data-page-loader]{display:none!important}"}</style>
      </noscript>
    </div>
  );
}
