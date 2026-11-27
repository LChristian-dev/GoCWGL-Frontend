"use client";

import { useState } from "react";
import { planTotalCents, usd, type PaymentPlan, type PaymentPlanKey } from "./data";
import styles from "@/features/pricing-ui/PricingPage.module.scss";

/** A package's price, and the ways to pay it: once, or a set monthly payment. */
export function PlanPicker({ plans, name }: { plans: PaymentPlan[]; name: string }) {
  const [key, setKey] = useState<PaymentPlanKey>("one_time");
  const plan = plans.find((p) => p.key === key) ?? plans[0];
  const monthly = plan.payments > 1;

  return (
    <div className={styles.picker}>
      <div aria-live="polite" aria-atomic="true">
        <p className={styles.offerLabel}>{monthly ? "Custom package option" : "One-time payment"}</p>
        <p className={styles.pkgPrice}>
          {usd(plan.paymentCents)}
          {monthly && <small>/month</small>}
        </p>
        <p className={styles.pkgPriceNote}>
          {monthly
            ? `${plan.payments} monthly payments, ${usd(planTotalCents(plan))} in total`
            : "One payment for the whole build"}
        </p>
      </div>

      <fieldset className={styles.plans}>
        <legend className={styles.plansLegend}>Choose how to pay</legend>
        {plans.map((p) => (
          <label key={p.key} className={styles.plan}>
            <input
              type="radio"
              name={`crm-payment-plan-${name}`}
              value={p.key}
              checked={p.key === key}
              onChange={() => setKey(p.key)}
              className={styles.planInput}
            />
            <span aria-hidden="true" className={styles.planDot} />
            <span className={styles.planName}>
              {p.label}
              {p.payments > 1 && <small>{usd(planTotalCents(p))} in total</small>}
            </span>
            <span className={styles.planAmount}>
              {usd(p.paymentCents)}
              {p.payments > 1 && <small> × {p.payments}</small>}
            </span>
          </label>
        ))}
      </fieldset>
    </div>
  );
}
