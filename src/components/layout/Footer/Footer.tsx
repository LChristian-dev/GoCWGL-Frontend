import { Logo } from "@/components/ui/Logo/Logo";
import styles from "./Footer.module.scss";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <a href="/" className={styles.logoLink} aria-label="GoCWGL home">
          <Logo height={46} />
        </a>
        <p className={styles.meta}>
          Virtual assistants since 2016 ·{" "}
          <a href="mailto:info@GoCWGL.com" className={styles.email}>
            info@GoCWGL.com
          </a>
        </p>
        <p className={styles.copyright}>© {year} GoCWGL</p>
      </div>
    </footer>
  );
}
