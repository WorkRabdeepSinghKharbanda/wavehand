import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { LISTICLES } from "../content/listicles"
import { useSeo } from "../lib/useSeo"
import { ContentLayout } from "./ContentLayout"
import prose from "./ContentProse.module.css"

export function ListicleIndexPage() {
  const [query, setQuery] = useState("")

  useSeo({
    title: "Practice Tips — WaveHand",
    description: "Real, honest lists of WaveHand's own features — gestures, settings, and ways to practice.",
    path: "/best",
  })

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return LISTICLES
    return LISTICLES.filter(
      (l) => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <ContentLayout>
      <p className={prose.kicker}>Practice tips</p>
      <h1 className={prose.title}>Practice Tips &amp; Feature Guides</h1>
      <p className={prose.description}>
        Lists built entirely from WaveHand's own real features — no invented comparisons against
        other products.
      </p>

      <input
        type="search"
        className={prose.searchBar}
        placeholder="Search practice tips…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search practice tips"
      />
      <p className={prose.resultCount}>
        {filtered.length} page{filtered.length === 1 ? "" : "s"}
      </p>

      <div className={prose.cardGrid}>
        {filtered.map((l) => (
          <Link className={prose.card} to={`/best/${l.slug}`} key={l.slug}>
            <p className={prose.cardTitle}>{l.title}</p>
            <p className={prose.cardDescription}>{l.description}</p>
          </Link>
        ))}
      </div>
    </ContentLayout>
  )
}
