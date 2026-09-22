import type { Metadata } from "next";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { SimplePageSection } from "@/components/layout/SimplePageSection/SimplePageSection";
import { Team } from "@/features/about";
import { CtaBlock } from "@/features/landing";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "About",
  description:
    "Christian and Wendy have been virtual assistants since 2016. GoCWGL is the connected system they built after watching businesses drown in disconnected tools and assistants.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <SimplePageSection
          compactTop
          wide
          animate
          eyebrow="About GoCWGL"
          title={
            <>
              We built{" "}
              <span className={styles.brandName}>
                <span className={styles.brandGo}>Go</span>
                <span className={styles.brandCwgl}>CWGL</span>
              </span>{" "}
              because we kept seeing the same problem.
            </>
          }
        >
          <div className={styles.story}>
            <p className={styles.lead}>
              Christian and Wendy have been virtual assistants since 2015. Over the years, we
              watched the same story play out with almost every small business and startup we
              worked with: they&apos;d hire one assistant to handle emails, then another for their
              funnel, then a freelancer for automation, then someone else for reporting — and
              somewhere along the way, the pieces stopped talking to each other. More people, more
              handoffs, more things falling through the cracks.
            </p>
            <p className={styles.body}>
              So we asked a different question: what if a business didn&apos;t need to hire a
              string of assistants at all — what if they just needed one connected system that did
              the work?
            </p>
            <p className={styles.body}>That&apos;s why we started GoCWGL.</p>
          </div>
        </SimplePageSection>

        <Team />
        <CtaBlock />
      </main>
      <Footer />
    </>
  );
}
