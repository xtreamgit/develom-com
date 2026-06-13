import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// One-shot: add two-column block with use-cases hero image — delete after use.
const ONE_TIME_TOKEN = 'wire-hero-5c9b3e1f'

// Minimal Lexical rich-text node — placeholder left content for Hector to edit in admin
const PLACEHOLDER_LEFT = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          {
            type: 'text',
            format: 0,
            style: '',
            mode: 'normal',
            text: 'See how Develom helps regulated teams move faster with AI — without compromising compliance.',
            version: 1,
            detail: 0,
          },
        ],
      },
    ],
  },
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('tok') !== ONE_TIME_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'use-cases' } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    if (!result.docs.length) {
      return NextResponse.json({ error: 'use-cases page not found' }, { status: 404 })
    }

    const page = result.docs[0]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const layout: any[] = (page.layout as any[]) ?? []

    // Check if two-column-block already exists with image
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = layout.find((b: any) => b.blockType === 'two-column-block' && b.rightType === 'image')
    if (existing) {
      return NextResponse.json({ ok: true, note: 'already wired', rightImage: existing.rightImage })
    }

    // Insert two-column block after the hero-block (index 1)
    const heroIdx = layout.findIndex((b: any) => b.blockType === 'hero-block')
    const insertAt = heroIdx >= 0 ? heroIdx + 1 : 0

    const newBlock = {
      blockType: 'two-column-block',
      leftContent: PLACEHOLDER_LEFT,
      rightType: 'image',
      rightImage: 27,
    }

    const updatedLayout = [
      ...layout.slice(0, insertAt),
      newBlock,
      ...layout.slice(insertAt),
    ]

    const updated = await payload.update({
      collection: 'pages',
      id: page.id,
      data: { layout: updatedLayout } as Record<string, unknown>,
      depth: 0,
      overrideAccess: true,
    })

    return NextResponse.json({
      ok: true,
      pageId: page.id,
      insertedAt: insertAt,
      totalBlocks: (updated.layout as any[])?.length,
    })
  } catch (e) {
    return NextResponse.json({ error: 'wiring failed', detail: String(e).slice(0, 400) }, { status: 500 })
  }
}
