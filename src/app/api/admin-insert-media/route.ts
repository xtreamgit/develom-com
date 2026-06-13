import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// One-shot media record insert — delete after use.
const ONE_TIME_TOKEN = 'insert-media-8d4f1a2e'

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const tok = searchParams.get('tok') ?? ''

  if (tok !== ONE_TIME_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = (payload.db as any)

    const result = await db.drizzle.execute(`
      INSERT INTO media (
        alt, url, filename, mime_type, file_type, filesize, width, height,
        access_level, updated_at, created_at
      ) VALUES (
        'Develom AI Solutions — Use Cases Hero',
        'https://gdlmaz34wfbrbxij.private.blob.vercel-storage.com/use-cases/develom-use-cases-hero.png',
        'develom-use-cases-hero.png',
        'image/png',
        'image',
        658953,
        600,
        500,
        'public',
        now(),
        now()
      )
      RETURNING id
    `)

    const id = result?.rows?.[0]?.id ?? result?.[0]?.id ?? null

    return NextResponse.json({ ok: true, id })
  } catch (e) {
    return NextResponse.json({ error: 'insert failed', detail: String(e).slice(0, 400) }, { status: 500 })
  }
}
