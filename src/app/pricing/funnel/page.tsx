import type { Metadata } from "next";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { CtaBlock, Faq, Pricing } from "@/features/landing";
import { PricingHero } from "@/features/pricing";

export const metadata: Metadata = {
  title: "Funnel Pricing",
  description:
    "Custom-coded funnels with email automation and booking built in. One-time funnel builds from $1,500, with no monthly fees.",
};

export default function FunnelPricingPage() {
  return (
    <>
      <Header />
      <main>
        <PricingHero
          product="funnel"
          eyebrow="Funnel pricing"
          title="A funnel that catches every lead."
          lead="A custom-coded funnel, hosted by us, with email automation and booking built in. Leads land, get followed up, and book a call on their own."
          points={["One-time build", "Hosted by us", "Only $97/year to keep it monitored"]}
        />
        <Pricing />
        <Faq only="funnel" />
        <CtaBlock />
      </main>
      <Footer />
    </>
  );
}
