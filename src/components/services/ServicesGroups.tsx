import Link from 'next/link'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'
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
  },
  {
    value: 'application',
    label: 'BUILD',
    heading: 'AI Application Development',
    sub: 'The production layer. Full-stack agentic apps and voice AI — documented and delivered.',
  },
  {
    value: 'automation',
    label: 'OPERATE',
    heading: 'Automation Solutioning',
    sub: 'The workflow layer. End-to-end automation replacing your most expensive manual processes.',
  },
] as const

export default function ServicesGroups({ services }: Props) {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-content space-y-20">
        {groups.map((group) => {
          const groupServices = services.filter((s) => s.serviceGroup === group.value)
          return (
            <div key={group.value}>
              {/* Group header */}
              <div className="mb-8">
                <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-muted">
                  {group.label}
                </p>
                <h2 className="text-[28px] font-bold text-navy">{group.heading}</h2>
                <p className="mt-1 text-[15px] text-muted">{group.sub}</p>
                <div className="mt-5 border-t border-gray-200" />
              </div>

              {/* Service cards */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groupServices.map((service) => (
                  <div
                    key={service.id}
                    className={`relative flex flex-col rounded-xl border border-gray-200 bg-white p-7 transition-all hover:border-blue-200 hover:shadow-md ${
                      service.featured ? 'ring-2 ring-blue-500/20' : ''
                    }`}
                  >
                    {/* Featured badge */}
                    {service.featured && (
                      <span className="absolute right-5 top-5 rounded-[6px] bg-blue px-2 py-0.5 text-[11px] font-semibold text-white">
                        ★ FEATURED
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="pr-20 text-[18px] font-semibold text-navy">{service.title}</h3>

                    {/* Tagline */}
                    <p className="mt-1.5 text-[14px] italic text-muted">{service.tagline}</p>

                    {/* Description */}
                    <p className="mt-4 text-[15px] leading-relaxed text-text">
                      {service.description}
                    </p>

                    {/* Divider */}
                    <div className="my-5 border-t border-gray-100" />

                    {/* Compliance angle */}
                    {service.complianceAngle && (
                      <div className="mb-4 flex items-start gap-2">
                        <ShieldCheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue" />
                        <p className="text-[13px] text-blue">{service.complianceAngle}</p>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="mt-auto">
                      <Link
                        href={service.ctaUrl ?? '/contact'}
                        className="text-[14px] font-semibold text-blue transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                      >
                        {service.ctaLabel ?? 'Start a Project'} →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
