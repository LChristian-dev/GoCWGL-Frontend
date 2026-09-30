import type { Metadata } from "next";
import type React from "react";
import Image from "next/image";
import { CountUp } from "./CountUp";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Wendy Glen Banzon — Virtual Assistant",
  description:
    "Wendy Glen S. Banzon is a detail-oriented virtual assistant supporting US and Australian clients across executive support, accounts, customer service, and business registration since 2015.",
};

const EMAIL = "bwendyglen@gmail.com";

// Cycled under the name in the hero. The first entry is repeated at the end
// so the CSS loop can jump back to the start without a visible snap.
const ROLES = [
  "Virtual Assistant",
  "Customer Support Specialist",
  "Administrative Specialist",
  "Executive Support",
];

const STATS = [
  { to: 10, suffix: "+", label: "Years as a virtual assistant" },
  { to: 50, suffix: "", label: "US states filed with Secretary of State offices" },
  { to: 2, suffix: "", label: "Client markets — United States & Australia" },
  { to: 8, suffix: "+", label: "Business tools used every day" },
];

const EXPERIENCE = [
  {
    role: "Virtual Assistant",
    company: "Infinite Edge",
    location: "Australia · Remote",
    period: "Jul 2022 — Present",
    current: true,
    summary: "Executive, accounts and customer support for an Australian business.",
    points: [
      "Manage calendars and schedules, coordinating meetings and appointments.",
      "Book flights and co-working spaces for business travel.",
      "Handle accounts payable and receivable tasks.",
      "Manage billing accounts using Xero.",
      "Resolve customer support tickets through Freshdesk.",
    ],
    tags: ["Xero", "Freshdesk", "Google Workspace"],
  },
  {
    role: "Virtual Assistant",
    company: "123Employee",
    location: "Davao City, Philippines",
    period: "Jul 2015 — Mar 2022",
    current: false,
    summary: "Business registration, marketing and customer care for US clients.",
    points: [
      "Assisted US clients in registering their businesses with Secretary of State offices across all 50 states.",
      "Processed business registrations remotely through state online filing systems.",
      "Prepared and cloud-printed registration documents for mailing and filing.",
      "Managed email marketing and sales campaigns using Infusionsoft (Keap).",
      "Built client intake web forms using 123FormBuilder.",
      "Developed success manuals documenting business filing procedures for the team.",
      "Resolved customer concerns and inquiries by phone (RingCentral) and email (Zendesk).",
    ],
    tags: ["Infusionsoft (Keap)", "Zendesk", "RingCentral", "123FormBuilder"],
  },
];

const SERVICES = [
  {
    icon: "calendar",
    title: "Executive support",
    body: "Calendar and schedule management, meeting coordination, and travel booking — flights and co-working spaces handled end to end.",
  },
  {
    icon: "ledger",
    title: "Accounts & billing",
    body: "Accounts payable and receivable, and billing account management in Xero, kept accurate and up to date.",
  },
  {
    icon: "chat",
    title: "Customer support",
    body: "Ticket-based support in Freshdesk and Zendesk, plus phone support through RingCentral — always client-first.",
  },
  {
    icon: "doc",
    title: "Operations & documentation",
    body: "Business registration filings, intake web forms, email campaigns, and clear process manuals your team can follow.",
  },
];

const CORE_SKILLS = [
  "Calendar & Schedule Management",
  "Travel Coordination",
  "Accounts Payable & Receivable",
  "Customer Service",
  "Oral & Written Communication",
  "Attention to Detail",
];

const ADDITIONAL_SKILLS = [
  "Billing Account Management",
  "Ticket-Based Support",
  "Email Marketing",
  "Sales Platforms / CRM",
  "Online Research",
  "Data Entry",
];

