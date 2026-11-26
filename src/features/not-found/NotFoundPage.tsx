import Link from "next/link";
import { Logo } from "@/components/ui/Logo/Logo";
import { ArrowIcon } from "./ArrowIcon";
import { BackButton } from "./BackButton";
import styles from "./NotFoundPage.module.scss";

const STATUS_URL = "https://app.gocwgl.com/status";

export function NotFoundPage() {
  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden />

      <header className={styles.bar}>
        <Link href="/" aria-label="GoCWGL home">
          <Logo height={40} priority className={styles.logo} />
        </Link>
      </header>

      <section className={styles.body}>
        <p className={styles.label}>{"// ERROR 404"}</p>

        <div className={styles.code} aria-hidden>
          <span>4</span>
          <span className={styles.zero}>0</span>
          <span>4</span>
        </div>

        <h1 className={styles.title}>This page doesn&apos;t exist</h1>
        <p className={styles.text}>
          The link may be broken, or the page may have moved. Check the address, or head back to somewhere familiar.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={`${styles.btn} ${styles.primary}`}>
            <ArrowIcon direction="right" />
            Go to home
          </Link>
          <BackButton className={`${styles.btn} ${styles.secondary}`} />
        </div>
      </section>

      <footer className={styles.foot}>
        Need help? <a href={STATUS_URL}>Check system status</a>
      </footer>
    </main>
  );
}
