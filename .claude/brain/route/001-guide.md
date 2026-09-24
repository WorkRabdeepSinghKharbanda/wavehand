---
entry_point: src/pages/GuidePage.tsx, src/content/guides.ts
category: Content / SEO
---

Long-form how-to page(s) for organic search, one per `src/content/guides.ts` entry (currently one: "Play Chords With Your Hands"). Renders via the shared `ContentLayout`. Emits `HowTo` + `FAQPage` JSON-LD (via `useSeo`'s `jsonLd` array, combined into one `@graph`) — the FAQ content is pulled from the real README requirements, not invented. Unknown `:slug` renders `NotFoundPage` (with `noindex`) instead of a blank page.
