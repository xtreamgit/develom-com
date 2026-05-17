import { getNavigation, getHeaderWidgetData } from '@/lib/getGlobals'
import { relativeTime } from '@/lib/relativeTime'
import NavClient from './NavClient'

const FALLBACK_NAV = [
  { label: 'Solutions', link: '/services', children: [] },
  { label: 'Use Cases', link: '/contact', children: [] },
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
    nav = null
  }

  const widgetData = await getHeaderWidgetData()

  const lastUpdatedText = widgetData?.lastContentUpdate
    ? `Updated ${relativeTime(widgetData.lastContentUpdate)}.`
    : null

  const latestModelText =
    widgetData?.latestAIModel?.releasedAt && widgetData.latestAIModel.name
      ? `New model ${relativeTime(widgetData.latestAIModel.releasedAt)} — ${widgetData.latestAIModel.name}.`
      : null

  const mainNav = nav?.mainNav && nav.mainNav.length > 0 ? nav.mainNav : FALLBACK_NAV
  const ctaButton = nav?.ctaButton ?? FALLBACK_CTA

  return (
    <NavClient
      mainNav={mainNav as Parameters<typeof NavClient>[0]['mainNav']}
      ctaButton={ctaButton}
      lastUpdatedText={lastUpdatedText}
      latestModelText={latestModelText}
    />
  )
}
