import { useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BLOG_POSTS } from "../content/blogPosts"
import { GUIDES } from "../content/guides"
import { LISTICLES } from "../content/listicles"
import { useClickOutside } from "../lib/useClickOutside"
import styles from "./HudPopover.module.css"

type Entry = {
  key: string
  title: string
  meta: string
  href: string
}

const ENTRIES: Entry[] = [
  ...GUIDES.map((g) => ({ key: `guide-${g.slug}`, title: g.title, meta: "Guide", href: `/guides/${g.slug}` })),
  ...BLOG_POSTS.map((p) => ({ key: `blog-${p.slug}`, title: p.title, meta: "Blog", href: `/blog/${p.slug}` })),
  ...LISTICLES.map((l) => ({ key: `lp-${l.slug}`, title: l.title, meta: "Practice tips", href: `/best/${l.slug}` })),
]

/** Search/browse the guide, blog, and landing-page (listicle) content — sits left of ShareButton. */
export function ContentBrowserButton() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()
  useClickOutside(wrapRef, open, () => setOpen(false))

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ENTRIES
    return ENTRIES.filter((e) => e.title.toLowerCase().includes(q) || e.meta.toLowerCase().includes(q))
  }, [query])

  function select(href: string) {
    setOpen(false)
    setQuery("")
    navigate(href)
  }

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-label="Browse guides and blog"
        onClick={() => setOpen((p) => !p)}
      >
        Explore
      </button>
      {open && (
        <div className={styles.popover} role="menu">
          <input
            type="search"
            className={styles.search}
            placeholder="Search guides, blog, tips…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search content"
            autoFocus
          />
          {filtered.length === 0 ? (
            <p className={styles.empty}>No matches.</p>
          ) : (
            filtered.map((e) => (
              <button
                key={e.key}
                type="button"
                className={styles.item}
                role="menuitem"
                onClick={() => select(e.href)}
              >
                {e.title}
                <span className={styles.itemMeta}>{e.meta}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
