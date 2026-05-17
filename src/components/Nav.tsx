import { getNavigation } from '@/lib/getGlobals'
import NavClient from './NavClient'

// Fallback nav used when the global hasn't been seeded yet
const FALLBACK_NAV = [
  { label: 'Solutions & Use Cases', link: '/services', children: [] },
  {
    label: 'Industry',
    link: '/industries/healthcare',
    children: [
      { label: 'Healthcare', link: '/industries/healthcare' },
      { label: 'Financial Services', link: '/industries/financial-services' },
      { label: 'Legal', link: '/industries/legal' },
      { label: 'Insurance', link: '/industries/insurance' },
      { label: 'Oil & Gas', link: '/industries/oil-gas' },
    ],
  },
  { label: 'Blog', link: '/blog', children: [] },
  { label: 'Resources', link: '/blog', children: [] },
  { label: 'Pricing', link: '/contact', children: [] },
]

const FALLBACK_CTA = { label: 'Get Started', link: '/contact', variant: 'primary' as const }

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
