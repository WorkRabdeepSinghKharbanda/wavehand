import { beforeEach, describe, expect, it } from "vitest"
import {
  DEFAULT_GESTURE_SETTINGS,
  loadGestureSettings,
  normalizeChordCase,
  saveGestureSettings,
  VOICE_GAIN,
  VOICE_OPTIONS,
} from "./gestureSettings"

describe("gestureSettings", () => {
  beforeEach(() => localStorage.clear())

  it("falls back to defaults (voice: sawtooth) when nothing is saved", () => {
    expect(loadGestureSettings()).toEqual(DEFAULT_GESTURE_SETTINGS)
  })

  it("round-trips a saved voice choice", () => {
    saveGestureSettings({ ...DEFAULT_GESTURE_SETTINGS, voice: "square" })
    expect(loadGestureSettings().voice).toBe("square")
  })

  it("falls back to sawtooth for an unknown/corrupt voice value", () => {
    localStorage.setItem(
      "wavehand-gesture-settings",
      JSON.stringify({ ...DEFAULT_GESTURE_SETTINGS, voice: "bagpipes" }),
    )
    expect(loadGestureSettings().voice).toBe("sawtooth")
  })

  it("falls back to defaults entirely on corrupt JSON", () => {
    localStorage.setItem("wavehand-gesture-settings", "{not json")
    expect(loadGestureSettings()).toEqual(DEFAULT_GESTURE_SETTINGS)
  })

  it("has a gain entry for every voice option (no silent voice)", () => {
    for (const { value } of VOICE_OPTIONS) {
      expect(VOICE_GAIN[value]).toBeGreaterThan(0)
    }
  })
})

describe("normalizeChordCase", () => {
  it("uppercases for major mode", () => {
    expect(normalizeChordCase("iv", true)).toBe("IV")
  })

  it("lowercases for minor mode", () => {
    expect(normalizeChordCase("IV", false)).toBe("iv")
  })
})
