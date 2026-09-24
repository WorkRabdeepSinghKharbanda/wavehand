import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { BLOG_POSTS } from "../content/blogPosts"
import { useSeo } from "../lib/useSeo"
import { ContentLayout } from "./ContentLayout"
import prose from "./ContentProse.module.css"

export function BlogIndexPage() {
  const [query, setQuery] = useState("")

  useSeo({
    title: "Blog — WaveHand",
    description: "Short, practical posts on how WaveHand's hand-tracking instrument actually works.",
    path: "/blog",
  })

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return BLOG_POSTS
    return BLOG_POSTS.filter(
      (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <ContentLayout>
      <p className={prose.kicker}>Blog</p>
      <h1 className={prose.title}>WaveHand Blog</h1>
      <p className={prose.description}>
        Short posts on how the instrument actually works, under the hood.
      </p>

      <input
        type="search"
        className={prose.searchBar}
        placeholder="Search the blog…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search blog posts"
      />
      <p className={prose.resultCount}>
        {filtered.length} post{filtered.length === 1 ? "" : "s"}
      </p>

      <div className={prose.cardGrid}>
        {filtered.map((post) => (
          <Link className={prose.card} to={`/blog/${post.slug}`} key={post.slug}>
            <p className={prose.cardTitle}>{post.title}</p>
            <p className={prose.cardMeta}>{post.date}</p>
            <p className={prose.cardDescription}>{post.description}</p>
          </Link>
        ))}
      </div>
    </ContentLayout>
  )
}
