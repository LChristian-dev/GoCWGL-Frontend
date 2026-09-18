import Image from "next/image";
import styles from "./Team.module.scss";

const TEAM = [
  {
    name: "Christian",
    role: "Co-Founder, Systems & Automation",
    bio: "Christian leads the technical build — the funnels, the automation workflows, the code that keeps everything running quietly in the background.",
    photo: "/images/team/christian.png",
  },
  {
    name: "Wendy",
    role: "Co-Founder, Client Strategy",
    bio: "Wendy leads discovery and client strategy — making sure every system we build actually fits the business it's built for, not just what looks good on paper.",
    photo: "/images/team/wendy.jpg",
  },
];

export function Team() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.eyebrow}>Who&apos;s behind it</p>
          <h2 className={styles.heading}>Two founders, one connected system.</h2>
        </div>

        <div className={styles.grid}>
          {TEAM.map((person) => (
            <div
              key={person.name}
              className={styles.card}
              data-reveal=""
              style={{ animationName: "riseIn" }}
            >
              <div className={styles.photoFrame}>
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  sizes="108px"
                  className={styles.photo}
                />
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{person.name}</h3>
                <p className={styles.role}>{person.role}</p>
                <p className={styles.bio}>{person.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.closing} data-reveal="" style={{ animationName: "rise" }}>
          We&apos;ve been doing this work since 2016, and GoCWGL is what we built when we got
          tired of watching businesses drown in disconnected tools and assistants. We&apos;d
          rather you have one system that works than five people who almost do.
        </p>
      </div>
    </section>
  );
}
