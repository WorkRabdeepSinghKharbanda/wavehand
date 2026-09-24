Read before touching code, in order:

1. This file (CLAUDE.md).
2. Everything in `.claude/rules/` (`branching.md`, `brain-sync.md`, any others).
3. `.claude/brain/feature/000-index.md` — full instrument-feature inventory.
4. `.claude/brain/route/000-index.md` — the real URL routes (content pages), separate from the instrument's internal features.
5. Only then start the task.

This is a personal solo project. No org/team code-review process applies — direct commits to `main` (the actual default branch — not `master`), no PR workflow, intentional.

# What this is

WaveHand — a browser-based hand-tracking instrument. Webcam + MediaPipe hand landmarks drive Web Audio in real time, with a 4-track loop pedal, and a guided "Learn a song" practice mode fed by community arrangements from a separate community song-sharing site (not this domain) that this app deep-links into via `?a=<uuid>`.

Everything runs client-side. No backend of its own — Supabase is used read-only (anon key) for community song data.

Live at **https://wavehand.vercel.app** (a fresh Vercel project under the developer's own account — see `.claude/rules/branching.md` for why this is deliberately unrelated to the `git remote` this was cloned from).

# Architecture

`src/App.tsx` (~800 lines) is the orchestrator for the instrument itself, mounted at `/`: it owns all top-level state (audio on/off, instrument mode, loop state, practice state, HUD/settings) and wires the hooks/engines below into one render tree. Internally it's still state-driven, not routed — "feature" in `.claude/brain/feature/` means a functional module switched by state, not a URL.

As of the blog/guide/landing-page addition, the app as a whole DOES have real react-router routing (`src/main.tsx`) for a handful of SEO content pages (`/guides/:slug`, `/blog`, `/blog/:slug`, `/best/:slug`) that live entirely outside `App.tsx`, under `src/pages/`, driven by data in `src/content/`. Those are genuine URL routes — see `.claude/brain/route/000-index.md`, not `brain/feature/`.

```
src/
  vision/useHandTracking.ts   MediaPipe HandLandmarker — camera lifecycle, landmark extraction, RAF loop
  music/gestures.ts           Landmarks → finger counts / wrist tilt / thumb extended (raw gesture primitives)
  music/chords.ts             Roman numeral + quality → actual note frequencies
  music/gestureSettings.ts    User-remappable hand-control bindings (persisted)
  music/scale.ts, keyHz.ts    Key/scale math
  audio/SynthEngine.ts        Web Audio synth voice — oscillators, filter, volume
  audio/LoopEngine.ts         4-track step-sequencer/looper state machine (idle/countIn/recording)
  components/                 UI: Hud, BeatGrid, LoopControls, SongPicker, Tutorial, StartGate, GlobalRecorder, ScaleGuide
  components/practice/        Learn mode overlay + hand-shape matching
  lib/supabase.ts             Supabase client (anon key only, no service role, ever)
  lib/fetchArrangement.ts     Reads public `arrangements` rows, normalizes v1 (steps) / v2 (MIDI notes) formats
  lib/arrangementAdapter.ts   Arrangement row → PracticeSong shape
  lib/practiceMatch.ts        Live gesture vs. practice target comparison
  lib/useSeo.ts                Per-route title/meta/canonical/OG/JSON-LD (content pages only; App.tsx also calls it for "/")
  lib/siteMeta.ts               SITE_URL — single source of truth for the real deployed domain
  pages/                       Content pages (guide/blog/listicle/404), routed outside App.tsx — see brain/route/
  content/                     Data-driven guide/blog/listicle arrays consumed by pages/
```

