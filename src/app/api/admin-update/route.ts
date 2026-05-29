import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const secret = req.headers.get('x-admin-secret')
  if (!secret || secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id, data } = await req.json()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.update({
    collection: 'latest-models',
    id,
    data,
    overrideAccess: true,
  })
  return NextResponse.json({ doc: result })
}
