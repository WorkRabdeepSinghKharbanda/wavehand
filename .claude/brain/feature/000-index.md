---
title: Feature index
---

# Feature index

Full inventory of WaveHand's functional modules. See `.claude/rules/brain-sync.md` for how this stays in sync with code.

## Core instrument

| # | Feature | Entry point |
|---|---------|-------------|
| 001 | [Gesture mode](001-gesture-mode.md) | `src/App.tsx`, `src/music/gestures.ts`, `src/vision/useHandTracking.ts` |
| 002 | [Theremin mode](002-theremin-mode.md) | `src/App.tsx`, `src/music/gestures.ts` |

## Loop & recording

| # | Feature | Entry point |
|---|---------|-------------|
| 003 | [Loop pedal / step sequencer](003-loop-pedal.md) | `src/audio/LoopEngine.ts`, `src/components/BeatGrid.tsx`, `src/components/LoopControls.tsx` |
| 004 | [Global recorder / export](004-global-recorder.md) | `src/components/GlobalRecorder.tsx` |

## Learn & community

| # | Feature | Entry point |
|---|---------|-------------|
| 005 | [Learn / Practice mode](005-learn-practice.md) | `src/components/practice/PracticeOverlay.tsx`, `src/lib/practiceMatch.ts` |
| 006 | [Community song deep link (`?a=<uuid>`)](006-community-deep-link.md) | `src/App.tsx`, `src/lib/fetchArrangement.ts`, `src/lib/arrangementAdapter.ts` |
| 007 | [Song picker](007-song-picker.md) | `src/components/SongPicker.tsx` |

## Onboarding & settings

| # | Feature | Entry point |
|---|---------|-------------|
| 008 | [First-visit tutorial](008-tutorial.md) | `src/components/Tutorial.tsx` |
| 009 | [HUD / settings sheet](009-hud-settings.md) | `src/components/Hud.tsx`, `src/music/gestureSettings.ts` |
