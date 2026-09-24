import { beforeEach, describe, expect, it } from "vitest"
import { getCompletedCount, getCompletedSections, markSectionComplete } from "./practiceProgress"

describe("practiceProgress", () => {
  beforeEach(() => localStorage.clear())

  it("starts empty for an unseen song", () => {
    expect(getCompletedSections("song-a")).toEqual([])
    expect(getCompletedCount("song-a")).toBe(0)
  })

  it("records a completed section", () => {
    markSectionComplete("song-a", 0)
    expect(getCompletedSections("song-a")).toEqual([0])
    expect(getCompletedCount("song-a")).toBe(1)
  })

  it("dedupes repeated completions of the same section", () => {
    markSectionComplete("song-a", 2)
    markSectionComplete("song-a", 2)
    expect(getCompletedSections("song-a")).toEqual([2])
  })

  it("keeps completed sections sorted regardless of completion order", () => {
    markSectionComplete("song-a", 3)
    markSectionComplete("song-a", 1)
    markSectionComplete("song-a", 2)
    expect(getCompletedSections("song-a")).toEqual([1, 2, 3])
  })

  it("keeps progress isolated per song", () => {
    markSectionComplete("song-a", 0)
    markSectionComplete("song-b", 5)
    expect(getCompletedSections("song-a")).toEqual([0])
    expect(getCompletedSections("song-b")).toEqual([5])
  })

  it("ignores a corrupt stored value", () => {
    localStorage.setItem("wavehand-practice-progress", "{not json")
    expect(getCompletedSections("song-a")).toEqual([])
  })
})
