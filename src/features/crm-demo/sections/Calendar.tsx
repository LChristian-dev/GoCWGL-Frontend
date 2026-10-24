import { useState, type FormEvent } from "react";
import { addDays, formatDay, formatTime, today } from "../data";
import type { DemoStore } from "../useDemoStore";
import { Avatar, Empty, Field, Icon, SectionHead } from "../ui";
import styles from "../CrmDemo.module.scss";

export function Calendar({ store }: { store: DemoStore }) {
  const { contacts, bookings } = store.state;
  const now = today();
  const days = Array.from({ length: 7 }, (_, i) => addDays(now, i));
  const [contactId, setContactId] = useState(contacts[0]?.id ?? "");
  const [date, setDate] = useState(addDays(now, 1));
  const [time, setTime] = useState("10:00");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactId || !date || !time) return;
    store.addBooking({ contactId, date, time });
  };

  const later = bookings.filter((b) => b.date >= addDays(now, 7)).length;

  return (
    <div className={styles.stack}>
      <SectionHead
        title="Booking"
        subtitle="Your booking page fills this in. Booking a call moves the lead to “Call booked”."
      />

      <form className={`${styles.card} ${styles.bookForm}`} onSubmit={submit}>
        <Field label="Contact">
          <select className={styles.input} value={contactId} onChange={(e) => setContactId(e.target.value)} required>
            {contacts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Date">
          <input className={styles.input} type="date" min={now} value={date} onChange={(e) => setDate(e.target.value)} required />
        </Field>
        <Field label="Time">
          <input className={styles.input} type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </Field>
        <button type="submit" className={styles.btnPrimary} disabled={!contacts.length}>
          <Icon name="plus" size={15} />
          Book call
        </button>
      </form>

      <div className={styles.week}>
        {days.map((day) => {
          const items = bookings
            .filter((b) => b.date === day)
            .sort((a, b) => a.time.localeCompare(b.time));
          return (
            <section key={day} className={styles.day} data-today={day === now || undefined}>
              <header className={styles.dayHead}>
                <span>{formatDay(day, { weekday: "short" })}</span>
                <strong>{formatDay(day, { day: "numeric" })}</strong>
              </header>
              {items.length === 0 && <Empty>Open</Empty>}
              {items.map((b) => {
                const contact = contacts.find((c) => c.id === b.contactId);
                return (
                  <div key={b.id} className={styles.event}>
                    <span className={styles.eventTime}>{formatTime(b.time)}</span>
                    <span className={styles.eventWho}>
                      <Avatar name={contact?.name ?? "?"} tone="orange" />
                      <span className={styles.rowTitle}>{contact?.name ?? "Deleted contact"}</span>
                    </span>
                    <button
                      type="button"
                      className={styles.iconBtnSm}
                      onClick={() => store.deleteBooking(b.id)}
                      aria-label={`Cancel call with ${contact?.name ?? "contact"}`}
                    >
                      <Icon name="close" size={13} />
                    </button>
                  </div>
                );
              })}
            </section>
          );
        })}
      </div>
      {later > 0 && <p className={styles.muted}>+ {later} more call{later === 1 ? "" : "s"} booked after this week</p>}
    </div>
  );
}
