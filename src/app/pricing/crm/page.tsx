import type { Metadata } from "next";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { Crm, CtaBlock, Faq } from "@/features/landing";
import { PricingHero } from "@/features/pricing";

export const metadata: Metadata = {
  title: "CRM Pricing",
  description:
    "Own your CRM instead of renting one. The Simple CRM and Custom CRM are one-time builds on your own domain, with no monthly software fees.",
};

export default function CrmPricingPage() {
  return (
    <>
      <Header />
      <main>
        <PricingHero
          product="crm"
          eyebrow="CRM pricing"
          title="Your own CRM. Pay once. Keep it forever."
          lead="A private CRM and client portal built on your domain, with your branding. No per-seat bill every month, and the code and data are yours."
          points={["One-time build", "No monthly software fees", "You own the code and data"]}
        />
        <Crm />
        <Faq only="crm" />
        <CtaBlock />
      </main>
      <Footer />
    </>
  );
}
