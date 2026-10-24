import type { ReactNode } from "react";
import { initials, stageInfo, type Stage } from "./data";
import { ICONS, toneVars, type IconName, type Tone } from "./theme";
import styles from "./CrmDemo.module.scss";

export const cx = (...names: Array<string | false | null | undefined>) => names.filter(Boolean).join(" ");

export function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={styles.icon}>
      <path d={ICONS[name]} />
    </svg>
  );
}

export function IconTile({ name, tone, size = 16 }: { name: IconName; tone: Tone; size?: number }) {
  return (
    <span className={styles.iconTile} style={toneVars(tone)}>
      <Icon name={name} size={size} />
    </span>
  );
}

export function Avatar({ name, tone = "cyan" }: { name: string; tone?: Tone }) {
  return (
    <span className={styles.avatar} style={toneVars(tone)} aria-hidden="true">
      {initials(name)}
    </span>
  );
}

export function StagePill({ stage }: { stage: Stage }) {
  const info = stageInfo(stage);
  return (
    <span className={styles.pill} style={toneVars(info.tone)}>
      {info.label}
    </span>
  );
}

export function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={styles.pill} style={toneVars(tone)}>
      {children}
    </span>
  );
}

export function SectionHead({ title, subtitle, actions }: { title: string; subtitle: string; actions?: ReactNode }) {
  return (
    <div className={styles.sectionHead}>
      <div>
        <h3 className={styles.sectionTitle}>{title}</h3>
        <p className={styles.sectionSub}>{subtitle}</p>
      </div>
      {actions && <div className={styles.sectionActions}>{actions}</div>}
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      {children}
    </label>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className={styles.empty}>{children}</p>;
}
