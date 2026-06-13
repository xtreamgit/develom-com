import { getNavigation } from '@/lib/getGlobals'
import NavClient from './NavClient'

const FALLBACK_NAV = [
  { label: 'Solutions', link: '/solutions', children: [] },
  { label: 'Use Cases', link: '/use-cases', children: [] },
  {
    label: 'Industries',
    link: '/industries',
    children: [
      { label: 'Oil & Gas', link: '/industries/oil-gas' },
      { label: 'Healthcare', link: '/industries/healthcare' },
      { label: 'Financial Services', link: '/industries/financial-services' },
      { label: 'Legal', link: '/industries/legal' },
      { label: 'Insurance', link: '/industries/insurance' },
    ],
  },
  {
    label: 'Resources',
    link: '/resources',
    children: [
      { label: 'AI Governance Guide', link: '/resources/ai-governance-guide' },
      { label: 'Agentic AI Tools', link: '/resources/agentic-ai-tools' },
    ],
  },
  { label: 'Blog', link: '/blog', children: [] },
]

// Children that should always appear for specific nav labels, regardless of DB state.
// This ensures dropdown items are visible even when the Payload global hasn't been updated.
const REQUIRED_CHILDREN: Record<string, Array<{ label: string; link: string }>> = {
  Resources: [
    { label: 'AI Governance Guide', link: '/resources/ai-governance-guide' },
    { label: 'Agentic AI Tools', link: '/resources/agentic-ai-tools' },
  ],
}

const FALLBACK_CTA = { label: 'Get Started', link: '/contact', variant: 'primary' as const }

export default async function Nav() {
  let nav
  try {
    nav = await getNavigation()
  } catch {
    nav = null
  }

  let mainNav = nav?.mainNav && nav.mainNav.length > 0 ? nav.mainNav : FALLBACK_NAV

  // Backfill required children for any nav item where the DB record has none
  mainNav = (mainNav as Array<{ label: string; link: string; children?: unknown[] }>).map((item) => {
    const required = REQUIRED_CHILDREN[item.label]
    if (required && (!item.children || item.children.length === 0)) {
      return { ...item, children: required }
    }
    return item
  })

  const ctaButton = nav?.ctaButton ?? FALLBACK_CTA

  return (
    <NavClient
      mainNav={mainNav as Parameters<typeof NavClient>[0]['mainNav']}
      ctaButton={ctaButton}
    />
  )
}
