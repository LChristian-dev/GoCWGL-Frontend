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
  { href: "/#how", label: "How it works" },
  { href: "/#included", label: "What you get" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

const ctaShadowVars = {
  "--btn-shadow": "0 8px 24px -10px rgba(247,168,27,.8)",
  "--btn-shadow-hover": "0 14px 30px -10px rgba(247,168,27,1)",
  "--btn-hover-lift": "translateY(-2px)",
} as CSSProperties;

export function Header() {
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
            style={ctaShadowVars}
          >
            Book a call →
          </Button>
        </nav>
      </div>
    </header>
  );
}
