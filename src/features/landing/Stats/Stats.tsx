import styles from "./Stats.module.scss";

const STATS = [
  { value: "12–15 wks", label: "From discovery call to your CRM going live" },
  { value: "90 days", label: "Of priority support after launch", accent: true },
  { value: "$800/yr", label: "Care plan after a free first year, the only recurring cost" },
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
