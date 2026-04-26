import { getNavigation } from '@/lib/getGlobals'
import NavClient from './NavClient'

// Fallback nav used when the global hasn't been seeded yet
const FALLBACK_NAV = [
  { label: 'Services', link: '/services', children: [] },
  { label: 'Portfolio', link: '/portfolio', children: [] },
  { label: 'About', link: '/about', children: [] },
  { label: 'Blog', link: '/blog', children: [] },
  { label: 'Contact', link: '/contact', children: [] },
]

const FALLBACK_CTA = { label: 'Book a Discovery Call', link: '/contact', variant: 'primary' as const }

export default async function Nav() {
  let nav
  try {
    nav = await getNavigation()
  } catch {
    // Global not yet seeded — use fallback so the site still renders
    nav = null
  }

  const mainNav = nav?.mainNav && nav.mainNav.length > 0 ? nav.mainNav : FALLBACK_NAV
  const ctaButton = nav?.ctaButton ?? FALLBACK_CTA

  return <NavClient mainNav={mainNav as Parameters<typeof NavClient>[0]['mainNav']} ctaButton={ctaButton} />
}
