import type { Guide } from "./contentTypes"

// Adding a guide? Also add its URL to public/sitemap.xml and public/llms.txt in the same change.

export const GUIDES: Guide[] = [
  {
    slug: "play-chords-with-your-hands",
    title: "How to Play Chords With Your Hands: A Complete Guide to WaveHand",
    description:
      "Everything you need to start playing chords with your webcam in WaveHand — how Gesture mode reads your hands, what you need to run it, and how to practice with Learn mode.",
    kicker: "Guide",
    sections: [
      {
        heading: "What a hand-tracking instrument actually is",
        paragraphs: [
          "WaveHand turns your webcam into a chord instrument. There's no MIDI controller, no piano, no strings — just your two hands in front of the camera. A computer-vision model reads the position of your fingers and wrist dozens of times a second, and that reading is translated directly into notes through the browser's audio engine.",
          "This isn't a gimmick layered on top of a normal instrument. The mapping from hand shape to sound is the entire instrument. Once you understand what each hand controls, playing a chord is just holding a shape — the same way pressing piano keys is holding a shape, just without the piano.",
        ],
      },
      {
        heading: "Gesture mode: what your left hand does",
        paragraphs: [
          "Your left hand picks the chord. Raise one to five fingers and you get chords I through V of the current key — one finger is the I chord, five fingers is the V chord. Two specific combinations extend that range: index finger plus pinky gives you the VI chord, and index finger, pinky, and thumb together give you the VII chord.",
          "Tilting your wrist left or right switches between major and minor voicings of whatever chord you're holding. You don't need a second gesture to change quality — the same finger count in a tilted wrist plays the minor version instead.",
        ],
      },
      {
        heading: "Gesture mode: what your right hand does",
        paragraphs: [
          "Your right hand shapes how the chord sounds, not which chord it is. Height above the frame controls volume — raise your hand to play louder, lower it to fade out. Holding up one to four fingers switches between a plain triad, a first inversion, and 7th-chord voicings, giving the same left-hand chord a noticeably different color.",
          "Wrist tilt on the right hand sweeps a filter, brightening or darkening the tone in real time — it's the difference between a sound that cuts through and one that sits back. Extending your thumb outward drops the chord down an octave, useful for basslines or just a heavier feel.",
        ],
      },
      {
        heading: "What you need to run it",
        paragraphs: [
          "A modern browser — Chrome or Edge are recommended. You need a webcam; a microphone is not required, since WaveHand only ever reads video, never audio, from your device. Camera access only works over HTTPS or on localhost — that's a browser security rule, not a WaveHand limitation, and it's why the production site is served over HTTPS.",
          "No install, no account, no download. Open the site, grant camera permission when the browser asks, and you're playing.",
        ],
      },
      {
        heading: "Practicing with Learn mode",
        paragraphs: [
          "Free play is great once you know the shapes, but Learn mode is how you actually learn them. Pick a song from the community library or open a shared link, and WaveHand shows you the next chord shape for both hands, with a live readout of how close your current hand position is to the target.",
          "The chart only advances once you're actually holding the correct shape — degree, mode, quality, and octave all matching — and you have to hold it briefly before it counts. That's deliberate: early versions of Learn mode played audio and advanced the chart on pure timing, but that let people arrive at any random chord and never actually learn the shape they needed. Now nothing advances, and no wrong sound plays, until your hands are actually right.",
        ],
      },
      {
        heading: "Tips for more accurate tracking",
        paragraphs: [
          "Hand tracking reads contrast between your hand and the background, so even, front-facing light works far better than a bright window behind you. Keep both hands fully inside the frame — if a hand partially leaves view mid-chord, WaveHand holds the last stable shape briefly rather than cutting out instantly, but it can't read a hand it can't see.",
          "Distance matters less than you'd expect; what matters is that your fingers are distinguishable from each other in the frame. If chords feel like they're firing inconsistently, that's almost always a lighting or framing issue, not a settings issue.",
        ],
      },
    ],
    faq: [
      {
        q: "What browser works best?",
        a: "Chrome or Edge are recommended. Other modern browsers may work but aren't the primary target.",
      },
      {
        q: "Do I need a microphone?",
        a: "No. WaveHand only requests camera access — it never reads or records audio from your device.",
      },
      {
        q: "Why does it need HTTPS?",
        a: "Browsers only allow camera access (the getUserMedia API) on secure origins — HTTPS or localhost. This is a browser-level security rule that applies to every site requesting a webcam, not something specific to WaveHand.",
      },
      {
        q: "My camera won't start — what's wrong?",
        a: "Check that you actually granted camera permission when the browser prompted, and that no other tab or app currently has the camera open — most browsers only let one page use a camera at a time.",
      },
    ],
  },
]

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug)
}