const TOOLS = [
  { name: "Xero", use: "Accounting & billing", icon: "invoice" },
  { name: "Freshdesk", use: "Help desk tickets", icon: "ticket" },
  { name: "Zendesk", use: "Customer support", icon: "headset" },
  { name: "Google Workspace", use: "Email, docs & calendar", icon: "apps" },
  { name: "Infusionsoft (Keap)", use: "Email marketing & CRM", icon: "megaphone" },
  { name: "RingCentral", use: "Phone support", icon: "phone" },
  { name: "Trello", use: "Task boards", icon: "kanban" },
  { name: "Microsoft Office", use: "Word, Excel, PowerPoint, Outlook", icon: "office" },
];

const INTERESTS = ["Travel & exploring new places", "Trekking & camping", "Films, series & fiction"];

// Line icons shared by the service cards and the tool tiles. Tools get an
// icon for what they're used for rather than their brand logo, so the set
// stays visually consistent.
const ICON_PATHS: Record<string, React.ReactNode> = {
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  ledger: (
    <>
      <path d="M4 19V5M4 19h16" />
      <path d="M8 15l3-4 3 2 5-6" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
      <path d="M9 11h6M9 14h4" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>
  ),
  invoice: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
  ticket: (
    <>
      <path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4V8Z" />
      <path d="M14 7v2M14 11v2M14 15v2" />
    </>
  ),
  headset: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" />
      <path d="M19 20a3 3 0 0 1-3 2h-3" />
    </>
  ),
  apps: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
      <circle cx="17" cy="17" r="3.5" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 11v2a1 1 0 0 0 1 1h3l6 5V5L7 10H4a1 1 0 0 0-1 1Z" />
      <path d="M17 9a4 4 0 0 1 0 6M19.5 6.5a7.5 7.5 0 0 1 0 11" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  kanban: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 7v8M12 7v4M16 7v10" />
    </>
  ),
  office: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 9h18M9 9v11M13 13h4M13 16h4" />
    </>
  ),
};

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[name] ?? ICON_PATHS.doc}
    </svg>
  );
}

