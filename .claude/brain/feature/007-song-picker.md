---
entry_point: src/components/SongPicker.tsx, src/lib/practiceProgress.ts
category: Learn & community
---

"Learn a song" browser in the HUD. Lists public arrangements via `listArrangements` (Supabase, `is_public = true`, ordered by `created_at desc`, paginated 16/page, filterable by tag). Selecting an item feeds the same load path as the [community deep link](006-community-deep-link.md) (`fetchArrangement` → `arrangementToPracticeSong` → open [Learn / Practice mode](005-learn-practice.md)). Disabled/hidden when `isSupabaseConfigured()` is false. Cards show a "✓ N" badge from `getCompletedCount(item.id)` (`practiceProgress.ts`) when the user has finished at least one section of that song before.
