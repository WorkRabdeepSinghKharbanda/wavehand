---
entry_point: src/components/GlobalRecorder.tsx
category: Loop & recording
---

Records the full mixed audio output (not just loop tracks) so the session can be exported/downloaded. Independent of `LoopEngine`'s per-track step capture — this captures whatever is actually playing through the speakers, including live Gesture/Theremin input over loop playback. `App.tsx`'s `isExporting` state gates UI while a recording is being finalized.
