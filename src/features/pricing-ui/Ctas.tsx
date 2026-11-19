import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button/Button";
import { Icon } from "./Icon";
import styles from "./PricingPage.module.scss";

/** The client app, where new clients sign up. */
export const APP_URL = "https://app.gocwgl.com";

const amberVars = {
  "--btn-shadow": "0 18px 40px -16px rgba(247,168,27,.95)",
  "--btn-shadow-hover": "0 26px 50px -16px rgba(247,168,27,1)",
  "--btn-hover-lift": "translateY(-2px)",
} as CSSProperties;

/** Sign up (the client app) and Book a discovery call: the pair every inviting block on the pricing pages uses. */
export function Ctas({ label, dark = true }: { label: string; dark?: boolean }) {
  return (
    <div className={styles.ctas}>
      <Button href={APP_URL} variant="amber" className={styles.ctaPrimary} sheen sheenDuration="4.4s" style={amberVars}>
        {label}
        <Icon name="arrow" size={18} />
      </Button>
      <Button href="/book" variant={dark ? "outlineDark" : "outlineLight"} className={styles.ctaSecondary}>
        Book a discovery call
      </Button>
    </div>
  );
}

/** The CRM / Virtual Assistant switch at the top of each pricing page. Plain <a> tags, like the site's navigation. */
export function PricingSwitch({ current }: { current: "crm" | "va" }) {
  return (
    <nav className={styles.switch} aria-label="Pricing">
      <a href="/pricing/crm" className={styles.switchItem} aria-current={current === "crm" ? "page" : undefined}>
        CRM pricing
      </a>
      <a href="/pricing/va" className={styles.switchItem} aria-current={current === "va" ? "page" : undefined}>
        Virtual Assistant pricing
      </a>
    </nav>
  );
}
