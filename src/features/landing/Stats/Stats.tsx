import styles from "./Stats.module.scss";

const STATS = [
  { value: "2016", label: "Doing virtual assistant work since" },
  { value: "7 of 10", label: "Founding spots left at 50% off", accent: true },
  { value: "~3 weeks", label: "From kickoff call to live system" },
  { value: "1 email", label: "A day — instead of logging in" },
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
