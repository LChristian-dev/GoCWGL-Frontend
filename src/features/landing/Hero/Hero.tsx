import { Button } from "@/components/ui/Button/Button";
import { ReportCard } from "./ReportCard";
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
              Founding rate — first 10 clients
            </div>

            <h1 className={styles.heading}>
              Leads come in.
              <br />
              <span className={styles.headingGradient}>Then what happens?</span>
            </h1>

            <p className={styles.lead}>
              For most start-ups, nothing. Nobody follows up, nothing gets logged, and nobody can
              say what worked. We build the system that catches every lead — pipeline, funnel,
              automation, and one daily report in your inbox.
            </p>

            <div className={styles.actions}>
              <Button
                href="/survey"
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
              <Button href="#pricing" variant="outlineLight" className={styles.ctaSecondary}>
                See the pricing
              </Button>
            </div>

            <p className={styles.trust}>Virtual assistants since 2016 · No long-term lock-in</p>
          </div>

          <div className={styles.reportColumn}>
            <ReportCard />
          </div>
        </div>
      </div>
    </section>
  );
}
