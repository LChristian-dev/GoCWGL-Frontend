import { Logo } from "@/components/ui/Logo/Logo";
import styles from "./Footer.module.scss";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Logo height={30} />
        <p className={styles.meta}>
          Virtual assistants since 2016 ·{" "}
          <a href="mailto:info@GoCWGL.com" className={styles.email}>
            info@GoCWGL.com
          </a>
        </p>
        <p className={styles.copyright}>© {year} Go CWGL</p>
      </div>
    </footer>
  );
}
