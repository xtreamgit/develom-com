import { NextRequest, NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

const TOKEN = 'blog-pub-n7r3k9w2'

export async function POST(req: NextRequest) {
  if (req.nextUrl.searchParams.get('tok') !== TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })
  const body = await req.json()

  // 1. Upload hero image to media
  const imageBuffer = Buffer.from(body.imageBase64, 'base64')
  const mediaDoc = await payload.create({
    collection: 'media',
    data: {
      title: 'Mission Blog Hero — AI Orchestration & Governance',
      alt: 'Central control hub coordinating AI agent nodes under a governance canopy, deep blue with cyan accents',
      creator: 'Hector DeJesus',
      accessLevel: 'public',
      license: 'owned',
      inUse: true,
    },
    file: {
      data: imageBuffer,
      mimetype: 'image/jpeg',
      name: 'develom-blog-hero-orchestration-governance.jpg',
      size: imageBuffer.length,
    },
    overrideAccess: true,
  })

  // 2. Look up or create required tags
  const tagDefs = [
    { name: 'AI Agents', slug: 'ai-agents', color: '#18B8C7' },
    { name: 'Governance', slug: 'governance', color: '#0D3268' },
    { name: 'Orchestration', slug: 'orchestration', color: '#1560B8' },
  ]
  const tagIds: (string | number)[] = []

  for (const def of tagDefs) {
    const existing = await payload.find({
      collection: 'tags',
      where: { name: { equals: def.name } },
      limit: 1,
      overrideAccess: true,
    })
    if (existing.docs.length > 0) {
      tagIds.push(existing.docs[0].id)
    } else {
      const created = await payload.create({
        collection: 'tags',
        data: { name: def.name, slug: def.slug, color: def.color },
        overrideAccess: true,
      })
      tagIds.push(created.id)
    }
  }

  // 3. Create blog post as published (body as markdown string → Lexical via beforeValidate hook)
  const post = await payload.create({
    collection: 'blog-posts',
    data: {
      title: body.title,
      slug: body.slug,
      date: body.date,
      excerpt: body.excerpt,
      tags: tagIds,
      body: body.bodyMarkdown,
      featuredImage: mediaDoc.id,
      _status: 'published',
    },
    overrideAccess: true,
  })

  return NextResponse.json({
    success: true,
    postId: post.id,
    slug: post.slug,
    mediaId: mediaDoc.id,
    tagIds,
    url: `https://develom.com/blog/${post.slug}`,
  })
}
