import { renderToString } from "react-dom/server"
import { Route, Routes } from "react-router-dom"
import { StaticRouter } from "react-router"
import { AboutPage } from "./pages/AboutPage"
import { BlogIndexPage } from "./pages/BlogIndexPage"
import { BlogPostPage } from "./pages/BlogPostPage"
import { GuidePage } from "./pages/GuidePage"
import { ListicleIndexPage } from "./pages/ListicleIndexPage"
import { ListiclePage } from "./pages/ListiclePage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { PrivacyPage } from "./pages/PrivacyPage"
import { __getSsrHead, __resetSsrHead, type HeadTags } from "./lib/useSeo"

/**
 * Content pages only — never `App` (the camera instrument). SSR-ing a getUserMedia/Web Audio
 * app is meaningless (no camera/audio in Node) and unsafe; "/" stays pure client-rendered.
 */
export function render(url: string): { html: string; head: HeadTags | null } {
  __resetSsrHead()
  const html = renderToString(
    <StaticRouter location={url}>
      <Routes>
        <Route path="/guides/:slug" element={<GuidePage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/best" element={<ListicleIndexPage />} />
        <Route path="/best/:slug" element={<ListiclePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </StaticRouter>,
  )
  return { html, head: __getSsrHead() }
}
