import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Enterprise AI Solutions — Gartner & Analyst-Backed | Develom',
  description:
    'The 20 highest-impact enterprise AI solutions in 2026 — from agentic platforms and document processing to compliance monitoring and healthcare AI. Analyst-backed, deployment-ready.',
  alternates: {
    canonical: 'https://develom.com/solutions',
  },
  openGraph: {
    title: 'Enterprise AI Solutions — Gartner & Analyst-Backed | Develom',
    description:
      'The 20 highest-impact enterprise AI solutions in 2026. Analyst-backed, deployment-ready, regulated-industry-ready.',
    type: 'website',
    url: 'https://develom.com/solutions',
  },
}

interface Solution {
  id: number
  title: string
  description: string
  roi: string
  angle: string
  cluster: string
}

interface Cluster {
  label: string
  tagline: string
  solutions: Solution[]
}

const SOLUTIONS: Solution[] = [
  {
    id: 1,
    title: 'Enterprise Agentic AI Platform',
    cluster: 'foundation',
    description:
      'Centralized orchestration of AI agents across departments with governance and audit trails built in. 40% of enterprise apps will embed agents by end of 2026 (Gartner).',
    roi: '40% of enterprise applications will embed AI agents by end of 2026 (Gartner)',
    angle: 'Architect and deploy your agentic layer.',
  },
  {
    id: 2,
    title: 'AI Model Orchestration & Infrastructure',
    cluster: 'foundation',
    description:
      'Azure AI Foundry, AWS Bedrock, Google Vertex AI — the managed infrastructure layer for enterprise AI. 20–25% of enterprise AI budgets flow here.',
    roi: '20–25% of enterprise AI budget allocation; foundational for all AI deployments above it',
    angle: 'Build on the right foundation.',
  },
  {
    id: 15,
    title: 'AI Governance & Risk Platform',
    cluster: 'foundation',
    description:
      'Audit trails, model risk management, bias detection, and policy enforcement across your AI deployments. Only 1 in 5 companies has mature AI governance today (Futurum 2026).',
    roi: 'Only 1 in 5 companies has mature AI governance (Futurum 2026); regulatory risk growing fast',
    angle: 'Deploy AI you can defend.',
  },
  {
    id: 4,
    title: 'Conversational AI & Customer Service',
    cluster: 'customers',
    description:
      'End-to-end AI agents that resolve customer issues — not just route them. Returns, rebooking, account updates, multi-step transactions handled without human handoff. #1 enterprise AI category in 2026.',
    roi: '5.8x ROI; 30–50% ticket deflection in 90 days (Deloitte 2026)',
    angle: 'Deploy AI that resolves, not just responds.',
  },
  {
    id: 5,
    title: 'AI Sales Intelligence & CRM Automation',
    cluster: 'customers',
    description:
      'Scores inbound leads, drafts personalized outreach, forecasts pipeline, and surfaces the right content during live calls — without adding headcount.',
    roi: '3.7x ROI within 18 months; 3.4-month payback; 300% more qualified leads (McKinsey/Forrester)',
    angle: 'AI handles prospecting; your reps close.',
  },
  {
    id: 6,
    title: 'AI Marketing Ops & Personalization',
    cluster: 'customers',
    description:
      'First-draft content, ad copy variations, SEO optimization, campaign performance analysis, and audience segmentation — at the speed your market moves.',
    roi: '3–5x content output at same headcount; 40% reduction in cost per acquired customer',
    angle: 'Produce more, spend less.',
  },
  {
    id: 7,
    title: 'Intelligent Document Processing',
    cluster: 'operations',
    description:
      'AI reads, classifies, extracts, and acts on unstructured documents — invoices, contracts, claims — at scale. Highest single-use-case ROI in enterprise AI.',
    roi: '320% ROI within 6 months; 70% cost reduction (iEnable/MindPath 2026)',
    angle: 'Automate the paper layer.',
  },
  {
    id: 8,
    title: 'IT Service Desk & ITSM Automation',
    cluster: 'operations',
    description:
      'AI handles password resets, access requests, incident triage, and escalation routing. The #2 enterprise agentic AI category after customer service.',
    roi: '40–60% IT ticket deflection on day one; significant reduction in L1 support costs',
    angle: 'Deflect 40–60% of IT tickets on day one.',
  },
  {
    id: 9,
    title: 'Supply Chain AI & Demand Forecasting',
    cluster: 'operations',
    description:
      'Predicts demand, optimizes inventory levels, and surfaces supply chain risks before they become outages — giving ops teams time to act.',
    roi: 'General Mills: $20M savings; Unilever: 8% cost reduction across 124 factories',
    angle: 'See your supply chain clearly.',
  },
  {
    id: 10,
    title: 'Meeting Intelligence & Workflow Automation',
    cluster: 'operations',
    description:
      'AI captures meetings, extracts action items, drafts follow-ups, assigns and tracks tasks — turning every conversation into an executed plan.',
    roi: '4–6 hours/week reclaimed per manager; 35% higher action item completion rate',
    angle: 'Every meeting becomes an executed plan.',
  },
  {
    id: 20,
    title: 'Hyperautomation & Process AI',
    cluster: 'operations',
    description:
      'End-to-end multi-system automation that orchestrates AI across your entire process stack — not just one step, but the whole workflow.',
    roi: '5.8x ROI; 5.1-month median payback; Unilever: 3% OEE improvement + 8% cost reduction',
    angle: 'Automate end-to-end, not just one step.',
  },
  {
    id: 11,
    title: 'Enterprise RAG & Knowledge Base',
    cluster: 'data',
    description:
      'AI that answers questions from your own documents, databases, and internal knowledge. 38.4% CAGR; $1.94B market. The technology behind enterprise search that actually works.',
    roi: '30–70% efficiency gain; 38.4% CAGR market growth; $1.94B market size',
    angle: 'Make your knowledge searchable and actionable.',
  },
  {
    id: 12,
    title: 'AI Data Analytics & Business Intelligence',
    cluster: 'data',
    description:
      'Natural language querying of business data — any team member, any question, instant answers. Removes the analyst bottleneck from operational decision-making.',
    roi: 'Eliminates analyst bottleneck; 10–20% faster business decision cycles in early deployments',
    angle: 'Any question, any team member, instant answers.',
  },
  {
    id: 13,
    title: 'AI Cybersecurity & Threat Detection',
    cluster: 'protect',
    description:
      'AI-powered threat detection, anomaly identification, and incident response — tuned to detect what rule-based systems miss.',
    roi: 'HSBC: 2–4x more threats detected, 60% fewer false positives; Zero Trust AI: 76% fewer breaches',
    angle: 'Fight AI-powered threats with AI-powered defense.',
  },
  {
    id: 14,
    title: 'AI Compliance & Regulatory Monitoring',
    cluster: 'protect',
    description:
      'Continuous monitoring against regulatory requirements — EU AI Act, SOC 2, HIPAA, financial compliance — with audit trails that hold up under scrutiny.',
    roi: 'EU AI Act Article 50 deadline August 2026; three US state AI laws live now; up to 3% global revenue in fines for non-compliance',
    angle: 'Stay audit-ready, always.',
  },
  {
    id: 3,
    title: 'Per-Employee AI Assistant',
    cluster: 'people',
    description:
      'One persistent AI per knowledge worker that learns each person\'s context, handles recurring tasks, and builds institutional knowledge over time.',
    roi: 'Output equivalent to a 2–3x larger team; $1,200–$2,400 annual productivity value per worker (PwC)',
    angle: 'Give every employee an AI that knows their job.',
  },
  {
    id: 16,
    title: 'AI Coding Agents & Developer Productivity',
    cluster: 'people',
    description:
      'AI coding assistants, automated code review, test generation, and documentation — integrated into your existing development workflow.',
    roi: '71% of developers use AI daily; 55% faster task completion; 5.8x ROI (GitHub)',
    angle: 'AI that codes, reviews, and ships alongside your team.',
  },
  {
    id: 17,
    title: 'AI HR & Talent Operations',
    cluster: 'people',
    description:
      'AI-powered candidate screening, interview scheduling, offer workflow, and onboarding automation — compressing time-to-hire without compromising quality.',
    roi: '75% reduction in time-to-hire; Unilever: 50% faster fill, 16% increase in new-hire diversity',
    angle: 'Hire faster, onboard smoother, retain longer.',
  },
  {
    id: 18,
    title: 'AI Healthcare & Clinical Documentation',
    cluster: 'people',
    description:
      'AI ambient documentation, clinical decision support, and care coordination — FDA-cleared categories now available. Reduces documentation burden for clinicians.',
    roi: '50–70% reduction in documentation time; FDA-cleared solutions now available',
    angle: 'Give clinicians their time back.',
  },
  {
    id: 19,
    title: 'AI Legal & Contract Intelligence',
    cluster: 'people',
    description:
      'Contract review, risk flagging, renewal tracking, and legal research automation. Legora raised $550M Series D at $5.55B valuation in July 2026 — the market is moving fast.',
    roi: '320% ROI in 6 months; Legora $550M Series D at $5.55B valuation (July 2026)',
    angle: 'Review every contract, flag every risk, never miss a renewal.',
  },
]

