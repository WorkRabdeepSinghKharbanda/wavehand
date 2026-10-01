import type { Guide } from "./contentTypes"

// Adding a guide? sitemap.xml is generated automatically (scripts/generate-sitemap.mjs) —
// just add its URL to public/llms.txt in the same change.

export const GUIDES: Guide[] = [
  {
    slug: "play-chords-with-your-hands",
    title: "How to Play Chords With Your Hands: A Complete Guide to WaveHand",
    description:
      "Everything you need to start playing chords with your webcam in WaveHand — how Gesture mode reads your hands, what gesture control actually is, what you need to run it, and how to practice with Learn mode.",
    kicker: "Guide",
    image: {
      src: "/screenshots/wavehand-chord-wheel-hud.png",
      alt: "WaveHand's Gesture mode HUD showing the scale-note wheel with finger counts for each chord degree",
    },
    sections: [
      {
        heading: "What a hand-tracking instrument actually is",
        paragraphs: [
          "WaveHand turns your webcam into a chord instrument. There's no MIDI controller, no piano, no strings — just your two hands in front of the camera. A computer-vision model reads the position of your fingers and wrist dozens of times a second, and that reading is translated directly into notes through the browser's audio engine.",
          "This isn't a gimmick layered on top of a normal instrument. The mapping from hand shape to sound is the entire instrument. Once you understand what each hand controls, playing a chord is just holding a shape — the same way pressing piano keys is holding a shape, just without the piano.",
          "If you've searched for a \"gesture controlled instrument\" or wondered how gesture control actually works in practice, this is the short answer: a camera reads landmark points on your hand (fingertips, knuckles, wrist), a small set of rules turns those points into a small number of discrete signals (how many fingers are raised, which way the wrist is tilted, whether the thumb is out), and those signals drive the exact same kind of synthesizer logic a MIDI keyboard would drive. There's no deep learning model guessing what chord you \"meant\" — it's a deterministic mapping, the same hand shape always produces the same chord in a given key.",
        ],
      },
      {
        heading: "Gesture mode: what your left hand does",
        paragraphs: [
          "Your left hand picks the chord. Raise one to five fingers and you get chords I through V of the current key — one finger is the I chord, five fingers is the V chord. Two specific combinations extend that range: index finger plus pinky gives you the VI chord, and index finger, pinky, and thumb together give you the VII chord.",
          "Tilting your wrist left or right switches between major and minor voicings of whatever chord you're holding. You don't need a second gesture to change quality — the same finger count in a tilted wrist plays the minor version instead.",
          "If you already know some music theory, this will look familiar: I through VII are the seven scale degrees of whatever key you've selected, and the major/minor split is exactly the difference between, say, the I chord and the vi chord in a major scale. WaveHand doesn't require you to know this to play it, but if you do, the gesture mapping is a fairly literal translation of scale-degree chord theory into hand positions.",
        ],
      },
      {
        heading: "Gesture mode: what your right hand does",
        paragraphs: [
          "Your right hand shapes how the chord sounds, not which chord it is. Height above the frame controls volume — raise your hand to play louder, lower it to fade out. Holding up one to four fingers switches between a plain triad, a first inversion, and 7th-chord voicings, giving the same left-hand chord a noticeably different color.",
          "Wrist tilt on the right hand sweeps a filter, brightening or darkening the tone in real time — it's the difference between a sound that cuts through and one that sits back. Extending your thumb outward drops the chord down an octave, useful for basslines or just a heavier feel.",
          "Put together, your two hands are independently controlling four things at once: which chord (left hand finger count), major or minor (left hand tilt), voicing (right hand finger count), and tone plus octave (right hand tilt and thumb). That's a lot to track at first — see the settings section below if you want to simplify it while you're still learning the shapes.",
        ],
      },
      {
        heading: "Theremin mode: the simpler alternative",
        paragraphs: [
          "WaveHand has a second instrument mode that trades chords for continuous pitch control, modeled on the classic theremin — the original touchless instrument, played without ever touching it. Your left hand controls volume by height, your right hand controls pitch the same way, gliding smoothly between notes instead of jumping between fixed steps.",
          "Theremin mode is worth trying even if chords are your main interest, because it's a genuinely different skill: there's no finger count to get right, no quality to pick, just two continuous dimensions you're tuning by ear. It's also a good way to test whether your camera and lighting are working well, since any tracking hiccup shows up immediately as a pitch wobble.",
        ],
      },
      {
        heading: "What you need to run it",
        paragraphs: [
          "A modern browser — Chrome or Edge are recommended. You need a webcam; a microphone is not required, since WaveHand only ever reads video, never audio, from your device. Camera access only works over HTTPS or on localhost — that's a browser security rule, not a WaveHand limitation, and it's why the production site is served over HTTPS.",
          "No install, no account, no download. Open the site, grant camera permission when the browser asks, and you're playing. If you've used a \"chord practice app\" before that required downloading something or creating an account first, this is the opposite of that by design — the entire point of running it in a browser is that there's nothing to install.",
        ],
      },
      {
        heading: "Practicing with Learn mode",
        paragraphs: [
          "Free play is great once you know the shapes, but Learn mode is how you actually learn them. Pick a song from the community library or open a shared link, and WaveHand shows you the next chord shape for both hands, with a live readout of how close your current hand position is to the target.",
          "The chart only advances once you're actually holding the correct shape — degree, mode, quality, and octave all matching — and you have to hold it briefly before it counts. That's deliberate: early versions of Learn mode played audio and advanced the chart on pure timing, but that let people arrive at any random chord and never actually learn the shape they needed. Now nothing advances, and no wrong sound plays, until your hands are actually right.",
          "Your progress through a song's sections is remembered between visits, so you can learn a song over several short sessions instead of needing to finish it in one sitting. See the practice-tips section of this site for a longer list of ways to use Learn mode effectively.",
        ],
      },
      {
        heading: "Customizing controls in Settings",
        paragraphs: [
          "The Settings sheet (reachable from the HUD at any time) lets you change the key, pick one of four synth voices, and — if the full four-gesture control scheme feels like a lot at once — fix either hand's mode to a constant value instead of controlling it live. Fixing the left hand to a constant major or minor removes wrist tilt as something you need to manage; fixing the right hand's quality removes finger-count voicing the same way.",
          "This isn't a simplified version of the instrument hidden behind an \"easy mode\" toggle — it's the exact same gesture engine, just with one or two of its inputs held constant so you can focus on the rest while you're still building the muscle memory.",
        ],
      },
      {
        heading: "Tips for more accurate tracking",
        paragraphs: [
          "Hand tracking reads contrast between your hand and the background, so even, front-facing light works far better than a bright window behind you. Keep both hands fully inside the frame — if a hand partially leaves view mid-chord, WaveHand holds the last stable shape briefly rather than cutting out instantly, but it can't read a hand it can't see.",
          "Distance matters less than you'd expect; what matters is that your fingers are distinguishable from each other in the frame. If chords feel like they're firing inconsistently, that's almost always a lighting or framing issue, not a settings issue.",
          "A browser-based camera instrument like this one only ever sees what the camera sees — there's no hidden calibration step and no way to \"retrain\" the model for your specific hands. If tracking feels consistently off, the fix is almost always in your physical setup (light, framing, background clutter), not in a setting you're missing.",
        ],
      },
      {
        heading: "Looping and recording what you play",
        paragraphs: [
          "Once you can hold chords reliably, WaveHand's loop pedal turns a single pair of hands into an arrangement. Turn on the sequencer in Settings, set a tempo and bar count, and record a chord progression onto one of four tracks. The loop plays back while you keep performing, so you can play a melody in Theremin mode over your own chords, or add a bassline on a second track. Each track can be muted or soloed live.",
          "Because the looper records steps rather than audio, a loop is editable afterward: open the beat grid to fix a wrong chord, toggle a step, or paint a chord across a bar. When you want to keep a result, the separate global recorder captures everything you hear — loops and live playing together — as a downloadable audio file. The loop pedal is for building; the global recorder is for keeping.",
        ],
      },
      {
        heading: "A first week with WaveHand",
        paragraphs: [
          "Day one: fix both hands in Settings (left to major, right to triad) and learn the seven left-hand degree shapes in free play with the HUD open. Don't worry about sound or speed; aim to hit any degree on demand. Day two: keep the settings, open Learn mode, and work through one song's first section. Let the chart wait for you; notice which component the chips say is wrong.",
          "Day three: unfix the left hand and practice deliberate major/minor tilts on a single degree until the flip is intentional every time. Day four: unfix the right hand and explore voicings — play the same progression with one finger, then three, and listen to the difference. Day five: try Theremin mode for ten minutes as ear training, then go back to Gesture mode and notice whether chord changes sound clearer.",
          "By the weekend, turn on the sequencer, record the progression you've been practicing as a loop, and play over it. That's the whole instrument in use. Everything after that is repertoire and taste.",
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
      {
        q: "Do I need to know music theory to play it?",
        a: "No. The gesture-to-chord mapping works whether or not you know what a scale degree or an inversion is — it's just a hand shape to learn. Knowing theory makes the mapping easier to predict, but it isn't required.",
      },
      {
        q: "Can I use WaveHand on a phone?",
        a: "The instrument needs a front-facing camera and enough screen space to see both hands clearly, which works better on a laptop or desktop than a phone held in one hand. It isn't blocked on mobile, but it isn't the primary way it's designed to be used either.",
      },
      {
        q: "Is this the same as a MIDI controller?",
        a: "Conceptually, yes — a MIDI controller maps a physical input (keys, pads, knobs) to musical events the same way WaveHand maps hand shapes to chords. The difference is the input device: here it's your own hands and a webcam, not dedicated hardware.",
      },
    ],
  },
]

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug)
}
