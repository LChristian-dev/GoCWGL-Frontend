import type { CSSProperties } from "react";
import { Logo } from "@/components/ui/Logo/Logo";
import { Button } from "@/components/ui/Button/Button";
import styles from "./Header.module.scss";

const NAV_LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#included", label: "What you get" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
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
        <Logo height={33} priority />
        <nav className={styles.nav} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
          <Button
            href="#book"
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
