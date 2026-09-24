---
entry_point: src/audio/LoopEngine.ts, src/components/BeatGrid.tsx, src/components/LoopControls.tsx
category: Loop & recording
---

4-track step sequencer/looper. `LoopEngine` runs its own `idle → countIn → recording` state machine per track (`LoopTrack`, `MAX_TRACKS = 4`, `SUBS_PER_BEAT = 4`), capturing live-played `LoopFrame`s (freqs, volume, filter tilt, chord, mode, voice) into a step grid. Each frame stores the oscillator voice it was played with, so `renderBuffer` replays a loop in its recorded sound even after the user switches voices. `BeatGrid` renders/edits the grid; `LoopControls` drives transport (bpm, bars, beats/bar, metronome, per-track mute/solo/volume). Playback continues in the background independent of practice/tutorial overlays.
