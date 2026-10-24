import { useState, type FormEvent, type ReactNode } from "react";
import {
  formatDay,
  formatMoney,
  SOURCES,
  STAGES,
  stageInfo,
  SUGGESTED_TAGS,
  type Contact,
  type Stage,
} from "../data";
import type { DemoStore } from "../useDemoStore";
import { Avatar, Empty, Field, Icon, StagePill } from "../ui";
import styles from "../CrmDemo.module.scss";

// A contacts page modeled on GoHighLevel's: smart-list tabs, a toolbar,
// a selectable table with bulk actions, pagination, and a slide-in drawer
// for one contact. Restyled to match the rest of the demo.

const PAGE_SIZE = 8;

type ListId = "all" | Stage;
type Sort = "newest" | "name" | "value";

const LISTS: Array<{ id: ListId; label: string }> = [
  { id: "all", label: "All contacts" },
  { id: "lead", label: "Leads" },
  { id: "booked", label: "Call booked" },
  { id: "paid", label: "Clients" },
];

const BLANK: Omit<Contact, "id" | "createdAt"> = {
  name: "",
  email: "",
  phone: "",
  source: SOURCES[0],
  stage: "lead",
  value: 1500,
  notes: "",
  tags: [],
};

export function Contacts({ store }: { store: DemoStore }) {
  const { contacts } = store.state;
  const [list, setList] = useState<ListId>("all");
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [sort, setSort] = useState<Sort>("newest");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [bulkTag, setBulkTag] = useState("");
  // null = closed, "new" = add form, otherwise a contact id.
  const [drawer, setDrawer] = useState<string | null>(null);

  const allTags = [...new Set(contacts.flatMap((c) => c.tags))].sort();
  const q = query.trim().toLowerCase();

  const rows = contacts
    .filter((c) => list === "all" || c.stage === list)
    .filter((c) => !tagFilter || c.tags.includes(tagFilter))
    .filter((c) => !q || [c.name, c.email, c.phone, ...c.tags].some((v) => v.toLowerCase().includes(q)))
    .sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name) : sort === "value" ? b.value - a.value : b.createdAt.localeCompare(a.createdAt),
    );

  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const current = Math.min(page, pages - 1);
  const pageRows = rows.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE);
  // Selection only counts contacts that still exist.
  const chosen = selected.filter((id) => contacts.some((c) => c.id === id));
  const allOnPage = pageRows.length > 0 && pageRows.every((c) => chosen.includes(c.id));

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const togglePage = () =>
    setSelected((s) =>
      allOnPage ? s.filter((id) => !pageRows.some((c) => c.id === id)) : [...new Set([...s, ...pageRows.map((c) => c.id)])],
    );
  const resetPage = () => setPage(0);

  const open = drawer === "new" ? null : contacts.find((c) => c.id === drawer) ?? null;

  return (
    <>
      <div className={styles.stack}>
        <div className={styles.contactsHead}>
          <div>
            <h3 className={styles.sectionTitle}>
              Contacts <span className={styles.countBadge}>{contacts.length}</span>
            </h3>
            <p className={styles.sectionSub}>Every form, survey and booking lands here automatically.</p>
          </div>
          <button type="button" className={styles.btnPrimary} onClick={() => setDrawer("new")}>
            <Icon name="plus" size={15} />
            Add contact
          </button>
        </div>

        <div className={styles.tableCard}>
          {/* Smart lists */}
          <div className={styles.listTabs} role="tablist" aria-label="Smart lists">
            {LISTS.map((l) => {
              const n = l.id === "all" ? contacts.length : contacts.filter((c) => c.stage === l.id).length;
              return (
                <button
                  key={l.id}
                  type="button"
                  role="tab"
                  aria-selected={list === l.id}
                  className={styles.listTab}
                  onClick={() => {
                    setList(l.id);
                    resetPage();
                  }}
                >
                  {l.label}
                  <span className={styles.listCount}>{n}</span>
                </button>
              );
            })}
          </div>

          {/* Toolbar, or the bulk-action bar while rows are selected */}
          {chosen.length > 0 ? (
            <div className={styles.bulkBar}>
              <strong>{chosen.length} selected</strong>
              <form
                className={styles.bulkTag}
                onSubmit={(e) => {
                  e.preventDefault();
                  store.addTag(chosen, bulkTag);
                  setBulkTag("");
                }}
              >
                <input
                  className={styles.inputSm}
                  list="demo-tag-suggestions"
                  value={bulkTag}
                  onChange={(e) => setBulkTag(e.target.value)}
                  placeholder="Add a tag"
                  aria-label="Tag to add to selected contacts"
                />
                <button type="submit" className={styles.btnSmall} disabled={!bulkTag.trim()}>
                  Add tag
                </button>
              </form>
              <select
                className={styles.inputSm}
                value=""
                aria-label="Move selected contacts to a stage"
                onChange={(e) => {
                  const stage = e.target.value as Stage;
                  chosen.forEach((id) => store.updateContact(id, { stage }));
                }}
              >
                <option value="" disabled>
                  Move to stage…
                </option>
                {STAGES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <span className={styles.grow} />
              <button
                type="button"
                className={styles.btnDanger}
                onClick={() => {
                  store.deleteContacts(chosen);
                  setSelected([]);
                }}
              >
                <Icon name="trash" size={14} />
                Delete
              </button>
              <button type="button" className={styles.btnGhost} onClick={() => setSelected([])}>
                Clear
              </button>
            </div>
          ) : (
            <div className={styles.toolbar}>
              <div className={`${styles.searchBox} ${styles.grow}`}>
                <Icon name="search" size={16} />
                <input
                  className={styles.searchInput}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    resetPage();
                  }}
                  placeholder="Search name, email, phone or tag"
                  aria-label="Search contacts"
                />
              </div>
              <select
                className={styles.inputSm}
                value={tagFilter}
                onChange={(e) => {
                  setTagFilter(e.target.value);
                  resetPage();
                }}
                aria-label="Filter by tag"
              >
                <option value="">All tags</option>
                {allTags.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <select className={styles.inputSm} value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort contacts">
                <option value="newest">Newest first</option>
                <option value="name">Name A–Z</option>
                <option value="value">Highest value</option>
              </select>
            </div>
          )}

          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.checkCell}>
                    <input type="checkbox" checked={allOnPage} onChange={togglePage} aria-label="Select all on this page" />
                  </th>
                  <th>Name</th>
                  <th className={styles.hideMd}>Phone</th>
                  <th className={styles.hideSm}>Email</th>
                  <th>Tags</th>
                  <th className={styles.hideMd}>Value</th>
                  <th className={styles.hideSm}>Created</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((c) => (
                  <tr key={c.id} data-selected={chosen.includes(c.id) || undefined} onClick={() => setDrawer(c.id)}>
                    <td className={styles.checkCell} onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={chosen.includes(c.id)} onChange={() => toggle(c.id)} aria-label={`Select ${c.name}`} />
                    </td>
                    <td>
                      <button type="button" className={styles.nameCell} onClick={() => setDrawer(c.id)}>
                        <Avatar name={c.name} tone={stageInfo(c.stage).tone} />
                        <span className={styles.rowMain}>
                          <span className={styles.rowTitle}>{c.name}</span>
                          <span className={styles.rowSub}>
                            <StagePill stage={c.stage} />
                          </span>
                        </span>
                      </button>
                    </td>
                    <td className={`${styles.hideMd} ${styles.mono}`}>{c.phone || "—"}</td>
                    <td className={styles.hideSm}>{c.email || "—"}</td>
                    <td>
                      <span className={styles.tagList}>
                        {c.tags.slice(0, 2).map((t) => (
                          <span key={t} className={styles.tag}>
                            {t}
                          </span>
                        ))}
                        {c.tags.length > 2 && <span className={styles.tagMore}>+{c.tags.length - 2}</span>}
                      </span>
                    </td>
                    <td className={`${styles.hideMd} ${styles.mono}`}>{formatMoney(c.value)}</td>
                    <td className={`${styles.hideSm} ${styles.muted}`}>{formatDay(c.createdAt, { month: "short", day: "numeric", year: "numeric" })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pageRows.length === 0 && <Empty>No contacts match these filters.</Empty>}
          </div>

          <div className={styles.pager}>
            <span className={styles.muted}>
              {rows.length ? `Showing ${current * PAGE_SIZE + 1}–${Math.min(rows.length, (current + 1) * PAGE_SIZE)} of ${rows.length}` : "No results"}
            </span>
            <span className={styles.pagerBtns}>
              <button type="button" className={styles.btnGhost} disabled={current === 0} onClick={() => setPage(current - 1)}>
                Previous
              </button>
              <span className={styles.pageNum}>
                {current + 1} / {pages}
              </span>
              <button type="button" className={styles.btnGhost} disabled={current >= pages - 1} onClick={() => setPage(current + 1)}>
                Next
              </button>
            </span>
          </div>
        </div>
      </div>

      <datalist id="demo-tag-suggestions">
        {[...new Set([...SUGGESTED_TAGS, ...allTags])].map((t) => (
          <option key={t} value={t} />
        ))}
      </datalist>

      {drawer && (
        <>
          <div className={styles.scrim} onClick={() => setDrawer(null)} aria-hidden="true" />
          {open ? (
            <ContactDrawer key={open.id} contact={open} store={store} onClose={() => setDrawer(null)} />
          ) : (
            <NewContactDrawer store={store} onClose={() => setDrawer(null)} />
          )}
        </>
      )}
    </>
  );
}

