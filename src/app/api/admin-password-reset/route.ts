// temp: one-time admin password reset for user id=1 (delete after use)
import { NextRequest, NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

const TOKEN = 'rst-hd1-k9x3m2p7'
const TARGET_USER_ID = 1

export async function POST(req: NextRequest) {
  if (req.nextUrl.searchParams.get('tok') !== TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })
  const body = await req.json()
  const { newPassword } = body

  if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
    return NextResponse.json(
      { error: 'newPassword required, minimum 8 characters' },
      { status: 400 },
    )
  }

  await payload.update({
    collection: 'users',
    id: TARGET_USER_ID,
    data: { password: newPassword },
    overrideAccess: true,
  })

  return NextResponse.json({ success: true, message: 'Password updated. Delete this route.' })
}
