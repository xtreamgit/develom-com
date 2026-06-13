import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { getPayload } from 'payload'
import config from '@payload-config'

// One-shot: accept base64 image, upload as public blob, update media record — delete after use.
const ONE_TIME_TOKEN = 'repub-blob-2e8c4a7d'
const MEDIA_ID = 27

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('tok') !== ONE_TIME_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN ?? ''
    const { b64 } = await req.json() as { b64: string }
    const buf = Buffer.from(b64, 'base64')

    const blob = await put('use-cases/develom-use-cases-hero.png', buf, {
      access: 'public',
      contentType: 'image/png',
      addRandomSuffix: false,
      token,
    })

    const payload = await getPayload({ config })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = (payload.db as any)
    await db.drizzle.execute(
      `UPDATE media SET url = '${blob.url}' WHERE id = ${MEDIA_ID}`
    )

    return NextResponse.json({ ok: true, publicUrl: blob.url, mediaId: MEDIA_ID })
  } catch (e) {
    return NextResponse.json({ error: 'failed', detail: String(e).slice(0, 400) }, { status: 500 })
  }
}
