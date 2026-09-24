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
]

export function getListicle(slug: string): Listicle | undefined {
  return LISTICLES.find((l) => l.slug === slug)
}
