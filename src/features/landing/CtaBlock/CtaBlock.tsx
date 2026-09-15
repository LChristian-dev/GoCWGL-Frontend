import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button/Button";
import styles from "./CtaBlock.module.scss";

const ASK_ITEMS = [
  { number: "01", text: "What you do, and where leads come from today" },
  { number: "02", text: "The main challenge you're hoping to solve" },
  { number: "03", text: "When you'd want to get started" },
  { number: "04", text: "What you've already tried, and what happened" },
];

const ctaShadowVars = {
  "--btn-shadow": "0 18px 40px -16px rgba(247,168,27,.95)",
  "--btn-shadow-hover": "0 26px 50px -16px rgba(247,168,27,1)",
} as CSSProperties;

export function CtaBlock() {
  return (
    <section id="book" className={styles.section}>
      <div aria-hidden="true" data-motion="" className={styles.glow} />
      <div aria-hidden="true" className={styles.dotGrid} />

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column} data-reveal="" style={{ animationName: "rise" }}>
            <h2 className={styles.heading}>Let&apos;s look at where your leads are leaking.</h2>
            <p className={styles.lead}>
              A short discovery call — we map what you have now, tell you honestly whether this is
              your bottleneck, and quote a real number. No pressure either way.
            </p>
            <Button
              href="mailto:info@GoCWGL.com?subject=Discovery%20call%20%E2%80%94%20Revenue%20Engine"
              variant="amber"
              className={styles.cta}
              sheen
              sheenDuration="5s"
              style={ctaShadowVars}
            >
              Book a discovery call
            </Button>
            <p className={styles.finePrint}>
              Free · No contracts · Or email{" "}
              <a href="mailto:info@GoCWGL.com" className={styles.finePrintEmail}>
                info@GoCWGL.com
              </a>
            </p>
          </div>

          <div className={styles.panel} data-reveal="" style={{ animationName: "riseIn" }}>
            <p className={styles.panelLabel}>What we&apos;ll ask on the call</p>
            <div className={styles.panelList}>
              {ASK_ITEMS.map((item) => (
                <div key={item.number} className={styles.panelItem}>
                  <span className={styles.panelNumber}>{item.number}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
