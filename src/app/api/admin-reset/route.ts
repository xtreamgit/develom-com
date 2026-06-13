import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// One-shot admin password reset endpoint.
// Protected by PAYLOAD_SECRET — delete this file after use.
export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization') ?? ''
  const secret = process.env.PAYLOAD_SECRET ?? ''

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  // Find the user
  const result = await payload.find({
    collection: 'users',
    where: { email: { equals: 'hector@develom.com' } },
    limit: 1,
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

  // Clear all sessions for this user by querying the DB directly
  // Payload v3 stores sessions in users_sessions table
  try {
    const db = payload.db as { drizzle?: { execute?: (sql: unknown) => Promise<unknown> }; pool?: { query: (sql: string, params: unknown[]) => Promise<unknown> } }
    if (db.pool) {
      await db.pool.query(
        'DELETE FROM users_sessions WHERE _parent_id = $1',
        [userId],
      )
    }
  } catch {
    // Session clear failed — not fatal, password is already updated
  }

  return NextResponse.json({ ok: true, userId, email: 'hector@develom.com' })
}
