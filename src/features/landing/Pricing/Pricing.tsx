import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button/Button";
import styles from "./Pricing.module.scss";

interface Feature {
  text: string;
  excluded?: boolean;
}

const FOUNDATION_FEATURES: Feature[] = [
  { text: "Pipeline / CRM setup" },
  { text: "Custom-coded funnel, hosted by us" },
  { text: "Email automation tied to the funnel" },
  { text: "Calendar booking built in" },
  { text: "Content template library", excluded: true },
  { text: "AI daily reporting", excluded: true },
];

const FULL_BUNDLE_FEATURES: Feature[] = [
  { text: "Everything in Foundation Build" },
  { text: "Campaign email prompt templates" },
  { text: "Social media post templates" },
  { text: "Canva graphic prompt templates" },
  { text: "AI-powered daily reporting emails" },
  { text: "Loyalty rate on future funnels" },
];

const VIP_FEATURES: Feature[] = [
  { text: "An additional custom-coded funnel" },
  { text: "Hosted on the same infrastructure" },
  { text: "Loyalty rate — accounts already in place" },
];

function FeatureList({ features, className }: { features: Feature[]; className: string }) {
  return (
    <div className={className}>
      {features.map((feature) => (
        <div
          key={feature.text}
          className={[styles.feature, feature.excluded && styles.featureExcluded]
            .filter(Boolean)
            .join(" ")}
        >
          <span className={feature.excluded ? styles.cross : styles.check}>
            {feature.excluded ? "✗" : "✓"}
          </span>
          <span>{feature.text}</span>
        </div>
      ))}
    </div>
  );
}

const featuredCtaVars = {
  "--btn-hover-lift": "translateY(-2px)",
} as CSSProperties;

export function Pricing() {
  return (
    <section id="pricing" className={styles.section}>
      <div aria-hidden="true" data-motion="" className={styles.glow} />

      <div className={styles.container}>
        <div className={styles.intro} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>Transparent pricing</p>
          <h2 className={styles.heading}>One-time build. Priced in the open.</h2>
          <p className={styles.lead}>
            The founding-client rate is a limited, time-bound offer for our first 10 Full Bundle
            clients — not our standard pricing going forward.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.tier} data-reveal="" style={{ animationName: "riseIn" }}>
            <h3 className={styles.tierName}>Foundation Build</h3>
            <p className={styles.tierTagline}>The plumbing on its own.</p>
            <div className={styles.priceRow}>
              <span className={styles.price}>$1,500</span>
              <span className={styles.priceUnit}>one-time</span>
            </div>
            <FeatureList features={FOUNDATION_FEATURES} className={styles.features} />
            <Button href="#book" variant="outlineDark" className={styles.tierCta}>
              Book a call
            </Button>
          </div>

          <div
            className={styles.tierFeatured}
            data-reveal=""
            style={{ animationName: "riseIn" }}
          >
            <div aria-hidden="true" data-motion="" className={styles.featuredGlow} />
            <div className={styles.featuredContent}>
              <div className={styles.featuredBadge}>
                <span aria-hidden="true" data-motion="" className={styles.featuredBadgeDot} />
                Founding rate · 50% off
              </div>
              <h3 className={styles.tierName}>Full Bundle</h3>
              <p className={styles.tierTagline}>Everything connected, reporting included.</p>
              <div className={styles.featuredPriceRow}>
                <span className={styles.featuredPrice}>$950</span>
                <span className={styles.featuredPriceStrike}>$1,950</span>
              </div>
              <p className={styles.featuredNote}>First 10 clients only</p>
              <FeatureList features={FULL_BUNDLE_FEATURES} className={styles.featuredFeatures} />
              <Button
                href="#book"
                variant="amber"
                className={styles.featuredCta}
                sheen
                sheenDuration="4.6s"
                style={featuredCtaVars}
              >
                Claim a founding spot
              </Button>
            </div>
          </div>

          <div className={styles.tier} data-reveal="" style={{ animationName: "riseIn" }}>
            <h3 className={styles.tierName}>VIP Repeat Funnel</h3>
            <p className={styles.tierTagline}>For existing Full Bundle clients.</p>
            <div className={styles.priceRow}>
              <span className={styles.price}>$1,450</span>
              <span className={styles.priceUnit}>per funnel</span>
            </div>
            <FeatureList features={VIP_FEATURES} className={styles.features} />
            <Button href="#book" variant="outlineDark" className={styles.tierCta}>
              Talk to us
            </Button>
          </div>
        </div>

        <div className={styles.feeNote} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.feeNoteText}>
            <strong className={styles.feeNoteStrong}>$99/year active-client fee.</strong> Hosting
            is part of your one-time build — the annual fee is what keeps us actively watching,
            updating and maintaining your system. Cancel any time; nothing shuts off overnight, we
            simply stop monitoring until it&apos;s renewed.
          </p>
        </div>
      </div>
    </section>
  );
}
