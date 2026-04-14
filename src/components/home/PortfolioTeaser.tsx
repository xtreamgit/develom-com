import Link from 'next/link'

interface PortfolioProject {
  id: string
  title: string
  stack: string
  problem: string
  pillars?: string[] | null
  flagship?: boolean | null
  status?: string | null
  order?: number | null
}

function PillarTag({ name, flagship }: { name: string; flagship: boolean }) {
  return (
    <span
      className={`inline-block rounded-sm px-2.5 py-1 text-[12px] font-semibold ${
        flagship ? 'bg-white/10 text-white/90' : 'bg-[#F1F5F9] text-navy'
      }`}
    >
      {name}
    </span>
  )
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const isFlagship = project.flagship === true
  const buttonText =
    project.status === 'live' ? 'View Case Study' : 'Demo Coming May 2026'

  return (
    <div
      className={`relative flex flex-col rounded-lg p-7 transition-shadow ${
        isFlagship
          ? 'bg-navy text-white shadow-md'
          : 'bg-white shadow-sm hover:shadow-md'
      }`}
    >
      {isFlagship && (
        <span className="absolute top-4 right-4 rounded-sm bg-blue px-2.5 py-1 text-[11px] font-semibold uppercase text-white">
          &#9733; FLAGSHIP
        </span>
      )}

      <h3
        className={`text-[18px] font-semibold ${isFlagship ? 'text-white' : 'text-navy'}`}
      >
        {project.title}
      </h3>

      <p
        className={`mt-2 text-[13px] ${isFlagship ? 'text-white/70' : 'text-muted'}`}
      >
        {project.stack}
      </p>

      <p
        className={`mt-3 text-[15px] ${isFlagship ? 'text-white/80' : 'text-text'}`}
      >
        {project.problem}
      </p>

      {project.pillars && project.pillars.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.pillars.map((pillar) => (
            <PillarTag key={pillar} name={pillar} flagship={isFlagship} />
          ))}
        </div>
      )}

      <Link
        href="/portfolio"
        className="mt-5 block w-full rounded bg-blue py-2.5 text-center text-[14px] font-semibold text-white hover:brightness-90 transition-all"
      >
        {buttonText}
      </Link>
    </div>
  )
}

export default function PortfolioTeaser({
  projects,
}: {
  projects: PortfolioProject[]
}) {
  return (
    <section className="bg-bg-alt px-6 py-20">
      <div className="mx-auto max-w-content">
        <p className="text-label uppercase text-blue">OUR BUILDS</p>

        <h2 className="mt-3 text-h2 text-navy">
          Working AI Systems, Not Slide Decks.
        </h2>

        <p className="mt-4 max-w-[620px] text-lg text-muted">
          Every portfolio project ships with architecture documentation, a five-pillar compliance narrative, and a live demo environment.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/portfolio"
            className="text-[16px] font-semibold text-blue hover:underline"
          >
            View full portfolio &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
