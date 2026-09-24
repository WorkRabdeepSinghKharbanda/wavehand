import { Link } from "react-router-dom"
import { BLOG_POSTS } from "../content/blogPosts"
import { useSeo } from "../lib/useSeo"
import { ContentLayout } from "./ContentLayout"
import prose from "./ContentProse.module.css"

export function BlogIndexPage() {
  useSeo({
    title: "Blog — WaveHand",
    description: "Short, practical posts on how WaveHand's hand-tracking instrument actually works.",
    path: "/blog",
  })

  return (
    <ContentLayout>
      <p className={prose.kicker}>Blog</p>
      <h1 className={prose.title}>WaveHand Blog</h1>
      <p className={prose.description}>
        Short posts on how the instrument actually works, under the hood.
      </p>

      <div className={prose.cardGrid}>
        {BLOG_POSTS.map((post) => (
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
