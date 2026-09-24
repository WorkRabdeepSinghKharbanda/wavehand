import { beforeEach, describe, expect, it } from "vitest"
import { loadKeyHz, saveKeyHz } from "./keyPref"

describe("keyPref", () => {
  beforeEach(() => localStorage.clear())

  it("returns null when nothing is saved yet", () => {
    expect(loadKeyHz()).toBeNull()
  })

  it("round-trips a saved key", () => {
    saveKeyHz(293.66)
    expect(loadKeyHz()).toBe(293.66)
  })

  it("ignores corrupt stored values", () => {
    localStorage.setItem("wavehand-key-hz", "not-a-number")
    expect(loadKeyHz()).toBeNull()
  })

  it("ignores a non-positive stored value", () => {
    localStorage.setItem("wavehand-key-hz", "-1")
    expect(loadKeyHz()).toBeNull()
  })
})
