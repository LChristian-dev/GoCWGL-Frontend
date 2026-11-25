import styles from "./Timeline.module.scss";

// The four steps of a Custom CRM build, as the client app lists them
// (gocwgl-admin src/data/portal.ts: CRM_STEPS).
const PHASES = [
  {
    week: "STEP 1",
    title: "Discovery call",
    body: "We learn how you find, sell to and serve your clients.",
  },
  {
    week: "STEP 2",
    title: "Blueprint",
    body: "You get a plan of every screen and automation, and the final quote, to approve.",
  },
  {
    week: "STEP 3",
    title: "Build",
    body: "We design, build and test it, and post weekly updates in Build progress.",
  },
];

const FINAL_PHASE = {
  week: "STEP 4",
  title: "Training & launch",
  body: "We move your data in, train your team and go live together.",
};

export function Timeline() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>Your CRM build timeline</p>
          <h2 className={styles.heading}>Live in about 12–15 weeks.</h2>
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

        {/* After launch: 90 days of priority support, a free first year of
            the Care plan, and new features quoted from $100. */}
        <div className={styles.extension} data-reveal="" style={{ animationName: "riseIn" }}>
          <div className={styles.week}>AFTER LAUNCH</div>
          <div className={styles.extensionContent}>
            <h3 className={styles.title}>Supported, kept up to date, and still growing.</h3>
            <p className={styles.body}>
              You get 90 days of priority support after launch, and your first year of the Care
              plan is free: security updates, backups, monitoring and unlimited revisions to
              what&apos;s built. After that it&apos;s $800 a year. Want something new? Once your
              CRM is marked complete, new features start at $100, quoted before any work starts.
            </p>
          </div>
        </div>

        <p className={styles.disclaimer} data-reveal="" style={{ animationName: "fadein" }}>
          Timelines are estimates, not guarantees. They depend on how quickly we get access to
          your accounts, contacts and brand materials.
        </p>
      </div>
    </section>
  );
}
