import { Link } from "react-router-dom"
import type { Breadcrumb } from "../lib/useSeo"
import prose from "./ContentProse.module.css"

/** Visible breadcrumb trail — the data also feeds BreadcrumbList JSON-LD via useSeo's `breadcrumbs` input. */
export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <nav className={prose.breadcrumbs} aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.path}>
          {i > 0 && <span className={prose.breadcrumbSep}>/</span>}{" "}
          {i === items.length - 1 ? (
            <span aria-current="page">{item.name}</span>
          ) : (
            <Link to={item.path}>{item.name}</Link>
          )}
        </span>
      ))}
    </nav>
  )
}
