import type { BlogPost } from "./contentTypes"

// Adding a post? Also add its URL to public/sitemap.xml and public/llms.txt in the same change.

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-mediapipe-reads-your-hands",
    title: "How MediaPipe Turns Your Camera Into a Chord Controller",
    description:
      "A look at the actual signals WaveHand reads off your hands — finger position, wrist tilt, and thumb angle — and how they turn into chords.",
    date: "2026-08-01",
    body: [
      "WaveHand doesn't track your whole hand as one blob. It uses MediaPipe's hand landmark model, which returns 21 individual points per hand — fingertips, knuckles, the wrist — every frame, as normalized coordinates in the camera image.",
      "Whether a finger is \"raised\" is decided with a simple comparison: if a fingertip landmark sits higher in the frame than the knuckle just below it, that finger counts as up. Do that for four fingers and you get a raised-finger count from zero to four, which is what drives chord degree on the left hand and voicing on the right.",
      "Thumb detection works differently, because a thumb doesn't fold the same way the other fingers do. Instead of comparing height, WaveHand compares the thumb tip's horizontal position to the joint below it, and flips the comparison depending on which hand it is — a thumb extending outward on a left hand moves the opposite direction from a thumb extending outward on a right hand.",
      "Wrist tilt — the signal that switches between major and minor, or sweeps the filter — comes from comparing the wrist landmark's position to landmarks further up the hand. A hand held flat reads close to zero; tilt it and that value moves smoothly toward -1 or 1.",
      "None of these readings are perfectly stable frame to frame — a slight hand tremor or a momentarily occluded finger can flicker the raw signal. WaveHand runs every reading through a small stabilizer before it's allowed to change the sound: a candidate chord has to stay the same for a short window before it \"commits,\" and if your hand briefly leaves frame, the last committed chord holds for a short grace period instead of cutting out instantly. That's what makes chords feel like they click into place rather than glitching every time your hand moves slightly.",
    ],
  },
  {
    slug: "theremin-reinvented-for-a-webcam",
    title: "The Theremin, Reinvented for a Webcam",
    description:
      "The theremin was the first instrument you play without touching it. WaveHand's Theremin mode is a modern take on the same idea.",
    date: "2026-08-08",
    body: [
      "The theremin is one of the oldest electronic instruments still played today, invented by Leon Theremin in the 1920s. It's played without any physical contact at all — two antennas sense the position of the player's hands, one controlling pitch and the other controlling volume, and moving your hands through open air changes the sound in real time.",
      "WaveHand's Theremin mode follows the same two-hand split, just replacing radio antennas with a webcam. Your left hand controls volume by its height in the frame — raise it and the sound comes up, lower it and it fades. Your right hand controls pitch the same way, mapped against the key you've selected, so moving your hand up and down glides smoothly between notes instead of jumping between fixed steps.",
      "That gliding, continuous pitch is the whole appeal of a real theremin, and it's also the hardest thing to reproduce from a screen — there are no frets, no keys, nothing to land on. You're tuning by ear, the same way a theremin player has always had to.",
      "It's also the simplest signal path in WaveHand. Gesture mode runs finger counts and wrist tilt through a chord stabilizer before anything plays; Theremin mode skips all of that and sends your hand position straight to the oscillator, because a theremin is supposed to be a little unstable under your hands. That's not a bug to smooth out — it's the instrument.",
    ],
  },
  {
    slug: "why-wavehand-has-a-loop-pedal",
    title: "Why WaveHand Has a 4-Track Loop Pedal",
    description:
      "WaveHand isn't just a hands-free instrument — it's also a 4-track looper built entirely in the browser. Here's why, and how it works.",
    date: "2026-08-15",
    body: [
      "Playing chords with your hands is fun on its own, but it's more fun over a beat. WaveHand's loop pedal lets you record up to four tracks — each one capturing exactly what you played, hand gesture and all — and play them back while you keep performing live on top.",
      "Recording works step by step. Every beat is split into four sub-steps, and while a track is recording, WaveHand captures a full snapshot of what you're doing at each step: the notes, the volume, the filter tone, and whether you were in Gesture or Theremin mode. When playback starts, it doesn't just replay raw audio — it re-renders your recorded steps through an offline audio pipeline, which is what lets consecutive steps with the same chord blend into one sustained tone instead of sounding like a stutter of separate notes.",
      "Getting loops to survive in a browser tab is its own small trick. Browsers routinely throttle or suspend audio in tabs that lose focus, which would normally kill a loop the moment you switched apps to check something. WaveHand works around this with a silent, muted audio element wired to a constant audio stream in the background — it doesn't add anything to what you hear, but it gives the browser a reason to treat the tab as \"playing media\" and keep the audio engine alive.",
      "Four tracks, each mutable and soloable on their own, is enough to build a real arrangement — a chord progression on one track, a bassline on another, and Theremin mode free over the top live. It turns a hands-free instrument into something closer to a one-person band.",
    ],
  },
  {
    slug: "how-learn-mode-knows-you-got-it-right",
    title: "How Learn Mode Knows You Actually Got the Chord Right",
    description:
      "Learn mode doesn't just play a chart on a timer — it checks your hands against a target and only moves on when you're actually right.",
    date: "2026-08-22",
    body: [
      "A chord chart that just scrolls by on a metronome doesn't teach you anything — you can wave your hands at roughly the right time and never learn the actual shape. WaveHand's Learn mode works differently: every step has a target (a degree, a major/minor world, a quality, and an octave), and your live hand position is compared against that target on every frame, not just checked once.",
      "A match only counts once all four parts line up: the correct chord degree, the correct major/minor world, the correct quality, and the correct octave (whether your thumb is extended for the octave-down voicing). Getting three out of four right doesn't advance the chart — it just doesn't count as wrong either, it simply waits.",
      "Even a full match doesn't advance instantly. You have to hold the correct shape for a short window (350ms) before the chart moves on. That tiny hold time is deliberate — without it, a hand passing briefly through the right shape on its way to a different one would falsely trigger an advance, which taught nothing.",
      "This wasn't the original design. An earlier version played audio for whatever chord you happened to be holding and advanced the chart on the beat, metronome-first. That meant beginners heard wrong notes before they ever found the right shape, and could progress through a whole song without ever forming a single correct chord. The fix inverted the whole priority: audio and progress are both gated on correctness now, and the metronome only starts after your first correct chord, not before.",
    ],
  },
  {
    slug: "community-songs-two-file-formats",
    title: "Why Community Songs Come in Two Different File Formats",
    description:
      "WaveHand reads two different arrangement formats from its community song library — here's why, and how it decides which one it's looking at.",
    date: "2026-08-29",
    body: [
      "Community arrangements are stored as JSON, but not all of them are shaped the same way. Older arrangements use a simpler v1 format built around fixed `steps` — a flat sequence of notes with no fine timing beyond a step index. A newer v2 format is MIDI-based instead: each note has its own `start` time and `duration` in beats, which supports syncopation and sustained notes that the old step format couldn't represent.",
      "Rather than pick one and break the other, WaveHand's arrangement loader checks a `version` field on the incoming JSON and normalizes either shape into the format the practice engine actually needs. A v1 song and a v2 song end up driving Learn mode identically from the app's point of view — the format difference is invisible once it's loaded.",
      "This matters because the community library keeps growing older arrangements alongside newly authored ones, including songs imported directly from a separate Learn-song builder tool that only speaks the newer MIDI-based format. Rather than force a one-time migration of every existing arrangement, WaveHand just keeps reading both.",
      "It's a small design choice, but it's the difference between a community library that can only add new content in one fixed shape forever, and one that can evolve its own storage format without silently breaking everything published before the change.",
    ],
  },
  {
    slug: "why-your-hand-shake-doesnt-glitch-the-chord",
    title: "Why a Shaky Hand Doesn't Glitch the Chord",
    description:
      "Raw hand-tracking data is noisy frame to frame. Here's the small stabilizer that keeps WaveHand's chords steady without making them feel sluggish.",
    date: "2026-09-05",
    body: [
      "Hand landmark tracking is remarkably accurate, but it isn't perfectly stable — a slight tremor, a finger that momentarily crosses another, or a frame where the camera briefly loses a fingertip can all flip a raw reading for a single frame, even while your hand hasn't actually moved.",
      "If WaveHand played audio directly off that raw per-frame reading, chords would flicker and stutter constantly. Instead, every candidate chord has to stay identical across a short hold window (100 milliseconds) before it's allowed to actually \"commit\" and become the sound you hear. A one-frame blip that doesn't repeat never gets the chance to commit.",
      "The trickier case is your hand briefly leaving the frame entirely — reaching for something, adjusting position, or just drifting out of camera view for a moment. Cutting the sound dead the instant tracking is lost would make the instrument feel fragile. Instead, WaveHand holds the last committed chord for a short grace period (50 milliseconds) after tracking drops, so a brief loss of tracking doesn't interrupt the note at all — only a tracking loss that actually persists does.",
      "Both numbers are intentionally small. Too short, and noisy frames still glitch through; too long, and the instrument feels laggy, arriving late on every chord change. The current values are tuned to disappear entirely when you're playing normally — you should never consciously notice the stabilizer is there, only that the instrument doesn't stutter.",
    ],
  },
  {
    slug: "settings-for-when-gesture-controls-feel-like-a-lot",
    title: "Settings for When Full Gesture Control Feels Like a Lot",
    description:
      "WaveHand's default controls use both hands for everything at once. The Settings sheet lets you turn parts of that off.",
    date: "2026-09-12",
    body: [
      "By default, WaveHand asks a lot of both hands simultaneously: your left hand picks a chord degree and tilts to switch major/minor, while your right hand's finger count picks a voicing and its own tilt sweeps a filter. That's expressive once it's familiar, but it's also four independent gestures running at once, which is a lot to track while you're still learning any one of them.",
      "The Settings sheet lets you fix two of those four dimensions to a constant value instead of controlling them live. `Fixed mode` locks major or minor so your left-hand wrist tilt stops doing anything — you're left with just picking a degree. `Fixed quality` does the same for the right hand's voicing, so finger count on that hand stops mattering and you always get the same triad or inversion.",
      "This isn't a simplified version of the instrument, and it isn't hidden away as an \"easy mode\" — it's the same gesture engine underneath, just with two of its four inputs held constant. You can fix one dimension and leave the other live, isolating exactly the one skill you're trying to build at a time.",
      "It also matters for anyone who finds a specific gesture physically difficult to hold — wrist tilt in particular assumes a certain range of motion that isn't universal. Fixing that dimension to a constant value means it's no longer required to play at all, without changing anything else about how the instrument sounds.",
    ],
  },
  {
    slug: "choosing-wavehands-four-synth-voices",
    title: "Choosing WaveHand's Four Synth Voices",
    description:
      "Every chord in WaveHand used to sound the same. Here's why we added four oscillator voices, and the loudness problem that came with it.",
    date: "2026-09-19",
    body: [
      "For a long time, every chord in WaveHand played through the same waveform: a sawtooth oscillator, chosen for being bright and easy to hear even from a laptop's built-in speakers. It worked, but it meant nobody could change the one thing that shapes an instrument's whole personality — its actual tone.",
      "The voice picker adds three more raw oscillator waveforms alongside that original sawtooth: a soft sine wave, a mellow triangle wave, and a harsher square wave for an 8-bit character. All four are native Web Audio oscillator types, so switching voices is instant — no samples to load, no new audio files to fetch.",
      "The four waveforms are not equally loud at the same gain setting, though — sine and triangle waves are physically quieter than sawtooth and square waves at identical amplitude, since they carry fewer harmonics. Picking Soft or Mellow without correcting for that would make the instrument noticeably quieter than picking Bright or 8-bit, for no reason a player would understand.",
      "So each voice carries its own gain compensation, applied both to live playback and to loops recorded with that voice, boosting the quieter waveforms and pulling back the louder ones slightly. A loop recorded on one voice keeps that voice's sound (and its correct volume) even after you switch to a different one live — the voice is stored per recorded step, not as a single global setting applied at playback time.",
    ],
  },
  {
    slug: "the-camera-bug-that-took-two-tries-to-fix",
    title: "The Camera Bug That Took Two Tries to Fix",
    description:
      "A real engineering story: how a camera-startup bug survived a first fix, and what the actual root cause turned out to be.",
    date: "2026-09-26",
    body: [
      "React's Strict Mode deliberately runs certain effects twice in development, specifically to catch code that isn't safe to run more than once. WaveHand's camera-starting effect is exactly that kind of code — it requests a webcam stream, waits for a video element to be ready, and loads a hand-tracking model — and it did not survive that double-invoke cleanly at first.",
      "The original fix reached for the obvious guard: a boolean flag that remembered whether the camera had already started, so a second invocation would just do nothing. That stopped the double-`getUserMedia` call, but it introduced a subtler bug — the same guard silently blocked legitimate remounts too, and the cleanup logic only stopped a camera stream it could find already attached to the video element. If a stream was acquired but the video element hadn't been attached to it yet when the component unmounted, that stream leaked, and the camera's hardware light stayed on with nothing actually using it.",
      "A boolean \"already started\" guard is exactly the wrong tool here, because it survives across separate effect invocations by design — which is precisely what breaks a legitimate remount. The actual fix replaces it with a `cancelled` flag scoped to a single effect run, checked immediately after every `await` in the startup sequence, so a torn-down effect can't keep mutating state after the fact. The acquired camera stream is also tracked in a plain local variable independent of whether it ever reached the video element, so cleanup can always find and stop it.",
      "The lesson generalized past this one bug: any code that opens a long-lived resource inside a React effect needs to check a local cancellation flag after every asynchronous step, not guard itself with a flag that persists across invocations. That rule is now documented directly in this codebase's own engineering notes, specifically so the same class of bug doesn't get reintroduced by a future change to this exact file.",
    ],
  },
  {
    slug: "making-a-camera-app-load-faster",
    title: "Making a Camera App Load Faster, Measured Not Guessed",
    description:
      "Two real, measured performance fixes to WaveHand's load time — found with an actual Lighthouse audit, not assumptions.",
    date: "2026-10-03",
    body: [
      "It's easy to guess at performance problems. It's more useful to run an actual audit and fix what it actually finds. A real Lighthouse run against WaveHand's production site turned up two concrete, fixable bottlenecks — not assumptions about what \"might\" be slow.",
      "The first was font loading. WaveHand's custom fonts were loaded through a CSS `@import`, which nests the font request inside the stylesheet's own fetch: the browser has to download the CSS, parse the `@import`, then fetch the font provider's own CSS, then finally fetch the font files themselves — a four-step chain before any custom-font text can render. Moving that to direct `<link rel=\"preconnect\">` and `<link rel=\"stylesheet\">` tags in the page's own head lets the browser start that chain in parallel with the rest of the page load instead of nested inside it.",
      "The second was the hand-tracking library itself. WaveHand's MediaPipe dependency was bundled directly into the same JavaScript file as everything else, meaning every visitor downloaded and parsed the entire hand-tracking engine before the page could finish loading, even though it isn't needed until the camera actually starts. Switching that one import to load dynamically, instead of eagerly at the top of the file, moved roughly 135KB into its own separate chunk that loads in parallel rather than blocking the initial page.",
      "Neither fix changed what the instrument does — camera and audio still start exactly the same way, at exactly the same moment. They just changed when and how the browser fetches the code and assets needed to do it, which is usually where the real, measurable wins are hiding.",
    ],
  },
  {
    slug: "sharing-a-camera-app-without-sharing-your-camera",
    title: "Sharing a Camera App Without Sharing Your Camera",
    description:
      "WaveHand's share feature generates a branded image instead of a screenshot of you — here's why that was the only real option.",
    date: "2026-10-10",
    body: [
      "The obvious way to let someone share \"look what I'm playing\" is to capture whatever is on screen at that moment and hand it to the native share sheet. For most apps, that's fine. For a camera app, it means the most convenient share button would also be the one most likely to accidentally publish a frame of someone's actual live camera feed, without a separate, explicit decision to do that.",
      "WaveHand's share feature deliberately doesn't do that. Instead, clicking Share generates a fresh branded card entirely on a hidden canvas — the app name, its real tagline, and its URL, styled with the same colors and fonts as the rest of the site — and shares that instead. It's the same image for every single person who shares, on purpose. No camera frame, no personal data, nothing that varies by who's using it.",
      "That card is drawn fresh every time someone clicks Share, not pre-rendered once and reused, so it always reflects the current branding without needing a separate asset pipeline to keep an image file in sync with the site.",
      "Where the native Web Share API is available (mainly mobile browsers), sharing hands that generated image plus text straight to the OS share sheet — the same one used for photos, links, or any other native share. Where it isn't available, which is most desktop browsers today, the share button simply doesn't offer that path at all, falling back to a plain \"copy text\" action instead. A broken or fake-looking fallback would have been worse than no fallback.",
    ],
  },
  {
    slug: "two-ways-to-record-what-you-played",
    title: "Two Different Ways to Record What You Played",
    description:
      "WaveHand actually has two separate recording systems that do very different jobs — here's the distinction and why both exist.",
    date: "2026-10-17",
    body: [
      "It's easy to assume an instrument only needs one \"record\" button, but WaveHand actually has two separate recording systems, and they solve different problems. The loop pedal records into discrete, editable steps on one of four tracks — it's built for building an arrangement you can loop, mute, solo, and play back while performing live on top of it.",
      "The global recorder does something completely different: it captures the actual mixed audio output as it happens — whatever is really coming out of the speakers, live gesture playing and any looped tracks together — and turns that into a downloadable audio file at the end. It has no concept of steps, tracks, or chords; it's a straightforward recording of what a listener would have actually heard.",
      "The loop pedal is for building; the global recorder is for capturing the result. You can build a whole arrangement on the loop pedal, improvise something new live on top of it, and only the global recorder actually preserves that final, combined performance as something you can keep and share afterward — the loop pedal's own tracks are for playing with, not for exporting.",
      "Keeping these as two separate systems, rather than one recorder trying to do both jobs, means each one can stay simple at what it actually does: one thinks entirely in musical steps, the other thinks entirely in raw audio.",
    ],
  },
  {
    slug: "reading-music-theory-through-your-hands",
    title: "Reading Music Theory Through Your Hands",
    description:
      "Roman numeral chords, inversions, and 7ths aren't just music-theory vocabulary in WaveHand — they're literally what your right hand's fingers are choosing.",
    date: "2026-10-24",
    body: [
      "Roman numeral chord names (I, ii, iii, IV, V…) describe a chord's position in a key without tying it to one specific key — the same \"IV\" means a different actual chord in C major than it does in G major, but it plays the same functional role in both. WaveHand's left hand picks exactly this: a scale degree, not a fixed note, so the same finger count produces the right chord regardless of which key you've selected.",
      "The right hand adds a second layer on top of that: quality. One finger up gives you a plain triad — just the three core notes of the chord. More fingers step through a first inversion (the same three notes, reordered so a different one sits on the bottom), then a 7th chord, adding a fourth note that changes the chord's color without changing its underlying identity.",
      "Major and minor keys don't share the exact same quality options, because they don't function the same way musically — a dominant 7th chord (the tense, \"wants to resolve\" sound) is a major-key quality, while a diminished 7th (unstable in a different way) is its minor-key counterpart at the same finger count. WaveHand's quality labels change depending on which world — major or minor — your left hand's wrist tilt currently has you in.",
      "None of this requires knowing the theory behind it to play — the gesture mapping works the same whether or not you know what an inversion is. But if you do know some theory, WaveHand's hand mapping is a fairly direct translation of it: degree, quality, and inversion are the exact three things your hands are independently choosing on every chord.",
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
