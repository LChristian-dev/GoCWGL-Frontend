import Image from "next/image";
import styles from "./ReportCard.module.scss";

interface Metric {
  label: string;
  value: string;
  accent?: boolean;
}

const METRICS: Metric[] = [
  { label: "New leads captured", value: "7" },
  { label: "Follow-ups sent automatically", value: "19" },
  { label: "Calls booked", value: "3", accent: true },
  { label: "Social posts published today", value: "4" },
  { label: "Broadcasts sent today", value: "2" },
];

/** The hero's signature "daily report" preview — an illustrative example, not live data. */
export function ReportCard() {
  return (
    <div className={styles.card}>
      <span aria-hidden="true" data-motion="" className={styles.scanline} />

      <div className={styles.header}>
        <Image src="/images/gocwgl-icon-v5.png" alt="" width={26} height={26} />
        <span className={styles.headerLabel}>Your daily report · 7:00 AM</span>
        <span aria-hidden="true" data-motion="" className={styles.liveDot} />
      </div>

      <div className={styles.metrics}>
        {METRICS.map((metric) => (
          <div key={metric.label} className={styles.metricRow}>
            <span className={styles.metricLabel}>{metric.label}</span>
            <span
              className={[styles.metricValue, metric.accent && styles.metricValueAccent]
                .filter(Boolean)
                .join(" ")}
            >
              {metric.value}
            </span>
          </div>
        ))}

        <div className={styles.note}>
          Needs you: one contact from Tuesday isn&apos;t tagged yet — everything after that runs
          on its own.
        </div>
        <p className={styles.caption}>Illustrative example of the AI daily report</p>
      </div>
    </div>
  );
}