export default function WendyGlenPage() {
  return (
    <main className={styles.page}>
      {/* Thin reading-progress bar pinned to the top of the viewport. */}
      <div aria-hidden="true" className={styles.progress} />

      {/* ---- Hero ---- */}
      <section className={styles.hero}>
        <div aria-hidden="true" className={styles.gridLight} />
        <div aria-hidden="true" className={styles.orbAmber} />
        <div aria-hidden="true" className={styles.orbBlue} />

        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.badge}>
              <span aria-hidden="true" className={styles.badgeDot} />
              Remote virtual assistant · Since 2015
            </p>

            <h1 className={styles.name}>
              <span className={styles.line}>
                <span className={styles.lineInner}>Wendy Glen</span>
              </span>
              <span className={styles.line}>
                <span className={`${styles.lineInner} ${styles.lineInnerDelay}`}>
                  <span className={styles.nameAccent}>S. Banzon</span>
                </span>
              </span>
            </h1>

            <p className={styles.roleLine}>
              <span className={styles.rolePrefix}>I work as a</span>
              <span className={styles.roleWindow}>
                <span className={styles.roleTrack} aria-hidden="true">
                  {[...ROLES, ROLES[0]].map((role, i) => (
                    <span key={`${role}-${i}`} className={styles.roleItem}>
                      {role}
                    </span>
                  ))}
                </span>
                <span className={styles.srOnly}>
                  Virtual Assistant, Customer Support &amp; Administrative Specialist
                </span>
              </span>
            </p>

            <p className={styles.lead}>
              Detail-oriented virtual assistant supporting US and Australian clients across
              executive support, accounts, customer service, and business registration — with
              accuracy, strong written English, and a client-first approach to every task.
            </p>

            <div className={styles.heroLinks}>
              <a href={`mailto:${EMAIL}`} className={styles.linkPrimary}>
                Get in touch
                <span aria-hidden="true" className={styles.linkArrow}>→</span>
              </a>
              <a href="#experience" className={styles.linkSecondary}>
                View experience
              </a>
            </div>

            <dl className={styles.heroMeta}>
              <div>
                <dt>Based in</dt>
                <dd>Davao City, Philippines</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </dd>
              </div>
            </dl>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.ring}>
              <div className={styles.heroPhoto}>
                <Image
                  src="/images/wendyglen/portrait-front.jpg"
                  alt="Portrait of Wendy Glen Banzon"
                  fill
                  preload
                  sizes="(max-width: 860px) 90vw, 440px"
                  className={styles.photo}
                />
              </div>
            </div>

            <div className={`${styles.chip} ${styles.chipTop}`}>
              <span className={styles.chipIcon} aria-hidden="true">
                ✓
              </span>
              <span>
                <strong>10+ years</strong>
                <small>Remote experience</small>
              </span>
            </div>
            <div className={`${styles.chip} ${styles.chipBottom}`}>
              <span className={styles.chipFlags} aria-hidden="true">
                US · AU
              </span>
              <span>
                <strong>Global clients</strong>
                <small>US &amp; Australia</small>
              </span>
            </div>
          </div>
        </div>

        <a href="#stats" className={styles.scrollCue} aria-label="Scroll to highlights">
          <span className={styles.scrollMouse} aria-hidden="true" />
        </a>
      </section>

      {/* ---- Tools marquee ---- */}
      <div className={styles.marquee} aria-label="Tools I use">
        <div className={styles.marqueeTrack}>
          {[...TOOLS, ...TOOLS].map((tool, i) => (
            <span key={`${tool.name}-${i}`} className={styles.marqueeItem} aria-hidden={i >= TOOLS.length}>
              {tool.name}
              <span aria-hidden="true" className={styles.marqueeStar}>
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ---- Stats ---- */}
      <section id="stats" className={styles.stats} aria-label="Highlights">
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.stat} data-reveal="" style={{ animationName: "rise" }}>
                <CountUp to={stat.to} suffix={stat.suffix} className={styles.statValue} />
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Services ---- */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead} data-reveal="" style={{ animationName: "rise" }}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowNum}>01</span> What I do
            </p>
            <h2 className={styles.heading}>
              Reliable support for the work that keeps a business running.
            </h2>
          </div>

          <div className={styles.servicesGrid}>
            {SERVICES.map((service, i) => (
              <article
                key={service.title}
                className={styles.serviceCard}
                data-reveal=""
                style={{ animationName: "riseIn", "--i": i } as React.CSSProperties}
              >
                <span className={styles.serviceIcon}>
                  <Icon name={service.icon} />
                </span>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceBody}>{service.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Experience ---- */}
      <section id="experience" className={styles.sectionAlt}>
        <div className={`${styles.container} ${styles.split}`}>
          <div className={styles.splitAside}>
            <div className={styles.sticky}>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowNum}>02</span> Experience
              </p>
              <h2 className={styles.heading}>A decade of dependable remote work.</h2>
              <p className={styles.asideText}>
                Two long-term roles supporting clients in the United States and Australia — from
                business filings to billing to the customer inbox.
              </p>
            </div>
          </div>

          <ol className={styles.jobs}>
            {EXPERIENCE.map((job) => (
              <li
                key={job.company}
                className={styles.job}
                data-current={job.current || undefined}
                data-reveal=""
                style={{ animationName: "riseIn" }}
              >
                <div className={styles.jobTop}>
                  <span className={styles.jobPeriod} data-current={job.current || undefined}>
                    {job.current && <span aria-hidden="true" className={styles.liveDot} />}
                    {job.period}
                  </span>
                  <span className={styles.jobLocation}>{job.location}</span>
                </div>
                <h3 className={styles.jobCompany}>{job.company}</h3>
                <p className={styles.jobRole}>{job.role}</p>
                <p className={styles.jobSummary}>{job.summary}</p>
                <ul className={styles.jobPoints}>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <ul className={styles.jobTags} aria-label="Tools used">
                  {job.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Skills ---- */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead} data-reveal="" style={{ animationName: "rise" }}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowNum}>03</span> Skills &amp; tools
            </p>
            <h2 className={styles.heading}>What I bring to your team.</h2>
          </div>

          <div className={styles.bento}>
            <div className={`${styles.bentoCard} ${styles.bentoDark}`} data-reveal="" style={{ animationName: "riseIn" }}>
              <h3 className={styles.bentoTitle}>Core skills</h3>
              <ul className={styles.checkList}>
                {CORE_SKILLS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.bentoCard} data-reveal="" style={{ animationName: "riseIn" }}>
              <h3 className={styles.bentoTitle}>Additional skills</h3>
              <ul className={styles.checkList}>
                {ADDITIONAL_SKILLS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={`${styles.bentoCard} ${styles.bentoWide}`} data-reveal="" style={{ animationName: "riseIn" }}>
              <h3 className={styles.bentoTitle}>Tools &amp; software</h3>
              <ul className={styles.toolGrid}>
                {TOOLS.map((tool, i) => (
                  <li
                    key={tool.name}
                    className={styles.toolTile}
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <span className={styles.toolIcon}>
                      <Icon name={tool.icon} size={20} />
                    </span>
                    <span className={styles.toolText}>
                      <span className={styles.toolName}>{tool.name}</span>
                      <span className={styles.toolUse}>{tool.use}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---- About ---- */}
      <section className={styles.sectionAlt}>
        <div className={`${styles.container} ${styles.about}`}>
          <div className={styles.collage} data-reveal="" style={{ animationName: "fadein" }}>
            <div className={`${styles.collagePhoto} ${styles.collageA}`}>
              <Image
                src="/images/wendyglen/portrait-side.jpg"
                alt="Wendy Glen Banzon smiling, side profile"
                fill
                sizes="(max-width: 860px) 50vw, 300px"
                className={styles.photo}
              />
            </div>
            <div className={`${styles.collagePhoto} ${styles.collageB}`}>
              <Image
                src="/images/wendyglen/portrait-back.jpg"
                alt="Wendy Glen Banzon looking over her shoulder"
                fill
                sizes="(max-width: 860px) 50vw, 300px"
                className={styles.photo}
              />
            </div>
          </div>

          <div className={styles.aboutCopy} data-reveal="" style={{ animationName: "rise" }}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowNum}>04</span> About me
            </p>
            <h2 className={styles.heading}>Accuracy first, always client-first.</h2>
            <p className={styles.aboutText}>
              I&apos;m skilled at calendar and travel management, accounts payable and receivable
              in Xero, ticket-based support in Freshdesk and Zendesk, and creating clear process
              documentation that helps whole teams work more consistently.
            </p>

            <div className={styles.facts}>
              <div className={styles.fact}>
                <span className={styles.factLabel}>Education</span>
                <p className={styles.factMain}>BS in Development Management</p>
                <p className={styles.factSub}>University of Southern Mindanao · 2011 – 2015</p>
              </div>
              <div className={styles.fact}>
                <span className={styles.factLabel}>Outside of work</span>
                <ul className={styles.interestList}>
                  {INTERESTS.map((interest) => (
                    <li key={interest}>{interest}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Contact ---- */}
      <section className={styles.contact}>
        <div aria-hidden="true" className={styles.heroGrid} />
        <div aria-hidden="true" className={styles.contactOrb} />
        <div aria-hidden="true" className={styles.contactRing} />
        <div className={styles.contactInner} data-reveal="" style={{ animationName: "rise" }}>
          <p className={styles.contactEyebrow}>Let&apos;s work together</p>
          <h2 className={styles.contactHeading}>
            Need a reliable assistant who <span className={styles.nameAccent}>sweats the details?</span>
          </h2>
          <p className={styles.contactLead}>
            Whether it&apos;s your calendar, your customers, or your books, I&apos;d love to hear
            what you need help with.
          </p>
          <a href={`mailto:${EMAIL}`} className={styles.contactEmail}>
            {EMAIL}
          </a>
          <p className={styles.contactNote}>Based in Davao City, Philippines · Working remotely</p>
        </div>
      </section>
    </main>
  );
}
