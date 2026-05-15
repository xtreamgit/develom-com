import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogEntries: MetadataRoute.Sitemap = []

  try {
    const payload = await getPayload({ config })
    const posts = await payload.find({
      collection: 'blog-posts',
      where: { _status: { equals: 'published' } },
      limit: 100,
    })

    blogEntries = posts.docs.map((post) => ({
      url: `https://develom.com/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch {
    /* DB may not be migrated yet */
  }

  return [
    { url: 'https://develom.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://develom.com/services', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://develom.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://develom.com/portfolio', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://develom.com/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://develom.com/contact', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    ...blogEntries,
  ]
}
