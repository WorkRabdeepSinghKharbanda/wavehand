import { SITE_TAGLINE, SITE_URL } from "./siteMeta"

const CARD_WIDTH = 1200
const CARD_HEIGHT = 630

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ")
  let line = ""
  let lineY = y
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, lineY)
      line = word
      lineY += lineHeight
    } else {
      line = test
    }
  }
  if (line) ctx.fillText(line, x, lineY)
}

/** Draws a branded share card — never the user's own camera feed (no consent for that). */
export async function generateShareCardBlob(): Promise<Blob | null> {
  // Custom fonts may not have finished loading yet even though the <link> tags are in index.html.
  try {
    await document.fonts.ready
  } catch {
    /* canvas falls back to a system font if this isn't supported — still readable */
  }

  const canvas = document.createElement("canvas")
  canvas.width = CARD_WIDTH
  canvas.height = CARD_HEIGHT
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  const bg = ctx.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT)
  bg.addColorStop(0, "#0b1014")
  bg.addColorStop(1, "#121a22")
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT)

  ctx.fillStyle = "rgba(61, 255, 224, 0.12)"
  ctx.beginPath()
  ctx.arc(CARD_WIDTH - 160, 140, 260, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = "#3dffe0"
  ctx.font = "800 100px Syne, sans-serif"
  ctx.fillText("WaveHand", 80, 260)

  ctx.fillStyle = "#e8f4f8"
  ctx.font = "500 34px Outfit, sans-serif"
  wrapText(ctx, SITE_TAGLINE, 80, 330, CARD_WIDTH - 400, 46)

  ctx.fillStyle = "rgba(232, 244, 248, 0.62)"
  ctx.font = "600 28px Outfit, sans-serif"
  ctx.fillText(SITE_URL.replace("https://", ""), 80, CARD_HEIGHT - 60)

  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png"))
}

export function getShareText(): string {
  return `${SITE_TAGLINE} ${SITE_URL}`
}
