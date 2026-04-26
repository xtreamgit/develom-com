'use client'

import { useState } from 'react'
import type { PortfolioProject } from '@/types/portfolio'
import FlagshipCard from './FlagshipCard'
import ProjectCard from './ProjectCard'

const FILTERS = [
  { value: 'all', label: 'All Projects' },
  { value: 'Automation', label: 'Automation' },
  { value: 'Compliance', label: 'Compliance' },
  { value: 'Security', label: 'Security' },
  { value: 'Scalability', label: 'Scalability' },
  { value: 'Sustainability', label: 'Sustainability' },
]

interface PortfolioGridProps {
  flagship: PortfolioProject | null
  projects: PortfolioProject[]
}

export default function PortfolioGrid({ flagship, projects }: PortfolioGridProps) {
  const [selectedPillar, setSelectedPillar] = useState<string>('all')

  const isFiltered = selectedPillar !== 'all'

  const matchesFilter = (project: PortfolioProject) =>
    (project.tags ?? []).some((t) => t.name === selectedPillar)

  // In filtered view: all projects (flagship + others) merged into one grid
  const allProjects = flagship ? [flagship, ...projects] : projects
  const filteredProjects = isFiltered ? allProjects.filter(matchesFilter) : projects

  return (
    <section className="bg-[#F8FAFC] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-content">
        {/* Flagship zone — only shown when showing all */}
        {!isFiltered && flagship && (
          <div className="mb-12">
            <FlagshipCard project={flagship} />
          </div>
        )}

        {/* Filter tabs */}
        <div
          className="mb-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by service pillar"
        >
          {FILTERS.map((filter) => {
            const isActive = selectedPillar === filter.value
            return (
              <button
                key={filter.value}
                onClick={() => setSelectedPillar(filter.value)}
                aria-pressed={isActive}
                className={`min-h-[44px] rounded px-4 py-2 text-[13px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  isActive
                    ? 'bg-navy text-white'
                    : 'border border-slate-300 bg-white text-muted hover:border-navy hover:text-navy'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        {isFiltered ? (
          filteredProjects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-[16px] text-muted">No projects in this pillar yet.</p>
              <button
                onClick={() => setSelectedPillar('all')}
                className="mt-4 rounded text-[14px] font-semibold text-blue underline underline-offset-4 hover:text-blue/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                View all projects
              </button>
            </div>
          )
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
