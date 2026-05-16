import type { Metadata } from 'next'
import IndustryPage from '@/components/industries/IndustryPage'

export const metadata: Metadata = {
  title: 'AI for Insurance — Claims, Underwriting, and Fraud Detection | Develom',
  description:
    'Actuarial AI, claims automation, fraud detection — insurance is one of the heaviest AI adopters in financial services. Develom matches insurers with AI built for the state regulatory patchwork, disparate impact scrutiny, and the audit trail that follows.',
  openGraph: {
    title: 'AI for Insurance — Claims, Underwriting, and Fraud Detection | Develom',
    type: 'website',
    images: [{ url: '/og/og-industry-insurance.jpg', width: 1200, height: 630 }],
  },
}

const WHAT_WE_DO_COLUMNS = [
  {
    title: 'Tool Match',
    description: 'We identify AI tools that fit your line of business, state footprint, and risk tolerance — evaluated against your specific regulatory exposure before selection.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Regulatory Mapping',
    description: 'We map your deployment against the relevant state regulatory environments — adverse action notice requirements, explainability standards, and disparate impact obligations.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="#2563EB" strokeWidth="2" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#2563EB" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: 'Audit-Ready Implementation',
    description: 'Explainability design for adverse action workflows, disparate impact testing documentation, and human oversight built into the decision pipeline — not added after.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const SOLUTIONS = [
  {
    category: 'Automate & Optimize',
    items: 'Claims processing automation, FNOL intake, document extraction and classification.',
  },
  {
    category: 'Analyze & Predict',
    items: 'Actuarial AI tools, fraud scoring models, risk modeling and pricing support.',
  },
  {
    category: 'Engage & Assist',
    items: 'Customer service AI, agent augmentation tools, renewal and retention automation.',
  },
  {
    category: 'Protect & Detect',
    items: 'Claims fraud detection, transaction anomaly monitoring, identity verification.',
  },
]

export default function InsurancePage() {
  return (
    <IndustryPage
      eyebrow="Insurance AI"
      hero={{
        headline: 'Insurance AI Built for the Regulatory Patchwork',
        subheadline:
          'Claims automation, underwriting AI, fraud detection — insurance is deploying AI at scale. The state-by-state regulatory environment, disparate impact scrutiny, and growing consumer protection pressure mean the implementation matters as much as the tool. Develom matches insurers with AI built for both.',
        cta: 'Find the Right AI for Your Insurance Operation',
      }}
      problem={{
        headline: '50 Regulators, One Deployment Decision',
        body: "Insurance is state-regulated. A claims AI deployed nationally faces potentially 50 different regulatory environments — with inconsistent rules on algorithmic decision-making, adverse action notice requirements, and explainability standards. Add disparate impact scrutiny at the federal level and growing state AG enforcement activity on AI-driven underwriting, and the compliance surface area is significant. The carriers moving well are the ones who mapped the regulatory exposure before they deployed, not after.",
      }}
      whatWeDo={{
        headline: 'Match, Implement, Document',
        body: 'We help insurance carriers and MGAs identify AI tools that fit their line of business, state footprint, and risk tolerance — then build the implementation framework that holds up under regulatory review. That means explainability design for adverse action workflows, disparate impact testing documentation, and human oversight baked into the decision pipeline.',
        columns: WHAT_WE_DO_COLUMNS,
      }}
      solutions={SOLUTIONS}
      trust="Develom's GCP Pro Architect-led implementation approach is designed for regulated financial services environments — where the audit trail is part of the product, not an afterthought."
      ctaClose={{
        headline: 'Find the Right AI for Your Insurance Operation',
        body: 'Tell us your line of business, state footprint, and deployment goals. We match you to AI that fits — and build the compliance architecture to deploy it safely.',
        cta: 'Start the Match',
      }}
    />
  )
}
