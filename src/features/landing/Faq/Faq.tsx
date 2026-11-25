"use client";

import { useId, useState } from "react";
import styles from "./Faq.module.scss";

type FaqItem = [question: string, answer: string];

// Mirrors the client app's VA agreement (gocwgl-admin
// src/features/portal/components/VaRequestModal.tsx and lib/vaAgreement.ts).
const VA_ITEMS: FaqItem[] = [
  [
    "How do I hire a VA?",
    "Become a client: create your free account at app.gocwgl.com, then request a VA from your client portal with the role, the hours a week and the pay range you have in mind. We match you with a VA for your business.",
  ],
  [
    "How much will I pay my VA?",
    "Each VA sets their own hourly rate. As a guide, at typical rates of $6–$9 an hour, 10 hours a week is about $260–$390 a month, 20 hours about $520–$780, and 40 hours about $1,040–$1,560. These are estimates; your VA's actual pay depends on who you hire and the hours they log.",
  ],
  [
    "How do I pay my VA?",
    "Directly. Your VA sends you their own invoices for their hours, and you pay them to your VA's payment method. You'll see the full terms in your client portal before you request a VA.",
  ],
  [
    "What if I only need one project done?",
    "Request an open project instead of set weekly hours. Tell us what it is, your estimated budget and when it's due; GoCWGL sends you a quote, and assigns your VA as soon as the invoice is paid.",
  ],
  [
    "Can I change the hours later?",
    "Yes. Change the hours on your request in your client portal.",
  ],
  [
    "How do I work with my VA day to day?",
    "From your client portal: assign tasks with a main VA and backups, share logins safely in Assets, add your own SOPs, see clock-ins in Attendance and what they logged in the VA tracker, and rate their work.",
  ],
];

const CRM_ITEMS: FaqItem[] = [
  [
    "What's included in the Custom CRM?",
    "Contacts, companies and sales pipelines; custom records for your business (jobs, properties, cases, orders…); automations, email campaigns, booking and forms; SMS reminders and call logging; AI helpers; invoicing and online payments; a client portal for your customers; roles and permissions with unlimited team logins; integrations; and custom reports. All on your own domain, with your branding, your data moved over, team training and 90 days of priority support.",
  ],
  [
    "If you build my CRM, do I own it?",
    "Yes. Everything we build and every record in it is yours, and you can export your data at any time. It runs on your own domain, with your branding.",
  ],
  [
    "Is there a monthly fee?",
    "No subscription or per-login fees. You pay for the build once, or spread it over 6 or 12 monthly payments that end when the plan does. Your first year after launch is free: security updates, backups and monitoring, keeping your code up to date, and unlimited revisions. After that, the Care plan is $800 a year.",
  ],
  [
    "What's the difference between a revision and a new feature?",
    "A revision changes something already in your CRM: wording, fields, layout, pipeline stages, an automation's timing. A new feature adds something it doesn't do yet: a new menu, record type, integration or report. Revisions are unlimited with the Care plan; new features are quoted.",
  ],
  [
    "Can you move my data from my current CRM?",
    "Yes. We import your spreadsheets and move your data over from your current CRM, whether that's GoHighLevel, HubSpot, Zoho or something else, so you start with your history in place.",
  ],
  [
    "Will it work with my existing website?",
    "Yes. Booking calendars and forms come with embed codes that work on any website: inline, as a popup button, or as a link. Every form submission and booking lands in your CRM as a contact.",
  ],
  [
    "How long does a CRM build take?",
    "About 12–15 weeks of design, building and testing. It starts with a discovery call and a blueprint of every screen and automation that you approve, then we build it with weekly updates in Build progress, move your data in, train your team and go live together.",
  ],
  [
    "Can I add features after my CRM is built?",
    "Yes. Once your CRM is launched and you and GoCWGL both mark it complete, each new feature starts at $100, depending on how complex it is. We quote it before any work starts.",
  ],
  [
    "How do I pay?",
    "You choose when you request: one payment of $15,000, or the custom package option, either $1,397 a month for 12 months ($16,764 in total) or $2,697 a month for 6 months ($16,182 in total). Book a call first: nothing is billed until you approve the quote. Then we send your invoice; on a monthly plan you get one invoice per payment.",
  ],
];

type FaqTopic = "crm" | "va";

// CRM first, matching the order the site presents the two offers in.
const FAQ_GROUPS: Array<{ topic: FaqTopic; title: string; items: FaqItem[] }> = [
  { topic: "crm", title: "Your own CRM", items: CRM_ITEMS },
  { topic: "va", title: "Virtual assistants", items: VA_ITEMS },
];

/** First item open by default; opening one closes the others (across both
 * groups), and clicking the open one closes it. */
export function Faq({ only }: { only?: FaqTopic } = {}) {
  const [openKey, setOpenKey] = useState("0-0");
  const groups = only ? FAQ_GROUPS.filter((g) => g.topic === only) : FAQ_GROUPS;
  const idPrefix = useId();

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>Common questions</p>
          <h2 className={styles.heading}>Straight answers.</h2>
        </div>

        {groups.map((group, groupIndex) => (
          <div key={group.title} className={styles.group}>
            <h3 className={styles.groupTitle} data-reveal="" style={{ animationName: "rise" }}>
              {group.title}
            </h3>

            <div className={styles.list}>
              {group.items.map(([question, answer], index) => {
                const key = `${groupIndex}-${index}`;
                const isOpen = openKey === key;
                const panelId = `${idPrefix}-panel-${key}`;
                const triggerId = `${idPrefix}-trigger-${key}`;

                return (
                  <div
                    key={question}
                    className={styles.item}
                    data-reveal=""
                    style={{ animationName: "riseIn" }}
                  >
                    <button
                      type="button"
                      id={triggerId}
                      className={styles.trigger}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenKey(isOpen ? "" : key)}
                    >
                      <span className={styles.question}>{question}</span>
                      <span
                        aria-hidden="true"
                        className={[styles.icon, isOpen && styles.iconOpen]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        +
                      </span>
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      className={[styles.answerWrap, isOpen && styles.answerWrapOpen]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <p className={styles.answer}>{answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
