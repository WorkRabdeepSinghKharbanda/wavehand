export type GuideSection = {
  heading: string
  paragraphs: string[]
}

export type FaqEntry = {
  q: string
  a: string
}

/** A real screenshot under public/screenshots/ — never a scraped/rehosted internet image. */
export type ContentImage = {
  src: string
  alt: string
}

export type Guide = {
  slug: string
  title: string
  description: string
  kicker: string
  sections: GuideSection[]
  faq: FaqEntry[]
  image?: ContentImage
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  /** Structured sections (real H2 headings) instead of a flat paragraph list — needed for both SEO and readability at full length. */
  sections: GuideSection[]
  faq: FaqEntry[]
  image?: ContentImage
}

export type ListicleItem = {
  title: string
  description: string
}

export type Listicle = {
  slug: string
  title: string
  description: string
  /** Intro paragraphs before the list — context on who this is for and why. */
  intro: string[]
  items: ListicleItem[]
  faq: FaqEntry[]
  image?: ContentImage
}