const CLUSTERS: Cluster[] = [
  {
    label: 'Build the Foundation',
    tagline: 'Get the infrastructure right before the applications.',
    solutions: SOLUTIONS.filter((s) => s.cluster === 'foundation'),
  },
  {
    label: 'Serve Customers Better',
    tagline: 'AI that resolves, persuades, and personalizes at scale.',
    solutions: SOLUTIONS.filter((s) => s.cluster === 'customers'),
  },
  {
    label: 'Automate Operations',
    tagline: 'Remove humans from work that doesn\'t need them.',
    solutions: SOLUTIONS.filter((s) => s.cluster === 'operations'),
  },
  {
    label: 'Unlock Your Data',
    tagline: 'Turn your information into a competitive asset.',
    solutions: SOLUTIONS.filter((s) => s.cluster === 'data'),
  },
  {
    label: 'Protect & Comply',
    tagline: 'Security and compliance that keeps pace with AI risk.',
    solutions: SOLUTIONS.filter((s) => s.cluster === 'protect'),
  },
  {
    label: 'Empower Your People',
    tagline: 'AI built around the human doing the work.',
    solutions: SOLUTIONS.filter((s) => s.cluster === 'people'),
  },
]

const CLUSTER_STYLES: Record<string, { badge: string; accent: string; dot: string }> = {
  'Build the Foundation': {
    badge: 'bg-blue/10 text-blue',
    accent: 'border-blue',
    dot: 'bg-blue',
  },
  'Serve Customers Better': {
    badge: 'bg-violet-50 text-violet-700',
    accent: 'border-violet-500',
    dot: 'bg-violet-500',
  },
  'Automate Operations': {
    badge: 'bg-emerald-50 text-emerald-700',
    accent: 'border-emerald-500',
    dot: 'bg-emerald-500',
  },
  'Unlock Your Data': {
    badge: 'bg-amber-50 text-amber-700',
    accent: 'border-amber-500',
    dot: 'bg-amber-500',
  },
  'Protect & Comply': {
    badge: 'bg-red-50 text-red-700',
    accent: 'border-red-500',
    dot: 'bg-red-500',
  },
  'Empower Your People': {
    badge: 'bg-orange-50 text-orange-700',
    accent: 'border-orange-500',
    dot: 'bg-orange-500',
  },
}

