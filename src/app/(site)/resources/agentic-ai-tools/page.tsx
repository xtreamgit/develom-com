import type { Metadata } from 'next'
import AgenticToolsHero from '@/components/resources/AgenticToolsHero'
import AgenticToolsGrid from '@/components/resources/AgenticToolsGrid'
import AgenticToolsCTA from '@/components/resources/AgenticToolsCTA'

export const metadata: Metadata = {
  title: 'Top 10 Agentic AI Tools | Develom Resources',
  description:
    "A practitioner's guide to the leading frameworks, platforms, and infrastructure tools behind production agentic AI — stage-tagged and indexed by use case.",
}

export default function AgenticToolsPage() {
  return (
    <main>
      <AgenticToolsHero />
      <AgenticToolsGrid />
      <AgenticToolsCTA />
    </main>
  )
}
