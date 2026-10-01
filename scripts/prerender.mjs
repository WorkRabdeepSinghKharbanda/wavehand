// Writes one real, static HTML file per content route under dist/, with real body markup and
// real <head> tags — so a non-JS crawler sees actual content, not just the empty SPA shell.
// Never touches "/" (the camera instrument) — that stays pure client-rendered, see entry-server.tsx.
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { createServer } from "vite"

const root = fileURLToPath(new URL("..", import.meta.url))
const distDir = path.join(root, "dist")

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function headToHtml(head) {
  if (!head) return ""
  const metaHtml = head.metaTags
    .map((m) => `    <meta ${m.attr}="${m.key}" content="${escapeHtml(m.content)}" />`)
    .join("\n")
  const jsonLdHtml = head.jsonLdScript
    ? `    <script type="application/ld+json">${head.jsonLdScript}</script>`
    : ""
  return [
    `    <title>${escapeHtml(head.title)}</title>`,
    metaHtml,
    `    <link rel="canonical" href="${head.canonicalHref}" />`,
    jsonLdHtml,
  ]
    .filter(Boolean)
    .join("\n")
}

async function main() {
  // Real route list, read the same way generate-sitemap.mjs does — single source of truth.
  const server = await createServer({ server: { middlewareMode: true }, appType: "custom" })
  const { GUIDES } = await server.ssrLoadModule("/src/content/guides.ts")
  const { BLOG_POSTS } = await server.ssrLoadModule("/src/content/blogPosts.ts")
  const { LISTICLES } = await server.ssrLoadModule("/src/content/listicles.ts")
  await server.close()

  const routes = [
    ...GUIDES.map((g) => `/guides/${g.slug}`),
    "/blog",
    ...BLOG_POSTS.map((p) => `/blog/${p.slug}`),
    "/best",
    ...LISTICLES.map((l) => `/best/${l.slug}`),
    "/privacy",
    "/about",
  ]

  const ssrEntryUrl = pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href
  const { render } = await import(ssrEntryUrl)

  const template = await readFile(path.join(distDir, "index.html"), "utf-8")
  // Strip the default static <title> and description meta — each route injects its own.
  const baseTemplate = template
    .replace(/<title>.*?<\/title>/s, "")
    .replace(/<meta\s+name="description"[^>]*\/>/s, "")

  for (const route of routes) {
    const { html, head } = render(route)
    const page = baseTemplate
      .replace("</head>", `${headToHtml(head)}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)

    const outDir = path.join(distDir, route)
    await mkdir(outDir, { recursive: true })
    await writeFile(path.join(outDir, "index.html"), page)
  }

  console.log(`Prerendered ${routes.length} content routes.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
