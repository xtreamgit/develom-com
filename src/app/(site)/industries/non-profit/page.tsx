import type { Metadata } from 'next'
import IndustryPage from '@/components/industries/IndustryPage'

export const metadata: Metadata = {
  title: 'AI for Non-Profits — Donor Trust, Transparency & Mission Operations | Develom',
  description:
    'Donor engagement, grant reporting, program operations, and communications AI for mission-driven organizations — built for donor privacy, AI disclosure, and accountability to funders, boards, and regulators. Develom matches non-profits with AI that holds up under review.',
  alternates: {
    canonical: 'https://develom.com/industries/non-profit',
  },
  openGraph: {
    title: 'AI for Non-Profits — Donor Trust, Transparency & Mission Operations | Develom',
    description:
      'Donor engagement, grant reporting, and program operations AI for non-profits — built for donor privacy, transparency, and accountability to funders and boards.',
    type: 'website',
    url: 'https://develom.com/industries/non-profit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI for Non-Profits — Donor Trust, Transparency & Mission Operations | Develom',
    description:
      'Donor engagement, grant reporting, and program operations AI for non-profits — built for donor privacy, transparency, and board accountability.',
  },
}

const WHAT_WE_DO_COLUMNS = [
  {
    title: 'Donor & Development AI',
    description:
      'We match AI to your donor system of record — CRM integration for engagement, segmentation, and stewardship — so the team spends less time on data entry and more time on relationships.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Transparency & Governance',
    description:
      'Any AI that communicates on your behalf carries a clear AI disclosure and a reviewable trail — built into the deployment, not bolted on. Honest with donors by design.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Program & Reporting Integration',
    description:
      'Automation for grant reporting, impact tracking, and program operations, with documentation designed for funder review and board accountability.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="14 2 14 8 20 8" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="16" y1="13" x2="8" y2="13" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="17" x2="8" y2="17" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        <polyline points="10 9 9 9 8 9" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
]

const SOLUTIONS = [
  {
    category: 'Automate & Optimize',
    items: 'Donor data hygiene, gift and acknowledgment workflows, volunteer and program scheduling, communications drafting.',
  },
  {
    category: 'Analyze & Predict',
    items: 'Donor retention and lapse modeling, campaign performance, grant pipeline forecasting, program outcome analysis.',
  },
  {
    category: 'Protect & Disclose',
    items: 'Donor data privacy controls, AI disclosure on outbound communications, consent and preference handling, auditable records.',
  },
  {
    category: 'Grow & Sustain',
    items: 'Grant reporting automation, impact storytelling support, stewardship personalization, operating-efficiency benchmarking.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How can non-profits use AI without compromising donor privacy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Non-profits can deploy AI responsibly by integrating it with their existing donor CRM rather than moving data to third-party systems, applying access controls that match their data governance policies, and building disclosure mechanisms into any AI that communicates externally. Effective implementations log every action the AI takes on donor records and provide a reviewable audit trail — so the organization can demonstrate to funders and boards exactly how AI is being used and what safeguards are in place.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are non-profits required to disclose when AI communicates with donors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Disclosure obligations for AI-generated communications vary by jurisdiction and are evolving rapidly. In the US, several states have introduced or passed laws requiring disclosure when AI generates consumer-facing content. Regardless of current legal minimums, mission-driven organizations face a higher accountability standard with donors: a message that reads as personal but was generated by AI — without disclosure — can damage trust if discovered. Develom builds AI disclosure into outbound communications by default, not as an add-on.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does AI help non-profits with grant reporting and program operations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI can automate the data aggregation, formatting, and narrative drafting that goes into grant reports — pulling from program records, financial systems, and outcome tracking tools. For program operations, AI can assist with scheduling, communications, and impact tracking. The key for non-profits is that grant reporting AI must produce documentation that funders can independently verify: every metric needs a traceable source, and the AI must be able to show its work. Develom designs these implementations with funder review in mind from the start.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does AI implementation look like for a small non-profit team?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For small non-profit teams, the right AI implementation starts with the highest-friction workflows — typically donor communications, acknowledgment letters, grant narrative drafts, and data cleanup — and integrates with the CRM and email tools already in use. The goal is to give the team leverage without requiring them to manage new infrastructure. Develom matches non-profits to AI that fits their existing systems and builds implementations that the team can actually use and that leadership can explain to their board.',
      },
    },
  ],
}

export default function NonProfitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <IndustryPage
        eyebrow="Non-Profit AI"
        hero={{
          headline: 'AI for Non-Profits — Built for Donor Trust and the Scrutiny That Comes With It',
          subheadline:
            'Donor engagement, grant reporting, program operations, communications — Develom matches mission-driven organizations with AI that respects donor privacy, discloses itself when it speaks on your behalf, and holds up under funder, board, and regulatory review.',
          cta: 'Find the Right AI for Your Mission',
        }}
        problem={{
          headline: 'Lean Teams, High Trust, Little Room for a Misstep',
          body: 'Non-profits run on trust and thin margins. The same small team is expected to steward donor relationships, report to funders, run programs, and stay compliant — often without the staff to do all of it well. AI can lift that load, but a mission-driven organization carries a specific exposure: the moment AI touches a donor record or writes a message that goes out under your name, you inherit obligations around privacy, transparency, and accuracy. The question is not whether to use AI — it's whether it's deployed in a way that's reliable, auditable, and honest with the people who fund your work.',
        }}
        stakesText="Donor trust is the balance sheet. An AI message that misfires, a record that leaks, or automation that can't explain itself doesn't just create audit risk — it puts the relationship that funds the mission at risk."
        approachText="Match first. Build second. Disclose throughout."
        whatWeDo={{
          headline: 'Match the Right AI to the Right Part of Your Mission',
          body: "We help non-profits identify AI that fits how they actually operate — the CRM or donor system of record, email and communications tools, grant and program workflows — and build the implementation path that protects donor trust while it saves the team time. That means integration with your existing donor platform, governance for any AI that communicates externally, and documentation your board and funders can actually review.",
          columns: WHAT_WE_DO_COLUMNS,
        }}
        solutions={SOLUTIONS}
        trust="Develom's implementation methodology is designed for organizations where a bad deployment isn't a backlog item — it's a damaged donor relationship or a funder's confidence. GCP Pro Architect-led, 33 years of enterprise IT experience."
        proofPoint="We put this to work for a Dallas Non-Profit Organization. We deployed an AI assistant on their existing donor system of record to support development and engagement work. Because it drafts communications that reach people outside the organization, every message it helps send carries a clear AI disclosure, and every action it takes is logged and reviewable — so the team gets leverage without asking donors to trust a black box."
        ctaClose={{
          headline: 'Find the Right AI for Your Mission',
          body: 'Tell us about your donor systems, your reporting obligations, and where your team is stretched thin. We match you to AI built for trust-sensitive, transparency-first work — and build the implementation path to deploy it responsibly.',
          cta: 'Start the Match',
        }}
      />
    </>
  )
}