Control flow, Gesture mode (the default path): `useHandTracking` → raw landmarks in `handsRef` → `music/gestures.ts` extracts finger/wrist signals every RAF tick in `App.tsx` → chord stabilizer smooths noisy per-frame reads → `music/chords.ts` turns the stabilized chord into frequencies → `SynthEngine.playNotes`. If a loop track is recording, the same per-frame output is also pushed into `LoopEngine` as a `LoopFrame`. If Learn/Practice is open, the live gesture is additionally compared against the current target (`practiceMatch`) and gates whether audio actually plays.

# Third-party dependencies — real limitations

- **`@mediapipe/tasks-vision`** — loads a WASM hand landmarker over the network on first camera start (`FilesetResolver.forVisionTasks`). No landmarks arrive until that resolves; UI must show a `loading` status distinct from `requesting` (permission) and `ready`. Landmark coordinates are normalized [0,1] relative to the video frame, not pixels — mixing them with pixel math without conversion silently breaks hand-shape logic.
- **`@supabase/supabase-js`** — configured with `persistSession: false, autoRefreshToken: false` (`lib/supabase.ts`) because this app only ever reads public rows with the anon key; there's no user auth here. Only `is_public = true` arrangements are readable — RLS enforces this server-side, don't rely on client-side filtering for anything sensitive.
- **`getUserMedia`** — requires HTTPS or `localhost`. Local dev uses `@vitejs/plugin-basic-ssl` (see `vite.config.ts`) specifically so LAN/phone testing works off `localhost`.
- **React 19 + StrictMode** (`src/main.tsx`) — effects double-invoke in dev. Anything that opens a camera stream or starts an async pipeline in a `useEffect` must be idempotent/cancelable — see the rule below.

# Rule that bit us once

**Camera wouldn't (re)start correctly under StrictMode's double-invoke, and a stale stream could survive an unmount.** (`src/vision/useHandTracking.ts`, commit `b06a9d0`)

What happened: the original effect used a `startedRef` boolean guard to stop a second `getUserMedia` call from firing on StrictMode's dev double-invoke. That guard also silently no-ops'd on legitimate remounts, and cleanup only stopped tracks it found on `video.srcObject` — if the video element hadn't been attached yet when unmount/cleanup ran, the just-acquired `MediaStream` leaked and kept the camera light on.

Fix: drop the `startedRef` guard entirely; instead thread a local `cancelled` flag through the async chain and check it after every await (`getUserMedia`, `video.play()`, `FilesetResolver`, `HandLandmarker.createFromOptions`) so a canceled effect tears down cleanly instead of continuing to mutate state after unmount. Track the acquired stream in a plain local (`activeStream`), not just `video.srcObject`, so cleanup can always find and stop it even if the video element attach path didn't run.

Why it matters: any future change to `useHandTracking` (or a similar pattern anywhere else that opens a device stream / long-lived async resource in an effect) must follow the same shape — local `cancelled` flag checked after every await, resource tracked in a ref/local independent of DOM state, no boolean "already started" guards that survive across effect invocations. A "just add a guard flag" fix here is the wrong instinct and is what caused this bug the first time.

**Learn mode played audio for wrong gestures and advanced the chart without a correct match.** (`src/App.tsx`, `src/components/practice/PracticeOverlay.tsx`, commit `fe4ec95`)

What happened: practice mode played whatever chord the player's hands made, regardless of whether it matched the target on screen, and the practice metronome defaulted to on immediately — so beginners heard sound (and the wrong sound) before ever forming a correct chord, and the chart advanced on the beat rather than on correctness.

Fix: `practiceTargetRef` holds the current `GestureTarget`; the live gesture is only allowed to sound if `!practice || !target || isFullMatch(compareLive(stable, target))`. `practiceMetroOn` now defaults `false` and only starts after `practiceFirstNote` (the learner's first correct chord).

Why it matters: any practice/scoring feature must gate feedback (audio, chart advance, scoring) on an explicit correctness check against the live-compared target — never on transport time or raw gesture output alone. If you add a new kind of practice challenge, route it through `practiceMatch.ts`'s comparison functions rather than reimplementing a match check inline.
