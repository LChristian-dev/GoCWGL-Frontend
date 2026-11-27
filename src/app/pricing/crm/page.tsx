import type { Metadata } from "next";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { Faq } from "@/features/landing";
import { CrmHero, CrmInvite, CrmPackage, CrmSteps, WhatIsCrm, WhyOwn } from "@/features/crm-pricing";

export const metadata: Metadata = {
  title: "CRM Pricing",
  description:
    "Own your CRM instead of renting one. Two packages, Flagship from $8,500 and Premium from $15,000, with unlimited logins and no subscription: pay once, or over 6 or 12 months. Try the live demo, then sign up and request yours.",
};

export default function CrmPricingPage() {
  return (
    <>
      <Header />
      <main>
        <CrmHero />
        <WhatIsCrm />
        <WhyOwn />
        <CrmPackage />
        <CrmSteps />
        <Faq only="crm" />
        <CrmInvite />
      </main>
      <Footer />
    </>
  );
}
