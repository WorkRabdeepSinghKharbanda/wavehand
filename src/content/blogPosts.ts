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
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
