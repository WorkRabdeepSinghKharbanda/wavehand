const KEY = "wavehand-practice-progress"

type ProgressMap = Record<string, number[]>

function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== "object") return {}
    const out: ProgressMap = {}
    for (const [songId, sections] of Object.entries(parsed as Record<string, unknown>)) {
      if (Array.isArray(sections)) {
        out[songId] = sections.filter((n): n is number => typeof n === "number")
      }
    }
    return out
  } catch {
    return {}
  }
}

function saveProgress(map: ProgressMap) {
  try {
    localStorage.setItem(KEY, JSON.stringify(map))
  } catch {
    /* ignore quota / private mode */
  }
}

export function getCompletedSections(songId: string): number[] {
  return loadProgress()[songId] ?? []
}

export function getCompletedCount(songId: string): number {
  return getCompletedSections(songId).length
}

/** Marks a Learn-mode section as finished (matched or skipped through to the end). */
export function markSectionComplete(songId: string, sectionIdx: number): number[] {
  const map = loadProgress()
  const existing = map[songId] ?? []
  const next = existing.includes(sectionIdx) ? existing : [...existing, sectionIdx].sort((a, b) => a - b)
  map[songId] = next
  saveProgress(map)
  return next
}
