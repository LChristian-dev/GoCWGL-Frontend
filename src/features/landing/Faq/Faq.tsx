"use client";

import { useId, useState } from "react";
import styles from "./Faq.module.scss";

type FaqItem = [question: string, answer: string];

const FUNNEL_ITEMS: FaqItem[] = [
  [
    "Do you guarantee results?",
    "No. That depends on your offer and your traffic too. We guarantee the system is built, tested and running exactly as specified.",
  ],
  [
    "I'm not tech-savvy. Can I still use it?",
    "Yes. We build and maintain the technical side. What gets handed to you is plug-and-play templates, not code.",
  ],
  [
    "I already have a website or funnel.",
    "Good. A lot of our work is auditing and fixing what's already there. We'll look at it before recommending a rebuild.",
  ],
  [
    "What if I want to move providers later?",
    "It's custom code, so we hand the full codebase to you or your new developer. You're not locked into our hosting.",
  ],
  [
    "My business is too small for this.",
    "A system matters more at low volume, not less. Every lead counts when there are fewer of them. The Foundation Build scales down.",
  ],
  [
    "Is my data safe?",
    "Yes. Your business information and account access are treated as confidential and handled carefully on our end.",
  ],
  [
    "Are there hidden fees?",
    "No. The build fee and the $97/year are stated up front. A funnel build can connect to a CRM you already pay for (any subscription like that is listed before we start), or you can drop that subscription and have a GoCWGL CRM of your own.",
  ],
  [
    "Do I have to do anything daily?",
    "No. The one exception is a small manual step like tagging a contact. If it applies to you, we walk you through it clearly.",
  ],
];

const CRM_ITEMS: FaqItem[] = [
  [
    "What's the difference between the Simple and Custom CRM?",
    "Simple CRM is the full system (contacts, pipeline, booking, forms, email campaigns and automations, invoices, reporting and client portal), set up with your branding, domain, pipeline stages, email automations and imported contacts. Custom CRM includes all of that, plus features we design and build around how your business works.",
  ],
  [
    "If you build my CRM, do I own it?",
    "Yes. The code and the data are yours. It runs on your own domain, and if you ever leave, we hand everything to you or your new developer.",
  ],
  [
    "Is there a monthly fee?",
    "No. The build is a one-time fee, and there's no monthly subscription. The only recurring cost is $97/year for hosting your CRM and monitoring the system.",
  ],
  [
    "Can you import my contacts from GoHighLevel or HubSpot?",
    "Yes. Export your contacts from your current CRM and we'll bring them into your new one, so you start with your history in place.",
  ],
  [
    "Will it work with my existing website?",
    "Yes. Booking calendars and forms come with embed codes that work on any website: inline, as a popup button, or as a link. Every form submission and booking lands in your CRM as a contact.",
  ],
  [
    "Does it sync with my Google Calendar?",
    "Yes. Google Calendar, or any calendar with an iCal link. Your busy times block booking slots automatically, and every booking emails a calendar invite.",
  ],
  [
    "Can my customers and my team log in?",
    "Yes. Your customers get a client portal where they can see build progress, files, billing and support tickets. Your team gets their own logins with roles, Google sign-in and 2-step verification.",
  ],
  [
    "Can I send invoices and track payments?",
    "Yes. Create invoices with PDF downloads, record payments as they come in, see everything in one Transactions view, and set up yearly subscriptions.",
  ],
  [
    "How long does a CRM build take?",
    "It depends on the package and how much custom work is involved. We'll give you a timeline on your discovery call, once we know what you need.",
  ],
  [
    "Can I add features later?",
    "Yes. Because it's custom code that you own, new features can be added later, by us or by your own developer.",
  ],
  [
    "Do I need a funnel to use the CRM?",
    "With the Simple CRM, yes. You need a funnel for leads to land on. If you already have one, you're set: the CRM's forms and booking calendars embed on any website. If you don't, we can build one for you. With the Custom CRM, we can build a funnel feature into the CRM itself, so you can design your own funnels.",
  ],
];

const FAQ_GROUPS: Array<{ title: string; items: FaqItem[] }> = [
  { title: "Funnel builds", items: FUNNEL_ITEMS },
  { title: "Your own CRM", items: CRM_ITEMS },
];

/** First item open by default; opening one closes the others (across both
 * groups), and clicking the open one closes it. */
export function Faq() {
  const [openKey, setOpenKey] = useState("0-0");
  const idPrefix = useId();

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>Common questions</p>
          <h2 className={styles.heading}>Straight answers.</h2>
        </div>

        {FAQ_GROUPS.map((group, groupIndex) => (
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
