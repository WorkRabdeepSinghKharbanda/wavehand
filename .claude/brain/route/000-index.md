---
title: Route index
---

# Route index

Real `react-router-dom` URL routes (`src/main.tsx`), separate from the instrument's internal state-driven "features" in `.claude/brain/feature/`. See `.claude/rules/brain-sync.md` for how the two trees differ and stay in sync.

## Content / SEO

| # | Route | Entry point |
|---|-------|-------------|
| 001 | [`/guides/:slug`](001-guide.md) | `src/pages/GuidePage.tsx`, `src/content/guides.ts` |
| 002 | [`/blog`, `/blog/:slug`](002-blog.md) | `src/pages/BlogIndexPage.tsx`, `src/pages/BlogPostPage.tsx`, `src/content/blogPosts.ts` |
| 003 | [`/best`, `/best/:slug`](003-listicle.md) | `src/pages/ListicleIndexPage.tsx`, `src/pages/ListiclePage.tsx`, `src/content/listicles.ts` |
| 004 | [`*` (404)](004-not-found.md) | `src/pages/NotFoundPage.tsx` |
| 005 | [`/privacy`](005-privacy.md) | `src/pages/PrivacyPage.tsx` |
| 006 | [`/about`](006-about.md) | `src/pages/AboutPage.tsx` |

`/` itself is not listed here — it renders `App.tsx` directly and belongs to `.claude/brain/feature/`.

Every route in this table is **prerendered to real static HTML at build time** (`src/entry-server.tsx` + `scripts/prerender.mjs`, wired into `npm run build`) — never `/`, since SSR-ing a camera/Web-Audio app makes no sense. `scripts/generate-sitemap.mjs` reads the same real route data to build `public/sitemap.xml`, so the two can't drift from each other or from the actual content arrays.
