import { useEffect } from "react"
import { SITE_URL } from "./siteMeta"

export type SeoInput = {
  title: string
  description: string
  path: string
  /** JSON-LD graph nodes — combined into one `@graph` script per the SEO brief. */
  jsonLd?: object[]
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

/** Per-route document.title, meta description, canonical, OG/Twitter tags, and JSON-LD. */
export function useSeo({ title, description, path, jsonLd }: SeoInput) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`
    const prevTitle = document.title
    document.title = title

    setMeta("name", "description", description)
    setMeta("property", "og:title", title)
    setMeta("property", "og:description", description)
    setMeta("property", "og:url", url)
    setMeta("property", "og:type", "article")
    setMeta("name", "twitter:card", "summary")
    setMeta("name", "twitter:title", title)
    setMeta("name", "twitter:description", description)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      document.head.appendChild(canonical)
    }
    canonical.setAttribute("href", url)

    let ldScript: HTMLScriptElement | null = null
    if (jsonLd && jsonLd.length > 0) {
      ldScript = document.createElement("script")
      ldScript.type = "application/ld+json"
      ldScript.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": jsonLd })
      document.head.appendChild(ldScript)
    }

    return () => {
      document.title = prevTitle
      if (ldScript) ldScript.remove()
    }
  }, [title, description, path, jsonLd])
}
