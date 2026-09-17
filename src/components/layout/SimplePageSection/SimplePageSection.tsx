import type { ReactNode } from "react";
import styles from "./SimplePageSection.module.scss";

interface SimplePageSectionProps {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  /** Compresses spacing and stretches to fill its flex parent's height,
   * instead of the normal spacious, scrollable section — use when the page
   * around it is laid out to fit exactly one viewport (see app/survey/page.tsx). */
  fill?: boolean;
  /** Trims just the section's top padding to match `fill`'s tighter spacing,
   * leaving the bottom padding and everything else (title size, description
   * size, layout) at the normal scrollable-page scale. */
  compactTop?: boolean;
}

/** Shared shell for a standalone, single-purpose page (survey, booking, etc.):
 * a toned-down version of the hero's treatment (glows, dot grid, pill badge)
 * so it reads as part of the same site, then a bold title + description and
 * whatever content is passed in. */
export function SimplePageSection({
  eyebrow,
  title,
  description,
  children,
  fill = false,
  compactTop = false,
}: SimplePageSectionProps) {
  return (
    <section className={[styles.section, fill && styles.fill].filter(Boolean).join(" ")}>
      <div aria-hidden="true" data-motion="" className={styles.glowAmber} />
      <div aria-hidden="true" data-motion="" className={styles.glowNavy} />
      <div aria-hidden="true" className={styles.dotGrid} />

      <div className={[styles.container, compactTop && styles.compactTop].filter(Boolean).join(" ")}>
        <div className={styles.badge}>
          <span aria-hidden="true" data-motion="" className={styles.badgeDot} />
          {eyebrow}
        </div>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  );
}
