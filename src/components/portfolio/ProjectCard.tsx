import Link from 'next/link'
import type { PortfolioProject } from '@/types/portfolio'

interface ProjectCardProps {
  project: PortfolioProject
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const stackChips = project.stack.split(/\s*·\s*|\s*,\s*/).filter(Boolean)
  const tags = project.tags ?? []

  return (
    <article className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md">
      {/* Status badge */}
      {project.status === 'coming-soon' ? (
        <span className="self-start rounded border border-amber-200 bg-amber-100 px-2.5 py-0.5 text-[12px] font-medium text-amber-800">
          Coming Soon
        </span>
      ) : (
        <span className="self-start rounded border border-green-200 bg-green-100 px-2.5 py-0.5 text-[12px] font-medium text-green-800">
          Live
        </span>
      )}

      {/* Title */}
      <h3 className="text-[20px] font-bold leading-[1.3] text-navy">{project.title}</h3>

      {/* Problem statement */}
      <p className="flex-1 text-[14px] leading-[1.7] text-muted">{project.problem}</p>

      {/* Stack chips */}
      <div className="flex flex-wrap gap-1.5">
        {stackChips.map((tech) => (
          <span
            key={tech}
            className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-[12px] text-slate-700"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Tag chips — color driven by tag.color */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5" aria-label="Service pillars">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="rounded px-2 py-0.5 text-[12px] font-medium"
              style={{
                backgroundColor: `${tag.color}18`,
                color: tag.color,
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <Link
        href="/contact"
        className="mt-auto self-start rounded text-[14px] font-semibold text-blue transition-colors hover:text-blue/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Discuss →
      </Link>
    </article>
  )
}
