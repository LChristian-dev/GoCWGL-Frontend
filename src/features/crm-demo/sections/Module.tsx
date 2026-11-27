import { toneVars } from "../theme";
import { MODULES, type ModuleKey } from "../modules";
import { Avatar, IconTile, Pill, SectionHead } from "../ui";
import styles from "../CrmDemo.module.scss";

/** A sample page for a menu of the full CRM: headline numbers and a list. */
export function Module({ id }: { id: ModuleKey }) {
  const page = MODULES[id];

  return (
    <div className={styles.stack}>
      <SectionHead title={page.title} subtitle={page.subtitle} actions={<Pill tone="slate">Sample page</Pill>} />

      <div className={styles.kpiGrid}>
        {page.kpis.map((k) => (
          <div key={k.label} className={styles.kpi} style={toneVars(k.tone)}>
            <div className={styles.kpiTop}>
              <span className={styles.kpiLabel}>{k.label}</span>
              <IconTile name={k.icon} tone={k.tone} size={15} />
            </div>
            <span className={styles.kpiValue}>{k.value}</span>
            <span className={styles.kpiFoot}>{k.foot}</span>
          </div>
        ))}
      </div>

      <section className={`${styles.card} ${styles.list}`}>
        <h4 className={styles.cardTitle}>{page.listTitle}</h4>
        {page.rows.map((row) => (
          <div key={row.title} className={styles.row} data-static="">
            <Avatar name={row.title} tone={row.pill[0]} />
            <span className={styles.rowMain}>
              <span className={styles.rowTitle}>{row.title}</span>
              <span className={styles.rowSub}>{row.sub}</span>
            </span>
            <span className={styles.rowMeta}>
              {row.meta && <strong>{row.meta}</strong>}
              <Pill tone={row.pill[0]}>{row.pill[1]}</Pill>
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
