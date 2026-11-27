"use client";

import { useId, useState } from "react";
import { CRM_ITEMS } from "@/features/landing/Faq/Faq";
import { Icon } from "@/features/pricing-ui/Icon";
import s from "./CrmPricing.module.scss";

/** The CRM questions, for the CRM pricing page. The first is open; opening one closes the others. */
export function CrmFaq() {
  const [open, setOpen] = useState(0);
  const idPrefix = useId();

  return (
    <section id="faq" className={s.faq}>
      <div className={s.container}>
        <div className={s.faqLayout}>
          <header className={s.faqIntro} data-reveal="" style={{ animationName: "rise" }}>
            <p className={s.eyebrow}>Common questions</p>
            <h2 className={s.heading}>Straight answers.</h2>
            <p className={s.lead}>
              Still unsure which package fits? We&apos;ll walk you through it on a free call.
            </p>
            <a href="/book" className={s.textLink}>
              Book a discovery call <Icon name="arrow" size={16} />
            </a>
          </header>

          <div className={s.faqList} data-reveal="" style={{ animationName: "riseIn" }}>
            {CRM_ITEMS.map(([question, answer], i) => {
              const isOpen = open === i;
              const panelId = `${idPrefix}-panel-${i}`;
              const triggerId = `${idPrefix}-trigger-${i}`;
              return (
                <div key={question} className={s.faqItem}>
                  <button
                    type="button"
                    id={triggerId}
                    className={s.faqTrigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className={s.faqQuestion}>{question}</span>
                    <span aria-hidden="true" className={[s.faqIcon, isOpen ? s.faqIconOpen : ""].join(" ")} />
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className={[s.faqAnswerWrap, isOpen ? s.faqAnswerWrapOpen : ""].join(" ")}
                  >
                    <p className={s.faqAnswer}>{answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
