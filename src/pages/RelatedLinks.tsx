import { Link } from "react-router-dom"
import prose from "./ContentProse.module.css"

export type RelatedItem = {
  title: string
  href: string
}

/** Real adjacent content only — no fake personalization, just other entries of the same type plus a hub link. */
export function RelatedLinks({ heading, items }: { heading: string; items: RelatedItem[] }) {
  if (items.length === 0) return null
  return (
    <div className={prose.related}>
      <p className={prose.relatedHeading}>{heading}</p>
      <div className={prose.relatedGrid}>
        {items.map((item) => (
          <Link className={prose.card} to={item.href} key={item.href}>
            <p className={prose.cardTitle}>{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
