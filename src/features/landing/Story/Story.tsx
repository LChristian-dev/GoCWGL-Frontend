import styles from "./Story.module.scss";

export function Story() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow} data-reveal="" style={{ animationName: "rise" }}>
          Why we built this
        </p>
        <p className={styles.quote} data-reveal="" style={{ animationName: "rise" }}>
          My business partner and I have been virtual assistants since 2016. We kept watching the
          same thing happen: leads came in, then fell through the cracks — because nothing was
          catching them, following up, or reporting on what actually worked.
        </p>
        <p className={styles.body} data-reveal="" style={{ animationName: "rise" }}>
          That gap is the whole reason this package exists. And we&apos;ll be upfront with you:
          this specific package is new, and you&apos;d be one of our first clients on it.
          That&apos;s exactly why the first 10 get it at half price.
        </p>
        <div className={styles.rule} data-reveal="" style={{ animationName: "growLine" }} />
      </div>
    </section>
  );
}
