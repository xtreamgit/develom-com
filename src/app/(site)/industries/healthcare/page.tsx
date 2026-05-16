import type { Metadata } from 'next'
import IndustryPage from '@/components/industries/IndustryPage'

export const metadata: Metadata = {
  title: 'Healthcare AI Solutions — HIPAA-Compliant Implementation | Develom',
  description:
    'Find the right AI for your health system — tools built for clinical workflows, HIPAA compliance, and audit-ready governance. Develom matches healthcare organizations with AI that holds up under scrutiny.',
  openGraph: { title: 'Healthcare AI Solutions — HIPAA-Compliant Implementation | Develom', type: 'website' },
}

const WHAT_WE_DO_COLUMNS = [
  {
    title: 'Vendor Match',
    description: 'We evaluate AI vendors against your HIPAA BAA requirements, clinical workflow fit, and existing EHR infrastructure.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Compliance Architecture',
    description: 'We design the governance infrastructure your AI tools require — AI risk analysis documentation, BAA structures, and audit trail design.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Audit-Ready Governance',
    description: 'We build governance frameworks that meet OCR\'s current enforcement standard — before the audit, not in response to it.',
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
    items: 'Clinical admin automation, prior authorization workflows, scheduling optimization, ambient documentation.',
  },
  {
    category: 'Analyze & Predict',
    items: 'Predictive readmission modeling, diagnostic decision support, population health analytics.',
  },
  {
    category: 'Engage & Assist',
    items: 'Patient communication AI, care coordination tools, clinical staff assistants.',
  },
  {
    category: 'Protect & Detect',
    items: 'Claims fraud detection, anomaly monitoring, security and access event detection.',
  },
]

export default function HealthcarePage() {
  return (
    <IndustryPage
      eyebrow="Healthcare AI"
      hero={{
        headline: 'Healthcare AI That Holds Up Under Scrutiny',
        subheadline:
          'Clinical workflows are deploying AI fast. Compliance infrastructure isn\'t keeping pace. Develom matches health systems with AI built for HIPAA, Section 1557, and the audit trail that comes after.',
        cta: 'Find the Right AI for Your Health System',
      }}
      problem={{
        headline: 'The Compliance Clock Is Already Running',
        body: "Section 1557's AI nondiscrimination mandate is enforceable now. The HIPAA Security Rule rewrite explicitly adds AI tools to your risk analysis requirements. Most health systems have deployed AI — ambient documentation, clinical decision support, scheduling automation — without the governance infrastructure those tools require. That gap is what enforcement actions are built on.",
      }}
      whatWeDo={{
        headline: 'Match. Implement. Govern.',
        body: "We help healthcare organizations find AI that fits their clinical environment, compliance posture, and risk tolerance — then build the implementation path that holds up. That means vendor evaluation against HIPAA BAA requirements, documentation for AI risk analysis, and governance frameworks that meet OCR's current enforcement standard.",
        columns: WHAT_WE_DO_COLUMNS,
      }}
      solutions={SOLUTIONS}
      trust="Develom is led by a GCP Pro Architect with 33 years of IT implementation experience — including regulated-industry deployments where governance documentation isn't optional."
      ctaClose={{
        headline: 'Find the Right AI for Your Health System',
        body: 'Answer a few questions about your clinical environment and compliance posture. We match you to AI solutions built for healthcare — and the implementation path to deploy them safely.',
        cta: 'Start the Match',
      }}
    />
  )
}
