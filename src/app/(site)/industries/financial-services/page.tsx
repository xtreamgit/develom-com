import type { Metadata } from 'next'
import IndustryPage from '@/components/industries/IndustryPage'

export const metadata: Metadata = {
  title: 'AI for Financial Services — SOC 2 Compliant, Audit-Ready | Develom',
  description:
    'Credit scoring, loan underwriting, and fraud detection AI are classified high-risk under the EU AI Act and subject to OCC model risk guidance. Develom matches financial services firms with compliant AI solutions — mapped to your regulatory exposure before deployment.',
  alternates: {
    canonical: 'https://develom.com/industries/financial-services',
  },
  openGraph: {
    title: 'AI for Financial Services — SOC 2 Compliant, Audit-Ready | Develom',
    description:
      'Credit scoring, loan underwriting, and fraud detection AI are classified high-risk under the EU AI Act. Develom matches financial services firms with compliant, audit-ready AI solutions mapped to your regulatory exposure.',
    type: 'website',
    url: 'https://develom.com/industries/financial-services',
    images: [{ url: '/og/og-industry-financial.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI for Financial Services — SOC 2 Compliant, Audit-Ready | Develom',
    description:
      'Credit scoring, loan underwriting, and fraud detection AI are classified high-risk under the EU AI Act. Develom matches financial services firms with compliant, audit-ready AI solutions.',
    images: ['/og/og-industry-financial.jpg'],
  },
}

const WHAT_WE_DO_COLUMNS = [
  {
    title: 'Model Risk Review',
    description: 'We structure AI deployments to satisfy OCC model risk guidance — explainability requirements, bias testing, and validation documentation built in.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Regulatory Mapping',
    description: 'We map your AI use case to the applicable regulatory exposure — EU AI Act scope, CFPB oversight, state AG enforcement activity — before you deploy.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="#2563EB" strokeWidth="2" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#2563EB" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: 'Audit-Ready Deployment',
    description: 'Human oversight design, disparate impact testing documentation, and vendor review — baked into the deployment plan, not bolted on after.',
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
    items: 'Loan processing automation, document extraction, compliance workflow automation.',
  },
  {
    category: 'Analyze & Predict',
    items: 'Credit scoring support tools, fraud detection, risk modeling and stress testing.',
  },
  {
    category: 'Engage & Assist',
    items: 'Customer service AI, financial advisor augmentation tools.',
  },
  {
    category: 'Protect & Detect',
    items: 'AML transaction monitoring, anomaly detection, regulatory alert systems.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can banks use cloud AI, or is self-hosted AI required for regulatory compliance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Banks can use cloud AI under the right governance structure, but OCC model risk guidance (SR 11-7) requires documented model validation, explainability, and independent review regardless of deployment model. Many financial institutions are moving toward self-hosted AI to satisfy data residency requirements, reduce vendor dependency risk, and maintain full audit control over model inputs and outputs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is OCC model risk guidance and how does it apply to AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OCC SR 11-7 (Model Risk Management) applies to any quantitative model used in decision-making, including AI systems used for credit scoring, fraud detection, or loan underwriting. It requires model validation, ongoing performance monitoring, documentation of assumptions and limitations, and independent review. AI models that influence credit decisions must satisfy all of these requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is AI used in loan underwriting subject to the EU AI Act?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The EU AI Act classifies AI used in creditworthiness assessment and loan decisions as high-risk. High-risk AI systems require conformity assessments, human oversight mechanisms, technical documentation, and registration in the EU database before deployment. Financial institutions operating in the EU or processing EU-resident data must comply by August 2026.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does SOC 2 compliant mean for an AI platform?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "A SOC 2 compliant AI platform has been audited against the AICPA Trust Services Criteria, demonstrating controls for security, availability, processing integrity, confidentiality, and privacy. For financial services firms, SOC 2 Type II compliance from an AI vendor is often a baseline requirement — but it is not a substitute for the firm's own model risk governance obligations.",
      },
    },
  ],
}

export default function FinancialServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <IndustryPage
      eyebrow="Financial Services AI"
      hero={{
        headline: 'Compliant AI for Financial Services — Before the Deadline',
        subheadline:
          'Credit scoring, underwriting, fraud detection — all explicitly classified as high-risk AI under EU and emerging US regulation. Develom matches financial services firms with AI that survives model risk review, regulatory audit, and competitive scrutiny.',
        cta: 'Find the Right AI for Your Firm',
      }}
      problem={{
        headline: 'Model Risk Is No Longer Just an Internal Concern',
        body: "OCC model risk guidance has governed bank AI for years. The EU AI Act's August 2026 deadline brings credit scoring explicitly into high-risk classification — with conformity assessments, 10-year documentation requirements, and penalties up to 3% of global turnover. US fintechs serving EU borrowers fall in scope whether they have an EU office or not. State AGs are filling the federal enforcement vacuum on disparate impact. The regulatory environment is tightening from every direction.",
      }}
      whatWeDo={{
        headline: 'From Model Selection to Audit Trail',
        body: 'We help financial services organizations identify AI tools that fit their risk appetite and regulatory exposure — then structure the implementation to hold up under model risk review. That means explainability requirements, bias testing documentation, human oversight design, and vendor review baked into the deployment plan, not bolted on after.',
        columns: WHAT_WE_DO_COLUMNS,
      }}
      solutions={SOLUTIONS}
      trust="Develom's implementation approach is built by a GCP Pro Architect with three decades of enterprise IT experience — including financial services deployments where audit trails aren't optional."
      ctaClose={{
        headline: 'Find Compliant AI for Your Financial Services Firm',
        body: 'Tell us about your use case, regulatory exposure, and risk tolerance. We match you to AI that fits — and build the implementation path that holds up.',
        cta: 'Start the Match',
      }}
    />
    </>
  )
}
