import { Icon } from "@/features/pricing-ui/Icon";
import { Ctas, PricingSwitch } from "@/features/pricing-ui/Ctas";
import {
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
import { PackageTabs } from "./PackageTabs";
import { CrmPreview } from "@/features/landing/Hero/CrmPreview";
import styles from "@/features/pricing-ui/PricingPage.module.scss";
import s from "./CrmPricing.module.scss";

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
    <section id="what-is-a-crm" className={s.whatIs}>
      <div className={s.container}>
        <header className={s.splitHead} data-reveal="" style={{ animationName: "rise" }}>
          <div>
            <p className={s.eyebrow}>New to CRMs? Start here</p>
            <h2 className={s.heading}>What is a custom CRM?</h2>
          </div>
          <p className={s.lead}>
            CRM stands for <strong>Customer Relationship Manager</strong>. Think of it as a smart
            address book and to-do list for your business, kept safe on the computer instead of in a
            drawer. It holds everyone you do business with, and it helps you remember what to do
            next for each of them.
          </p>
        </header>

        <div className={s.features} data-reveal="" style={{ animationName: "riseIn" }}>
          {WHAT_IS_DOES.map((d, i) => (
            <article key={d.title} className={s.feature}>
              <div className={s.featureTop}>
                <span className={s.iconBox}>
                  <Icon name={d.icon} size={21} />
                </span>
                <span aria-hidden="true" className={s.featureNum}>
                  0{i + 1}
                </span>
              </div>
              <h3 className={s.featureTitle}>{d.title}</h3>
              <p className={s.featureBody}>{d.body}</p>
            </article>
          ))}
        </div>

        <div className={s.versus} data-reveal="" style={{ animationName: "riseIn" }}>
          <div className={s.versusSide}>
            <p className={s.versusTag}>Rented</p>
            <h3 className={s.versusTitle}>{WHAT_IS_COMPARE.rented.title}</h3>
            <p className={s.versusBody}>{WHAT_IS_COMPARE.rented.body}</p>
          </div>
          <span aria-hidden="true" className={s.versusBadge}>
            vs
          </span>
          <div className={[s.versusSide, s.versusCustom].join(" ")}>
            <p className={s.versusTag}>
              <Icon name="check" size={13} /> Custom
            </p>
            <h3 className={s.versusTitle}>{WHAT_IS_COMPARE.custom.title}</h3>
            <p className={s.versusBody}>{WHAT_IS_COMPARE.custom.body}</p>
          </div>
        </div>

        <p className={s.callout}>
          <Icon name="sparkle" size={18} />
          <span>
            <strong>In short:</strong> we build it for you, we teach you and your team how to use
            it, and we look after it once it&apos;s running. You don&apos;t need to be good with
            computers.
          </span>
        </p>
      </div>
    </section>
  );
}

// ---- Why own -------------------------------------------------------------

