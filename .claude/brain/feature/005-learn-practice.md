---
entry_point: src/components/practice/PracticeOverlay.tsx, src/lib/practiceMatch.ts, src/lib/practiceTypes.ts, src/lib/practiceProgress.ts
category: Learn & community
---

Guided practice mode for a loaded `PracticeSong` (from a community arrangement or a built-in song). `PracticeOverlay` shows the upcoming chord chart synced to `loopBpm`; `practiceMatch.compareLive` / `isFullMatch` compare the live stabilized gesture against the current `GestureTarget`. Audio and chart advance are gated on a correct held match — see the `Rule that bit us once` in root CLAUDE.md (commit `fe4ec95`). Practice metronome (`practiceMetroOn`) defaults off and only starts after the learner's first correct note (`practiceFirstNote`). Finishing every step of a section (matched or skipped) calls `markSectionComplete(song.id, sectionIdx)` (`practiceProgress.ts`, localStorage keyed by song id) — read back by [Song picker](007-song-picker.md) to badge already-practiced songs.
