"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { Logo } from "@/components/ui/Logo/Logo";
import { Button } from "@/components/ui/Button/Button";
import styles from "./Header.module.scss";

// Absolute paths (not bare "#how") so these still work from /survey, /book,
// or any other page — a bare hash link just rewrites the current page's URL
// and goes nowhere if that page has no matching id.
//
// Rendered as plain `<a>` tags rather than `next/link` deliberately: a
// `next/link` client-side transition into a route+hash races its own
// "scroll to top" against "scroll to hash" (both inherit the site's global
// `scroll-behavior: smooth`), and on a page this long that race is lost as
// often as it's won, landing anywhere from the very top to the wrong
// section. A full page load has no such race — the browser performs a
// single, reliable jump to the hash on initial paint.
interface NavLink {
  href: string;
  label: string;
  /** Rendered as a hover/focus dropdown on desktop and as indented links
   * in the mobile menu. */
  children?: Array<{ href: string; label: string; isNew?: boolean }>;
}

const NAV_LINKS: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/#how", label: "How it works" },
  { href: "/#included", label: "What you get" },
  {
    href: "/#pricing",
    label: "Pricing",
    children: [
      { href: "/#pricing", label: "Funnel" },
      { href: "/#crm", label: "CRM", isNew: true },
    ],
  },
  { href: "/#faq", label: "FAQ" },
];

// Matches the logo file's exact sampled yellow (#f7ae0e) rather than the
// $color-amber design token (#f7a81b) — close, but a visibly different
// shade next to the real logo mark shown right beside this button.
const ctaStyleVars = {
  "--btn-bg": "#f7ae0e",
  "--btn-shadow": "0 8px 24px -10px rgba(247,174,14,.8)",
  "--btn-shadow-hover": "0 14px 30px -10px rgba(247,174,14,1)",
  "--btn-hover-lift": "translateY(-2px)",
} as CSSProperties;

// Below `$bp-md` there isn't room for five links plus the CTA on one line —
// rather than let them wrap into a ragged second row (which is what used to
// happen), the whole nav collapses behind a toggle button at that
// breakpoint. See Header.module.scss for the matching media query.
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* Part of the sticky header on purpose, so the CRM launch stays in
          view on every page while scrolling. Fixed at one line (see
          .announce) — html's scroll-padding-top accounts for its height. */}
      {/* Plain <a>, like NAV_LINKS — see the note above them. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/#crm" className={styles.announce}>
        <span className={styles.announceLong}>Get your own CRM, built for you and owned by you.</span>
        <span className={styles.announceShort}>Your own CRM is here.</span>
        <span className={styles.announceLink}>See the CRM →</span>
      </a>

      <div className={styles.inner}>
        <a href="/" className={styles.logoLink} aria-label="GoCWGL home">
          <Logo height={46} priority />
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {NAV_LINKS.map((link) =>
            link.children ? (
              // Opens on hover and on :focus-within (see .dropdown), so the
              // sub-links are reachable by keyboard without any JS state.
              <div key={link.href} className={styles.dropdown}>
                <a href={link.href} className={styles.link} aria-haspopup="true">
                  {link.label}
                  <span aria-hidden="true" className={styles.caret} />
                </a>
                <div className={styles.submenu}>
                  {link.children.map((child) => (
                    <a key={child.href} href={child.href} className={styles.submenuLink}>
                      {child.label}
                      {child.isNew && <span className={styles.newTag}>New</span>}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={link.href} href={link.href} className={styles.link}>
                {link.label}
              </a>
            ),
          )}
          <Button
            href="https://app.gocwgl.com"
            variant="amber"
            className={styles.cta}
            style={ctaStyleVars}
            sheen
            sheenDuration="4.2s"
          >
            Login
          </Button>
        </nav>

        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={menuOpen}
          aria-controls="primary-nav-mobile"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            aria-hidden="true"
            className={styles.menuIcon}
            data-open={menuOpen || undefined}
          />
        </button>
      </div>

      {menuOpen && (
        <nav
          id="primary-nav-mobile"
          className={styles.mobileNav}
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.href} className={styles.mobileGroup}>
                <span className={styles.mobileGroupLabel}>{link.label}</span>
                {link.children.map((child) => (
                  <a
                    key={child.href}
                    href={child.href}
                    className={styles.mobileSubLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    {child.label}
                    {child.isNew && <span className={styles.newTag}>New</span>}
                  </a>
                ))}
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ),
          )}
          <Button
            href="https://app.gocwgl.com"
            variant="amber"
            className={styles.mobileCta}
            style={ctaStyleVars}
            sheen
            sheenDuration="4.2s"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Button>
        </nav>
      )}
    </header>
  );
}