function SolutionCard({ solution, clusterLabel }: { solution: Solution; clusterLabel: string }) {
  const styles = CLUSTER_STYLES[clusterLabel]
  return (
    <div
      className={`flex flex-col gap-4 rounded-xl border border-[#E5E7EB] border-l-[3px] ${styles.accent} bg-white p-6 shadow-sm`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-navy text-[16px] leading-snug" style={{ fontWeight: 700 }}>
          {solution.title}
        </h3>
        <span className="text-[11px] font-semibold text-muted shrink-0 tabular-nums mt-0.5">
          #{solution.id}
        </span>
      </div>
      <p className="text-[14px] leading-[1.65] text-text">{solution.description}</p>
      <div className="rounded-lg bg-[#F8FAFC] px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted mb-1">Signal</p>
        <p className="text-[13px] leading-[1.55] text-text">{solution.roi}</p>
      </div>
      <div className="flex gap-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
          <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 9.75h-1.5V7.25h1.5v4zm0-5.5h-1.5v-1.5h1.5v1.5z" fill="#2563EB" />
        </svg>
        <p className="text-[13px] leading-[1.55] text-blue font-medium">{solution.angle}</p>
      </div>
    </div>
  )
}

export default function SolutionsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy px-6 pb-16 pt-32 md:pb-24 md:pt-44">
        <div className="mx-auto max-w-content">
          <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-blue">
            Solutions
          </p>
          <h1
            className="text-white"
            style={{
              fontSize: 'clamp(2rem, 4vw + 1rem, 3.25rem)',
              lineHeight: 1.15,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              maxWidth: '760px',
            }}
          >
            The 20 Enterprise AI Solutions That Move the Needle in 2026
          </h1>
          <p
            className="mt-6 text-white/70"
            style={{ fontSize: 'clamp(1rem, 1.5vw + 0.5rem, 1.2rem)', lineHeight: 1.65, maxWidth: '620px' }}
          >
            Analyst-backed and deployment-verified. Organized into six operational clusters — from
            infrastructure and governance to customer-facing AI and employee enablement.
          </p>
          <p className="mt-4 text-[13px] text-white/40">
            Sources: Gartner 2026, Deloitte State of AI 2026, Futurum, Forrester Wave Q2 2026,
            McKinsey, GitHub, Salesforce, verified enterprise deployments.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-blue px-6 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Find the right solution for your business
              <svg viewBox="0 0 16 16" fill="none" width={14} height={14} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Cluster index */}
      <section className="border-b border-[#E5E7EB] bg-white px-6 py-10">
        <div className="mx-auto max-w-content">
          <div className="flex flex-wrap gap-3">
            {CLUSTERS.map((c) => {
              const styles = CLUSTER_STYLES[c.label]
              return (
                <span
                  key={c.label}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold ${styles.badge}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                  {c.label}
                </span>
              )
            })}
          </div>
        </div>
      </section>

      {/* Clusters */}
      {CLUSTERS.map((cluster, i) => {
        const styles = CLUSTER_STYLES[cluster.label]
        return (
          <section
            key={cluster.label}
            className={`px-6 py-14 md:py-20 ${i % 2 === 0 ? 'bg-bg-alt' : 'bg-white'}`}
          >
            <div className="mx-auto max-w-content">
              <div className="mb-3 flex items-center gap-4">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold ${styles.badge}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                  {cluster.label}
                </span>
                <div className="h-px flex-1 bg-[#E5E7EB]" />
              </div>
              <p className="mb-10 text-[15px] text-muted">{cluster.tagline}</p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cluster.solutions.map((s) => (
                  <SolutionCard key={s.id} solution={s} clusterLabel={cluster.label} />
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section className="bg-navy px-6 py-20 md:py-28">
        <div className="mx-auto max-w-text text-center">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-blue">
            Where do you start?
          </p>
          <h2
            className="text-white"
            style={{
              fontSize: 'clamp(1.6rem, 3vw + 0.5rem, 2.5rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Match to the right solution for your business
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-white/60">
            Tell us your industry, your current stack, and your biggest operational pain point.
            We&rsquo;ll recommend the two or three solutions with the clearest path to ROI — and
            build the deployment plan to get there.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-blue px-7 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Start the conversation
              <svg viewBox="0 0 16 16" fill="none" width={14} height={14} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <Link
              href="/use-cases"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-7 py-3.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              Browse by use case
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
