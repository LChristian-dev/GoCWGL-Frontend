import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonVariant = "amber" | "outlineLight" | "outlineDark";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant: ButtonVariant;
  children: ReactNode;
  /** Sizing/spacing is intentionally left to the caller — each CTA in the
   * design uses its own padding and font size, so pass a local class from
   * the section's own `*.module.scss` file alongside this component. */
  className?: string;
  /** Renders the animated diagonal highlight sweep used on primary CTAs. */
  sheen?: boolean;
  /** Duration of the sheen sweep (matches the design's per-CTA timing). */
  sheenDuration?: string;
}

const variantClass: Record<ButtonVariant, string> = {
  amber: styles.amber,
  outlineLight: styles.outlineLight,
  outlineDark: styles.outlineDark,
};

export function Button({
  variant,
  children,
  className,
  sheen = false,
  sheenDuration,
  style,
  ...anchorProps
}: ButtonProps) {
  return (
    <a
      {...anchorProps}
      className={[variantClass[variant], className].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
      {sheen && (
        <span
          aria-hidden="true"
          data-motion=""
          className={styles.sheen}
          style={
            sheenDuration
              ? ({ "--sheen-duration": sheenDuration } as CSSProperties)
              : undefined
          }
        />
      )}
    </a>
  );
}
