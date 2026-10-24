import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import {
  Hero,
  Marquee,
  Stats,
  Story,
  HowItWorks,
  Benefits,
  Packages,
  Timeline,
  Faq,
  CtaBlock,
} from "@/features/landing";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Story />
        <HowItWorks />
        <Benefits />
        {/* Full price lists live on /pricing/crm and /pricing/funnel. */}
        <Packages />
        <Timeline />
        <Faq />
        <CtaBlock />
      </main>
      <Footer />
    </>
  );
}
