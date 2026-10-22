import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button/Button";
// Tier cards borrow the Pricing section's own classes so the two sets of
// cards stay one visual family — change the card chrome there, not here.
import pricingStyles from "../Pricing/Pricing.module.scss";
import styles from "./Crm.module.scss";

const OWN_VS_RENT = [
  { rent: "A monthly bill for as long as you use it", own: "A one-time build fee" },
  { rent: "Their software, their branding", own: "Your branding, on your own domain" },
  { rent: "Your data sits in their account", own: "The code and the data are yours" },
];

const FEATURE_GROUPS = [
  {
    title: "Leads",
    items: [
      "Contacts with tags, notes and an inactive list",
      "A timeline of every form submission and booking",
      "Pipeline board from new lead → call booked → paid",
      "Reporting: new leads, calls booked, revenue, conversion rate",
    ],
  },
  {
    title: "Calendar",
    items: [
      "Booking calendars with their own links and availability hours",
      "Embed as inline, popup button or link on any website",
      "Google Calendar or any iCal link blocks busy times automatically",
      "Every booking emails a calendar invite",
    ],
  },
  {
    title: "Payments",
    items: [
      "Invoices with PDF downloads",
      "Recorded payments and a Transactions view",
      "Yearly subscriptions",
    ],
  },
  {
    title: "Marketing",
    items: [
      "Forms and surveys you can embed on any website",
      "Every submission becomes a contact",
      "Email campaigns and automations",
    ],
  },
  {
    title: "Client portal",
    items: [
      "Your customers see build progress, files, billing and support tickets",
      "Team logins with roles",
      "Google sign-in and 2-step verification",
    ],
  },
];

const SIMPLE_FEATURES = [
  "Every feature listed above",
  "Set up with your branding and domain",
  "Your pipeline stages configured",
  "Your email automations set up",
  "Your existing contacts imported",
];

const CUSTOM_FEATURES = [
  "Everything in Simple CRM",
  "Custom modules designed for your business",
  "Workflows built around how your team works",
  "Optional funnel builder to design your own funnels",
  "Scoped together on your discovery call",
];

function FeatureList({ features, className }: { features: string[]; className: string }) {
  return (
    <div className={className}>
      {features.map((feature) => (
        <div key={feature} className={pricingStyles.feature}>
          <span className={pricingStyles.check}>✓</span>
          <span>{feature}</span>
        </div>
      ))}
    </div>
  );
}

const featuredCtaVars = {
  "--btn-hover-lift": "translateY(-2px)",
} as CSSProperties;

export function Crm() {
  return (
    <section id="crm" className={styles.section}>
      <div aria-hidden="true" data-motion="" className={styles.glow} />

      <div className={styles.container}>
        <div className={styles.intro} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>New · Your own CRM</p>
          <h2 className={styles.heading}>Stop renting your CRM. Own it.</h2>
          <p className={styles.lead}>
            We build you a private CRM and client portal on your own domain — custom-coded, and
            yours outright. It&apos;s the same system we run GoCWGL on every day.
          </p>
        </div>

        <div className={styles.compare} data-reveal="" style={{ animationName: "riseIn" }}>
          <div className={styles.compareCol}>
            <p className={styles.compareLabel}>Renting a CRM</p>
            <ul className={styles.compareList}>
              {OWN_VS_RENT.map((row) => (
                <li key={row.rent} className={styles.compareItem}>
                  <span className={styles.cross}>✗</span>
                  {row.rent}
                </li>
              ))}
            </ul>
          </div>
          <div className={[styles.compareCol, styles.compareColOwn].join(" ")}>
            <p className={[styles.compareLabel, styles.compareLabelOwn].join(" ")}>
              Owning your CRM
            </p>
            <ul className={styles.compareList}>
              {OWN_VS_RENT.map((row) => (
                <li key={row.own} className={styles.compareItem}>
                  <span className={pricingStyles.check}>✓</span>
                  {row.own}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className={styles.subheading} data-reveal="" style={{ animationName: "rise" }}>
          What every CRM includes
        </h3>
        <div className={styles.groups}>
          {FEATURE_GROUPS.map((group) => (
            <div
              key={group.title}
              className={styles.group}
              data-reveal=""
              style={{ animationName: "riseIn" }}
            >
              <h4 className={styles.groupTitle}>{group.title}</h4>
              <ul className={styles.groupList}>
                {group.items.map((item) => (
                  <li key={item} className={styles.groupItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.tiers}>
          <div className={pricingStyles.tier} data-reveal="" style={{ animationName: "riseIn" }}>
            <h3 className={pricingStyles.tierName}>Simple CRM</h3>
            <p className={pricingStyles.tierTagline}>The full CRM, set up for your business.</p>
            <div className={[pricingStyles.priceRow, styles.priceRow].join(" ")}>
              <span className={pricingStyles.price}>$10,000</span>
              <span className={pricingStyles.priceUnit}>one-time</span>
            </div>
            <FeatureList features={SIMPLE_FEATURES} className={pricingStyles.features} />
            <Button href="/book" variant="outlineDark" className={pricingStyles.tierCta}>
              Book a discovery call
            </Button>
          </div>

          <div
            className={pricingStyles.tierFeatured}
            data-reveal=""
            style={{ animationName: "riseIn" }}
          >
            <div aria-hidden="true" data-motion="" className={pricingStyles.featuredGlow} />
            <div className={pricingStyles.featuredContent}>
              <div className={pricingStyles.featuredBadge}>
                <span
                  aria-hidden="true"
                  data-motion=""
                  className={pricingStyles.featuredBadgeDot}
                />
                Built around your business
              </div>
              <h3 className={pricingStyles.tierName}>Custom CRM</h3>
              <p className={pricingStyles.tierTagline}>
                Simple CRM, plus features made for the way you work.
              </p>
              <div className={[pricingStyles.featuredPriceRow, styles.priceRow].join(" ")}>
                <span className={pricingStyles.featuredPrice}>$15,000</span>
                <span className={pricingStyles.priceUnit}>one-time</span>
              </div>
              <p className={pricingStyles.featuredNote}>No monthly software fees</p>
              <FeatureList features={CUSTOM_FEATURES} className={pricingStyles.featuredFeatures} />
              <Button
                href="/book"
                variant="amber"
                className={pricingStyles.featuredCta}
                sheen
                sheenDuration="4.6s"
                style={featuredCtaVars}
              >
                Book a discovery call
              </Button>
            </div>
          </div>
        </div>

        <div className={pricingStyles.feeNote} data-reveal="" style={{ animationName: "rise" }}>
          <p className={pricingStyles.feeNoteText}>
            <strong className={pricingStyles.feeNoteStrong}>
              Pay once for the build — the CRM is yours.
            </strong>{" "}
            No monthly fees — the only recurring cost is $97/year for hosting and monitoring your
            system after launch. Already set up in another CRM? We can import your contacts
            so you start with your history in place.
          </p>
        </div>
      </div>
    </section>
  );
}
