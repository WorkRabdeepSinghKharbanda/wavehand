import { activeSocialLinks, DEVELOPER, GITHUB_REPO } from "../lib/siteLinks"
import { useSeo } from "../lib/useSeo"
import { Breadcrumbs } from "./Breadcrumbs"
import { ContentLayout } from "./ContentLayout"
import prose from "./ContentProse.module.css"

export function AboutPage() {
  useSeo({
    title: "About WaveHand",
    description: "Who built WaveHand, what it actually is, and how to reach the developer.",
    path: "/about",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ],
  })

  const socials = activeSocialLinks()

  return (
    <ContentLayout>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <p className={prose.kicker}>About</p>
      <h1 className={prose.title}>About WaveHand</h1>
      <p className={prose.description}>
        A browser-based hand-tracking instrument — play chords and theremin tones with your
        webcam, no install, no account.
      </p>

      <section className={prose.section}>
        <h2 className={prose.sectionHeading}>What it is</h2>
        <p className={prose.paragraph}>
          WaveHand reads your hand position through your webcam using MediaPipe's hand-tracking
          model, running entirely in your browser, and turns that into music through the Web
          Audio API. There's a Gesture mode for playing chords, a Theremin mode for continuous
          pitch control, a 4-track loop pedal, and a guided Learn mode for practicing chord
          progressions from community-shared songs.
        </p>
      </section>

      <section className={prose.section}>
        <h2 className={prose.sectionHeading}>Who built it</h2>
        <p className={prose.paragraph}>
          WaveHand is built and maintained by{" "}
          <a href={DEVELOPER.href} target="_blank" rel="noopener noreferrer">
            {DEVELOPER.name}
          </a>
          . It's a personal project, not a company — there's no team, no funding round, just an
          actual developer building an actual instrument.
        </p>
      </section>

      <section className={prose.section}>
        <h2 className={prose.sectionHeading}>Contact</h2>
        <p className={prose.paragraph}>
          The fastest way to reach the developer, report a bug, or ask a question is on{" "}
          <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          . You can also find links below.
        </p>
        {socials.length > 0 && (
          <ul className={prose.list}>
            {socials.map((s) => (
              <li className={prose.listCard} key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </ContentLayout>
  )
}
