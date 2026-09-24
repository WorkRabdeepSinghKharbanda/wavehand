const KEY = "wavehand-key-hz"

/** Last key the user picked by hand (not one a Learn song set temporarily). */
export function loadKeyHz(): number | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw === null) return null
    const hz = Number(raw)
    return Number.isFinite(hz) && hz > 0 ? hz : null
  } catch {
    return null
  }
}

export function saveKeyHz(hz: number) {
  try {
    localStorage.setItem(KEY, String(hz))
  } catch {
    /* ignore quota / private mode */
  }
}
