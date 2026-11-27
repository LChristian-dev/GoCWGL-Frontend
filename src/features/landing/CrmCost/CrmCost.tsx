"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button/Button";
import {
  CARE_CENTS,
  CARE_FREE_YEARS,
  COMPARISON,
  CRM_LOGOS,
  PACKAGE_BUILDS,
  RENTED_OPTIONS,
  type CrmPackageKey,
} from "./data";
import styles from "./CrmCost.module.scss";

/** The client app, where new clients sign up and request their CRM. */
const APP_URL = "https://app.gocwgl.com";

const money = (cents: number) =>
  `$${Math.round(cents / 100).toLocaleString("en-US")}`;

/** A break-even month count as years, e.g. 20 → "~1.7 years", 8 → "under a year". */
function breakEvenYears(months: number) {
  if (months < 12) return "under a year";
  const y = Math.round((months / 12) * 10) / 10;
  return `~${y} ${y === 1 ? "year" : "years"}`;
}

/** Owning: the one-time build plus the Care plan after its free first year. */
const ownAfter = (buildCents: number, months: number) =>
  buildCents + (CARE_CENTS / 12) * Math.max(0, months - CARE_FREE_YEARS * 12);

const ctaVars = {
  "--btn-hover-lift": "translateY(-2px)",
} as CSSProperties;

/**
 * Renting vs owning: what HubSpot, GoHighLevel and Zoho cost over the years
 * for the visitor's team size, next to the one-time build of the chosen Custom
 * CRM package (Growth or Premium). The same
 * comparison clients see under "Get a CRM" in the client portal.
 */
