import {
  BoltIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  LockClosedIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'

const pillars = [
  {
    name: 'AUTOMATION',
    icon: BoltIcon,
    description:
      'We build agentic AI systems that think, act, and adapt — eliminating manual workflows and replacing repetitive processes with intelligent, self-directing agents.',
  },
  {
    name: 'COMPLIANCE',
    icon: ShieldCheckIcon,
    description:
      'Every solution we ship is designed for regulated environments — HIPAA, AML/KYC, GDPR, FDA, CCPA. Compliance is not an afterthought. It is the architecture.',
  },
  {
    name: 'SCALABILITY',
    icon: ArrowTrendingUpIcon,
    description:
      'We build on GCP-native infrastructure that scales from your first deployment to enterprise volume — without rebuilding what already works.',
  },
  {
    name: 'SECURITY',
    icon: LockClosedIcon,
    description:
      'Zero-trust design, DevSecOps CI/CD, and IAM-first architecture are standard in every engagement — not optional add-ons.',
  },
  {
    name: 'SUSTAINABILITY',
    icon: SparklesIcon,
    description:
      'We design for long-term cost efficiency and maintainability. The AI system you buy from Develom will still be running cleanly in three years.',
  },
]

export default function PillarsStrip() {
  return (
    <section className="bg-[#1a3058] px-6 py-16">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
        {pillars.map((pillar, i) => (
          <div
            key={pillar.name}
            className={`px-4 ${i < pillars.length - 1 ? 'lg:border-r lg:border-white/15' : ''}`}
          >
            <pillar.icon className="h-7 w-7 text-white" aria-hidden="true" />
            <p className="mt-3 text-label uppercase text-white">{pillar.name}</p>
            <p className="mt-2 text-[14px] leading-relaxed text-white/80">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
