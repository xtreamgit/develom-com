import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import BlogHero from '@/components/blog/BlogHero'
import BlogGrid from '@/components/blog/BlogGrid'

export const metadata: Metadata = {
  title: 'Blog — AI Automation & Compliance Engineering | Develom',
  description:
    'Original analysis on AI automation, compliance engineering, and production AI systems from Develom.',
  alternates: {
    canonical: 'https://develom.com/blog',
  },
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })

  let posts: any[] = []
  try {
    const result = await payload.find({
      collection: 'blog-posts',
      where: { published: { equals: true } },
      sort: '-date',
      limit: 50,
      depth: 1,
    })
    posts = result.docs
  } catch {
    /* DB not yet migrated */
  }

  return (
    <main>
      <BlogHero />
      <BlogGrid posts={posts} />
    </main>
  )
}
