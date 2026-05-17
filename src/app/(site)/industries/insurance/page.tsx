import type { Metadata } from 'next'
import IndustryPage from '@/components/industries/IndustryPage'

export const metadata: Metadata = {
  title: 'AI Claims Processing & Insurance Underwriting Solutions | Develom',
  description:
    'Insurance AI for claims automation, actuarial modeling, and fraud detection carries state regulatory scrutiny on adverse action notice and disparate impact. Develom matches insurers with audit-ready AI solutions built for the regulatory patchwork your line of business operates under.',
  alternates: {
    canonical: 'https://develom.com/industries/insurance',
  },
  openGraph: {
    title: 'AI Claims Processing & Insurance Underwriting Solutions | Develom',
    description:
      'Insurance AI for claims automation and fraud detection carries state regulatory scrutiny. Develom matches insurers with audit-ready AI solutions built for the state regulatory patchwork your business operates under.',
    type: 'website',
    url: 'https://develom.com/industries/insurance',
    images: [{ url: '/og/og-industry-insurance.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Claims Processing & Insurance Underwriting Solutions | Develom',
    description:
      'Insurance AI for claims automation and fraud detection carries state regulatory scrutiny. Develom matches insurers with audit-ready solutions built for the regulatory patchwork you operate under.',
    images: ['/og/og-industry-insurance.jpg'],
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What regulatory requirements apply to AI used in insurance claims processing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Insurance AI used in claims processing is subject to state-level regulations that vary significantly. Most states require adverse action notices when AI contributes to a coverage denial or claim reduction. Many states have enacted or are developing algorithmic accountability rules that require explainability and disparate impact testing. Carriers deploying claims AI nationally must map their implementation to each applicable state regulatory framework before launch.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is disparate impact in insurance AI and how do carriers address it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Disparate impact occurs when an AI model produces outcomes that disproportionately disadvantage a protected class — even without discriminatory intent. In insurance underwriting and claims processing, disparate impact scrutiny has intensified at both the state regulatory and federal enforcement levels. Carriers address this through pre-deployment bias testing, ongoing outcome monitoring, documentation of model assumptions, and human oversight checkpoints in the decision pipeline.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can insurance carriers use AI for underwriting decisions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, but with significant compliance requirements. AI-assisted underwriting must comply with state insurance codes, FCRA requirements where applicable, and adverse action notice obligations. Models must be validated for accuracy, fairness, and explainability. Carriers must maintain documentation demonstrating that AI-assisted decisions do not produce discriminatory outcomes and that human oversight is built into the process.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an on-premise AI solution for insurance claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An on-premise (self-hosted) AI solution for insurance claims processes policyholder and claims data within the carrier\'s own infrastructure rather than sending it to a third-party cloud provider. This deployment model eliminates vendor data-handling risk, simplifies data residency compliance, and gives the carrier full audit control — which is increasingly important as state regulators scrutinize how carriers manage sensitive policyholder data in AI workflows.',
      },
    },
  ],
}

export default function InsurancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
    </>
  )
}
