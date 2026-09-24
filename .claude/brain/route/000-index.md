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
| 003 | [`/best/:slug`](003-listicle.md) | `src/pages/ListiclePage.tsx`, `src/content/listicles.ts` |
| 004 | [`*` (404)](004-not-found.md) | `src/pages/NotFoundPage.tsx` |

`/` itself is not listed here — it renders `App.tsx` directly and belongs to `.claude/brain/feature/`.
