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
const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/#how", label: "How it works" },
  { href: "/#included", label: "What you get" },
  { href: "/#pricing", label: "Pricing" },
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
      <div className={styles.inner}>
        <a href="/" className={styles.logoLink} aria-label="GoCWGL home">
          <Logo height={46} priority />
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
          <Button
            href="/survey"
            variant="amber"
            className={styles.cta}
            style={ctaStyleVars}
            sheen
            sheenDuration="4.2s"
          >
            Book a call →
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
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button
            href="/survey"
            variant="amber"
            className={styles.mobileCta}
            style={ctaStyleVars}
            sheen
            sheenDuration="4.2s"
            onClick={() => setMenuOpen(false)}
          >
            Book a call →
          </Button>
        </nav>
      )}
    </header>
  );
}
