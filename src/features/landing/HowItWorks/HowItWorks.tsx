import styles from "./HowItWorks.module.scss";

const STEPS = [
  {
    number: "01",
    title: "Someone finds you",
    body: "Website, social, or a referral — the same way people find you today.",
  },
  {
    number: "02",
    title: "They reach out or book",
    body: "A short form, or a time on your calendar. No back-and-forth messages.",
  },
  {
    number: "03",
    title: "The system takes over",
    body: "Every lead is captured, tagged, and added to your pipeline the moment it arrives. Quiet leads get gentle reminders — automatically.",
  },
];

const FEATURED_STEP = {
  number: "04",
  title: "You get one email a day",
  body: "New leads, calls booked, posts published, a quick summary of the emails you received — and what needs you. You never log in to find out.",
  note: "Using Claude AI? We can set it up to update you automatically every day.",
};

const YOU_DONTS = [
  "track leads by hand.",
  "check five places for messages and bookings.",
  "build or manage any of it yourself.",
];

export function HowItWorks() {
  return (
    <section id="how" className={styles.section}>
      <div aria-hidden="true" data-motion="" className={styles.glow} />

      <div className={styles.container}>
        <div className={styles.intro} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>How your system works</p>
          <h2 className={styles.heading}>Four steps. None of them yours.</h2>
          <p className={styles.lead}>
            No tech jargon — just what happens, and when, once someone finds your business.
          </p>
        </div>

        <div className={styles.steps}>
          {STEPS.map((step) => (
            <div
              key={step.number}
              className={styles.step}
              data-reveal=""
              style={{ animationName: "riseIn" }}
            >
              <div className={styles.stepNumber}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </div>
          ))}

          <div
            className={styles.stepFeatured}
            data-reveal=""
            style={{ animationName: "riseIn" }}
          >
            <div className={[styles.stepNumber, styles.stepNumberFeatured].join(" ")}>
              {FEATURED_STEP.number}
            </div>
            <h3 className={styles.stepTitle}>{FEATURED_STEP.title}</h3>
            <p className={[styles.stepBody, styles.stepBodyFeatured].join(" ")}>
              {FEATURED_STEP.body}
            </p>
            <p className={styles.stepNoteFeatured}>{FEATURED_STEP.note}</p>
          </div>
        </div>

        <div className={styles.notes} data-reveal="" style={{ animationName: "rise" }}>
          {YOU_DONTS.map((text) => (
            <div key={text} className={styles.note}>
              <strong className={styles.noteStrong}>You don&apos;t</strong> {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
