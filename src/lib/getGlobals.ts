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

export async function getHeaderWidgetData(): Promise<{
  lastContentUpdate: string | null
  latestAIModel: { name: string; releasedAt: string; mainFeature: string | null } | null
} | null> {
  try {
    const payload = await getPayload({ config: configPromise })

    const [{ docs: posts }, { docs: models }] = await Promise.all([
      payload.find({
        collection: 'blog-posts',
        overrideAccess: true,
        where: { _status: { equals: 'published' } },
        sort: '-date',
        limit: 1,
        depth: 0,
      }),
      payload.find({
        collection: 'latest-models',
        overrideAccess: true,
        sort: '-releaseDate',
        limit: 1,
        depth: 0,
      }),
    ])

    const post = posts[0] ?? null
    const model = models[0] ?? null

    return {
      lastContentUpdate: (post?.date as string | null) ?? null,
      latestAIModel: model
        ? {
            name: `${model.modelName as string}${model.version ? ` ${model.version}` : ''}`,
            releasedAt: model.releaseDate as string,
            mainFeature: (model.mainFeature as string | null) ?? null,
          }
        : null,
    }
  } catch {
    return null
  }
}

function nextOccurrence(baseDate: Date, recurrenceType: string): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (recurrenceType === 'annual') {
    const candidate = new Date(today.getFullYear(), baseDate.getMonth(), baseDate.getDate())
    if (candidate < today) candidate.setFullYear(candidate.getFullYear() + 1)
    return candidate
  }
  if (recurrenceType === 'quarterly') {
    const candidate = new Date(baseDate)
    while (candidate < today) candidate.setMonth(candidate.getMonth() + 3)
    return candidate
  }
  return baseDate
}

export async function getComplianceDeadlines(): Promise<
  Array<{ requirement: string; dueDate: string; vertical: string; regulatoryBody: string }>
> {
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'compliance-deadlines',
      overrideAccess: true,
      limit: 200,
      depth: 0,
    })
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return (docs as any[])
      .map((doc) => {
        const base = new Date(doc.dueDate)
        const effectiveDate =
          doc.recurring && doc.recurrenceType ? nextOccurrence(base, doc.recurrenceType) : base
        const daysUntil = Math.ceil((effectiveDate.getTime() - today.getTime()) / 86_400_000)
        return {
          requirement: doc.requirement as string,
          vertical: doc.vertical as string,
          regulatoryBody: doc.regulatoryBody as string,
          dueDate: effectiveDate.toISOString().split('T')[0],
          daysUntil,
        }
      })
      .filter((d) => d.daysUntil >= 0)
      .sort((a, b) => a.daysUntil - b.daysUntil)
  } catch {
    return []
  }
}
