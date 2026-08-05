import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_noStore as noStore } from 'next/cache'
import { BlogBody } from '@/components/blog/BlogBody'

export const dynamic = 'force-dynamic'

interface Tag {
  id: number | string
  name: string
  slug: string
  color: string
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  try {
    const result = await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: slug }, _status: { equals: 'published' } },
      limit: 1,
      depth: 1,
    })

    const post = result.docs[0] as {
      title?: string
      excerpt?: string
      featuredImage?: { url?: string; width?: number; height?: number; alt?: string }
    } | undefined
    if (!post) return {}

    const ogImages = post.featuredImage?.url
      ? [
          {
            url: post.featuredImage.url,
            width: post.featuredImage.width ?? 1200,
            height: post.featuredImage.height ?? 630,
            alt: post.featuredImage.alt ?? post.title ?? '',
          },
        ]
      : [{ url: '/og-default.png', width: 1200, height: 630, alt: post.title ?? 'Develom Blog' }]

    return {
      title: `${post.title ?? ''} | Develom Blog`,
      description: post.excerpt ?? undefined,
      alternates: { canonical: `https://develom.com/blog/${slug}` },
      openGraph: {
        title: post.title ?? '',
        description: post.excerpt ?? '',
        url: `https://develom.com/blog/${slug}`,
        type: 'article',
        images: ogImages,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title ?? '',
        description: post.excerpt ?? '',
        images: ogImages.map((img) => img.url),
      },
    }
  } catch {
    return {}
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  noStore()
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  let post: any = null
  try {
    const result = await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: slug }, _status: { equals: 'published' } },
      limit: 1,
      depth: 2,
      overrideAccess: true,
    })
    post = result.docs[0] ?? null
  } catch {
    /* DB not yet migrated */
  }

  if (!post) notFound()

  const tags: Tag[] = Array.isArray(post.tags) ? post.tags.filter(Boolean) : []

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt ?? '',
    url: `https://develom.com/blog/${slug}`,
    datePublished: post.date ? new Date(post.date).toISOString().slice(0, 10) : undefined,
    dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString().slice(0, 10) : undefined,
    author: { '@type': 'Organization', name: 'Develom', url: 'https://develom.com' },
    publisher: {
      '@type': 'Organization',
      name: 'Develom',
      url: 'https://develom.com',
      logo: { '@type': 'ImageObject', url: 'https://develom.com/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://develom.com/blog/${slug}` },
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="bg-navy px-6 pb-16 pt-32 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-[720px]">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/60 hover:text-white/90 transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="none" width={14} height={14} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 8H3M7 4l-4 4 4 4" />
            </svg>
            All posts
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-block rounded-sm px-2.5 py-1 text-[12px] font-semibold"
                style={{ backgroundColor: `${tag.color}25`, color: tag.color }}
              >
                {tag.name}
              </span>
            ))}
          </div>

          <h1
            className="text-white"
            style={{
              fontSize: 'clamp(1.75rem, 3vw + 0.75rem, 2.75rem)',
              lineHeight: 1.2,
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-6 max-w-[600px] text-[17px] leading-[1.75] text-white/75">
              {post.excerpt}
            </p>
          )}

          <p className="mt-6 text-[13px] text-white/50">
            {formatDate(post.date)}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-bg-alt px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[720px]">
          <BlogBody content={post.body} />

          <div className="mt-16 pt-10 border-t border-[#E5E7EB]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-blue hover:underline"
            >
              <svg viewBox="0 0 16 16" fill="none" width={14} height={14} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 8H3M7 4l-4 4 4 4" />
              </svg>
              Back to all posts
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
