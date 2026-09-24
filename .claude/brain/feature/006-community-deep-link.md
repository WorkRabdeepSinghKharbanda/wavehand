---
entry_point: src/App.tsx, src/lib/fetchArrangement.ts, src/lib/arrangementAdapter.ts, src/lib/arrangementTypes.ts
category: Learn & community
---

`?a=<arrangement-uuid>` query param (same UUIDs as `community.wavehand.com/a/<id>`) auto-opens guided practice for that arrangement on load. `fetchArrangement` reads the public `arrangements` row from the shared Supabase project (anon key, RLS-gated to `is_public`) and `normalizeArrangement` accepts both v2 (`notes`, MIDI-based, includes Learn-song imports) and legacy v1 (`steps`). `arrangementToPracticeSong` converts the row into the `PracticeSong` shape consumed by [Learn / Practice mode](005-learn-practice.md). Requires `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` (see `.env.example`) — without them `isSupabaseConfigured()` is false and the deep link silently no-ops.
