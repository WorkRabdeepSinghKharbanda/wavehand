// Generates public/sitemap.xml straight from the real content data (src/content/*.ts),
// so it can never drift from what routes actually exist. Uses Vite's own programmatic API
// (already an installed dependency) to import .ts content modules from plain Node — no new
// dependency needed.
import { writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { createServer } from "vite"

async function main() {
  const server = await createServer({ server: { middlewareMode: true }, appType: "custom" })
  const { GUIDES } = await server.ssrLoadModule("/src/content/guides.ts")
  const { BLOG_POSTS } = await server.ssrLoadModule("/src/content/blogPosts.ts")
  const { LISTICLES } = await server.ssrLoadModule("/src/content/listicles.ts")
  const { SITE_URL } = await server.ssrLoadModule("/src/lib/siteMeta.ts")
  await server.close()

  const today = new Date().toISOString().slice(0, 10)

  const urls = [
    { loc: "/", freq: "weekly", pri: "1.0" },
    ...GUIDES.map((g) => ({ loc: `/guides/${g.slug}`, freq: "monthly", pri: "0.8" })),
    { loc: "/blog", freq: "weekly", pri: "0.7" },
    ...BLOG_POSTS.map((p) => ({ loc: `/blog/${p.slug}`, freq: "monthly", pri: "0.6" })),
    { loc: "/best", freq: "weekly", pri: "0.7" },
    ...LISTICLES.map((l) => ({ loc: `/best/${l.slug}`, freq: "monthly", pri: "0.6" })),
    { loc: "/about", freq: "yearly", pri: "0.3" },
    { loc: "/privacy", freq: "yearly", pri: "0.2" },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${SITE_URL}${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.pri}</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>
`

  const outPath = fileURLToPath(new URL("../public/sitemap.xml", import.meta.url))
  await writeFile(outPath, xml)
  console.log(`sitemap.xml written with ${urls.length} URLs`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
