import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  slug: string
  date: string
  excerpt: string
  pillarTag: string
}

const pillarColors: Record<string, string> = {
  Automation: 'bg-blue-50 text-blue-700',
  Compliance: 'bg-amber-50 text-amber-700',
  Scalability: 'bg-green-50 text-green-700',
  Security: 'bg-red-50 text-red-700',
  Sustainability: 'bg-purple-50 text-purple-700',
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function PostCard({ post }: { post: BlogPost }) {
  const colorClass = pillarColors[post.pillarTag] || 'bg-gray-50 text-gray-700'

  return (
    <div className="flex flex-col rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <span
        className={`inline-block self-start rounded-sm px-2.5 py-1 text-[12px] font-semibold ${colorClass}`}
      >
        {post.pillarTag}
      </span>

      <h3 className="mt-3 text-[18px] font-semibold text-navy">{post.title}</h3>

      <p className="mt-1.5 text-[13px] text-muted">{formatDate(post.date)}</p>

      <p className="mt-2 line-clamp-2 text-[15px] text-text">{post.excerpt}</p>

      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 text-[14px] font-semibold text-blue hover:underline"
      >
        Read more &rarr;
      </Link>
    </div>
  )
}

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="bg-bg-alt px-6 py-20">
      <div className="mx-auto max-w-content">
        <p className="text-label uppercase text-blue">INSIGHTS</p>

        <h2 className="mt-3 text-h2 text-navy">What We{'\u2019'}re Thinking About</h2>

        <p className="mt-4 max-w-[560px] text-lg text-muted">
          Original analysis on AI automation, compliance engineering, and what actually works in production.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="text-[16px] font-semibold text-blue hover:underline"
          >
            Read all posts &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
