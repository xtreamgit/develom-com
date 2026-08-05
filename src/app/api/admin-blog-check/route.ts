import { NextRequest, NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

const TOKEN = 'blog-check-r4x9k2m7'

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('tok') !== TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  // Fetch all blog posts (including drafts) with overrideAccess
  const all = await payload.find({
    collection: 'blog-posts',
    limit: 50,
    depth: 0,
    overrideAccess: true,
    draft: true,
  })

  return NextResponse.json({
    total: all.totalDocs,
    posts: all.docs.map((p: any) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      status: (p as any)._status ?? 'unknown',
      date: p.date,
    })),
  })
}
