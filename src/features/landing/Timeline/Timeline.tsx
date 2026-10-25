import styles from "./Timeline.module.scss";

const PHASES = [
  {
    week: "WEEK 1",
    title: "Kickoff call",
    body: "We map your pipeline, your contacts and how your team works, and confirm access to what we need.",
  },
  {
    week: "WEEKS 2–4",
    title: "Core CRM build",
    body: "Contacts, pipeline stages and booking calendars, set up with your branding on your own domain.",
  },
  {
    week: "WEEKS 5–7",
    title: "Automations & portal",
    body: "Email automations, invoices, your client portal and daily reporting, plus your contacts imported.",
  },
];

const FINAL_PHASE = {
  week: "WEEK 8",
  title: "Review & launch",
  body: "You and your team test everything, we refine, then your CRM goes live.",
};

export function Timeline() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>Your CRM build timeline</p>
          <h2 className={styles.heading}>Live in about eight weeks.</h2>
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

        {/* Custom CRM contracts run 6 months: the build is live by ~week 8 and
            the remaining months are for new feature requests. */}
        <div className={styles.extension} data-reveal="" style={{ animationName: "riseIn" }}>
          <div className={styles.week}>MONTHS 3–6 · CUSTOM CRM</div>
          <div className={styles.extensionContent}>
            <h3 className={styles.title}>Keep building until it&apos;s exactly right.</h3>
            <p className={styles.body}>
              A Custom CRM comes with a 6-month contract. Your CRM is live in about 8 weeks, and
              for the rest of the 6 months you can bring us any feature you want added. We build
              it, test it and ship it into the CRM you already use every day.
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
