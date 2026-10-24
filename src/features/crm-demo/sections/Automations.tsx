import { useState, type FormEvent } from "react";
import { formatDelay, TRIGGERS, triggerLabel, type AutomationTrigger } from "../data";
import type { DemoStore } from "../useDemoStore";
import { Empty, Field, Icon, Pill, SectionHead } from "../ui";
import styles from "../CrmDemo.module.scss";

const BLANK = { name: "", trigger: "lead" as AutomationTrigger, delayHours: 0, subject: "" };

const DELAYS = [0, 1, 24, 48, 72, 168];

export function Automations({ store }: { store: DemoStore }) {
  const { automations, activity } = store.state;
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState(BLANK);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim() || !draft.subject.trim()) return;
    store.addAutomation({ ...draft, name: draft.name.trim(), subject: draft.subject.trim() });
    setDraft(BLANK);
    setAdding(false);
  };

  const totalSent = automations.reduce((n, a) => n + a.sent, 0);
  const activeCount = automations.filter((a) => a.active).length;
  const recentEmails = activity.filter((a) => a.text.includes("email")).slice(0, 4);

  return (
    <div className={styles.stack}>
      <SectionHead
        title="Email automations"
        subtitle="Emails that send themselves. Add a lead, book a call or mark an invoice paid and watch them fire."
        actions={
          <button type="button" className={styles.btnPrimary} onClick={() => setAdding((v) => !v)}>
            <Icon name={adding ? "close" : "plus"} size={15} />
            {adding ? "Cancel" : "New automation"}
          </button>
        }
      />

      <div className={styles.totals}>
        <Pill tone="sky">{totalSent.toLocaleString()} emails sent</Pill>
        <Pill tone="green">{activeCount} active</Pill>
      </div>

      {adding && (
        <form className={`${styles.card} ${styles.formGrid}`} onSubmit={submit}>
          <Field label="Name">
            <input className={styles.input} required autoFocus value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Win-back email" />
          </Field>
          <Field label="When">
            <select className={styles.input} value={draft.trigger} onChange={(e) => setDraft({ ...draft, trigger: e.target.value as AutomationTrigger })}>
              {TRIGGERS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Wait">
            <select className={styles.input} value={draft.delayHours} onChange={(e) => setDraft({ ...draft, delayHours: Number(e.target.value) })}>
              {DELAYS.map((h) => (
                <option key={h} value={h}>
                  {formatDelay(h)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Email subject">
            <input className={styles.input} required value={draft.subject} onChange={(e) => setDraft({ ...draft, subject: e.target.value })} placeholder="We saved your spot, {first_name}" />
          </Field>
          <div className={styles.formActions}>
            <button type="submit" className={styles.btnPrimary}>
              <Icon name="check" size={15} />
              Turn it on
            </button>
          </div>
        </form>
      )}

      <div className={styles.flowList}>
        {automations.length === 0 && <Empty>No automations yet.</Empty>}
        {automations.map((a) => (
          <article key={a.id} className={styles.flowCard} data-off={!a.active || undefined}>
            <div className={styles.flowHead}>
              <div className={styles.grow}>
                <h4 className={styles.cardTitle}>{a.name}</h4>
                <p className={styles.cardSub}>{a.sent.toLocaleString()} sent</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={a.active}
                aria-label={`${a.active ? "Turn off" : "Turn on"} ${a.name}`}
                className={styles.toggle}
                onClick={() => store.toggleAutomation(a.id)}
              >
                <span className={styles.toggleKnob} />
              </button>
            </div>

            {/* Trigger → wait → send, drawn as a small flow. */}
            <ol className={styles.flow}>
              <li className={styles.flowStep}>
                <span className={styles.flowIcon} data-kind="trigger">
                  <Icon name="bolt" size={13} />
                </span>
                {triggerLabel(a.trigger)}
              </li>
              <li className={styles.flowStep}>
                <span className={styles.flowIcon} data-kind="wait">
                  <Icon name="clock" size={13} />
                </span>
                {formatDelay(a.delayHours)}
              </li>
              <li className={styles.flowStep}>
                <span className={styles.flowIcon} data-kind="send">
                  <Icon name="mail" size={13} />
                </span>
                <span className={styles.flowSubject}>{a.subject}</span>
              </li>
            </ol>

            <button
              type="button"
              className={styles.flowDelete}
              onClick={() => store.deleteAutomation(a.id)}
              aria-label={`Delete ${a.name}`}
            >
              <Icon name="trash" size={13} />
            </button>
          </article>
        ))}
      </div>

      <section className={styles.card}>
        <h4 className={styles.cardTitle}>Latest sends</h4>
        {recentEmails.length === 0 ? (
          <p className={styles.cardSub}>Nothing yet. Add a lead in Contacts to trigger the welcome email.</p>
        ) : (
          <ul className={styles.activity}>
            {recentEmails.map((e) => (
              <li key={e.id}>
                <span className={styles.activityDot} />
                <span className={styles.grow}>{e.text}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
