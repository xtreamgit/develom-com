import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// One-shot: wire media ID 27 into use-cases hero two-column block — delete after use.
const ONE_TIME_TOKEN = 'wire-hero-5c9b3e1f'

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('tok') !== ONE_TIME_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config })

    // Fetch the use-cases page without populating relations
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'use-cases' } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    if (!result.docs.length) {
      return NextResponse.json({ error: 'use-cases page not found', hint: 'check slug in Pages collection' }, { status: 404 })
    }

    const page = result.docs[0]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const layout: any[] = (page.layout as any[]) ?? []

    // Find a two-column block with rightType === 'image', or the first one if none set yet
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let targetIdx = layout.findIndex((b: any) => b.blockType === 'two-column-block' && b.rightType === 'image')
    if (targetIdx === -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      targetIdx = layout.findIndex((b: any) => b.blockType === 'two-column-block')
    }

    if (targetIdx === -1) {
      return NextResponse.json({
        error: 'no two-column-block found',
        blockTypes: layout.map((b: any) => b.blockType),
      }, { status: 404 })
    }

    const updatedLayout = layout.map((b: any, i: number) => {
      if (i !== targetIdx) return b
      return { ...b, rightType: 'image', rightImage: 27 }
    })

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
      slug: page.slug,
      blockIdx: targetIdx,
      updatedBlocks: (updated.layout as any[])?.length,
    })
  } catch (e) {
    return NextResponse.json({ error: 'wiring failed', detail: String(e).slice(0, 400) }, { status: 500 })
  }
}
