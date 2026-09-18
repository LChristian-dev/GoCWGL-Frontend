import type { ReactNode } from "react";
import styles from "./SimplePageSection.module.scss";

interface SimplePageSectionProps {
  eyebrow: string;
  /** Usually a plain string; accepts nodes too so a caller can highlight
   * part of the headline (e.g. the brand name in its logo colors) without
   * this component needing to know about that markup. */
  title: ReactNode;
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
  /** Widens the container to match the landing page's sections
   * ($container-max) instead of the default, narrower single-column measure
   * used by standalone action pages like /survey and /book. */
  wide?: boolean;
  /** Plays a one-shot entrance animation on the badge/title/description —
   * off by default so /survey and /book (fill a form, get moving) stay
   * instant, opted into by content pages like /about. Not the shared
   * scroll-linked `[data-reveal]` system: this content sits at the very
   * top of the page, where a `view()` timeline never gets a real
   * "entering" phase to animate through. */
  animate?: boolean;
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
  wide = false,
  animate = false,
}: SimplePageSectionProps) {
  const cls = (base: string, animated: string) =>
    animate ? `${base} ${animated}` : base;

  const content = (
    <>
      <div className={cls(styles.badge, styles.animateBadge)}>
        <span aria-hidden="true" data-motion="" className={styles.badgeDot} />
        {eyebrow}
      </div>
      <h1 className={cls(styles.title, styles.animateTitle)}>{title}</h1>
      {description && (
        <p className={cls(styles.description, styles.animateDescription)}>{description}</p>
      )}
      <div className={styles.body}>{children}</div>
    </>
  );

  return (
    <section className={[styles.section, fill && styles.fill].filter(Boolean).join(" ")}>
      <div aria-hidden="true" data-motion="" className={styles.glowAmber} />
      <div aria-hidden="true" data-motion="" className={styles.glowNavy} />
      <div aria-hidden="true" className={styles.dotGrid} />

      <div
        className={[styles.container, compactTop && styles.compactTop, wide && styles.wide]
          .filter(Boolean)
          .join(" ")}
      >
        {/* At the wide (landing-page) width the content itself stays a
            readable, left-aligned measure — without this it would hug the
            left edge of the 1200px container and leave a lopsided slab of
            empty space on the right, instead of a balanced margin on both
            sides. */}
        {wide ? <div className={styles.centerCol}>{content}</div> : content}
      </div>
    </section>
  );
}