function DrawerHead({ title, onClose, children }: { title: string; onClose: () => void; children?: ReactNode }) {
  return (
    <header className={styles.drawerHead}>
      {children}
      <h4 className={`${styles.cardTitle} ${styles.grow}`}>{title}</h4>
      <button type="button" className={styles.iconBtn} onClick={onClose} aria-label="Close">
        <Icon name="close" size={16} />
      </button>
    </header>
  );
}

function ContactDrawer({ contact, store, onClose }: { contact: Contact; store: DemoStore; onClose: () => void }) {
  const [tag, setTag] = useState("");
  const history = store.state.activity.filter((a) => a.text.includes(contact.name)).slice(0, 6);
  const set = (patch: Partial<Contact>) => store.updateContact(contact.id, patch);

  return (
    <aside className={styles.drawer} aria-label={`${contact.name} details`}>
      <DrawerHead title="Contact" onClose={onClose} />

      <div className={styles.drawerBody}>
        <div className={styles.profile}>
          <Avatar name={contact.name} tone={stageInfo(contact.stage).tone} />
          <div className={styles.grow}>
            <h4 className={styles.profileName}>{contact.name}</h4>
            <p className={styles.cardSub}>
              {contact.source} · added {formatDay(contact.createdAt)}
            </p>
          </div>
          <StagePill stage={contact.stage} />
        </div>

        {/* Quick actions, like the call / SMS / email row in GHL */}
        <div className={styles.quickActions}>
          <a className={styles.quickBtn} href={contact.phone ? `tel:${contact.phone}` : undefined} aria-disabled={!contact.phone}>
            <Icon name="phone" size={15} /> Call
          </a>
          <a className={styles.quickBtn} href={contact.email ? `mailto:${contact.email}` : undefined} aria-disabled={!contact.email}>
            <Icon name="mail" size={15} /> Email
          </a>
          <a className={styles.quickBtn} href={contact.phone ? `sms:${contact.phone}` : undefined} aria-disabled={!contact.phone}>
            <Icon name="sparkle" size={15} /> Text
          </a>
        </div>

        <Field label="Stage">
          <div className={styles.segmented}>
            {STAGES.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={contact.stage === s.id}
                onClick={() => contact.stage !== s.id && store.moveContact(contact.id, s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </Field>

        <div className={styles.drawerGrid}>
          <Field label="Full name">
            <input className={styles.input} value={contact.name} onChange={(e) => set({ name: e.target.value })} />
          </Field>
          <Field label="Phone">
            <input className={styles.input} value={contact.phone} onChange={(e) => set({ phone: e.target.value })} />
          </Field>
          <Field label="Email">
            <input className={styles.input} type="email" value={contact.email} onChange={(e) => set({ email: e.target.value })} />
          </Field>
          <Field label="Deal value ($)">
            <input className={styles.input} type="number" min={0} step={100} value={contact.value} onChange={(e) => set({ value: Number(e.target.value) })} />
          </Field>
        </div>

        <Field label="Tags">
          <div className={styles.tagEditor}>
            {contact.tags.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
                <button type="button" onClick={() => store.removeTag(contact.id, t)} aria-label={`Remove tag ${t}`}>
                  <Icon name="close" size={11} />
                </button>
              </span>
            ))}
            <form
              className={styles.tagForm}
              onSubmit={(e) => {
                e.preventDefault();
                store.addTag([contact.id], tag);
                setTag("");
              }}
            >
              <input
                className={styles.tagInput}
                list="demo-tag-suggestions"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="+ Add tag"
                aria-label="Add a tag"
              />
            </form>
          </div>
        </Field>

        <Field label="Notes">
          <textarea
            className={styles.input}
            rows={3}
            value={contact.notes}
            onChange={(e) => set({ notes: e.target.value })}
            placeholder="Wants a quote for the spring launch…"
          />
        </Field>

        <div>
          <span className={styles.fieldLabel}>Activity</span>
          {history.length === 0 ? (
            <p className={styles.cardSub}>No activity yet.</p>
          ) : (
            <ul className={styles.activity}>
              {history.map((a) => (
                <li key={a.id}>
                  <span className={styles.activityDot} />
                  <span className={styles.grow}>{a.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <footer className={styles.drawerFoot}>
        <button
          type="button"
          className={styles.btnDanger}
          onClick={() => {
            store.deleteContact(contact.id);
            onClose();
          }}
        >
          <Icon name="trash" size={14} />
          Delete contact
        </button>
      </footer>
    </aside>
  );
}

function NewContactDrawer({ store, onClose }: { store: DemoStore; onClose: () => void }) {
  const [draft, setDraft] = useState(BLANK);
  const [tagText, setTagText] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim()) return;
    const tags = tagText
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    store.addContact({ ...draft, name: draft.name.trim(), tags });
    onClose();
  };

  return (
    <aside className={styles.drawer} aria-label="Add contact">
      <DrawerHead title="Add contact" onClose={onClose} />
      <form className={styles.drawerBody} onSubmit={submit} id="demo-new-contact">
        <Field label="Full name">
          <input className={styles.input} required autoFocus value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Jordan Lee" />
        </Field>
        <div className={styles.drawerGrid}>
          <Field label="Email">
            <input className={styles.input} type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} placeholder="jordan@company.com" />
          </Field>
          <Field label="Phone">
            <input className={styles.input} value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} placeholder="(555) 555-0100" />
          </Field>
          <Field label="Source">
            <select className={styles.input} value={draft.source} onChange={(e) => setDraft({ ...draft, source: e.target.value })}>
              {SOURCES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="Stage">
            <select className={styles.input} value={draft.stage} onChange={(e) => setDraft({ ...draft, stage: e.target.value as Stage })}>
              {STAGES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Deal value ($)">
            <input className={styles.input} type="number" min={0} step={100} value={draft.value} onChange={(e) => setDraft({ ...draft, value: Number(e.target.value) })} />
          </Field>
          <Field label="Tags (comma separated)">
            <input className={styles.input} value={tagText} onChange={(e) => setTagText(e.target.value)} placeholder="hot lead, website" />
          </Field>
        </div>
        <p className={styles.cardSub}>New leads get the “Welcome new leads” email if that automation is on.</p>
      </form>
      <footer className={styles.drawerFoot}>
        <button type="button" className={styles.btnGhost} onClick={onClose}>
          Cancel
        </button>
        <button type="submit" form="demo-new-contact" className={styles.btnPrimary}>
          <Icon name="check" size={15} />
          Save contact
        </button>
      </footer>
    </aside>
  );
}
