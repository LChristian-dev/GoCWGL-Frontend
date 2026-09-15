import { Fragment } from "react";
import styles from "./Marquee.module.scss";

const KEYWORDS = [
  "Pipeline",
  "Funnel",
  "Automation",
  "Content system",
  "Daily reporting",
  "VAs since 2016",
];

function KeywordGroup() {
  return (
    <div className={styles.group}>
      {KEYWORDS.map((word) => (
        <Fragment key={word}>
          <span>{word}</span>
          <span className={styles.dot}>◆</span>
        </Fragment>
      ))}
    </div>
  );
}

/** Full-bleed, infinitely-looping keyword band. Renders the list twice so
 * the `-50%` translate loop is seamless. */
export function Marquee() {
  return (
    <div className={styles.band} aria-hidden="true">
      <div className={styles.track}>
        <KeywordGroup />
        <KeywordGroup />
      </div>
    </div>
  );
}
