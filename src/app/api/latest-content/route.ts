import { unstable_noStore as noStore } from 'next/cache'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  noStore()
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'blog-posts',
      overrideAccess: true,
      where: { _status: { equals: 'published' } },
      sort: '-date',
      limit: 1,
      depth: 0,
    })
    const post = docs[0] ?? null
    return NextResponse.json(
      {
        post: post
          ? { title: post.title, slug: post.slug, date: post.date }
          : null,
      },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' } }
    )
  } catch {
    return NextResponse.json({ post: null }, { status: 500 })
  }
}
