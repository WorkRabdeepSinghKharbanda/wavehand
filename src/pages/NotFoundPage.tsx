import { useEffect } from "react"
import { useSeo } from "../lib/useSeo"
import { ContentLayout } from "./ContentLayout"
import prose from "./ContentProse.module.css"

export function NotFoundPage() {
  useSeo({
    title: "Page not found — WaveHand",
    description: "This page doesn't exist.",
    path: "/404",
  })

  // Page-specific noindex — kept separate from useSeo since every other route wants to be indexed.
  useEffect(() => {
    let tag = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!tag) {
      tag = document.createElement("meta")
      tag.setAttribute("name", "robots")
      document.head.appendChild(tag)
    }
    tag.setAttribute("content", "noindex, nofollow")
    return () => tag?.remove()
  }, [])

  return (
    <ContentLayout>
      <h1 className={prose.title}>Page not found</h1>
      <p className={prose.description}>
        That page doesn't exist. Head back to the instrument or check out the guide and blog.
      </p>
    </ContentLayout>
  )
}
