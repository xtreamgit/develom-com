// temp: one-time API key enable for user id=1 (delete after use)
import { NextRequest, NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

const TOKEN = 'apikey-en1-p7x3m9k2'
const TARGET_USER_ID = 1

export async function POST(req: NextRequest) {
  if (req.nextUrl.searchParams.get('tok') !== TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  const result = await payload.update({
    collection: 'users',
    id: TARGET_USER_ID,
    data: { enableAPIKey: true },
    overrideAccess: true,
  })

  return NextResponse.json({ apiKey: result.apiKey })
}
