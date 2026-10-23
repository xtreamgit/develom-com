import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_noStore as noStore } from 'next/cache'
import styles from './BlogIndex.module.css'

export const metadata: Metadata = {
  title: 'Blog — AI Automation & Compliance Engineering | Develom',
  description:
    'Original analysis on AI automation, compliance engineering, and production AI systems from Develom.',
  alternates: { canonical: 'https://develom.com/blog' },
}

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const THUMB_CLASSES = [
  styles.thumb0,
  styles.thumb1,
  styles.thumb2,
  styles.thumb3,
  styles.thumb4,
  styles.thumb5,
]
const AVATAR_CLASSES = [styles.avatar0, styles.avatar1, styles.avatar2, styles.avatar3]

export default async function BlogPage({ searchParams }: PageProps) {
  noStore()
  const params = await searchParams
  const activeCategory = typeof params.category === 'string' ? params.category : undefined
  const searchQuery = typeof params.q === 'string' ? params.q : undefined

  const payload = await getPayload({ config: configPromise })

  let categories: any[] = []
  try {
    const catResult = await payload.find({
      collection: 'categories',
      limit: 50,
      sort: 'name',
    })
    categories = catResult.docs
  } catch { /* DB not yet migrated */ }

  const activeCategoryDoc = activeCategory
    ? categories.find((c) => c.slug === activeCategory)
    : null
  const activeCategoryId: string | null = activeCategoryDoc?.id ?? null

  let posts: any[] = []
  try {
    if (searchQuery) {
      // Full-text search via plugin-search collection (covers title, excerpt, tags, body)
      const searchResult = await payload.find({
        collection: 'search',
        where: {
          or: [
            { title: { contains: searchQuery } },
            { excerpt: { contains: searchQuery } },
            { tagsText: { contains: searchQuery } },
            { bodyText: { contains: searchQuery } },
          ],
        },
        depth: 2,
        limit: 100,
        overrideAccess: true,
      })
      let matched = searchResult.docs
        .map((r: any) => (typeof r.doc?.value === 'object' ? r.doc.value : null))
        .filter(Boolean)

      if (activeCategoryId) {
        matched = matched.filter((p: any) => {
          const cat = p.category
          const catId = typeof cat === 'object' && cat !== null ? cat.id : cat
          return String(catId) === String(activeCategoryId)
        })
      }
      posts = matched.slice(0, 50)
    } else {
      const andClauses: Record<string, any>[] = [{ _status: { equals: 'published' } }]
      if (activeCategoryId) {
        andClauses.push({ category: { equals: activeCategoryId } })
      }
      const where = andClauses.length === 1 ? andClauses[0] : { and: andClauses }
      const result = await payload.find({
        collection: 'blog-posts',
        where,
        sort: '-date',
        limit: 50,
        depth: 2,
        overrideAccess: true,
      })
      posts = result.docs
    }
  } catch { /* DB not yet migrated */ }

  const navItems = [{ slug: null as null | string, name: 'All' }, ...categories]

  return (
    <main>
      {/* ── Subscribe bar ── */}
      <div className={styles.subscribeBar}>
        <div className={styles.subscribeBarInner}>
          <span className={styles.subscribeBarText}>
            <strong>New from Develom:</strong> AI Governance for Enterprise Teams — build
            accountability into every agent workflow.
          </span>
          <div className={styles.subscribeBarForm}>
            <input
              className={styles.subscribeBarInput}
              type="email"
              placeholder="Your email address"
            />
            <button className={styles.subscribeBarBtn} type="button">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ── Two-panel layout ── */}
      <div className={styles.pageShell}>

        {/* ── Left sidebar ── */}
        <aside className={styles.sidebar}>
          <p className={styles.sidebarSectionLabel}>Browse by topic</p>
          <h2 className={styles.sidebarTitle}>Latest Articles</h2>

          <ul className={styles.sidebarNav}>
            {navItems.map((cat) => {
              const isActive = cat.slug === null ? !activeCategory : activeCategory === cat.slug
              const href = cat.slug ? `/blog?category=${cat.slug}` : '/blog'
              return (
                <li key={cat.slug ?? 'all'}>
                  <Link
                    href={href}
                    className={`${styles.sidebarNavLink}${isActive ? ` ${styles.sidebarNavLinkActive}` : ''}`}
                  >
                    {cat.name}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className={styles.sidebarDivider} />

          {/* Podcasts */}
          <Link className={styles.sidebarPodcasts} href="/podcasts">
            <div className={styles.sidebarPodcastsIcon}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="white" strokeWidth="1.2" />
                <path d="M5 4.5l4 2-4 2V4.5z" fill="white" />
              </svg>
            </div>
            <div className={styles.sidebarPodcastsText}>
              <span className={styles.sidebarPodcastsLabel}>Podcasts</span>
              <span className={styles.sidebarPodcastsSub}>Episodes &amp; conversations</span>
            </div>
            <svg
              className={styles.sidebarPodcastsArrow}
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4.5 2.5l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <div className={styles.sidebarDivider} />

          {/* Search */}
          <form action="/blog" method="GET" className={styles.sidebarSearch}>
            {activeCategory && (
              <input type="hidden" name="category" value={activeCategory} />
            )}
            <input
              className={styles.sidebarSearchInput}
              type="search"
              name="q"
              placeholder="Search articles…"
              defaultValue={searchQuery ?? ''}
            />
            <svg
              className={styles.sidebarSearchIcon}
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </form>

          <div className={styles.sidebarDivider} />

          {/* Follow Us */}
          <p className={styles.sidebarFollowLabel}>Follow Us</p>
          <div className={styles.sidebarSocialLinks}>
            <a
              className={styles.sidebarSocialLink}
              href="https://x.com/develom"
              aria-label="X / Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M1 1.5l4.8 6.4L1 12.5h1.5l3.5-4 2.8 4H12l-5-6.7 4.6-4.3H10L6.8 5.2 4.2 1.5H1z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              className={styles.sidebarSocialLink}
              href="https://linkedin.com/company/develom"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
                <path
                  d="M3.5 5.5v5M3.5 3.5v.01"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M6.5 10.5V7.5c0-1 .6-2 2-2s2 .9 2 2v3"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </a>
            <a
              className={styles.sidebarSocialLink}
              href="https://youtube.com/@develom"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="1" y="3" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.2" />
                <path d="M5.5 5l4 2-4 2V5z" fill="currentColor" />
              </svg>
            </a>
            <a
              className={styles.sidebarSocialLink}
              href="https://github.com/develom"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M7 1C3.69 1 1 3.69 1 7c0 2.65 1.72 4.9 4.1 5.69.3.06.41-.13.41-.28v-1c-1.67.36-2.02-.8-2.02-.8-.27-.69-.67-.88-.67-.88-.55-.37.04-.36.04-.36.61.04.93.63.93.63.54.93 1.42.66 1.76.5.05-.39.21-.66.38-.81-1.34-.15-2.75-.67-2.75-2.98 0-.66.24-1.2.62-1.62-.06-.15-.27-.77.06-1.6 0 0 .5-.16 1.65.62a5.7 5.7 0 0 1 1.5-.2c.51 0 1.02.07 1.5.2 1.15-.78 1.65-.62 1.65-.62.33.83.12 1.45.06 1.6.39.42.62.96.62 1.62 0 2.32-1.41 2.83-2.76 2.98.22.19.41.56.41 1.13v1.68c0 .15.11.34.42.28A6.003 6.003 0 0 0 13 7c0-3.31-2.69-6-6-6z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </aside>

        {/* ── Main content ── */}
        <div className={styles.mainContent}>

          {/* Section head */}
          <div className={styles.sectionHead}>
            <div className={styles.sectionHeadRule}>
              <span className={styles.sectionHeadTitle}>
                {activeCategory
                  ? (activeCategoryDoc?.name ?? 'Articles')
                  : searchQuery
                  ? `Results for "${searchQuery}"`
                  : 'Most Popular'}
              </span>
            </div>
          </div>

          {/* Article grid */}
          <div className={styles.articleGrid}>
            {posts.length === 0 ? (
              <div className={styles.emptyState}>No articles found.</div>
            ) : (
              posts.map((post, i) => {
                const thumbClass = THUMB_CLASSES[i % THUMB_CLASSES.length]
                const avatarClass = AVATAR_CLASSES[i % AVATAR_CLASSES.length]
                const authorName: string = post.createdBy?.name ?? 'Develom'
                const authorInitial = authorName.charAt(0).toUpperCase()
                const cat = typeof post.category === 'object' ? post.category : null
                const catName: string | null = cat?.name ?? null
                const catSlug: string | null = cat?.slug ?? null

                return (
                  <article key={post.id} className={styles.articleCard}>
                    <Link className={styles.cardThumbLink} href={`/blog/${post.slug}`}>
                      {post.featuredImage?.url ? (
                        <div className={styles.cardThumb} style={{ position: 'relative' }}>
                          <Image
                            src={post.featuredImage.url}
                            alt={post.featuredImage.alt ?? post.title ?? ''}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className={`${styles.cardThumb} ${thumbClass}`} />
                      )}
                    </Link>
                    <div className={styles.cardBody}>
                      <div className={styles.cardMeta}>
                        {catName && (
                          <>
                            <Link
                              className={styles.cardCategory}
                              href={catSlug ? `/blog?category=${catSlug}` : '/blog'}
                            >
                              {catName}
                            </Link>
                            <span className={styles.cardMetaSep} />
                          </>
                        )}
                        {post.date && (
                          <span className={styles.cardDate}>{formatDate(post.date)}</span>
                        )}
                      </div>
                      <h2 className={styles.cardTitle}>
                        <Link className={styles.cardTitleLink} href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>
                      {post.excerpt && (
                        <p className={styles.cardExcerpt}>{post.excerpt}</p>
                      )}
                      <div className={styles.cardByline}>
                        <div className={`${styles.cardAvatar} ${avatarClass}`}>
                          {authorInitial}
                        </div>
                        <div className={styles.cardAuthorInfo}>
                          <span className={styles.cardAuthorName}>{authorName}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })
            )}
          </div>

          {/* Newsletter block */}
          <div className={styles.newsletterBlock}>
            <div className={styles.newsletterText}>
              <p className={styles.newsletterLabel}>Newsletter</p>
              <h2 className={styles.newsletterHeading}>Sign up for the Develom newsletter</h2>
              <p className={styles.newsletterSubtext}>
                Insights on AI orchestration, governance, and what&apos;s actually working in
                enterprise deployments. No noise — shipped when it matters.
              </p>
            </div>
            <div className={styles.newsletterForm}>
              <input
                className={styles.newsletterInput}
                type="email"
                placeholder="Your email address"
              />
              <button className={styles.newsletterBtn} type="button">
                Subscribe
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
