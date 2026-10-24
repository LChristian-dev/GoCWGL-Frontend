import type { CSSProperties, ReactNode } from "react";
import { Button } from "@/components/ui/Button/Button";
import styles from "./PricingHero.module.scss";

export type PricingProduct = "crm" | "funnel";

interface PricingHeroProps {
  product: PricingProduct;
  eyebrow: string;
  title: ReactNode;
  lead: string;
  points: string[];
}

// Plain <a> tags, like the rest of the site's navigation (see Header.tsx).
const SWITCH: Array<{ product: PricingProduct; href: string; label: string }> = [
  { product: "crm", href: "/pricing/crm", label: "CRM pricing" },
  { product: "funnel", href: "/pricing/funnel", label: "Funnel pricing" },
];

const ctaVars = {
  "--btn-shadow": "0 16px 38px -14px rgba(247,168,27,.95)",
  "--btn-shadow-hover": "0 24px 48px -14px rgba(247,168,27,1)",
} as CSSProperties;

/**
 * Top banner for a pricing page. Each product has its own look (CRM: deep
 * navy and cyan; Funnel: light and amber) and a switch to the other page,
 * so visitors always know which offer they're pricing.
 */
export function PricingHero({ product, eyebrow, title, lead, points }: PricingHeroProps) {
  return (
    <section className={styles.hero} data-product={product}>
      <div aria-hidden="true" data-motion="" className={styles.glowA} />
      <div aria-hidden="true" data-motion="" className={styles.glowB} />
      <div aria-hidden="true" className={styles.grid} />

      <div className={styles.container}>
        <nav className={styles.switch} aria-label="Pricing">
          {SWITCH.map((item) => (
            <a
              key={item.product}
              href={item.href}
              className={styles.switchItem}
              aria-current={item.product === product ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lead}>{lead}</p>

        <ul className={styles.points}>
          {points.map((point) => (
            <li key={point} className={styles.point}>
              <span aria-hidden="true" className={styles.check}>
                ✓
              </span>
              {point}
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Button href="/book" variant="amber" className={styles.cta} sheen sheenDuration="4.4s" style={ctaVars}>
            Book a discovery call
          </Button>
          <Button
            href={product === "crm" ? "#crm-pricing" : "#funnel-pricing"}
            variant={product === "crm" ? "outlineDark" : "outlineLight"}
            className={styles.ctaSecondary}
          >
            See the packages ↓
          </Button>
        </div>
      </div>
    </section>
  );
}
