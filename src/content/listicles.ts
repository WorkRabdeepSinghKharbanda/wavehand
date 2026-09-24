import type { Listicle } from "./contentTypes"

// Adding a listicle? Also add its URL to public/sitemap.xml and public/llms.txt in the same change.

export const LISTICLES: Listicle[] = [
  {
    slug: "ways-to-practice-chords",
    title: "5 Ways to Practice Chords in WaveHand",
    description:
      "WaveHand isn't just one mode — here are five real ways to build chord skills with it, from free play to guided practice.",
    items: [
      {
        title: "Free play in Gesture mode",
        description:
          "The fastest way to get a feel for the chord shapes. No song, no chart — just hold shapes with your left hand and listen to how the right hand's volume, quality, and tone controls change the sound.",
      },
      {
        title: "Ear training in Theremin mode",
        description:
          "Theremin mode has no fixed steps to land on, so it's genuine ear training — you tune pitch by hearing it, the same skill a real theremin or fretless instrument demands.",
      },
      {
        title: "Guided practice with Learn mode",
        description:
          "Load a song from the community library and Learn mode shows you the next chord shape for both hands, only advancing once you're actually holding it correctly — not just on the beat.",
      },
      {
        title: "Looping your own progressions",
        description:
          "Record a chord progression into the loop pedal, let it play back, and practice switching chords cleanly on top of your own loop instead of a static backing track.",
      },
      {
        title: "Simplifying controls in Settings",
        description:
          "If tilt-based mode switching or finger-count quality feels like too much at once, the Settings sheet lets you fix mode or quality to a constant value — useful for isolating one skill at a time, or for anyone who finds the full gesture set physically difficult.",
      },
    ],
  },
  {
    slug: "hand-gestures-to-know",
    title: "6 Hand Gestures Every WaveHand Player Should Know",
    description:
      "The full real gesture vocabulary Gesture mode reads — what each hand shape actually does, straight from the app's control mapping.",
    items: [
      {
        title: "Left hand: 1–5 raised fingers",
        description: "Selects chord degrees I through V of the current key — the core of what you're playing.",
      },
      {
        title: "Left hand: index + pinky",
        description: "A specific two-finger shape that reaches the VI chord, outside the plain 1–5 finger count range.",
      },
      {
        title: "Left hand: index + pinky + thumb",
        description: "Adds the thumb to the same shape to reach the VII chord, completing the full scale degree range.",
      },
      {
        title: "Left hand: wrist tilt",
        description: "Switches the current chord between its major and minor voicing, without changing which degree you're playing.",
      },
      {
        title: "Right hand: height",
        description: "Controls volume continuously — raise your hand to play louder, lower it to fade toward silence.",
      },
      {
        title: "Right hand: finger count + thumb",
        description: "1–4 fingers step through triad, inversion, and 7th-chord voicings; extending the thumb drops the chord an octave.",
      },
    ],
  },
  {
    slug: "ways-to-customize-your-sound",
    title: "5 Ways to Customize Your Sound in WaveHand",
    description:
      "WaveHand's tone isn't fixed — here are the real, working ways to change how it sounds, all built into the app today.",
    items: [
      {
        title: "Pick a synth voice",
        description: "Choose between Bright (sawtooth), Soft (sine), Mellow (triangle), and 8-bit (square) in Settings — four real oscillator waveforms, not presets layered on one sound.",
      },
      {
        title: "Sweep the filter live",
        description: "Right-hand wrist tilt sweeps a live filter in Gesture mode, brightening or darkening the tone as you play, no menu required.",
      },
      {
        title: "Change key",
        description: "The key selector shifts every chord's actual pitch — your chosen key is remembered across visits, so you don't reset it every session.",
      },
      {
        title: "Drop an octave with your thumb",
        description: "Extending your right thumb transposes the current chord down an octave live, for a heavier or bass-focused sound.",
      },
      {
        title: "Choose quality and inversion",
        description: "Right-hand finger count doesn't just add notes — it steps through genuinely different voicings (triad, inversion, 7th) that change a chord's whole character.",
      },
    ],
  },
  {
    slug: "ways-to-loop-and-record",
    title: "4 Ways to Loop and Record in WaveHand",
    description:
      "WaveHand's looping and recording tools, and what each one is actually for.",
    items: [
      {
        title: "Record a track on the loop pedal",
        description: "Capture what you play, gesture and all, onto one of four tracks, step by step, synced to the beat grid.",
      },
      {
        title: "Mute and solo tracks live",
        description: "Each of the four loop tracks can be muted or soloed independently while playing, letting you build and strip back an arrangement on the fly.",
      },
      {
        title: "Play live over your own loop",
        description: "Loop playback continues in the background while you keep performing on top — in Gesture or Theremin mode, over your own recorded progression.",
      },
      {
        title: "Export the full mix",
        description: "The global recorder captures the actual combined audio output — your loops and live playing together — as a real, downloadable audio file.",
      },
    ],
  },
  {
    slug: "tips-for-better-hand-tracking",
    title: "6 Tips for Better Hand Tracking",
    description:
      "Practical, real tips for getting more consistent gesture detection out of WaveHand's webcam tracking.",
    items: [
      {
        title: "Use even, front-facing light",
        description: "Hand tracking reads contrast between your hand and the background — a bright window behind you works against it far more than a lamp in front of you.",
      },
      {
        title: "Keep both hands fully in frame",
        description: "A hand that's partially cropped out of the camera view is far harder to track reliably than one that's simply a bit small in the frame.",
      },
      {
        title: "Use Chrome or Edge",
        description: "These are the recommended browsers for WaveHand's camera and audio APIs — other browsers may work less reliably.",
      },
      {
        title: "Don't worry about exact distance",
        description: "What matters most is that your fingers are visually distinguishable from each other, not your exact distance from the camera.",
      },
      {
        title: "Give it a moment after a hand leaves frame",
        description: "A brief tracking loss holds the last chord for a short grace period rather than cutting out instantly — a flicker isn't a bug.",
      },
      {
        title: "Check for competing camera use",
        description: "Most browsers only allow one tab or app to use the camera at a time — another app holding it open will block WaveHand from starting.",
      },
    ],
  },
  {
    slug: "settings-if-gestures-feel-overwhelming",
    title: "5 Settings to Try if Gesture Controls Feel Overwhelming",
    description:
      "Real, working settings in WaveHand for simplifying the default four-gesture control scheme.",
    items: [
      {
        title: "Fix the mode to major or minor",
        description: "Turns off left-hand wrist tilt as a control, so you're only choosing a chord degree, not degree and mode at once.",
      },
      {
        title: "Fix the quality",
        description: "Turns off right-hand finger count as a voicing control, so every chord plays the same fixed triad or inversion.",
      },
      {
        title: "Start in Theremin mode",
        description: "Only two simple, continuous controls (volume and pitch) instead of Gesture mode's four independent inputs.",
      },
      {
        title: "Turn off the sequencer",
        description: "The loop pedal and beat grid stay hidden by default until you explicitly turn them on in Settings — one less thing on screen while you're learning.",
      },
      {
        title: "Replay the tutorial",
        description: "The first-visit walkthrough is always available again from Help, in case you want a refresher on what each hand actually does.",
      },
    ],
  },
  {
    slug: "things-you-need-before-you-start",
    title: "4 Things You Need Before You Start Playing WaveHand",
    description:
      "The real, minimal requirements to run WaveHand — nothing more than this is actually needed.",
    items: [
      {
        title: "Chrome or Edge",
        description: "The recommended browsers for WaveHand's camera and Web Audio APIs.",
      },
      {
        title: "A webcam",
        description: "Required for all hand tracking — WaveHand never requests microphone access, only camera.",
      },
      {
        title: "HTTPS or localhost",
        description: "Browsers only allow camera access on a secure origin — this is a browser rule that applies to any site requesting a webcam, not something specific to WaveHand.",
      },
      {
        title: "Nothing else",
        description: "No install, no account, and no download — open the site, grant camera permission, and start playing.",
      },
    ],
  },
  {
    slug: "ways-to-learn-a-song-faster",
    title: "5 Ways to Learn a Song Faster in WaveHand",
    description:
      "Real features inside Learn mode that make picking up a new song faster, not just a chord chart on a timer.",
    items: [
      {
        title: "Let the chart wait for you",
        description: "Learn mode only advances once your hands actually match the target — degree, mode, quality, and octave — so you're never rushed past a shape you haven't found yet.",
      },
      {
        title: "Use the practice metronome",
        description: "It waits until your first correct chord before it starts, so you're never keeping time before you've actually found the first note.",
      },
      {
        title: "Repeat a section",
        description: "Jump back to the start of the current section instead of restarting the whole song when one part needs more reps.",
      },
      {
        title: "Skip a chord you're stuck on",
        description: "Move past a single difficult chord without losing your place in the rest of the chart.",
      },
      {
        title: "Come back later — your progress is saved",
        description: "Completed sections are remembered per song across visits, so a song you've partly learned shows that progress next time you open it.",
      },
    ],
  },
  {
    slug: "instruments-that-inspired-wavehand",
    title: "6 Real Instruments That Inspired WaveHand's Two Modes",
    description:
      "WaveHand's two modes both descend from real instrument traditions — here's the actual lineage.",
    items: [
      {
        title: "The theremin (1920s)",
        description: "Invented by Leon Theremin, the original touchless instrument — two antennas read hand position in open air to control pitch and volume, the direct ancestor of WaveHand's Theremin mode.",
      },
      {
        title: "The keyboard and its scale degrees",
        description: "The Roman-numeral chord system Gesture mode's left hand uses (I–VII) comes straight from centuries of keyboard and functional harmony theory.",
      },
      {
        title: "The chord organ",
        description: "Chord-button instruments that play a full triad from one hand shape, rather than individual notes, share the same core idea as Gesture mode's left hand.",
      },
      {
        title: "The synthesizer filter sweep",
        description: "Sweeping a low-pass filter with a physical knob is a classic analog-synth technique — Gesture mode's right-hand wrist tilt does the same thing with a hand instead of a knob.",
      },
      {
        title: "The loop pedal",
        description: "Guitar and vocal loop pedals — record a phrase, layer live performance on top — are the direct model for WaveHand's own 4-track looper.",
      },
      {
        title: "MIDI itself",
        description: "The idea of separating \"what note\" from \"how it's played\" (velocity, modulation) underlies both MIDI and WaveHand's split between chord degree and voicing/tone controls.",
      },
    ],
  },
  {
    slug: "ways-wavehand-protects-your-privacy",
    title: "5 Ways WaveHand Keeps Your Privacy in Mind",
    description:
      "Real, verifiable choices in how WaveHand handles a webcam-based instrument's biggest inherent privacy question.",
    items: [
      {
        title: "No microphone access, ever",
        description: "WaveHand only ever requests camera permission — it has no code path that requests or uses microphone access.",
      },
      {
        title: "Hand tracking runs on your device",
        description: "The MediaPipe hand-tracking model runs locally in your browser — your camera frames aren't uploaded anywhere to be processed.",
      },
      {
        title: "Sharing never captures your camera",
        description: "The share feature generates a generic branded image from scratch every time, rather than a screenshot of whatever your camera happens to be seeing.",
      },
      {
        title: "No account required to play",
        description: "The instrument itself needs no login or account — only optionally browsing community songs touches a separate, read-only data source.",
      },
      {
        title: "Read-only community data access",
        description: "Community song data is fetched using a public, read-only key with no ability to write or access anything beyond public arrangements.",
      },
    ],
  },
  {
    slug: "ways-to-edit-the-beat-grid-by-hand",
    title: "4 Ways to Edit a Loop by Hand in the Beat Grid",
    description:
      "You don't have to play every step live — the beat grid lets you place, adjust, and paint chords directly, by hand.",
    items: [
      {
        title: "Place a chord on a specific step",
        description: "Click any empty step in the grid to open a chord picker and drop a chord in exactly that spot, without playing it live at all.",
      },
      {
        title: "Toggle a step on or off",
        description: "Turn an existing step on or off directly, for quick edits without re-recording the whole track.",
      },
      {
        title: "Drag to paint the same chord across steps",
        description: "Click and drag across multiple steps to fill them with the same chord in one motion, instead of placing each one individually.",
      },
      {
        title: "Combine hand-placed and live-recorded steps",
        description: "Manually placed steps and steps recorded live from your actual gestures sit on the same track and play back exactly the same way.",
      },
    ],
  },
]

export function getListicle(slug: string): Listicle | undefined {
  return LISTICLES.find((l) => l.slug === slug)
}
