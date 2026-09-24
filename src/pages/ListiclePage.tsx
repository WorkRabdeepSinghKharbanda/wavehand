import { useParams } from "react-router-dom"
import { getListicle } from "../content/listicles"
import { useSeo } from "../lib/useSeo"
import { ContentLayout } from "./ContentLayout"
import prose from "./ContentProse.module.css"
import { NotFoundPage } from "./NotFoundPage"

export function ListiclePage() {
  const { slug } = useParams()
  const listicle = slug ? getListicle(slug) : undefined

  useSeo({
    title: listicle ? `${listicle.title} — WaveHand` : "Not found — WaveHand",
    description: listicle?.description ?? "",
    path: listicle ? `/best/${listicle.slug}` : "/best",
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
        ]
      : undefined,
  })

  if (!listicle) return <NotFoundPage />

  return (
    <ContentLayout>
      <p className={prose.kicker}>Practice tips</p>
      <h1 className={prose.title}>{listicle.title}</h1>
      <p className={prose.description}>{listicle.description}</p>

      <ol className={prose.list}>
        {listicle.items.map((item) => (
          <li className={prose.listCard} key={item.title}>
            <p className={prose.listTitle}>{item.title}</p>
            <p className={prose.listDescription}>{item.description}</p>
          </li>
        ))}
      </ol>
    </ContentLayout>
  )
}
