import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const secret = process.env.SOCIAL_POLL_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Poll endpoint not configured' }, { status: 503 })
  }
  if (req.headers.get('x-poll-secret') !== secret) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  const payload = await getPayload({ config: configPromise })

  await payload.update({
    collection: 'social-posts',
    id,
    data: { platformNotified: true },
  })

  return NextResponse.json({ ok: true })
}
