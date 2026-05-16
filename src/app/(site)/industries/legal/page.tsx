import type { Metadata } from 'next'
import IndustryPage from '@/components/industries/IndustryPage'

export const metadata: Metadata = {
  title: 'AI for Legal Teams — Reliable, Defensible, Deployable | Develom',
  description:
    'Contract review, discovery, legal research — AI is in every major law firm and legal department. Develom helps legal teams find and deploy AI that\'s accurate enough to rely on and defensible enough to stand behind.',
  openGraph: {
    title: 'AI for Legal Teams — Reliable, Defensible, Deployable | Develom',
    type: 'website',
    images: [{ url: '/og/og-industry-legal.jpg', width: 1200, height: 630 }],
  },
}

const WHAT_WE_DO_COLUMNS = [
  {
    title: 'Task Matching',
    description: 'Contract review, discovery, research, and drafting tools have different accuracy profiles. We identify which AI fits which task — before you deploy.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Accuracy Evaluation',
    description: 'We evaluate AI tools against the accuracy standards your practice requires — because hallucination rates that are acceptable in one context are sanctionable in another.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Governance & Oversight',
    description: 'We design human review workflows and document governance structures that satisfy bar guidance and partner sign-off requirements.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const SOLUTIONS = [
  {
    category: 'Automate & Optimize',
    items: 'Contract review automation, document extraction, matter intake and routing.',
  },
  {
    category: 'Analyze & Predict',
    items: 'Case outcome analysis, clause risk flagging, eDiscovery triage and prioritization.',
  },
  {
    category: 'Engage & Assist',
    items: 'Client communication tools, legal research assistants, drafting support.',
  },
  {
    category: 'Protect & Detect',
    items: 'Privilege screening, conflict detection, data security and access monitoring.',
  },
]

export default function LegalPage() {
  return (
    <IndustryPage
      eyebrow="Legal AI"
      hero={{
        headline: "Legal AI That's Defensible, Not Just Impressive",
        subheadline:
          "The legal profession's exposure to AI hallucination, privilege risk, and unauthorized practice concerns is real. Develom matches legal teams with AI that's accurate enough to use, controllable enough to trust, and implemented in a way that holds up to partner scrutiny.",
        cta: 'Find the Right AI for Your Legal Team',
      }}
      problem={{
        headline: "The Risk Isn't That AI Is Wrong. It's That You Won't Know When It Is.",
        body: "Hallucination in legal AI isn't a hypothetical — it's a sanctionable event. Bar associations across the US have issued guidance on AI use, and courts are beginning to require disclosure. The firms and legal departments moving fastest on AI are the ones that have learned which tools are accurate enough for which tasks — and built the human oversight structure to catch what isn't. The ones moving blindly are the ones generating the case law everyone else will cite.",
      }}
      whatWeDo={{
        headline: 'Match the Tool to the Task, Then Build the Guardrails',
        body: "Not all legal AI is the same. Contract review tools, discovery platforms, legal research assistants, and document drafting aids all have different accuracy profiles and appropriate use cases. We help legal teams identify which AI fits which task, structure the human review workflow, and deploy with the documentation that satisfies bar guidance and partner sign-off.",
        columns: WHAT_WE_DO_COLUMNS,
      }}
      solutions={SOLUTIONS}
      trust={`Develom's implementation methodology is built for environments where getting it wrong has professional consequences. We design human oversight into every AI deployment — because in legal, "the AI did it" is not a defense.`}
      ctaClose={{
        headline: 'Find the Right AI for Your Legal Team',
        body: 'Tell us about your practice area, use case, and risk tolerance. We match you to AI tools that fit — and build the review structure that makes them safe to use.',
        cta: 'Start the Match',
      }}
    />
  )
}
