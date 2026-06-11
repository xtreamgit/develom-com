import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Returns approved posts not yet platform-notified.
// Secured by X-Poll-Secret header to avoid requiring full session auth.
export async function GET(req: NextRequest) {
  const secret = process.env.SOCIAL_POLL_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Poll endpoint not configured' }, { status: 503 })
  }
  if (req.headers.get('x-poll-secret') !== secret) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'social-posts',
    where: {
      and: [
        { status: { equals: 'approved' } },
        { platformNotified: { equals: false } },
      ],
    },
    depth: 0,
    limit: 20,
    sort: '-notifiedAt',
  })

  return NextResponse.json({ posts: result.docs })
}
