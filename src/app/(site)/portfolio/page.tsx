import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import PortfolioHero from '@/components/portfolio/PortfolioHero'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import PortfolioCTA from '@/components/portfolio/PortfolioCTA'
import type { PortfolioProject } from '@/types/portfolio'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Portfolio | Develom AI Projects',
  description:
    'AI architecture, agentic applications, and automation systems built by Develom for regulated industries. Explore our flagship GCP-native AI projects.',
}

export default async function PortfolioPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'portfolio-projects',
    sort: 'order',
    limit: 20,
  })

  // Cast to local type — Payload type is a superset
  const projects = docs as unknown as PortfolioProject[]

  const flagship = projects.find((p) => p.flagship === true) ?? null
  const others = projects.filter((p) => p.flagship !== true)

  return (
    <main>
      <PortfolioHero />
      <PortfolioGrid flagship={flagship} projects={others} />
      <PortfolioCTA />
    </main>
  )
}
