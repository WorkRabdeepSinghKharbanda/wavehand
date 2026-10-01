import { useEffect } from "react"
import { SITE_URL } from "./siteMeta"

export type Breadcrumb = { name: string; path: string }

export type SeoInput = {
  title: string
  description: string
  path: string
  /** JSON-LD graph nodes — combined into one `@graph` script per the SEO brief. */
  jsonLd?: object[]
  /** Rendered as a BreadcrumbList JSON-LD node, home → ... → this page. */
  breadcrumbs?: Breadcrumb[]
  /** Blog posts only — real publish date, ISO/YYYY-MM-DD. No fabricated "modified" date. */
  publishedTime?: string
  /** Absolute or site-root-relative path to a real screenshot — used for og:image/twitter:image. */
  image?: string
}

export type MetaTag = { attr: "name" | "property"; key: string; content: string }

export type HeadTags = {
  title: string
  metaTags: MetaTag[]
  canonicalHref: string
  jsonLdScript: string | null
}

function buildBreadcrumbList(breadcrumbs: Breadcrumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: `${SITE_URL}${b.path}`,
    })),
  }
}

/** Pure — no DOM access, safe to call from a server-rendering script. */
export function buildHeadTags({
  title,
  description,
  path,
  jsonLd,
  breadcrumbs,
  publishedTime,
  image,
}: SeoInput): HeadTags {
  const url = `${SITE_URL}${path}`
  const imageUrl = image ? (image.startsWith("http") ? image : `${SITE_URL}${image}`) : undefined

  const metaTags: MetaTag[] = [
    { attr: "name", key: "description", content: description },
    { attr: "property", key: "og:title", content: title },
    { attr: "property", key: "og:description", content: description },
    { attr: "property", key: "og:url", content: url },
    { attr: "property", key: "og:type", content: "article" },
    { attr: "name", key: "twitter:card", content: imageUrl ? "summary_large_image" : "summary" },
    { attr: "name", key: "twitter:title", content: title },
    { attr: "name", key: "twitter:description", content: description },
  ]
  if (publishedTime) {
    metaTags.push({ attr: "property", key: "article:published_time", content: publishedTime })
  }
  if (imageUrl) {
    metaTags.push({ attr: "property", key: "og:image", content: imageUrl })
    metaTags.push({ attr: "name", key: "twitter:image", content: imageUrl })
  }

  const graph = [...(jsonLd ?? [])]
  if (breadcrumbs && breadcrumbs.length > 0) graph.push(buildBreadcrumbList(breadcrumbs))

  return {
    title,
    metaTags,
    canonicalHref: url,
    jsonLdScript: graph.length > 0 ? JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) : null,
  }
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

// --- SSR head collector ---
// Effects never run during `renderToString`, so the prerender script can't rely on the
// useEffect below. Instead, on the server, compute the head synchronously during render and
// stash it here; `src/entry-server.tsx` resets this before each render and reads it right after.
let ssrHead: HeadTags | null = null
export function __resetSsrHead() {
  ssrHead = null
}
export function __getSsrHead(): HeadTags | null {
  return ssrHead
}

/** Per-route document.title, meta description, canonical, OG/Twitter tags, and JSON-LD. */
export function useSeo(input: SeoInput) {
  if (typeof document === "undefined") {
    ssrHead = buildHeadTags(input)
  }

  useEffect(() => {
    const head = buildHeadTags(input)
    const prevTitle = document.title
    document.title = head.title

    head.metaTags.forEach((m) => setMeta(m.attr, m.key, m.content))

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      document.head.appendChild(canonical)
    }
    canonical.setAttribute("href", head.canonicalHref)

    let ldScript: HTMLScriptElement | null = null
    if (head.jsonLdScript) {
      ldScript = document.createElement("script")
      ldScript.type = "application/ld+json"
      ldScript.textContent = head.jsonLdScript
      document.head.appendChild(ldScript)
    }

    return () => {
      document.title = prevTitle
      if (ldScript) ldScript.remove()
    }
  }, [input.title, input.description, input.path, input.jsonLd, input.breadcrumbs, input.publishedTime, input.image])
}
