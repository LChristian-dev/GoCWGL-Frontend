import styles from "./Timeline.module.scss";

const PHASES = [
  {
    week: "WEEK 1",
    title: "Kickoff call",
    body: "We map your business and confirm access to what we need.",
  },
  {
    week: "WEEKS 1–2",
    title: "Foundation build",
    body: "Pipeline, funnel and automation get set up and tested.",
  },
  {
    week: "WEEKS 2–3",
    title: "Content & reporting",
    body: "Templates and your AI daily reporting are configured.",
  },
];

const FINAL_PHASE = {
  week: "WEEK 3",
  title: "Review & launch",
  body: "You review everything, we refine, then it goes live.",
};

export function Timeline() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>Your build timeline</p>
          <h2 className={styles.heading}>Live in about three weeks.</h2>
        </div>

        <div className={styles.grid}>
          {PHASES.map((phase) => (
            <div
              key={phase.week}
              className={styles.card}
              data-reveal=""
              style={{ animationName: "riseIn" }}
            >
              <div className={styles.week}>{phase.week}</div>
              <h3 className={styles.title}>{phase.title}</h3>
              <p className={styles.body}>{phase.body}</p>
            </div>
          ))}

          <div className={styles.cardFinal} data-reveal="" style={{ animationName: "riseIn" }}>
            <div className={[styles.week, styles.weekOnDark].join(" ")}>{FINAL_PHASE.week}</div>
            <h3 className={styles.title}>{FINAL_PHASE.title}</h3>
            <p className={[styles.body, styles.bodyOnDark].join(" ")}>{FINAL_PHASE.body}</p>
          </div>
        </div>

        <p className={styles.disclaimer} data-reveal="" style={{ animationName: "fadein" }}>
          Timelines are estimates, not guarantees — they depend on how quickly we get access to
          your accounts and brand materials.
        </p>
      </div>
    </section>
  );
}
