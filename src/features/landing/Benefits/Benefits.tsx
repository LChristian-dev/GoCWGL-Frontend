import styles from "./Benefits.module.scss";

const BENEFITS = [
  {
    title: "Stop paying rent on your CRM",
    body: "One build fee instead of a per-seat bill every month. Add your whole team without your costs going up.",
  },
  {
    title: "Stop losing leads silently",
    body: "Every form submission and booking lands in your pipeline the moment it arrives. Nothing slips through the cracks.",
  },
  {
    title: "Five tools, one login",
    body: "Your CRM, scheduler, invoicing, email marketing and client portal, replaced by one connected system.",
  },
  {
    title: "Know what's working without logging in",
    body: "Your AI-powered daily report lands at 7 AM in your time zone and tells you what happened. No digging through a CRM to find it.",
  },
  {
    title: "Built around how you work",
    body: "With a Custom CRM, you have 6 months to bring us any feature you want. Not a template your competitors also rent.",
  },
];

export function Benefits() {
  return (
    <section id="included" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>What owning your CRM means</p>
          <h2 className={styles.heading}>One CRM you own, instead of five tools you rent.</h2>
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
              The code and the data are yours. If you ever leave, we hand your whole CRM to you
              or your new developer. You&apos;re never stuck with us.
            </p>
          </div>

          <div
            className={styles.cardOutline}
            data-reveal=""
            style={{ animationName: "riseIn" }}
          >
            <h3 className={styles.cardTitle}>What we won&apos;t claim</h3>
            <p className={styles.cardBody}>
              We don&apos;t generate leads for you. Those come from your marketing, reputation
              and referrals. We take over the moment one arrives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
