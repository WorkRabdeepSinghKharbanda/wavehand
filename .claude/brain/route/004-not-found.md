---
entry_point: src/pages/NotFoundPage.tsx
category: Content / SEO
---

Catch-all (`*`) route and the fallback every content page (`GuidePage`, `BlogPostPage`, `ListiclePage`) renders when its `:slug` doesn't match. Sets `<meta name="robots" content="noindex, nofollow">` via its own `useEffect` with cleanup, kept separate from `useSeo` since every other route wants to stay indexed.
