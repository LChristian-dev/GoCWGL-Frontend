import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@/features/pricing-ui/Icon";
import { Ctas, PricingSwitch } from "@/features/pricing-ui/Ctas";
import {
  APP_URL,
  CARE_PLAN,
  CARE_PRICE,
  COMPARE_SECTIONS,
  FEATURE_FROM,
  PACKAGES,
  PRICE_COVERS,
  STEPS,
  WHAT_IS_COMPARE,
  WHAT_IS_DOES,
  WHY_OWN,
} from "./data";
import { PlanPicker } from "./PlanPicker";
import { CrmPreview } from "@/features/landing/Hero/CrmPreview";
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
            A modern CRM for coaches, consultants, and coaching and consulting firms. It holds every
            lead, client, session and invoice you have. Most businesses rent theirs month after month
            and pay more every time they hire. Sign up, tell us how you work, and we&apos;ll build one
            that&apos;s yours for good.
          </p>
          <Ctas label={CRM_SIGN_UP} />
          <p className={styles.reassure}>
            <Icon name="check" size={15} /> Free account
            <Icon name="check" size={15} /> Free discovery call
            <Icon name="check" size={15} /> Nothing billed until you approve the quote
          </p>
        </div>

        {/* The live demo, with the full CRM menu; prices are in the package section. */}
        <div className={styles.heroDemo}>
          <CrmPreview navSet="full" />
        </div>
      </div>
    </section>
  );
}

// ---- What is a custom CRM -------------------------------------------------

export function WhatIsCrm() {
  return (
    <section id="what-is-a-crm" className={styles.whatIs}>
      <div className={styles.container}>
        <header className={styles.head} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>New to CRMs? Start here</p>
          <h2 className={styles.heading}>What is a custom CRM?</h2>
          <p className={styles.whatIsLead}>
            CRM stands for <strong>Customer Relationship Manager</strong>. Think of it as a smart
            address book and to-do list for your business, kept safe on the computer instead of in a
            drawer. It holds everyone you do business with, and it helps you remember what to do
            next for each of them.
          </p>
        </header>

        <div className={styles.whatIsGrid}>
          {WHAT_IS_DOES.map((d) => (
            <article key={d.title} className={styles.whatIsCard} data-reveal="" style={{ animationName: "riseIn" }}>
              <span className={styles.iconTile}>
                <Icon name={d.icon} size={22} />
              </span>
              <h3 className={styles.whatIsTitle}>{d.title}</h3>
              <p className={styles.whatIsBody}>{d.body}</p>
            </article>
          ))}
        </div>

        <div className={styles.whatIsCompare} data-reveal="" style={{ animationName: "riseIn" }}>
          <div className={styles.whatIsSide}>
            <h3 className={styles.whatIsTitle}>{WHAT_IS_COMPARE.rented.title}</h3>
            <p className={styles.whatIsBody}>{WHAT_IS_COMPARE.rented.body}</p>
          </div>
          <div className={[styles.whatIsSide, styles.whatIsSideCustom].join(" ")}>
            <h3 className={styles.whatIsTitle}>
              <Icon name="check" size={20} className={styles.checkIcon} /> {WHAT_IS_COMPARE.custom.title}
            </h3>
            <p className={styles.whatIsBody}>{WHAT_IS_COMPARE.custom.body}</p>
          </div>
        </div>

        <p className={styles.whatIsNote}>
          <strong>In short:</strong> we build it for you, we teach you and your team how to use it,
          and we look after it once it&apos;s running. You don&apos;t need to be good with computers.
        </p>
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
          <p className={styles.eyebrowDark}>Two packages</p>
          <h2 className={styles.heading}>Built once. Paid your way. Yours for good.</h2>
          <p className={styles.headLead}>
            Both packages share the same modern design and are built around how your business runs.
            Flagship gives you a complete CRM; Premium adds advanced automation, custom modules and
            a full course platform. Pay once, or spread it over 6 or 12 months.
          </p>
        </header>

        <div className={styles.pkgStack}>
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.key}
              id={`crm-${pkg.key}`}
              className={[styles.pkg, pkg.featured ? styles.pkgFeatured : ""].join(" ")}
              data-reveal=""
              style={{ animationName: "riseIn" }}
            >
              <div className={styles.pkgBuy}>
                <div className={styles.pkgTags}>
                  <span className={styles.offerTag}>{pkg.subtitle}</span>
                  {pkg.featured && <span className={styles.pkgBadge}>Most advanced</span>}
                </div>
                <h3 className={styles.pkgTitle}>{pkg.name}</h3>
                <p className={styles.pkgFor}>{pkg.bestFor}</p>
                <PlanPicker plans={pkg.plans} name={pkg.key} />
                <ul className={styles.pkgFacts}>
                  <li>
                    <Icon name="check" size={15} /> No subscription or per-login fees
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
                  Request {pkg.name}
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
                <p className={styles.miniLabel}>What&apos;s included</p>
                <div className={styles.groups}>
                  {pkg.groups.map((g) => (
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
                <p className={styles.pkgNote}>{pkg.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.compare} data-reveal="" style={{ animationName: "riseIn" }}>
          <p className={styles.miniLabel}>Flagship vs Premium</p>
          <div className={styles.compareScroll}>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th scope="col">Capability</th>
                  {PACKAGES.map((p) => (
                    <th key={p.key} scope="col">
                      {p.name.replace(" CRM", "")}
                    </th>
                  ))}
                </tr>
              </thead>
              {COMPARE_SECTIONS.map((section) => (
                <tbody key={section.title}>
                  <tr className={styles.compareGroup}>
                    <th scope="rowgroup" colSpan={PACKAGES.length + 1}>
                      {section.title}
                    </th>
                  </tr>
                  {section.rows.map(([capability, ...levels]) => (
                    <tr key={capability}>
                      <th scope="row">{capability}</th>
                      {levels.map((level, i) => (
                        <td
                          key={PACKAGES[i].key}
                          data-level={level.startsWith("Not") || level === "—" ? "none" : undefined}
                          aria-label={level === "—" ? "Not included" : undefined}
                        >
                          {level === "Included" ? <span className={styles.compareYes}>Included</span> : level}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
          <p className={styles.compareNote}>
            Both packages share the same design, menu and app; Premium unlocks more on each page.
            Third-party costs, such as email, SMS, payment or video hosting services, are estimated
            in your blueprint.
          </p>
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
