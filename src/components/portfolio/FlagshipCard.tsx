import Link from 'next/link'
import type { PortfolioProject } from '@/types/portfolio'

interface FlagshipCardProps {
  project: PortfolioProject
}

export default function FlagshipCard({ project }: FlagshipCardProps) {
  const stackChips = project.stack.split(/\s*·\s*|\s*,\s*/).filter(Boolean)
  const tags = project.tags ?? []

  return (
    <article
      className="rounded-xl bg-navy p-8 ring-1 ring-blue-600/40 lg:p-12"
      aria-label={`Flagship project: ${project.title}`}
    >
      <div className="flex flex-col gap-6">
        {/* Header row */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-sm border border-blue px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-blue">
            Flagship Project
          </span>
          {project.status === 'coming-soon' ? (
            <span className="rounded border border-amber-500/30 bg-amber-900/40 px-2.5 py-0.5 text-[12px] font-medium text-amber-300">
              Coming Soon
            </span>
          ) : (
            <span className="rounded border border-green-500/30 bg-green-900/40 px-2.5 py-0.5 text-[12px] font-medium text-green-300">
              Live
            </span>
          )}
        </div>

        {/* Title */}
        <h2
          className="max-w-[680px] text-white"
          style={{
            fontSize: 'clamp(1.75rem, 2vw + 1rem, 2.25rem)',
            fontWeight: 700,
            lineHeight: 1.25,
          }}
        >
          {project.title}
        </h2>

        {/* Problem statement */}
        <p className="max-w-[680px] text-[16px] leading-[1.75] text-white/80">
          {project.problem}
        </p>

        {/* Divider */}
        <hr className="border-t border-white/10" aria-hidden="true" />

        {/* Stack chips */}
        <div className="flex flex-wrap gap-2">
          {stackChips.map((tech) => (
            <span
              key={tech}
              className="rounded border border-white/10 bg-white/10 px-2.5 py-0.5 font-mono text-[12px] text-white/90"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Tag chips — color from tag.color */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2" aria-label="Service pillars">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-sm border px-2 py-0.5 text-[12px] font-medium"
                style={{
                  borderColor: `${tag.color}40`,
                  color: tag.color,
                  backgroundColor: `${tag.color}15`,
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div>
          <Link
            href="/contact"
            className="inline-block min-h-[44px] rounded-lg bg-blue px-6 py-3 text-[14px] font-bold text-white transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-navy"
          >
            Discuss This Project →
          </Link>
        </div>
      </div>
    </article>
  )
}
