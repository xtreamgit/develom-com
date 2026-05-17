import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

/** Given a base date and recurrence type, return the next upcoming occurrence from today */
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
    while (candidate < today) {
      candidate.setMonth(candidate.getMonth() + 3)
    }
    return candidate
  }

  return baseDate
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const vertical = searchParams.get('vertical')

  const payload = await getPayload({ config: configPromise })

  const where: Record<string, unknown> = {}
  if (vertical) where.vertical = { equals: vertical }

  let docs: any[] = []
  try {
    const result = await payload.find({
      collection: 'compliance-deadlines',
      where: Object.keys(where).length ? where : undefined,
      limit: 200,
      depth: 0,
      overrideAccess: true,
    })
    docs = result.docs
  } catch (err) {
    console.error('[compliance-deadlines] query error', err)
    return NextResponse.json({ error: 'Failed to fetch deadlines' }, { status: 500 })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const deadlines = docs.map((doc) => {
    const base = new Date(doc.dueDate)
    const effectiveDate =
      doc.recurring && doc.recurrenceType
        ? nextOccurrence(base, doc.recurrenceType)
        : base

    const daysUntil = Math.ceil((effectiveDate.getTime() - today.getTime()) / 86_400_000)

    return {
      id: doc.id,
      requirement: doc.requirement,
      vertical: doc.vertical,
      regulatoryBody: doc.regulatoryBody,
      notes: doc.notes ?? null,
      dueDate: effectiveDate.toISOString().split('T')[0],
      daysUntil,
      recurring: Boolean(doc.recurring),
      recurrenceType: doc.recurrenceType ?? null,
    }
  })

  deadlines.sort((a, b) => a.daysUntil - b.daysUntil)

  return NextResponse.json(
    { deadlines, count: deadlines.length },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
      },
    },
  )
}
