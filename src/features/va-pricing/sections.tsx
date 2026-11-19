import { Icon } from "@/features/pricing-ui/Icon";
import { Ctas, PricingSwitch } from "@/features/pricing-ui/Ctas";
import styles from "@/features/pricing-ui/PricingPage.module.scss";
import { ESTIMATES, HERO_FACTS, PORTAL_FEATURES, RATE_HIGH, RATE_LOW, STEPS, WHY_HIRE } from "./data";

const VA_SIGN_UP = "Become a client and hire a VA";

// ---- Hero ----------------------------------------------------------------

export function VaHero() {
  return (
    <section className={styles.hero}>
      <div aria-hidden="true" data-motion="" className={styles.heroGlowA} />
      <div aria-hidden="true" data-motion="" className={styles.heroGlowB} />
      <div aria-hidden="true" className={styles.heroGrid} />

      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <PricingSwitch current="va" />
          <p className={styles.pill}>
            <Icon name="sparkle" size={14} /> Virtual assistants since 2015
          </p>
          <h1 className={styles.heroTitle}>
            Hire a trained VA who <span className={styles.heroAccent}>works the way you do.</span>
          </h1>
          <p className={styles.heroLead}>
            Hand off the work that keeps you up late. Become a GoCWGL client, tell us what you need,
            and we&apos;ll match you with a virtual assistant who&apos;s trained, supported and ready to
            take tasks off your plate.
          </p>
          <Ctas label={VA_SIGN_UP} />
          <p className={styles.reassure}>
            <Icon name="check" size={15} /> Free client account
            <Icon name="check" size={15} /> Set hours or a one-off project
            <Icon name="check" size={15} /> You pay your VA directly
          </p>
        </div>

        <aside className={styles.offer} aria-label="Estimated VA pay">
          <div className={styles.offerTop}>
            <span className={styles.offerTag}>Estimated VA pay</span>
            <span className={styles.offerTime}>
              At ${RATE_LOW}–${RATE_HIGH}/hr
            </span>
          </div>
          <ul className={styles.estList}>
            {ESTIMATES.map((e) => (
              <li key={e.hours} className={styles.estRow}>
                <span className={styles.estHours}>{e.label}</span>
                <span className={styles.estRange}>
                  {e.range}
                  <small>/mo</small>
                </span>
              </li>
            ))}
          </ul>
          <dl className={styles.facts}>
            {HERO_FACTS.map((f) => (
              <div key={f.label} className={styles.fact}>
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
          <a href="#va-pay" className={styles.offerLink}>
            See how the estimates work ↓
          </a>
        </aside>
      </div>
    </section>
  );
}

// ---- Why hire ------------------------------------------------------------

export function WhyHire() {
  return (
    <section className={styles.why}>
      <div className={styles.container}>
        <header className={styles.head} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>Why hire through GoCWGL</p>
          <h2 className={styles.heading}>More than a freelancer. A VA with a team behind them.</h2>
        </header>
        <div className={styles.whyGrid}>
          {WHY_HIRE.map((r) => (
            <article key={r.title} className={styles.whyCard} data-reveal="" style={{ animationName: "riseIn" }}>
              <span className={styles.iconTile}>
                <Icon name={r.icon} size={20} />
              </span>
              <h3 className={styles.cardTitle}>{r.title}</h3>
              <p className={styles.cardBody}>{r.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Portal --------------------------------------------------------------

export function VaPortal() {
  return (
    <section className={styles.pkgSection}>
      <div aria-hidden="true" data-motion="" className={styles.pkgGlow} />
      <div className={styles.container}>
        <header className={styles.head} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrowDark}>Your client portal</p>
          <h2 className={styles.heading}>Your VA, managed in one place.</h2>
          <p className={styles.headLead}>
            Everything you and your VA need lives in your GoCWGL client portal, from the first task
            to the daily log. No more chasing updates across chats and spreadsheets.
          </p>
        </header>
        <div className={styles.portalGrid}>
          {PORTAL_FEATURES.map((f) => (
            <article key={f.title} className={styles.portalCard} data-reveal="" style={{ animationName: "riseIn" }}>
              <span className={styles.iconTileDark}>
                <Icon name={f.icon} size={18} />
              </span>
              <h3 className={styles.portalTitle}>{f.title}</h3>
              <p className={styles.portalBody}>{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Estimated pay -------------------------------------------------------

export function VaPay() {
  return (
    <section id="va-pay" className={styles.pay}>
      <div className={styles.container}>
        <header className={styles.head} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>Estimated VA pay</p>
          <h2 className={styles.heading}>Budget with confidence.</h2>
          <p className={styles.headLeadLight}>
            A guide to what your VA&apos;s monthly pay could look like, based on typical rates of{" "}
            {`$${RATE_LOW}–$${RATE_HIGH}`} an hour. You pay your VA directly for the hours they work.
          </p>
        </header>

        <div className={styles.estGrid}>
          {ESTIMATES.map((e) => (
            <article key={e.hours} className={styles.estCard} data-reveal="" style={{ animationName: "riseIn" }}>
              <span className={styles.estTag}>Estimate</span>
              <h3 className={styles.estCardTitle}>{e.label}</h3>
              <p className={styles.cardBody}>{e.tagline}</p>
              <p className={styles.estCardRange}>{e.range}</p>
              <p className={styles.estCardNote}>Estimated VA pay a month</p>
            </article>
          ))}
          <article className={styles.estCardProject} data-reveal="" style={{ animationName: "riseIn" }}>
            <span className={styles.estTag}>Open project</span>
            <h3 className={styles.estCardTitle}>Just one piece of work?</h3>
            <p className={styles.cardBody}>
              Request an open project instead of set hours. Tell us what it is, your budget and when
              it&apos;s due, and we&apos;ll send you a quote.
            </p>
            <p className={styles.estCardRange}>Quoted</p>
            <p className={styles.estCardNote}>Based on the work</p>
          </article>
        </div>

        <p className={styles.payNote} data-reveal="" style={{ animationName: "rise" }}>
          <strong>These are estimates, not quotes.</strong> Each VA sets their own hourly rate, so your
          VA&apos;s actual pay depends on who you hire and the hours they log. You&apos;ll see the full
          terms in your client portal before you request a VA.
        </p>
      </div>
    </section>
  );
}

// ---- Steps ---------------------------------------------------------------

export function VaSteps() {
  return (
    <section className={styles.steps}>
      <div className={styles.container}>
        <header className={styles.head} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>How hiring works</p>
          <h2 className={styles.heading}>From sign-up to your first task, in four steps.</h2>
          <p className={styles.headLeadLight}>
            The first step takes a minute. We take it from there, together with you.
          </p>
        </header>
        <ol className={styles.stepList}>
          {STEPS.map((s, i) => (
            <li key={s.title} className={styles.step} data-reveal="" style={{ animationName: "riseIn" }}>
              <span className={i === 0 ? styles.stepNumFirst : styles.stepNum}>{i + 1}</span>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardBody}>{s.body}</p>
            </li>
          ))}
        </ol>
        <div className={styles.stepsCta} data-reveal="" style={{ animationName: "rise" }}>
          <Ctas dark={false} label="Start with step 1: become a client" />
        </div>
      </div>
    </section>
  );
}

// ---- Closing invite ------------------------------------------------------

export function VaInvite() {
  return (
    <section className={styles.invite}>
      <div aria-hidden="true" data-motion="" className={styles.heroGlowA} />
      <div aria-hidden="true" className={styles.heroGrid} />
      <div className={styles.inviteInner} data-reveal="" style={{ animationName: "riseIn" }}>
        <p className={styles.pill}>
          <Icon name="sparkle" size={14} /> Your VA is one sign-up away
        </p>
        <h2 className={styles.inviteTitle}>Get your time back. Hire your VA.</h2>
        <p className={styles.inviteLead}>
          Create your free client account and request a VA today. Tell us what you need, and
          we&apos;ll match you with a trained VA who&apos;s ready to help your business grow.
        </p>
        <Ctas label={VA_SIGN_UP} />
        <p className={styles.inviteFine}>
          Prefer email?{" "}
          <a href="mailto:info@GoCWGL.com" className={styles.inlineLink}>
            info@GoCWGL.com
          </a>
        </p>
      </div>
    </section>
  );
}
