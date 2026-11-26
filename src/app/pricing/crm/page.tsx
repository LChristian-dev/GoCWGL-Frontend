import type { Metadata } from "next";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { CrmCost, Faq } from "@/features/landing";
import { CrmHero, CrmInvite, CrmPackage, CrmSteps, WhatIsCrm, WhyOwn } from "@/features/crm-pricing";

export const metadata: Metadata = {
  title: "CRM Pricing",
  description:
    "Own your CRM instead of renting one. A Custom CRM with unlimited logins and no subscription: pay once, or over 6 or 12 months. Compare it to HubSpot, GoHighLevel and Zoho, then sign up and request yours.",
};

export default function CrmPricingPage() {
  return (
    <>
      <Header />
      <main>
        <CrmHero />
        <WhatIsCrm />
        <WhyOwn />
        <CrmCost />
        <CrmPackage />
        <CrmSteps />
        <Faq only="crm" />
        <CrmInvite />
      </main>
      <Footer />
    </>
  );
}
