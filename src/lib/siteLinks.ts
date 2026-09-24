/** Central links for credits, About, and Follow WaveHand. */

export const DEVELOPER = {
  name: "Rabdeep Singh",
  href: "https://github.com/WorkRabdeepSinghKharbanda",
} as const

export const GITHUB_REPO = "https://github.com/Ekmand/wavehand"
export const GITHUB_CONTRIBUTORS = `${GITHUB_REPO}/graphs/contributors`

export const COMMUNITY_HOME = "https://community.wavehand.com"
export const COMMUNITY_BUILDER = `${COMMUNITY_HOME}/builder`

/**
 * Official WaveHand socials — update hrefs when handles change.
 * Entries with empty href are hidden in the UI.
 */
export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/sarry_29/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rabdeep-singh-kharbanda-35616b206/" },
] as const

export function activeSocialLinks() {
  return SOCIAL_LINKS.filter((l) => Boolean(l.href))
}
