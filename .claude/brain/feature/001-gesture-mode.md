---
entry_point: src/App.tsx, src/music/gestures.ts, src/music/chords.ts, src/vision/useHandTracking.ts
category: Core instrument
---

Default instrument mode. MediaPipe hand landmarks (`useHandTracking`) drive `src/music/gestures.ts`: left hand raised-finger count → chord degree (I–V), index+pinky → VI, index+pinky+thumb → VII, wrist tilt → major/minor. Right hand height → volume, finger count → triad/inversion/7ths quality, wrist tilt → filter tone, thumb extended → octave down. Chord is stabilized (`createChordStabilizer`) before being turned into frequencies via `chordTonesFromRoman` / `notesForQuality` and played through `SynthEngine`.
