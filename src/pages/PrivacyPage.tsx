import { GITHUB_REPO } from "../lib/siteLinks"
import { useSeo } from "../lib/useSeo"
import { Breadcrumbs } from "./Breadcrumbs"
import { ContentLayout } from "./ContentLayout"
import prose from "./ContentProse.module.css"

const LAST_UPDATED = "2026-10-01"

export function PrivacyPage() {
  useSeo({
    title: "Privacy Policy — WaveHand",
    description: "What WaveHand actually does with your camera, cookies, and any data it touches.",
    path: "/privacy",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Privacy Policy", path: "/privacy" },
    ],
  })

  return (
    <ContentLayout>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }]} />
      <p className={prose.kicker}>Privacy Policy</p>
      <h1 className={prose.title}>Privacy Policy</h1>
      <p className={prose.meta}>Last updated {LAST_UPDATED}</p>

      <section className={prose.section}>
        <h2 className={prose.sectionHeading}>Your camera</h2>
        <p className={prose.paragraph}>
          WaveHand asks for webcam access to run its hand-tracking instrument. That video is
          processed entirely on your own device, in your browser, using a local hand-tracking
          model (MediaPipe) — it is never uploaded, recorded, or sent to any server. WaveHand has
          no code path that stores or transmits camera frames anywhere.
        </p>
      </section>

      <section className={prose.section}>
        <h2 className={prose.sectionHeading}>Your microphone</h2>
        <p className={prose.paragraph}>
          WaveHand never requests microphone access. All audio you hear is generated locally by
          your browser's own Web Audio engine — nothing about your voice or surroundings is ever
          read.
        </p>
      </section>

      <section className={prose.section}>
        <h2 className={prose.sectionHeading}>Accounts</h2>
        <p className={prose.paragraph}>
          No account or sign-up is required to use the instrument. Browsing or searching
          community-shared songs reads public data from a separate, read-only data source — it
          does not require you to log in either.
        </p>
      </section>

      <section className={prose.section}>
        <h2 className={prose.sectionHeading}>Analytics and advertising</h2>
        <p className={prose.paragraph}>
          This site uses Google Analytics (gtag.js) to understand how pages are used, and Google
          AdSense to show ads. Both set cookies in your browser and may use them for measurement
          and ad personalization, under Google's own privacy policies and controls — see{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google's Privacy Policy
          </a>{" "}
          and{" "}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            Ad Settings
          </a>{" "}
          for details and opt-outs. WaveHand itself does not build an advertising profile of you
          beyond what these third-party services do on its behalf.
        </p>
      </section>

      <section className={prose.section}>
        <h2 className={prose.sectionHeading}>Community song data</h2>
        <p className={prose.paragraph}>
          Looking up community-shared songs reads public arrangement data from a shared Supabase
          project, using a read-only, public anon key — the app has no ability to write, modify,
          or access anything beyond arrangements their authors marked public.
        </p>
      </section>

      <section className={prose.section}>
        <h2 className={prose.sectionHeading}>Changes to this policy</h2>
        <p className={prose.paragraph}>
          If what this site actually does changes — a new analytics tool, a new data source — this
          page will be updated to match, and the date at the top will change.
        </p>
      </section>

      <section className={prose.section}>
        <h2 className={prose.sectionHeading}>Contact</h2>
        <p className={prose.paragraph}>
          Questions about this policy can be raised directly on the project's{" "}
          <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
            GitHub repository
          </a>
          .
        </p>
      </section>
    </ContentLayout>
  )
}
