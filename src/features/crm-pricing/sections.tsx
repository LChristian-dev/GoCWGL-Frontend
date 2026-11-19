import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@/features/pricing-ui/Icon";
import { Ctas, PricingSwitch } from "@/features/pricing-ui/Ctas";
import {
  APP_URL,
  CARE_PLAN,
  CARE_PRICE,
  FEATURE_FROM,
  FEATURE_GROUPS,
  HERO_FACTS,
  PRICE,
  PRICE_COVERS,
  STEPS,
  WHY_OWN,
} from "./data";
import styles from "@/features/pricing-ui/PricingPage.module.scss";

const amberVars = {
  "--btn-shadow": "0 18px 40px -16px rgba(247,168,27,.95)",
  "--btn-shadow-hover": "0 26px 50px -16px rgba(247,168,27,1)",
  "--btn-hover-lift": "translateY(-2px)",
} as CSSProperties;

const CRM_SIGN_UP = "Sign up free and request your CRM";

// ---- Hero ----------------------------------------------------------------

export function CrmHero() {
  return (
    <section className={styles.hero}>
      <div aria-hidden="true" data-motion="" className={styles.heroGlowA} />
      <div aria-hidden="true" data-motion="" className={styles.heroGlowB} />
      <div aria-hidden="true" className={styles.heroGrid} />

      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <PricingSwitch current="crm" />

          <p className={styles.pill}>
            <Icon name="sparkle" size={14} /> Custom CRM, built for you and owned by you
          </p>
          <h1 className={styles.heroTitle}>
            Stop renting the system <span className={styles.heroAccent}>your business runs on.</span>
          </h1>
          <p className={styles.heroLead}>
            Your CRM holds every lead, deal and client you&apos;ve ever won. Most businesses rent theirs
            month after month and pay more every time they hire. Sign up, tell us how you sell, and
            we&apos;ll build one that&apos;s yours for good.
          </p>
          <Ctas label={CRM_SIGN_UP} />
          <p className={styles.reassure}>
            <Icon name="check" size={15} /> Free account
            <Icon name="check" size={15} /> Free discovery call
            <Icon name="check" size={15} /> Nothing billed until you approve the quote
          </p>
        </div>

        <aside className={styles.offer} aria-label="Custom CRM at a glance">
          <div className={styles.offerTop}>
            <span className={styles.offerTag}>Custom CRM</span>
            <span className={styles.offerTime}>About 12–15 weeks</span>
          </div>
          <p className={styles.offerLabel}>One-time build</p>
          <p className={styles.offerPrice}>{PRICE}</p>
          <dl className={styles.facts}>
            {HERO_FACTS.map((f) => (
              <div key={f.label} className={styles.fact}>
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.offerCare}>
            <Icon name="shield" size={16} /> First year of care free, then {CARE_PRICE}/year
          </p>
          <a href="#crm-cost" className={styles.offerLink}>
            Compare it to HubSpot, GoHighLevel and Zoho ↓
          </a>
        </aside>
      </div>
    </section>
  );
}

// ---- Why own -------------------------------------------------------------

export function WhyOwn() {
  return (
    <section className={styles.why}>
      <div className={styles.container}>
        <header className={styles.head} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>Why own your CRM</p>
          <h2 className={styles.heading}>Run your sales the way bigger companies do.</h2>
        </header>
        <div className={styles.whyGrid}>
          {WHY_OWN.map((r) => (
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

// ---- Package -------------------------------------------------------------

export function CrmPackage() {
  return (
    <section id="crm-pricing" className={styles.pkgSection}>
      <div aria-hidden="true" data-motion="" className={styles.pkgGlow} />
      <div className={styles.container}>
        <header className={styles.head} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrowDark}>Your build</p>
          <h2 className={styles.heading}>One price. Built once. Yours for good.</h2>
          <p className={styles.headLead}>
            Big companies pay partners tens of thousands just to set up a CRM they still rent. Your
            price covers the whole build.
          </p>
        </header>

        <div className={styles.pkg} data-reveal="" style={{ animationName: "riseIn" }}>
          <div className={styles.pkgBuy}>
            <span className={styles.offerTag}>Custom CRM</span>
            <h3 className={styles.pkgName}>Built around exactly how your business runs.</h3>
            <p className={styles.offerLabel}>One-time build</p>
            <p className={styles.pkgPrice}>{PRICE}</p>
            <ul className={styles.pkgFacts}>
              <li>
                <Icon name="check" size={15} /> No monthly or per-login fees
              </li>
              <li>
                <Icon name="check" size={15} /> Unlimited team logins
              </li>
              <li>
                <Icon name="check" size={15} /> About 12–15 weeks to launch
              </li>
              <li>
                <Icon name="check" size={15} /> First year of care free
              </li>
            </ul>
            <Button href={APP_URL} variant="amber" className={styles.pkgCta} sheen sheenDuration="4.6s" style={amberVars}>
              Sign up and request your CRM
              <Icon name="arrow" size={18} />
            </Button>
            <p className={styles.pkgFine}>
              Questions first?{" "}
              <a href="/book" className={styles.inlineLink}>
                Book a free discovery call
              </a>
              . Nothing is billed until you approve the quote.
            </p>
          </div>

          <div className={styles.pkgBody}>
            <p className={styles.miniLabel}>Everything included</p>
            <div className={styles.groups}>
              {FEATURE_GROUPS.map((g) => (
                <div key={g.title} className={styles.group}>
                  <div className={styles.groupHead}>
                    <span className={styles.iconTileDark}>
                      <Icon name={g.icon} size={17} />
                    </span>
                    <span className={styles.groupTitle}>{g.title}</span>
                  </div>
                  <ul className={styles.checkList}>
                    {g.items.map((item) => (
                      <li key={item}>
                        <Icon name="check" size={14} className={styles.checkIcon} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.extras}>
          <div className={styles.extra} data-reveal="" style={{ animationName: "riseIn" }}>
            <p className={styles.miniLabel}>What the price covers</p>
            <ol className={styles.covers}>
              {PRICE_COVERS.map((item, i) => (
                <li key={item}>
                  <span className={styles.coverNum}>{i + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className={[styles.extra, styles.extraCare].join(" ")} data-reveal="" style={{ animationName: "riseIn" }}>
            <div className={styles.careHead}>
              <p className={styles.miniLabel}>After launch: Care plan</p>
              <span className={styles.careFree}>First year free</span>
            </div>
            <p className={styles.carePrice}>
              {CARE_PRICE}
              <small>/year after that</small>
            </p>
            <ul className={styles.checkList}>
              {CARE_PLAN.map((item) => (
                <li key={item}>
                  <Icon name="check" size={14} className={styles.checkIcon} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.extra} data-reveal="" style={{ animationName: "riseIn" }}>
            <p className={styles.miniLabel}>Growing later</p>
            <p className={styles.carePrice}>
              {FEATURE_FROM}
              <small> per new feature, from</small>
            </p>
            <p className={styles.extraText}>
              Once your CRM is launched and you and GoCWGL both mark it complete, a new menu, record
              type, integration or report starts at {FEATURE_FROM}, depending on how complex it is.
              We quote it before any work starts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Steps ---------------------------------------------------------------

export function CrmSteps() {
  return (
    <section className={styles.steps}>
      <div className={styles.container}>
        <header className={styles.head} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>How it works</p>
          <h2 className={styles.heading}>From sign-up to launch, in five steps.</h2>
          <p className={styles.headLeadLight}>
            The first step takes a minute. We handle the rest with you, one step at a time.
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
          <Ctas dark={false} label="Start with step 1: sign up free" />
        </div>
      </div>
    </section>
  );
}

// ---- Closing invite ------------------------------------------------------

export function CrmInvite() {
  return (
    <section className={styles.invite}>
      <div aria-hidden="true" data-motion="" className={styles.heroGlowA} />
      <div aria-hidden="true" className={styles.heroGrid} />
      <div className={styles.inviteInner} data-reveal="" style={{ animationName: "riseIn" }}>
        <p className={styles.pill}>
          <Icon name="sparkle" size={14} /> Your CRM is one sign-up away
        </p>
        <h2 className={styles.inviteTitle}>Own the system your business runs on.</h2>
        <p className={styles.inviteLead}>
          Create your free client account and request your CRM today. We&apos;ll book your discovery
          call, plan every screen with you, and you approve the quote before anything is billed.
        </p>
        <Ctas label={CRM_SIGN_UP} />
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
