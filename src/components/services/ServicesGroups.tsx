import Link from 'next/link'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import type { Service } from '@/payload-types'

interface Props {
  services: Service[]
}

const groups = [
  {
    value: 'architecture',
    label: 'FOUNDATION',
    heading: 'AI Architecture & Systems Design',
    sub: 'The blueprint layer. GCP-native, zero-trust, built to scale.',
    number: '01',
  },
  {
    value: 'application',
    label: 'BUILD',
    heading: 'AI Application Development',
    sub: 'The production layer. Full-stack agentic apps and voice AI — documented and delivered.',
    number: '02',
  },
  {
    value: 'automation',
    label: 'OPERATE',
    heading: 'Automation Solutioning',
    sub: 'The workflow layer. End-to-end automation replacing your most expensive manual processes.',
    number: '03',
  },
] as const

export default function ServicesGroups({ services }: Props) {
  return (
    <section className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-content space-y-24">
        {groups.map((group) => {
          const groupServices = services.filter((s) => s.serviceGroup === group.value)
          return (
            <div key={group.value}>
              {/* Group header */}
              <div className="mb-12">
                <div className="flex items-baseline gap-4">
                  <span className="text-[48px] font-extrabold leading-none text-blue/10">
                    {group.number}
                  </span>
                  <div>
                    <p className="mb-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {group.label}
                    </p>
                    <h2 className="text-[26px] font-bold tracking-tight text-navy md:text-[28px]">
                      {group.heading}
                    </h2>
                  </div>
                </div>
                <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-muted">
                  {group.sub}
                </p>
              </div>

              {/* Service cards */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {groupServices.map((service) => (
                  <article
                    key={service.id}
                    className={`group relative flex flex-col rounded-lg bg-[#F8FAFC] p-7 transition-all duration-200 hover:bg-white hover:shadow-md ${
                      service.featured
                        ? 'ring-1 ring-blue/20 bg-white shadow-sm'
                        : ''
                    }`}
                  >
                    {/* Featured indicator */}
                    {service.featured && (
                      <span className="absolute right-5 top-5 rounded bg-navy px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                        Featured
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="pr-16 text-[17px] font-bold leading-snug text-navy">
                      {service.title}
                    </h3>

                    {/* Tagline */}
                    <p className="mt-2 text-[14px] italic leading-relaxed text-muted">
                      {service.tagline}
                    </p>

                    {/* Description */}
                    <p className="mt-5 text-[15px] leading-[1.7] text-text">
                      {service.description}
                    </p>

                    {/* Compliance angle */}
                    {service.complianceAngle && (
                      <div className="mt-6 flex items-start gap-2.5 rounded bg-blue/5 px-4 py-3">
                        <ShieldCheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue" />
                        <p className="text-[13px] leading-snug text-navy/70">
                          {service.complianceAngle}
                        </p>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="mt-auto pt-6">
                      <Link
                        href={service.ctaUrl ?? '/contact'}
                        className="inline-flex items-center gap-1.5 rounded text-[14px] font-semibold text-blue transition-colors hover:text-navy focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        {service.ctaLabel ?? 'Start a Project'}
                        <span className="transition-transform group-hover:translate-x-0.5">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
