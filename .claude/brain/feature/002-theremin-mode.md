---
entry_point: src/App.tsx, src/music/gestures.ts
category: Core instrument
---

Classic theremin mode, toggled via `InstrumentMode` in the HUD. Left hand height → volume (`volumeFromHand`), right hand height → pitch (`pitchFromHandY`) against the selected key (`keyHz`). Simpler signal path than Gesture mode — no chord stabilizer, straight into `SynthEngine`.
