import { useEffect, useRef, useState } from "react"
import { generateShareCardBlob, getShareText } from "../lib/shareCard"
import { SITE_URL } from "../lib/siteMeta"
import styles from "./ShareButton.module.css"

const hasWebShare = typeof navigator !== "undefined" && typeof navigator.share === "function"

export function ShareButton() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener("pointerdown", onPointer)
    return () => window.removeEventListener("pointerdown", onPointer)
  }, [open])

  async function handleShare() {
    const text = getShareText()
    try {
      const blob = await generateShareCardBlob()
      if (blob) {
        const file = new File([blob], "wavehand.png", { type: "image/png" })
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file], title: "WaveHand", text, url: SITE_URL })
          setOpen(false)
          return
        }
      }
      await navigator.share({ title: "WaveHand", text, url: SITE_URL })
      setOpen(false)
    } catch (e) {
      // AbortError = user dismissed the native share sheet, not a failure worth surfacing.
      if (e instanceof Error && e.name !== "AbortError") setOpen(false)
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(getShareText())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked (permissions / insecure context) — nothing else sensible to do */
    }
  }

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-label="Share WaveHand"
        onClick={() => setOpen((p) => !p)}
      >
        Share
      </button>
      {open && (
        <div className={styles.popover} role="menu">
          {hasWebShare && (
            <button type="button" className={styles.item} role="menuitem" onClick={handleShare}>
              Share…
            </button>
          )}
          <button type="button" className={styles.item} role="menuitem" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy text"}
          </button>
        </div>
      )}
      <span className="visually-hidden" aria-live="polite">
        {copied ? "Share text copied to clipboard" : ""}
      </span>
    </div>
  )
}
