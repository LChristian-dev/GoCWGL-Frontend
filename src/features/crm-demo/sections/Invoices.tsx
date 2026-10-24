import { useState, type FormEvent } from "react";
import { addDays, formatDay, formatMoney, today } from "../data";
import type { DemoStore } from "../useDemoStore";
import { Avatar, Empty, Field, Icon, Pill, SectionHead } from "../ui";
import styles from "../CrmDemo.module.scss";

export function Invoices({ store }: { store: DemoStore }) {
  const { contacts, invoices } = store.state;
  const now = today();
  const [contactId, setContactId] = useState(contacts[0]?.id ?? "");
  const [amount, setAmount] = useState(1500);
  const [dueDate, setDueDate] = useState(addDays(now, 14));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactId || amount <= 0) return;
    store.addInvoice({ contactId, amount, dueDate });
  };

  const paid = invoices.filter((i) => i.status === "paid").reduce((n, i) => n + i.amount, 0);
  const open = invoices.filter((i) => i.status === "sent").reduce((n, i) => n + i.amount, 0);

  return (
    <div className={styles.stack}>
      <SectionHead
        title="Invoices"
        subtitle="Send an invoice, then mark it paid. The contact moves to “Paid” on its own."
        actions={
          <div className={styles.totals}>
            <Pill tone="green">Collected {formatMoney(paid)}</Pill>
            <Pill tone="orange">Open {formatMoney(open)}</Pill>
          </div>
        }
      />

      <form className={`${styles.card} ${styles.bookForm}`} onSubmit={submit}>
        <Field label="Bill to">
          <select className={styles.input} value={contactId} onChange={(e) => setContactId(e.target.value)} required>
            {contacts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Amount ($)">
          <input className={styles.input} type="number" min={1} step={50} value={amount} onChange={(e) => setAmount(Number(e.target.value))} required />
        </Field>
        <Field label="Due date">
          <input className={styles.input} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </Field>
        <button type="submit" className={styles.btnPrimary} disabled={!contacts.length}>
          <Icon name="plus" size={15} />
          Send invoice
        </button>
      </form>

      <div className={`${styles.card} ${styles.list}`}>
        {invoices.length === 0 && <Empty>No invoices yet.</Empty>}
        {invoices.map((inv) => {
          const contact = contacts.find((c) => c.id === inv.contactId);
          const overdue = inv.status === "sent" && inv.dueDate < now;
          return (
            <div key={inv.id} className={styles.row} data-static="">
              <Avatar name={contact?.name ?? "?"} tone={inv.status === "paid" ? "green" : "orange"} />
              <span className={styles.rowMain}>
                <span className={styles.rowTitle}>
                  #{inv.number} · {contact?.name ?? "Deleted contact"}
                </span>
                <span className={styles.rowSub}>Due {formatDay(inv.dueDate)}</span>
              </span>
              <span className={styles.rowMeta}>
                <strong>{formatMoney(inv.amount)}</strong>
                {inv.status === "paid" ? (
                  <Pill tone="green">Paid</Pill>
                ) : (
                  <button type="button" className={styles.btnSmall} onClick={() => store.markInvoicePaid(inv.id)}>
                    <Icon name="check" size={13} />
                    {overdue ? "Overdue · mark paid" : "Mark paid"}
                  </button>
                )}
                <button
                  type="button"
                  className={styles.iconBtnSm}
                  onClick={() => store.deleteInvoice(inv.id)}
                  aria-label={`Delete invoice ${inv.number}`}
                >
                  <Icon name="trash" size={13} />
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
