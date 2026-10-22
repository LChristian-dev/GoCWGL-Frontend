import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { SimplePageSection } from "@/components/layout/SimplePageSection/SimplePageSection";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Pick a time for a short discovery call. We'll map what you have now and quote a real number.",
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
          description="Pick a time that works for you. We'll map what you have now, tell you honestly whether this is your bottleneck, and quote a real number. No pressure either way."
        >
          {/* Calendar embed code, provided by the client as-is. */}
          <iframe
            src="https://app.gocwgl.com/book/gocwgl-strategy-call?embed=1"
            title="GoCWGL Strategy Call"
            data-gocwgl-embed
            width="100%"
            height="720"
            loading="lazy"
            className={styles.iframe}
            style={{ border: 0, maxWidth: "100%" }}
          />
          <Script
            src="https://app.gocwgl.com/embed.js"
            strategy="afterInteractive"
          />
        </SimplePageSection>
      </main>
      <Footer />
    </>
  );
}
