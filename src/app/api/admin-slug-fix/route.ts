import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

const TOKEN = 'slug-fix-j8r2m5k9'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/, '')
}

export async function POST(req: NextRequest) {
  const tok = req.nextUrl.searchParams.get('tok')
  if (tok !== TOKEN) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const payload = await getPayload({ config })

  const all = await payload.find({
    collection: 'blog-posts',
    limit: 200,
    overrideAccess: true,
  })

  const malformed = all.docs.filter((p: any) => /\s|\.$/. test(p.slug ?? ''))

  const results = []
  for (const post of malformed) {
    const newSlug = slugify(post.slug)
    await payload.update({
      collection: 'blog-posts',
      id: post.id,
      data: { slug: newSlug, _status: 'published' },
      overrideAccess: true,
    })
    results.push({ id: post.id, oldSlug: post.slug, newSlug })
  }

  return NextResponse.json({ fixed: results, total: all.docs.length })
}
