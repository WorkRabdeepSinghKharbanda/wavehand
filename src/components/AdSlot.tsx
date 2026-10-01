import { useEffect } from "react"
import styles from "./AdSlot.module.css"

const AD_CLIENT = "ca-pub-5852027898822024"

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

type Props = {
  /** Real AdSense ad-unit slot ID, created in your AdSense dashboard. Until you have one, this renders a reserved, same-height placeholder instead of a fake/broken ad. */
  slot?: string
}

/** Content pages only — never inside the instrument itself. Fixed height either way, so a real ad filling in later never shifts layout. */
export function AdSlot({ slot }: Props) {
  useEffect(() => {
    if (!slot) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      /* AdSense script blocked (adblock, offline) — nothing else to do */
    }
  }, [slot])

  if (!slot) {
    return (
      <div className={styles.placeholder} aria-hidden="true">
        Ad space reserved
      </div>
    )
  }

  return (
    <ins
      className={`adsbygoogle ${styles.slot}`}
      style={{ display: "block" }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