export function CrmCost() {
  const { defaultSeats, maxSeats, periods } = COMPARISON;
  const [seats, setSeats] = useState(defaultSeats);
  const [years, setYears] = useState<(typeof periods)[number]>(periods[0]);
  const [pkgKey, setPkgKey] = useState<CrmPackageKey>("growth");
  const pkg = PACKAGE_BUILDS.find((p) => p.key === pkgKey) ?? PACKAGE_BUILDS[0];

  const ownCents = ownAfter(pkg.buildCents, years * 12);
  const rented = RENTED_OPTIONS.map((o) => {
    const monthlyCents = o.flatMonthlyCents + o.perSeatMonthlyCents * seats;
    const totalCents = o.setupCents + monthlyCents * 12 * years;
    // The first month renting has cost more than owning, within 20 years.
    const month = Array.from({ length: 240 }, (_, i) => i + 1).find(
      (m) => o.setupCents + monthlyCents * m > ownAfter(pkg.buildCents, m),
    );
    return { ...o, totalCents, breakEven: month ?? Infinity };
  }).sort((a, b) => b.totalCents - a.totalCents);

  const maxCents = Math.max(ownCents, ...rented.map((o) => o.totalCents));
  const width = (cents: number) => `${Math.max(3, Math.round((cents / maxCents) * 100))}%`;
  const biggest = rented[0].totalCents > ownCents ? rented[0] : null;
  const cheaper = rented.filter((o) => o.totalCents < ownCents);
  const seatPct = ((seats - 1) / (maxSeats - 1)) * 100;

  return (
    <section id="crm-cost" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>Renting vs owning</p>
          <h2 className={styles.heading}>See how much you&apos;d keep by owning your CRM.</h2>
          <p className={styles.lead}>
            Move the slider to your team size and pick how long you&apos;ll use it. HubSpot,
            GoHighLevel and Zoho bill every month, for every login, for as long as you use them.
            Yours is built once, with the first year of care free and $800 a year after that.
          </p>
        </div>

        <div className={styles.card} data-reveal="" style={{ animationName: "riseIn" }}>
          <aside className={styles.panel}>
            <div className={styles.control}>
              <div className={styles.controlHead}>
                <label htmlFor="crm-cost-seats" className={styles.label}>
                  Team logins
                </label>
                <span className={styles.value}>{seats}</span>
              </div>
              <input
                id="crm-cost-seats"
                className={styles.range}
                type="range"
                min={1}
                max={maxSeats}
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                style={{ ["--fill" as string]: `${seatPct}%` }}
              />
              <div className={styles.scale}>
                <span>1</span>
                <span>{maxSeats}</span>
              </div>
            </div>

            <div className={styles.control}>
              <span className={styles.label} id="crm-cost-package">
                Your package
              </span>
              <div className={styles.years} role="radiogroup" aria-labelledby="crm-cost-package">
                {PACKAGE_BUILDS.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    role="radio"
                    aria-checked={p.key === pkgKey}
                    className={styles.year}
                    onClick={() => setPkgKey(p.key)}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.control}>
              <span className={styles.label} id="crm-cost-years">
                Over
              </span>
              <div className={styles.years} role="radiogroup" aria-labelledby="crm-cost-years">
                {periods.map((y) => (
                  <button
                    key={y}
                    type="button"
                    role="radio"
                    aria-checked={y === years}
                    className={styles.year}
                    onClick={() => setYears(y)}
                  >
                    {y} years
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.result} aria-live="polite">
              {biggest ? (
                <>
                  <span className={styles.label}>You could save up to</span>
                  <span className={styles.saving}>{money(biggest.totalCents - ownCents)}</span>
                  <span className={styles.note}>
                    against {biggest.name} {biggest.plan}, and your CRM pays for itself in{" "}
                    <strong className={styles.payback}>{breakEvenYears(biggest.breakEven)}</strong>.
                  </span>
                </>
              ) : (
                <>
                  <span className={styles.label}>For a team this small</span>
                  <span className={styles.note}>
                    Renting can cost less over {years} years. Owning still means no price rises, no
                    per-login fees as you grow, and a system built around how you work.
                  </span>
                </>
              )}
              {biggest && cheaper.length > 0 && (
                <span className={styles.noteMuted}>
                  {cheaper.map((o) => o.name).join(" and ")} cost less at this size, but the bill
                  never stops.
                </span>
              )}
            </div>
          </aside>

          <div className={styles.list}>
            {rented.map((o) => (
              <div className={styles.row} key={o.key}>
                <span className={styles.mark} aria-hidden="true">
                  <svg width={20} height={20} viewBox={CRM_LOGOS[o.logo].viewBox} focusable="false">
                    {CRM_LOGOS[o.logo].paths.map((p) => (
                      <path key={p.d.slice(0, 24)} fill={p.fill} d={p.d} />
                    ))}
                  </svg>
                </span>
                <div className={styles.body}>
                  <div className={styles.rowHead}>
                    <span className={styles.name}>
                      {o.name} <span className={styles.plan}>{o.plan}</span>
                    </span>
                    <span className={styles.amount}>{money(o.totalCents)}</span>
                  </div>
                  <div className={styles.track}>
                    <span className={styles.fill} style={{ width: width(o.totalCents) }} />
                  </div>
                  <span className={styles.detail}>{o.pricing}</span>
                  {o.totalCents > ownCents && Number.isFinite(o.breakEven) && (
                    <span className={styles.breakeven}>
                      Costs more than owning {o.breakEven < 12 ? "within" : "after"}{" "}
                      <strong>{o.breakEven < 12 ? "the first year" : breakEvenYears(o.breakEven)}</strong>
                    </span>
                  )}
                </div>
              </div>
            ))}

            <div className={[styles.row, styles.rowOwn].join(" ")}>
              <span className={[styles.mark, styles.markOwn].join(" ")} aria-hidden="true">
                ✓
              </span>
              <div className={styles.body}>
                <div className={styles.rowHead}>
                  <span className={styles.name}>
                    Your own CRM <span className={styles.plan}>GoCWGL {pkg.name} CRM</span>
                  </span>
                  <span className={[styles.amount, styles.amountOwn].join(" ")}>
                    {money(ownCents)}
                  </span>
                </div>
                <div className={styles.track}>
                  <span
                    className={[styles.fill, styles.fillOwn].join(" ")}
                    style={{ width: width(ownCents) }}
                  />
                </div>
                <span className={styles.detail}>
                  {money(pkg.buildCents)} one-time payment (6- and 12-month plans available) · first year of care free, then{" "}
                  {money(CARE_CENTS)}/year · unlimited logins · yours to keep
                </span>
              </div>
            </div>

            <p className={styles.footnote}>
              HubSpot, GoHighLevel and Zoho figures use their published list prices as of November
              2026, before taxes, add-ons and usage fees, and they can change. We go through your
              own numbers on your discovery call.
            </p>
          </div>
        </div>

        <div className={styles.invite} data-reveal="" style={{ animationName: "riseIn" }}>
          <div>
            <h3 className={styles.inviteTitle}>Stop paying rent. Start owning.</h3>
            <p className={styles.inviteText}>
              Sign up for your free client account and request your CRM, or book a discovery call
              first. You approve the plan and the quote before anything is billed.
            </p>
          </div>
          <div className={styles.inviteActions}>
            <Button
              href={APP_URL}
              variant="amber"
              className={styles.inviteCta}
              sheen
              sheenDuration="4.6s"
              style={ctaVars}
            >
              Sign up and request a CRM →
            </Button>
            <Button href="/book" variant="outlineLight" className={styles.inviteCta}>
              Book a discovery call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
