import { useParams } from "react-router-dom"
import { AdSlot } from "../components/AdSlot"
import { getListicle, LISTICLES } from "../content/listicles"
import { useSeo } from "../lib/useSeo"
import { Breadcrumbs } from "./Breadcrumbs"
import { ContentLayout } from "./ContentLayout"
import prose from "./ContentProse.module.css"
import { NotFoundPage } from "./NotFoundPage"
import { RelatedLinks } from "./RelatedLinks"

export function ListiclePage() {
  const { slug } = useParams()
  const listicle = slug ? getListicle(slug) : undefined

  useSeo({
    title: listicle ? `${listicle.title} — WaveHand` : "Not found — WaveHand",
    description: listicle?.description ?? "",
    path: listicle ? `/best/${listicle.slug}` : "/best",
    image: listicle?.image?.src,
    breadcrumbs: listicle
      ? [
          { name: "Home", path: "/" },
          { name: "Practice tips", path: "/best" },
          { name: listicle.title, path: `/best/${listicle.slug}` },
        ]
      : undefined,
    jsonLd: listicle
      ? [
          {
            "@type": "ItemList",
            name: listicle.title,
            itemListElement: listicle.items.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.title,
              description: item.description,
            })),
          },
          ...(listicle.faq.length > 0
            ? [
                {
                  "@type": "FAQPage",
                  mainEntity: listicle.faq.map((f) => ({
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

  if (!listicle) return <NotFoundPage />

  const related = LISTICLES.filter((l) => l.slug !== listicle.slug).slice(0, 3)

  return (
    <ContentLayout>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Practice tips", path: "/best" },
          { name: listicle.title, path: `/best/${listicle.slug}` },
        ]}
      />
      <p className={prose.kicker}>Practice tips</p>
      <h1 className={prose.title}>{listicle.title}</h1>
      <p className={prose.description}>{listicle.description}</p>

      {listicle.image && (
        <>
          <img className={prose.heroImage} src={listicle.image.src} alt={listicle.image.alt} />
          <p className={prose.imageCaption}>{listicle.image.alt}</p>
        </>
      )}

      {listicle.intro.map((p, i) => (
        <p className={prose.paragraph} key={i}>
          {p}
        </p>
      ))}

      <ol className={prose.list}>
        {listicle.items.map((item) => (
          <li className={prose.listCard} key={item.title}>
            <p className={prose.listTitle}>{item.title}</p>
            <p className={prose.listDescription}>{item.description}</p>
          </li>
        ))}
      </ol>

      <AdSlot />

      {listicle.faq.length > 0 && (
        <section className={prose.section}>
          <h2 className={prose.sectionHeading}>FAQ</h2>
          {listicle.faq.map((f) => (
            <div className={prose.faqItem} key={f.q}>
              <p className={prose.faqQ}>{f.q}</p>
              <p className={prose.faqA}>{f.a}</p>
            </div>
          ))}
        </section>
      )}

      <RelatedLinks
        heading="More practice tips"
        items={related.map((l) => ({ title: l.title, href: `/best/${l.slug}` }))}
      />
    </ContentLayout>
  )
}
