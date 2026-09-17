import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { SimplePageSection } from "@/components/layout/SimplePageSection/SimplePageSection";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Pick a time for a short discovery call — we'll map what you have now and quote a real number.",
};

export default function BookPage() {
  return (
    <>
      <Header />
      <main>
        <SimplePageSection
          compactTop
          eyebrow="Book a call"
          title="Schedule your discovery call"
          description="Pick a time that works for you. We'll map what you have now, tell you honestly whether this is your bottleneck, and quote a real number — no pressure either way."
        >
          {/* Calendar embed code, provided by the client as-is. */}
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/KpivETvqggLFMHUpcKPP"
            id="KpivETvqggLFMHUpcKPP_1789468081860"
            title="Booking calendar"
            allow="payment"
            scrolling="no"
            className={styles.iframe}
            style={{ border: "none", overflow: "hidden" }}
          />
          <Script
            src="https://api.leadconnectorhq.com/js/form_embed.js"
            strategy="afterInteractive"
          />
        </SimplePageSection>
      </main>
      <Footer />
    </>
  );
}
