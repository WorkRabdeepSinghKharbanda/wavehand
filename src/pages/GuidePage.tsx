import { useParams } from "react-router-dom"
import { AdSlot } from "../components/AdSlot"
import { BLOG_POSTS } from "../content/blogPosts"
import { getGuide } from "../content/guides"
import { SITE_URL } from "../lib/siteMeta"
import { useSeo } from "../lib/useSeo"
import { Breadcrumbs } from "./Breadcrumbs"
import { ContentLayout } from "./ContentLayout"
import prose from "./ContentProse.module.css"
import { NotFoundPage } from "./NotFoundPage"
import { RelatedLinks } from "./RelatedLinks"

export function GuidePage() {
  const { slug } = useParams()
  const guide = slug ? getGuide(slug) : undefined

  useSeo({
    title: guide ? `${guide.title} — WaveHand` : "Guide not found — WaveHand",
    description: guide?.description ?? "",
    path: guide ? `/guides/${guide.slug}` : "/guides",
    image: guide?.image?.src,
    breadcrumbs: guide
      ? [
          { name: "Home", path: "/" },
          { name: "Guide", path: `/guides/${guide.slug}` },
        ]
      : undefined,
    jsonLd: guide
      ? [
          {
            "@type": "HowTo",
            name: guide.title,
            description: guide.description,
            step: guide.sections.map((s) => ({
              "@type": "HowToStep",
              name: s.heading,
              text: s.paragraphs.join(" "),
            })),
          },
          {
            "@type": "FAQPage",
            mainEntity: guide.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]
      : undefined,
  })

  if (!guide) return <NotFoundPage />

  const related = BLOG_POSTS.slice(0, 3)

  return (
    <ContentLayout>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Guide", path: `/guides/${guide.slug}` }]} />
      <p className={prose.kicker}>{guide.kicker}</p>
      <h1 className={prose.title}>{guide.title}</h1>
      <p className={prose.description}>{guide.description}</p>

      {guide.image && (
        <>
          <img className={prose.heroImage} src={guide.image.src} alt={guide.image.alt} />
          <p className={prose.imageCaption}>{guide.image.alt}</p>
        </>
      )}

      {guide.sections.map((section) => (
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

      <section className={prose.section}>
        <h2 className={prose.sectionHeading}>FAQ</h2>
        {guide.faq.map((f) => (
          <div className={prose.faqItem} key={f.q}>
            <p className={prose.faqQ}>{f.q}</p>
            <p className={prose.faqA}>{f.a}</p>
          </div>
        ))}
      </section>

      <p className={prose.paragraph}>
        Ready to try it? The instrument is live at{" "}
        <a href={SITE_URL}>{SITE_URL.replace("https://", "")}</a>.
      </p>

      <RelatedLinks
        heading="From the blog"
        items={related.map((p) => ({ title: p.title, href: `/blog/${p.slug}` }))}
      />
    </ContentLayout>
  )
}
