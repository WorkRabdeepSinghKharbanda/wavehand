---
entry_point: src/pages/BlogIndexPage.tsx, src/pages/BlogPostPage.tsx, src/content/blogPosts.ts
category: Content / SEO
---

`/blog` lists all `src/content/blogPosts.ts` entries with a client-side search box (filters on title/description, no backend); `/blog/:slug` renders one. Adding a post is appending one array entry — no new component or route needed, per `brain-sync.md` — but DOES require adding its URL to `public/sitemap.xml` and `public/llms.txt` in the same change (noted as a comment at the top of `blogPosts.ts` too). Posts emit `BlogPosting` JSON-LD. Every post describes real app mechanics (MediaPipe finger/wrist-tilt reading, the chord stabilizer, Learn mode's correctness gating, the v1/v2 arrangement format split, the voice picker's loudness compensation, real engineering postmortems like the StrictMode camera bug and the Core Web Vitals fixes) — content is written to stay accurate to the actual code, not marketing copy. Unknown `:slug` renders `NotFoundPage`.
