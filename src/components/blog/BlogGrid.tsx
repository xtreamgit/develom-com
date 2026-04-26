import Link from 'next/link'

interface Tag {
  id: number | string
  name: string
  slug: string
  color: string
}

interface BlogPost {
  id: string
  title: string
  slug: string
  date: string
  excerpt?: string | null
  tags?: Tag[] | null
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function PostCard({ post }: { post: BlogPost }) {
  const primaryTag = post.tags?.[0] ?? null

  return (
    <article className="flex flex-col rounded-xl bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        {primaryTag ? (
          <span
            className="inline-block self-start rounded-sm px-2.5 py-1 text-[12px] font-semibold"
            style={{
              backgroundColor: `${primaryTag.color}18`,
              color: primaryTag.color,
            }}
          >
            {primaryTag.name}
          </span>
        ) : (
          <span />
        )}
        <time className="shrink-0 text-[13px] text-muted" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
      </div>

      <h2 className="mt-4 text-[19px] font-bold leading-snug text-navy">{post.title}</h2>

      {post.excerpt && (
        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-muted">{post.excerpt}</p>
      )}

      <Link
        href={`/blog/${post.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-blue hover:underline"
      >
        Read more
        <svg viewBox="0 0 16 16" fill="none" width={14} height={14} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </Link>
    </article>
  )
}

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <section className="bg-bg-alt px-6 py-24">
        <div className="mx-auto max-w-content">
          <p className="text-[16px] text-muted">
            No posts published yet. Check back soon.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-bg-alt px-6 py-16 md:py-24">
      <div className="mx-auto max-w-content">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
