---
entry_point: src/components/Hud.tsx, src/music/gestureSettings.ts, src/lib/sequencerPrefs.ts, src/lib/keyPref.ts
category: Onboarding & settings
---

Always-on HUD (mode switch, key select, camera status, social links) plus a settings sheet for chord sound/voice preset (`VOICE_OPTIONS`: Bright/Soft/Mellow/8-bit → oscillator type, Gesture mode only; `VOICE_GAIN` compensates each voice's perceived loudness in both `SynthEngine.setVolume` and `LoopEngine`'s offline render), hand-control remapping (`GestureSettings`, persisted via `loadGestureSettings`/`saveGestureSettings`), sequencer visibility toggle (`sequencerPrefs`), and About/social links (`src/lib/siteLinks.ts`). The user-picked key select persists via `keyPref.ts` (`loadKeyHz`/`saveKeyHz`); a Learn-song's own key (set via `setKeyHz` directly in `App.tsx`) is intentionally NOT persisted so it doesn't overwrite the user's saved key.
