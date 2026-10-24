import { Button } from "@/components/ui/Button/Button";
import { CrmPreview } from "./CrmPreview";
import styles from "./Hero.module.scss";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div aria-hidden="true" data-motion="" className={styles.glowAmber} />
      <div aria-hidden="true" data-motion="" className={styles.glowNavy} />
      <div aria-hidden="true" className={styles.dotGrid} />

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <div className={styles.badge}>
              <span aria-hidden="true" data-motion="" className={styles.badgeDot} />
              New · The GoCWGL CRM
            </div>

            <h1 className={styles.heading}>
              Stop renting your CRM.
              <br />
              <span className={styles.headingGradient}>Own it.</span>
            </h1>

            <p className={styles.lead}>
              A CRM built for you, on your own domain, with your branding. Contacts, pipeline,
              booking calendars, invoices, email automations and a client portal, plus one daily
              report in your inbox at 7 AM your time. One build fee, no monthly seat bill, and the
              code and data are yours.
            </p>

            <div className={styles.actions}>
              <Button
                href="/book"
                variant="amber"
                className={styles.ctaPrimary}
                sheen
                sheenDuration="4.2s"
                style={{
                  "--btn-shadow": "0 16px 38px -14px rgba(247,168,27,.95)",
                  "--btn-shadow-hover": "0 24px 48px -14px rgba(247,168,27,1)",
                } as React.CSSProperties}
              >
                Book a discovery call
              </Button>
              <Button href="#crm" variant="outlineLight" className={styles.ctaSecondary}>
                See the CRM
              </Button>
            </div>

            <p className={styles.trust}>Virtual assistants since 2015 · No long-term lock-in</p>

            <p className={styles.funnelNote}>
              Just need a funnel?{" "}
              <a href="/pricing/funnel" className={styles.funnelNoteLink}>
                See the funnel packages →
              </a>
            </p>
          </div>

          <div className={styles.reportColumn}>
            <CrmPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
