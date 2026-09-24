---
entry_point: src/pages/BlogIndexPage.tsx, src/pages/BlogPostPage.tsx, src/content/blogPosts.ts
category: Content / SEO
---

`/blog` lists all `src/content/blogPosts.ts` entries; `/blog/:slug` renders one. Adding a post is appending one array entry — no new component or route needed, per `brain-sync.md`. Posts emit `BlogPosting` JSON-LD. All three current posts describe real app mechanics (MediaPipe finger/wrist-tilt reading, Theremin mode, the loop pedal's offline-render + background-tab-keepalive trick) — content is written to stay accurate to the actual code in `music/gestures.ts` / `audio/LoopEngine.ts`, not marketing copy. Unknown `:slug` renders `NotFoundPage`.
