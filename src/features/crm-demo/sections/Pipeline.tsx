import { useState } from "react";
import { formatMoney, STAGES, type Stage } from "../data";
import type { DemoStore } from "../useDemoStore";
import { toneVars } from "../theme";
import { Avatar, Empty, Icon, SectionHead } from "../ui";
import styles from "../CrmDemo.module.scss";

export function Pipeline({ store }: { store: DemoStore }) {
  const { contacts, bookings } = store.state;
  const [dragId, setDragId] = useState<string | null>(null);
  const [overStage, setOverStage] = useState<Stage | null>(null);

  const drop = (stage: Stage) => {
    const contact = contacts.find((c) => c.id === dragId);
    if (contact && contact.stage !== stage) store.moveContact(contact.id, stage);
    setDragId(null);
    setOverStage(null);
  };

  return (
    <div className={styles.stack}>
      <SectionHead
        title="Sales pipeline"
        subtitle="Drag a card to another column, or use the arrow to move it forward."
      />

      <div className={styles.board}>
        {STAGES.map((stage, index) => {
          const cards = contacts.filter((c) => c.stage === stage.id);
          const next = STAGES[index + 1];
          return (
            <section
              key={stage.id}
              className={styles.boardColumn}
              style={toneVars(stage.tone)}
              data-over={overStage === stage.id || undefined}
              onDragOver={(e) => {
                e.preventDefault();
                setOverStage(stage.id);
              }}
              onDragLeave={() => setOverStage((s) => (s === stage.id ? null : s))}
              onDrop={() => drop(stage.id)}
              aria-label={stage.label}
            >
              <header className={styles.boardHead}>
                <span className={styles.boardDot} />
                <span className={styles.boardTitle}>{stage.label}</span>
                <span className={styles.boardCount}>{cards.length}</span>
              </header>
              <p className={styles.boardTotal}>{formatMoney(cards.reduce((n, c) => n + c.value, 0))}</p>

              {cards.length === 0 && <Empty>Drop a card here</Empty>}
              {cards.map((c) => {
                const call = bookings.find((b) => b.contactId === c.id);
                return (
                  <article
                    key={c.id}
                    className={styles.dealCard}
                    draggable
                    data-dragging={dragId === c.id || undefined}
                    onDragStart={(e) => {
                      e.dataTransfer.effectAllowed = "move";
                      setDragId(c.id);
                    }}
                    onDragEnd={() => {
                      setDragId(null);
                      setOverStage(null);
                    }}
                  >
                    <div className={styles.dealTop}>
                      <Avatar name={c.name} tone={stage.tone} />
                      <span className={styles.rowMain}>
                        <span className={styles.rowTitle}>{c.name}</span>
                        <span className={styles.rowSub}>{c.source}</span>
                      </span>
                    </div>
                    <div className={styles.dealBottom}>
                      <strong>{formatMoney(c.value)}</strong>
                      {call && stage.id === "booked" && <span className={styles.muted}>Call {call.date.slice(5).replace("-", "/")}</span>}
                      {next && (
                        <button
                          type="button"
                          className={styles.moveBtn}
                          onClick={() => store.moveContact(c.id, next.id)}
                          aria-label={`Move ${c.name} to ${next.label}`}
                          title={`Move to ${next.label}`}
                        >
                          <Icon name="arrowRight" size={14} />
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </section>
          );
        })}
      </div>
    </div>
  );
}
