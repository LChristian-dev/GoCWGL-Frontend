import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { SimplePageSection } from "@/components/layout/SimplePageSection/SimplePageSection";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Survey",
  description:
    "Tell us about your business so we can point you at the right Revenue Engine package.",
};

export default function SurveyPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <SimplePageSection
          fill
          eyebrow="Quick survey"
          title="Tell us about your business"
          description="A few quick questions to help us understand where your leads come from today and where they're falling through — takes about 3 minutes."
        >
          {/* Survey embed code, provided by the client as-is. */}
          <iframe
            src="https://api.leadconnectorhq.com/widget/survey/YaQaLtPwFVkLPNtgQlgX"
            id="YaQaLtPwFVkLPNtgQlgX"
            title="survey"
            scrolling="no"
            data-cookie-consent="true"
            data-cookie-consent-provider="auto"
            className={styles.iframe}
            style={{ border: "none" }}
          />
          <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
        </SimplePageSection>
      </main>
      <Footer />
    </div>
  );
}
