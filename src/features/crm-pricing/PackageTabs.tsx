"use client";

import { useState, type CSSProperties, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@/features/pricing-ui/Icon";
import { APP_URL, PACKAGES, usd } from "./data";
import { PlanPicker } from "./PlanPicker";
import s from "./CrmPricing.module.scss";

const amberVars = {
  "--btn-shadow": "0 18px 40px -16px rgba(247,168,27,.95)",
  "--btn-shadow-hover": "0 26px 50px -16px rgba(247,168,27,1)",
  "--btn-hover-lift": "translateY(-2px)",
} as CSSProperties;

/** The lowest monthly payment a package can be paid in. */
const fromMonthlyCents = (pkg: (typeof PACKAGES)[number]) =>
  Math.min(...pkg.plans.filter((p) => p.payments > 1).map((p) => p.paymentCents));

/**
 * The two packages as a pricing switch, like the client portal's "Get a CRM" page: each tab shows the package's name
 * and price, and the panel below shows the picked one.
 */
export function PackageTabs() {
  const [active, setActive] = useState(PACKAGES[0].key);
  const pkg = PACKAGES.find((p) => p.key === active) ?? PACKAGES[0];

  // Arrow keys (and Home / End) move between the package tabs.
  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = PACKAGES.findIndex((p) => p.key === active);
    const n = PACKAGES.length;
    const next =
      e.key === "ArrowRight" ? (i + 1) % n
      : e.key === "ArrowLeft" ? (i - 1 + n) % n
      : e.key === "Home" ? 0
      : e.key === "End" ? n - 1
      : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(PACKAGES[next].key);
    e.currentTarget.querySelectorAll<HTMLButtonElement>("[role=tab]")[next]?.focus();
  };

  return (
    <>
      <div className={s.tiers} role="tablist" aria-label="CRM packages" onKeyDown={onTabKey}>
        {PACKAGES.map((p) => {
          const on = p.key === active;
          return (
            <button
              key={p.key}
              type="button"
              role="tab"
              id={`crm-tab-${p.key}`}
              aria-selected={on}
              aria-controls="crm-package-panel"
              tabIndex={on ? 0 : -1}
              className={s.tierTab}
              onClick={() => setActive(p.key)}
            >
              <span className={s.tierRadio} aria-hidden="true">
                <Icon name="check" size={11} />
              </span>
              <span className={s.tierText}>
                <span className={s.tierName}>{p.name}</span>
                <span className={s.tierKind}>{p.subtitle}</span>
              </span>
              <span className={s.tierPrice}>
                {usd(p.plans[0].paymentCents)}
                <small>or from {usd(fromMonthlyCents(p))}/mo</small>
              </span>
              {p.featured && <span className={s.tierTag}>Most advanced</span>}
            </button>
          );
        })}
      </div>

      <div
        key={pkg.key}
        id="crm-package-panel"
        role="tabpanel"
        aria-labelledby={`crm-tab-${pkg.key}`}
        className={[s.pkg, pkg.featured ? s.pkgFeatured : ""].join(" ")}
      >
        <div className={s.pkgBuy}>
          <div className={s.pkgTags}>
            <span className={s.tag}>{pkg.subtitle}</span>
            {pkg.featured && <span className={s.tagAmber}>Most advanced</span>}
          </div>
          <h3 className={s.pkgTitle}>{pkg.name}</h3>
          <p className={s.pkgFor}>{pkg.bestFor}</p>
          <PlanPicker plans={pkg.plans} name={pkg.key} />
          <ul className={s.pkgFacts}>
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
          <Button href={APP_URL} variant="amber" className={s.pkgCta} sheen sheenDuration="4.6s" style={amberVars}>
            Request {pkg.name}
            <Icon name="arrow" size={18} />
          </Button>
          <p className={s.pkgFine}>
            Questions first?{" "}
            <a href="/book" className={s.inlineLink}>
              Book a free discovery call
            </a>
            . Nothing is billed until you approve the quote.
          </p>
        </div>

        <div className={s.pkgBody}>
          <p className={s.miniLabel}>What&apos;s included</p>
          <div className={s.groups}>
            {pkg.groups.map((g) => (
              <div key={g.title} className={s.group}>
                <div className={s.groupHead}>
                  <span className={s.groupIcon}>
                    <Icon name={g.icon} size={16} />
                  </span>
                  <span className={s.groupTitle}>{g.title}</span>
                </div>
                <ul className={s.checkList}>
                  {g.items.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={14} className={s.checkIcon} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={s.pkgNote}>
            <Icon name="clipboard" size={16} />
            <span>{pkg.note}</span>
          </p>
        </div>
      </div>
    </>
  );
}
