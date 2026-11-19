import type { Metadata } from "next";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { Faq } from "@/features/landing";
import { VaHero, VaInvite, VaPay, VaPortal, VaSteps, WhyHire } from "@/features/va-pricing/sections";

export const metadata: Metadata = {
  title: "Virtual Assistant Pricing",
  description:
    "Hire a trained virtual assistant for your business. Become a GoCWGL client, request a VA from your portal, and pay your VA directly. See estimated monthly VA pay by hours.",
};

export default function VaPricingPage() {
  return (
    <>
      <Header />
      <main>
        <VaHero />
        <WhyHire />
        <VaPortal />
        <VaPay />
        <VaSteps />
        <Faq only="va" />
        <VaInvite />
      </main>
      <Footer />
    </>
  );
}
