import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
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

function splitTitle(title: string): { lead: string; accent: string } | null {
  const idx = title.indexOf(': ')
  if (idx === -1) return null
  return { lead: title.slice(0, idx + 1), accent: title.slice(idx + 2) }
}

function getLexicalText(node: any): string {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text
  if (Array.isArray(node.children)) return node.children.map(getLexicalText).join(' ')
  return ''
}

function estimateReadTime(content: any): number {
  const text = getLexicalText(content?.root ?? content)
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
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
  const titleParts = splitTitle(post.title)
  const readTime = estimateReadTime(post.body)
  const authorName: string = post.createdBy?.name ?? 'Develom'
  const authorInitial = authorName.charAt(0).toUpperCase()
  const heroImage = post.featuredImage?.url ? post.featuredImage : null

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

      {/* ── Post Hero ── */}
      <header style={{ background: '#071832', padding: '52px 0 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>

          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: 'rgba(240,247,253,0.50)',
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '0.01em',
              marginBottom: 32,
              transition: 'color 0.15s',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All posts
          </Link>

          <h1
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw + 0.5rem, 2.875rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#F0F7FD',
              maxWidth: 680,
              marginBottom: 20,
            }}
          >
            {titleParts ? (
              <>
                {titleParts.lead}{' '}
                <span
                  style={{
                    background: 'linear-gradient(to right, #18B8C7, #3A90E0)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: '#18B8C7',
                  }}
                >
                  {titleParts.accent}
                </span>
              </>
            ) : (
              post.title
            )}
          </h1>

          {post.excerpt && (
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                color: 'rgba(240,247,253,0.65)',
                maxWidth: 680,
                marginBottom: 32,
                fontWeight: 400,
              }}
            >
              {post.excerpt}
            </p>
          )}

          {/* Byline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', maxWidth: 680 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: '#0F2035',
                  border: '1.5px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#18B8C7',
                  flexShrink: 0,
                }}
              >
                {authorInitial}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(240,247,253,0.65)' }}>
                {authorName}
              </span>
            </div>

            <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.12)' }} />

            {post.date && (
              <>
                <span style={{ fontSize: 13, color: 'rgba(240,247,253,0.50)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" style={{ opacity: 0.6 }}>
                    <rect x="1" y="2" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M1 5h11" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M4 1v2M9 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  {formatDate(post.date)}
                </span>
                <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.12)' }} />
              </>
            )}

            <span style={{ fontSize: 13, color: 'rgba(240,247,253,0.50)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" style={{ opacity: 0.6 }}>
                <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M6.5 3.5V6.5l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              {readTime} min read
            </span>
          </div>

          {/* Tags — below byline per Eero v2 */}
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20, maxWidth: 680 }}>
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: 20,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: 'rgba(24,184,199,0.12)',
                    border: '1px solid rgba(24,184,199,0.35)',
                    color: '#18B8C7',
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Hero image — only renders when post has a featuredImage */}
          {heroImage && (
            <div style={{ marginTop: 40, maxWidth: 680, borderRadius: 10, overflow: 'hidden' }}>
              <Image
                src={heroImage.url}
                alt={heroImage.alt ?? post.title ?? ''}
                width={heroImage.width ?? 680}
                height={heroImage.height ?? 383}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                priority
              />
            </div>
          )}

        </div>
      </header>

      {/* ── Gradient rule ── */}
      <hr
        style={{
          height: 2,
          background: 'linear-gradient(to right, #0F80E3, #18B8C7, transparent)',
          border: 'none',
          margin: 0,
        }}
      />

      {/* ── Post body ── */}
      <div style={{ background: '#F5FAFE', padding: '72px 40px 96px' }}>
        <BlogBody content={post.body} />
      </div>

      {/* ── Post CTA ── */}
      <section
        style={{
          background: '#0D3268',
          padding: '72px 40px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(240,247,253,0.50)',
              marginBottom: 16,
            }}
          >
            Ready when you are
          </p>
          <h2
            style={{
              fontSize: 30,
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.025em',
              color: '#F0F7FD',
              marginBottom: 12,
            }}
          >
            Tell us what process you need to run. We&apos;ll tell you how.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'rgba(240,247,253,0.65)',
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            No demo environment. A real conversation about your use case, your workflows, and what accountability looks like in practice.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '13px 26px',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '-0.01em',
                textDecoration: 'none',
                background: 'linear-gradient(to top, #0F80E3, #18B8C7)',
                color: '#fff',
                boxShadow: '0 1px 2px rgba(15,128,227,0.3), 0 3px 10px rgba(15,128,227,0.2)',
              }}
            >
              Talk to an Expert
            </Link>
            <Link
              href="/solutions"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '13px 26px',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '-0.01em',
                textDecoration: 'none',
                background: 'transparent',
                color: '#F0F7FD',
                border: '1.5px solid rgba(240,247,253,0.25)',
              }}
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
