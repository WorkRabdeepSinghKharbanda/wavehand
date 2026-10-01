# Keyword index

Source: Google Autocomplete (`suggestqueries.google.com`), fetched 2026-10-02. No paid keyword tool connected this session (Semrush/Ahrefs unauthenticated) — these are **demand signals** (what people actually type), not search volume or difficulty numbers. Raw data: `keywords.json` in this folder.

## Notable finding

The seed **"hand gesture synth"** returns suggestions like "hand gesture synth vercel", "hand gesture synth website", "hand gesture synth app", "hand gesture synth tutorial", "hand gesture synth chords" — i.e. real autocomplete demand already associates this exact kind of tool with the project's **old pre-rename name** ("Gesture Synth"), not "WaveHand". This is a real brand-continuity risk: anyone searching by the old name won't find "WaveHand" by name recognition alone. Mitigation already in place: the guide/About copy and `llms.txt` mention what the instrument *does* (hand-tracking chords/theremin), not just the brand name, so topic-based search isn't entirely dependent on the "WaveHand" string. Worth knowing, not something to silently "fix" by name-dropping the old brand (that's a different product's former identity, not ours to reuse for SEO).

## Page → keyword mapping

| Page | Primary keyword (real demand) | Long-tails pulled from autocomplete | Intent |
|---|---|---|---|
| `/guides/play-chords-with-your-hands` | "gesture controlled instrument" | motion controlled instrument, gesture controlled musical instrument, how gesture control works | Informational — "what is this and how does it work" |
| `/blog/how-mediapipe-reads-your-hands` | "hand tracking music" | hand tracking music software, hand tracking music app, hand recognition music | Informational/technical |
| `/blog/theremin-reinvented-for-a-webcam` | "virtual theremin" / "theremin app" | virtual theremin online, virtual theremin camera, theremin app free, best theremin app, can you make a theremin, how to make a theremin | Informational + "best/free app" |
| `/best/ways-to-practice-chords` | "best way to practice chords" | best way to learn chords, best way to practice chord changes, best way to learn chords by ear | "Best way to" — strong listicle fit |
| `/best/ways-to-learn-a-song-faster` | "how to learn chords fast" | how to learn chords faster, how to learn to switch chords fast, how to learn guitar chords quickly | "How to X fast" — strong listicle fit |
| New post (below) | "chord practice app" | chord training app, chord change practice app, chord progression practice app | "App" / tool-seeking — directly names what WaveHand is |
| New post (below) | "browser loop pedal" | browser loop station, can you use a loop pedal with a keyboard | Niche but directly matches the loop-pedal feature |

## New posts chosen from this data

1. **"Is There a Chord Practice App That Doesn't Need an Instrument?"** — targets "chord practice app" / "chord training app" / "chord change practice app" cluster (real, repeated demand across the top-10 autocomplete results for this seed). Honest answer: yes, your hands are the instrument.
2. **"Can You Use a Loop Pedal Without Buying One?"** — targets "browser loop pedal" / "can you use a loop pedal with a keyboard" — real people are asking whether a loop pedal requires dedicated hardware; WaveHand's answer is a genuine, honest "no."

(Kept to 2 new posts, not the originally-suggested 4-6 — given the session's actual priority is rewriting the 24 existing thin pieces to real depth, which does more for the live "currently not indexed" problem than adding more thin new posts would.)
