import { addDays, formatDay, formatMoney, STAGES, today } from "../data";
import type { DemoStore } from "../useDemoStore";
import { toneVars, type IconName, type Tone } from "../theme";
import { IconTile, SectionHead } from "../ui";
import styles from "../CrmDemo.module.scss";

const timeAgo = (iso: string) => {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 6e4);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
};

export function Dashboard({ store }: { store: DemoStore }) {
  const { contacts, bookings, invoices, activity } = store.state;
  const now = today();

  const days = Array.from({ length: 14 }, (_, i) => addDays(now, i - 13));
  const perDay = days.map((day) => contacts.filter((c) => c.createdAt === day).length);
  const maxPerDay = Math.max(1, ...perDay);

  const weekEnd = addDays(now, 7);
  const upcoming = bookings.filter((b) => b.date >= now && b.date < weekEnd).length;
  const revenue = invoices.filter((i) => i.status === "paid").reduce((n, i) => n + i.amount, 0);
  const paid = contacts.filter((c) => c.stage === "paid").length;
  const conversion = contacts.length ? Math.round((paid / contacts.length) * 100) : 0;

  const kpis: Array<{ label: string; value: string; icon: IconName; tone: Tone; foot: string }> = [
    { label: "New leads (14d)", value: String(perDay.reduce((a, b) => a + b, 0)), icon: "users", tone: "purple", foot: `${contacts.length} contacts in total` },
    { label: "Calls next 7 days", value: String(upcoming), icon: "calendar", tone: "orange", foot: `${bookings.filter((b) => b.date === now).length} scheduled for today` },
    { label: "Revenue collected", value: formatMoney(revenue), icon: "invoice", tone: "green", foot: `${invoices.filter((i) => i.status === "sent").length} invoices waiting` },
    { label: "Conversion rate", value: `${conversion}%`, icon: "chart", tone: "teal", foot: "Contacts who became paying clients" },
  ];

  return (
    <div className={styles.stack}>
      <SectionHead title="Good morning 👋" subtitle="Here's what happened in your business. Every number updates as you use the demo." />

      <div className={styles.kpiGrid}>
        {kpis.map((k) => (
          <div key={k.label} className={styles.kpi} style={toneVars(k.tone)}>
            <div className={styles.kpiTop}>
              <span className={styles.kpiLabel}>{k.label}</span>
              <IconTile name={k.icon} tone={k.tone} size={15} />
            </div>
            <span key={k.value} className={styles.kpiValue}>
              {k.value}
            </span>
            <span className={styles.kpiFoot}>{k.foot}</span>
          </div>
        ))}
      </div>

      <div className={styles.twoCol}>
        <section className={styles.card}>
          <h4 className={styles.cardTitle}>New leads per day</h4>
          <p className={styles.cardSub}>Last 14 days</p>
          <div className={styles.bars} role="img" aria-label="Bar chart of new leads per day for the last 14 days">
            {perDay.map((n, i) => (
              <div key={days[i]} className={styles.barSlot} title={`${formatDay(days[i])}: ${n}`}>
                <span
                  className={styles.bar}
                  data-today={i === perDay.length - 1 || undefined}
                  style={{ height: `${Math.max(6, (n / maxPerDay) * 100)}%` }}
                />
              </div>
            ))}
          </div>
          <div className={styles.barAxis}>
            <span>{formatDay(days[0])}</span>
            <span>Today</span>
          </div>
        </section>

        <section className={styles.card}>
          <h4 className={styles.cardTitle}>Pipeline snapshot</h4>
          <p className={styles.cardSub}>Where every contact is right now</p>
          <div className={styles.stacked} aria-hidden="true">
            {STAGES.map((s) => {
              const n = contacts.filter((c) => c.stage === s.id).length;
              return n ? <span key={s.id} style={{ ...toneVars(s.tone), flexGrow: n }} /> : null;
            })}
          </div>
          <ul className={styles.legend}>
            {STAGES.map((s) => (
              <li key={s.id} style={toneVars(s.tone)}>
                <span className={styles.legendDot} />
                {s.label}
                <strong>{contacts.filter((c) => c.stage === s.id).length}</strong>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className={styles.card}>
        <h4 className={styles.cardTitle}>Recent activity</h4>
        <ul className={styles.activity}>
          {activity.slice(0, 6).map((a) => (
            <li key={a.id}>
              <span className={styles.activityDot} />
              <span className={styles.grow}>{a.text}</span>
              <span className={styles.muted}>{timeAgo(a.at)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
