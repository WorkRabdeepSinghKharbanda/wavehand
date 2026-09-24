import { useParams } from "react-router-dom"
import { getBlogPost } from "../content/blogPosts"
import { useSeo } from "../lib/useSeo"
import { ContentLayout } from "./ContentLayout"
import prose from "./ContentProse.module.css"
import { NotFoundPage } from "./NotFoundPage"

export function BlogPostPage() {
  const { slug } = useParams()
  const post = slug ? getBlogPost(slug) : undefined

  useSeo({
    title: post ? `${post.title} — WaveHand` : "Post not found — WaveHand",
    description: post?.description ?? "",
    path: post ? `/blog/${post.slug}` : "/blog",
    jsonLd: post
      ? [
          {
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
          },
        ]
      : undefined,
  })

  if (!post) return <NotFoundPage />

  return (
    <ContentLayout>
      <p className={prose.kicker}>Blog</p>
      <h1 className={prose.title}>{post.title}</h1>
      <p className={prose.meta}>{post.date}</p>

      {post.body.map((p, i) => (
        <p className={prose.paragraph} key={i}>
          {p}
        </p>
      ))}
    </ContentLayout>
  )
}
