import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button/Button";
import styles from "./Packages.module.scss";

// The landing page's pitch for the two offers, CRM first. Prices live on
// their own pages (/pricing/crm, /pricing/funnel); this section's job is to
// hook the visitor and send them to the right one.

const CRM_POINTS = [
  "Contacts, pipeline and booking in one place",
  "Invoices, email automations and a client portal",
  "On your own domain, with your branding",
  "The code and the data are yours",
];

const FUNNEL_POINTS = [
  "A custom-coded funnel, hosted by us",
  "Email follow-up that starts the moment a lead lands",
  "Booking built in, so leads schedule themselves",
  "Plugs into the CRM you already use",
];

const ctaVars = {
  "--btn-shadow": "0 16px 38px -14px rgba(247,168,27,.9)",
  "--btn-shadow-hover": "0 24px 48px -14px rgba(247,168,27,1)",
  "--btn-hover-lift": "translateY(-2px)",
} as CSSProperties;

export function Packages() {
  return (
    <section id="pricing" className={styles.section}>
      <div aria-hidden="true" data-motion="" className={styles.glowCyan} />
      <div aria-hidden="true" data-motion="" className={styles.glowAmber} />

      <div className={styles.container}>
        <div className={styles.intro} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>Two ways to start</p>
          <h2 className={styles.heading}>
            Own your CRM. <span className={styles.headingSoft}>Or start with a funnel.</span>
          </h2>
          <p className={styles.lead}>
            Both are one-time builds with no monthly software fees. Start where your business is
            today, and add the other whenever you&apos;re ready.
          </p>
        </div>

        <div className={styles.grid}>
          <article id="crm" className={styles.cardCrm} data-reveal="" style={{ animationName: "riseIn" }}>
            <div aria-hidden="true" data-motion="" className={styles.cardShine} />
            <div className={styles.cardTop}>
              <span className={styles.tagCrm}>CRM</span>
              <span className={styles.newBadge}>
                <span aria-hidden="true" data-motion="" className={styles.newDot} />
                New
              </span>
            </div>
            <h3 className={styles.cardTitle}>Your own CRM</h3>
            <p className={styles.cardHook}>
              Stop paying every month for software you&apos;ll never own. We build yours once, and
              it&apos;s yours for good.
            </p>

            <div className={styles.rentOwn} aria-label="Renting versus owning">
              <span className={styles.rent}>Renting: a bill every month</span>
              <span aria-hidden="true" className={styles.arrow}>
                →
              </span>
              <span className={styles.own}>Owning: pay once</span>
            </div>

            <ul className={styles.points}>
              {CRM_POINTS.map((point) => (
                <li key={point} className={styles.point}>
                  <span aria-hidden="true" className={styles.checkCrm}>
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className={styles.actions}>
              <Button href="/pricing/crm" variant="amber" className={styles.cta} sheen sheenDuration="4.6s" style={ctaVars}>
                See CRM pricing →
              </Button>
              <span className={styles.demoHint}>Or try the live demo at the top of the page.</span>
            </div>
          </article>

          <article className={styles.cardFunnel} data-reveal="" style={{ animationName: "riseIn" }}>
            <div className={styles.cardTop}>
              <span className={styles.tagFunnel}>Funnel</span>
            </div>
            <h3 className={styles.cardTitle}>A funnel that catches every lead</h3>
            <p className={styles.cardHookFunnel}>
              Happy with your current CRM? Start with a custom-coded funnel that feeds it, follows
              up for you, and books the call.
            </p>

            <ul className={styles.points}>
              {FUNNEL_POINTS.map((point) => (
                <li key={point} className={styles.pointFunnel}>
                  <span aria-hidden="true" className={styles.checkFunnel}>
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className={styles.actions}>
              <Button href="/pricing/funnel" variant="outlineLight" className={styles.ctaFunnel}>
                See funnel pricing →
              </Button>
            </div>
          </article>
        </div>

        <p className={styles.unsure} data-reveal="" style={{ animationName: "rise" }}>
          Not sure which one you need?{" "}
          <a href="/book" className={styles.unsureLink}>
            Book a free discovery call
          </a>{" "}
          and we&apos;ll tell you honestly.
        </p>
      </div>
    </section>
  );
}
