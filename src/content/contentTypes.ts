export type GuideSection = {
  heading: string
  paragraphs: string[]
}

export type FaqEntry = {
  q: string
  a: string
}

export type Guide = {
  slug: string
  title: string
  description: string
  kicker: string
  sections: GuideSection[]
  faq: FaqEntry[]
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  body: string[]
}

export type ListicleItem = {
  title: string
  description: string
}

export type Listicle = {
  slug: string
  title: string
  description: string
  items: ListicleItem[]
}
