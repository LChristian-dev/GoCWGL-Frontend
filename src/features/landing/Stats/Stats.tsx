import styles from "./Stats.module.scss";

const STATS = [
  { value: "~8 weeks", label: "From kickoff call to your CRM going live" },
  { value: "6 months", label: "To add any feature on a Custom CRM", accent: true },
  { value: "$300/yr", label: "The only recurring cost, no seat fees" },
  { value: "100%", label: "Of the code and data are yours" },
];

export function Stats() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid} data-reveal="" style={{ animationName: "riseIn" }}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.cell}>
              <div
                className={[styles.value, stat.accent && styles.valueAccent]
                  .filter(Boolean)
                  .join(" ")}
              >
                {stat.value}
              </div>
              <div className={styles.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
