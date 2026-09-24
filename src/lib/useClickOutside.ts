import { useEffect, type RefObject } from "react"

/** Closes a popover when the user clicks/taps outside `ref`, only while `active`. */
export function useClickOutside(ref: RefObject<HTMLElement | null>, active: boolean, onOutside: () => void) {
  useEffect(() => {
    if (!active) return
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) onOutside()
    }
    window.addEventListener("pointerdown", onPointer)
    return () => window.removeEventListener("pointerdown", onPointer)
  }, [active, ref, onOutside])
}
