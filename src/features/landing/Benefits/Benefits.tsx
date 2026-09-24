import styles from "./Benefits.module.scss";

const BENEFITS = [
  {
    title: "Stop losing leads silently",
    body: "Every lead is captured and logged in your pipeline the moment it arrives — nothing slips through the cracks.",
  },
  {
    title: "Five roles, one build",
    body: "A funnel builder, an automation specialist, a content person and someone tracking performance — replaced by one connected system.",
  },
  {
    title: "Know what's working without logging in",
    body: "Your AI-powered daily report tells you what happened. No digging through a CRM to find it.",
  },
  {
    title: "A funnel that feels premium",
    body: "Custom-coded design and animation — not a drag-and-drop template your competitors are also using.",
  },
];

export function Benefits() {
  return (
    <section id="included" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>What this means for you</p>
          <h2 className={styles.heading}>One system instead of five separate hires.</h2>
        </div>

        <div className={styles.grid}>
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className={styles.card}
              data-reveal=""
              style={{ animationName: "riseIn" }}
            >
              <h3 className={styles.cardTitle}>{benefit.title}</h3>
              <p className={styles.cardBody}>{benefit.body}</p>
            </div>
          ))}

          <div
            className={styles.cardDark}
            data-reveal=""
            style={{ animationName: "riseIn" }}
          >
            <div aria-hidden="true" data-motion="" className={styles.cardDarkGlow} />
            <h3 className={styles.cardTitle}>No long-term lock-in</h3>
            <p className={[styles.cardBody, styles.cardBodyOnDark].join(" ")}>
              If you ever leave, we hand the full codebase to you or your new developer.
              You&apos;re never stuck with us.
            </p>
          </div>

          <div
            className={styles.cardOutline}
            data-reveal=""
            style={{ animationName: "riseIn" }}
          >
            <h3 className={styles.cardTitle}>What we won&apos;t claim</h3>
            <p className={styles.cardBody}>
              We don&apos;t generate leads for you — those come from your marketing, reputation
              and referrals. We take over the moment one arrives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