export function WhyOwn() {
  return (
    <section className={s.why}>
      <div className={s.container}>
        <div className={s.whyLayout}>
          <header className={s.whyIntro} data-reveal="" style={{ animationName: "rise" }}>
            <p className={s.eyebrow}>Why own your CRM</p>
            <h2 className={s.heading}>Run your sales the way bigger companies do.</h2>
            <p className={s.lead}>
              One system, built around your business, with no monthly bill that grows every time
              you hire.
            </p>
            <a href="#crm-pricing" className={s.textLink}>
              See the packages <Icon name="arrow" size={16} />
            </a>
          </header>
          <div className={s.whyGrid}>
            {WHY_OWN.map((r) => (
              <article key={r.title} className={s.whyCard} data-reveal="" style={{ animationName: "riseIn" }}>
                <span className={s.iconBox}>
                  <Icon name={r.icon} size={20} />
                </span>
                <h3 className={s.cardTitle}>{r.title}</h3>
                <p className={s.cardBody}>{r.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Package -------------------------------------------------------------

export function CrmPackage() {
  return (
    <section id="crm-pricing" className={s.pkgSection}>
      <div aria-hidden="true" className={s.pkgGrid} />
      <div className={s.container}>
        <header className={s.centerHead} data-reveal="" style={{ animationName: "rise" }}>
          <p className={s.eyebrowDark}>Packages</p>
          <h2 className={s.heading}>Built once. Paid your way. Yours for good.</h2>
          <p className={s.leadDark}>
            Both packages share the same modern design and are built around how your business runs.
            Growth gives you a complete CRM; Premium adds advanced automation, custom modules and
            a full course platform. Pay once, or spread it over 6 or 12 months.
          </p>
        </header>

        <PackageTabs />

        <div className={s.compare} data-reveal="" style={{ animationName: "riseIn" }}>
          <div className={s.compareHead}>
            <div>
              <p className={s.miniLabel}>Side by side</p>
              <h3 className={s.compareTitle}>Growth vs Premium</h3>
            </div>
          </div>
          <div className={s.compareScroll}>
            <table className={s.compareTable}>
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
                  <tr className={s.compareGroup}>
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
                          {level === "Included" ? (
                            <span className={s.compareYes}>
                              <Icon name="check" size={15} /> Included
                            </span>
                          ) : (
                            level
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
          <p className={s.compareNote}>
            Both packages share the same design, menu and app; Premium unlocks more on each page.
            Third-party costs, such as email, SMS, payment or video hosting services, are estimated
            in your blueprint.
          </p>
        </div>

        <div className={s.extras}>
          <div className={s.extra} data-reveal="" style={{ animationName: "riseIn" }}>
            <p className={s.miniLabel}>What the price covers</p>
            <ol className={s.covers}>
              {PRICE_COVERS.map((item, i) => (
                <li key={item}>
                  <span className={s.coverNum}>{i + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className={[s.extra, s.extraCare].join(" ")} data-reveal="" style={{ animationName: "riseIn" }}>
            <div className={s.extraHead}>
              <p className={s.miniLabel}>After launch: Care plan</p>
              <span className={s.careFree}>First year free</span>
            </div>
            <p className={s.extraPrice}>
              {CARE_PRICE}
              <small>/year after that</small>
            </p>
            <ul className={s.checkList}>
              {CARE_PLAN.map((item) => (
                <li key={item}>
                  <Icon name="check" size={14} className={s.checkIcon} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.extra} data-reveal="" style={{ animationName: "riseIn" }}>
            <p className={s.miniLabel}>Growing later</p>
            <p className={s.extraPrice}>
              {FEATURE_FROM}
              <small> per new feature, from</small>
            </p>
            <p className={s.extraText}>
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
    <section className={s.steps}>
      <div className={s.container}>
        <header className={s.splitHead} data-reveal="" style={{ animationName: "rise" }}>
          <div>
            <p className={s.eyebrow}>How it works</p>
            <h2 className={s.heading}>From sign-up to launch, in five steps.</h2>
          </div>
          <p className={s.lead}>
            The first step takes a minute. We handle the rest with you, one step at a time.
          </p>
        </header>
        <ol className={s.stepList}>
          {STEPS.map((step, i) => (
            <li key={step.title} className={s.step} data-reveal="" style={{ animationName: "riseIn" }}>
              <span className={i === 0 ? s.stepNumFirst : s.stepNum}>{i + 1}</span>
              <h3 className={s.stepTitle}>{step.title}</h3>
              <p className={s.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
        <div className={s.stepsCta} data-reveal="" style={{ animationName: "rise" }}>
          <p>
            Ready when you are.
            <span>Free account and free discovery call. Nothing is billed until you approve the quote.</span>
          </p>
          <Ctas dark={false} label="Start with step 1: sign up free" />
        </div>
      </div>
    </section>
  );
}

// ---- Closing invite ------------------------------------------------------

export function CrmInvite() {
  return (
    <section className={s.invite}>
      <div className={s.inviteWrap}>
        <div className={s.inviteCard} data-reveal="" style={{ animationName: "riseIn" }}>
          <div aria-hidden="true" className={s.inviteGrid} />
          <div className={s.inviteInner}>
            <p className={s.eyebrowDark}>Your CRM is one sign-up away</p>
            <h2 className={s.inviteTitle}>Own the system your business runs on.</h2>
            <p className={s.inviteLead}>
              Create your free client account and request your CRM today. We&apos;ll book your
              discovery call, plan every screen with you, and you approve the quote before anything
              is billed.
            </p>
            <div className={s.inviteCtas}>
              <Ctas label={CRM_SIGN_UP} />
            </div>
            <p className={s.inviteFine}>
              Prefer email?{" "}
              <a href="mailto:info@GoCWGL.com" className={s.inlineLink}>
                info@GoCWGL.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
