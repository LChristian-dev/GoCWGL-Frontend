import styles from "./Story.module.scss";

export function Story() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow} data-reveal="" style={{ animationName: "rise" }}>
          Why we built this
        </p>
        <p className={styles.quote} data-reveal="" style={{ animationName: "rise" }}>
          My business partner and I have been virtual assistants since 2015. We kept watching the
          same thing happen: leads came in, then fell through the cracks, because nothing was
          capturing them, organizing them, or reporting on what actually worked.
        </p>
        <p className={styles.body} data-reveal="" style={{ animationName: "rise" }}>
          So we built our own CRM to close that gap, and we run GoCWGL on it every day. Now we
          build one for you. We&apos;ll be upfront: the CRM package is new, and you&apos;d be one
          of our first clients on it.
        </p>
        <div className={styles.rule} data-reveal="" style={{ animationName: "growLine" }} />
      </div>
    </section>
  );
}
