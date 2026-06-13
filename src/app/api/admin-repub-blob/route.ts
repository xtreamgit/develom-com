import { NextRequest, NextResponse } from 'next/server'
import { copy } from '@vercel/blob'
import { getPayload } from 'payload'
import config from '@payload-config'

// One-shot: copy private hero blob → public, update media record — delete after use.
const ONE_TIME_TOKEN = 'repub-blob-2e8c4a7d'
const PRIVATE_URL = 'https://gdlmaz34wfbrbxij.private.blob.vercel-storage.com/use-cases/develom-use-cases-hero.png'
const MEDIA_ID = 27

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('tok') !== ONE_TIME_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    // Copy private blob to public
    const blob = await copy(PRIVATE_URL, 'use-cases/develom-use-cases-hero.png', {
      access: 'public',
      addRandomSuffix: false,
    })

    // Update the media record URL
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
