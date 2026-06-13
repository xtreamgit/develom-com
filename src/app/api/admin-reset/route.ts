import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// One-shot admin password reset endpoint — delete after use.
const ONE_TIME_TOKEN = 'reset-hector-7f3a2b9c1e4d'

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const tok = searchParams.get('tok') ?? ''
  const auth = req.headers.get('authorization') ?? ''

  if (tok !== ONE_TIME_TOKEN && auth !== `Bearer ${ONE_TIME_TOKEN}`) {
    return NextResponse.json({ error: 'unauthorized', debug: { auth: auth.slice(0,20), tok } }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config })

    // Find the user (depth:0 avoids populating avatar→media join)
    const result = await payload.find({
      collection: 'users',
      where: { email: { equals: 'hector@develom.com' } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    if (!result.docs.length) {
      return NextResponse.json({ error: 'user not found' }, { status: 404 })
    }

    const userId = result.docs[0].id

    // Update password — Payload hashes it automatically
    await payload.update({
      collection: 'users',
      id: userId,
      data: { password: 'Develom2026!' } as Record<string, unknown>,
      overrideAccess: true,
    })

    // Clear sessions
    let sessionNote = 'skipped'
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const db = (payload.db as any)
      if (db.pool?.query) {
        await db.pool.query('DELETE FROM users_sessions WHERE _parent_id = $1', [userId])
        sessionNote = 'cleared'
      } else if (db.drizzle?.execute) {
        await db.drizzle.execute(`DELETE FROM users_sessions WHERE _parent_id = ${userId}`)
        sessionNote = 'cleared-drizzle'
      }
    } catch (e) {
      sessionNote = `failed: ${String(e).slice(0, 100)}`
    }

    return NextResponse.json({ ok: true, userId, email: 'hector@develom.com', sessions: sessionNote })
  } catch (e) {
    return NextResponse.json({ error: 'reset failed', detail: String(e).slice(0, 300) }, { status: 500 })
  }
}
