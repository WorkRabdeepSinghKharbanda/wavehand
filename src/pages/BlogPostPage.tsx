import { useParams } from "react-router-dom"
import { AdSlot } from "../components/AdSlot"
import { BLOG_POSTS, getBlogPost } from "../content/blogPosts"
import { SITE_URL } from "../lib/siteMeta"
import { useSeo } from "../lib/useSeo"
import { Breadcrumbs } from "./Breadcrumbs"
import { ContentLayout } from "./ContentLayout"
import prose from "./ContentProse.module.css"
import { NotFoundPage } from "./NotFoundPage"
import { RelatedLinks } from "./RelatedLinks"

export function BlogPostPage() {
  const { slug } = useParams()
  const post = slug ? getBlogPost(slug) : undefined

  useSeo({
    title: post ? `${post.title} — WaveHand` : "Post not found — WaveHand",
    description: post?.description ?? "",
    path: post ? `/blog/${post.slug}` : "/blog",
    publishedTime: post?.date,
    image: post?.image?.src,
    breadcrumbs: post
      ? [
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]
      : undefined,
    jsonLd: post
      ? [
          {
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
          },
          ...(post.faq.length > 0
            ? [
                {
                  "@type": "FAQPage",
                  mainEntity: post.faq.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                },
              ]
            : []),
        ]
      : undefined,
  })

  if (!post) return <NotFoundPage />

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <ContentLayout>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <p className={prose.kicker}>Blog</p>
      <h1 className={prose.title}>{post.title}</h1>
      <p className={prose.meta}>{post.date}</p>

      {post.image && (
        <>
          <img className={prose.heroImage} src={post.image.src} alt={post.image.alt} />
          <p className={prose.imageCaption}>{post.image.alt}</p>
        </>
      )}

      {post.sections.map((section) => (
        <section className={prose.section} key={section.heading}>
          <h2 className={prose.sectionHeading}>{section.heading}</h2>
          {section.paragraphs.map((p, i) => (
            <p className={prose.paragraph} key={i}>
              {p}
            </p>
          ))}
        </section>
      ))}

      <AdSlot />

      {post.faq.length > 0 && (
        <section className={prose.section}>
          <h2 className={prose.sectionHeading}>FAQ</h2>
          {post.faq.map((f) => (
            <div className={prose.faqItem} key={f.q}>
              <p className={prose.faqQ}>{f.q}</p>
              <p className={prose.faqA}>{f.a}</p>
            </div>
          ))}
        </section>
      )}

      <RelatedLinks
        heading="More from the blog"
        items={related.map((p) => ({ title: p.title, href: `/blog/${p.slug}` }))}
      />
    </ContentLayout>
  )
}
