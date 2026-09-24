import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import styles from "./ContentLayout.module.css"

type Props = {
  children: ReactNode
}

/** Shared shell for guide / blog / listicle pages — not one layout per page type. */
export function ContentLayout({ children }: Props) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.back}>
          ← Back to the instrument
        </Link>
        <nav className={styles.nav}>
          <Link to="/guides/play-chords-with-your-hands">Guide</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/best/ways-to-practice-chords">Practice tips</Link>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        WaveHand — play chords and theremin tones with your hands using webcam tracking.{" "}
        <Link to="/">Try it now →</Link>
      </footer>
    </div>
  )
}
