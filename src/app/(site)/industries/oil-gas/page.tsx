import type { Metadata } from 'next'
import IndustryPage from '@/components/industries/IndustryPage'

export const metadata: Metadata = {
  title: 'AI for Oil & Gas — Operational, Safety, and ESG Compliance | Develom',
  description:
    'Predictive maintenance, emissions tracking, safety monitoring, supply chain optimization — Develom matches oil and gas operators with AI built for a regulated, high-consequence environment.',
  openGraph: {
    title: 'AI for Oil & Gas — Operational, Safety, and ESG Compliance | Develom',
    type: 'website',
    images: [{ url: '/og/og-industry-oil-gas.jpg', width: 1200, height: 630 }],
  },
}

const WHAT_WE_DO_COLUMNS = [
  {
    title: 'Operational AI',
    description: 'We match AI tools to your operational environment — field equipment, SCADA systems, and ERP infrastructure — with sensor integration for predictive maintenance and production optimization.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Compliance Architecture',
    description: 'We design data pipeline architecture for ESG reporting, SEC climate disclosure, EU CSRD obligations, and state environmental reporting — built into the deployment, not added after.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Safety Integration',
    description: 'Anomaly detection tuned for safety-critical environments, with governance documentation designed for OSHA compliance and regulatory audit requirements.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="9" x2="12" y2="13" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="17" x2="12.01" y2="17" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
]

const SOLUTIONS = [
  {
    category: 'Automate & Optimize',
    items: 'Predictive maintenance, drilling optimization, equipment health monitoring, procurement and supply chain automation.',
  },
  {
    category: 'Analyze & Predict',
    items: 'Production forecasting, emissions tracking and carbon accounting, reservoir analysis, demand modeling.',
  },
  {
    category: 'Protect & Detect',
    items: 'Pipeline and refinery anomaly detection, safety incident prediction, environmental monitoring, leak detection.',
  },
  {
    category: 'Innovate & Grow',
    items: 'ESG reporting automation, regulatory disclosure preparation, operational efficiency benchmarking.',
  },
]

export default function OilGasPage() {
  return (
    <IndustryPage
      eyebrow="Oil & Gas AI"
      hero={{
        headline: 'AI for Oil & Gas — Built for the Operational and Regulatory Pressure',
        subheadline:
          'Predictive maintenance, emissions compliance, safety monitoring, supply chain optimization — Develom matches oil and gas operators with AI that performs in high-consequence environments and holds up under EPA, OSHA, and ESG disclosure scrutiny.',
        cta: 'Find the Right AI for Your Operation',
      }}
      problem={{
        headline: 'The Margin for Error Is Narrow. The Regulatory Surface Is Wide.',
        body: 'Unplanned downtime in oil and gas operations is expensive in every direction — lost production, equipment replacement, safety exposure, and regulatory scrutiny that follows any incident. At the same time, the ESG disclosure environment is tightening: SEC climate disclosure rules, EU CSRD requirements for global operators, and state-level environmental reporting mandates are creating a parallel compliance burden. AI is already being deployed across upstream, midstream, and downstream operations — the question is whether it\'s being deployed in a way that\'s reliable, auditable, and integrated with the regulatory obligations attached to it.',
      }}
      whatWeDo={{
        headline: 'Match the Right AI to the Right Operation',
        body: "We help oil and gas operators identify AI that fits their operational environment — field equipment, SCADA systems, ERP and supply chain infrastructure — and build the implementation path that meets both performance and compliance requirements. That means sensor integration for predictive maintenance, data pipeline design for ESG reporting, anomaly detection tuned for safety-critical environments, and governance documentation for audit and regulatory review.",
        columns: WHAT_WE_DO_COLUMNS,
      }}
      solutions={SOLUTIONS}
      trust="Develom's implementation methodology is designed for operational environments where the cost of a bad deployment isn't a sprint backlog item — it's a shutdown, an incident report, or a regulatory filing. GCP Pro Architect-led, 33 years of enterprise IT experience."
      ctaClose={{
        headline: 'Find the Right AI for Your Oil & Gas Operation',
        body: 'Tell us about your operational environment, regulatory exposure, and deployment goals. We match you to AI built for high-consequence, compliance-heavy operations — and build the implementation path to deploy it safely.',
        cta: 'Start the Match',
      }}
    />
  )
}
