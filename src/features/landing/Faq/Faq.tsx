"use client";

import { useId, useState } from "react";
import styles from "./Faq.module.scss";

const FAQ_ITEMS: Array<[question: string, answer: string]> = [
  [
    "Do you guarantee results?",
    "No — that depends on your offer and your traffic too. We guarantee the system is built, tested and running exactly as specified.",
  ],
  [
    "I'm not tech-savvy. Can I still use it?",
    "Yes. We build and maintain the technical side. What gets handed to you is plug-and-play templates, not code.",
  ],
  [
    "I already have a website or funnel.",
    "Good — a lot of our work is auditing and fixing what's already there. We'll look at it before recommending a rebuild.",
  ],
  [
    "What if I want to move providers later?",
    "It's custom code, so we hand the full codebase to you or your new developer. You're not locked into our hosting.",
  ],
  [
    "My business is too small for this.",
    "A system matters more at low volume, not less — every lead counts when there are fewer of them. The Foundation Build scales down.",
  ],
  [
    "Is my data safe?",
    "Yes. Your business information and account access are treated as confidential and handled carefully on our end.",
  ],
  [
    "Are there hidden fees?",
    "No. The build fee, the $99/year, and any pass-through costs like a CRM subscription are all stated up front.",
  ],
  [
    "Do I have to do anything daily?",
    "No. The one exception is a small manual step like tagging a contact — if it applies to you, we walk you through it clearly.",
  ],
];

/** First item open by default; opening one closes the others, and clicking
 * the open one closes it. */
export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const idPrefix = useId();

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>Common questions</p>
          <h2 className={styles.heading}>Straight answers.</h2>
        </div>

        <div className={styles.list}>
          {FAQ_ITEMS.map(([question, answer], index) => {
            const isOpen = openIndex === index;
            const panelId = `${idPrefix}-panel-${index}`;
            const triggerId = `${idPrefix}-trigger-${index}`;

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
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className={styles.question}>{question}</span>
                  <span
                    aria-hidden="true"
                    className={[styles.icon, isOpen && styles.iconOpen].filter(Boolean).join(" ")}
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
    </section>
  );
}
