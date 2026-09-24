---
entry_point: src/pages/ListicleIndexPage.tsx, src/pages/ListiclePage.tsx, src/content/listicles.ts
category: Content / SEO
---

`/best` lists all `src/content/listicles.ts` entries with a client-side search box, same pattern as `/blog`. `/best/:slug` renders one as an `ItemList` (JSON-LD + rendered `<ol>`). WaveHand has no product catalog to build a real comparison from, so every entry deliberately lists the app's own real features (gestures, settings, sound/loop controls, real requirements, real instrument history, real privacy choices) rather than a fabricated "best of" ranking against other products. Keep that constraint if adding more listicle entries — don't invent competitor comparisons or data that isn't verifiable from this codebase. Adding an entry requires updating `public/sitemap.xml` and `public/llms.txt` in the same change (see comment at the top of `listicles.ts`).
