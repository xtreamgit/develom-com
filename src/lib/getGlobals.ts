import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getNavigation() {
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({ slug: 'navigation' })
}

export async function getSiteSettings() {
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({ slug: 'site-settings' })
}

// Victor's widget global — slug/fields confirmed when his patch lands
export async function getHeaderWidgetData(): Promise<{
  lastContentUpdate?: string | null
  latestAIModel?: { name: string; releasedAt: string } | null
} | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    // TODO: update slug to match Victor's global name
    const data = await payload.findGlobal({ slug: 'site-widgets' as any })
    return data as any
  } catch {
    return null
  }
}

// Victor's ComplianceDeadlines collection — slug/fields confirmed when his patch lands
export async function getComplianceDeadlines(): Promise<
  Array<{ title: string; dueDate: string; industry: string; regulatoryBody: string }>
> {
  try {
    const payload = await getPayload({ config: configPromise })
    // TODO: update collection slug to match Victor's name
    const result = await payload.find({
      collection: 'compliance-deadlines' as any,
      sort: 'dueDate',
      limit: 20,
    })
    return result.docs as any
  } catch {
    return []
  }
}
