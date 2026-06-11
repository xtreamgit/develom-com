import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import ServicesHero from '@/components/services/ServicesHero'
import ServicesGroups from '@/components/services/ServicesGroups'
import ComplianceStrip from '@/components/services/ComplianceStrip'
import ServicesCTA from '@/components/services/ServicesCTA'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'AI Services — Architecture, Applications & Automation | Develom',
  description:
    'Develom builds AI architecture, agentic applications, and automation systems for regulated industries. GCP-native. Compliance-ready by default.',
}

export default async function ServicesPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: services } = await payload.find({
    collection: 'services',
    where: { status: { equals: 'published' } },
    sort: 'sortOrder',
    limit: 20,
  })

  return (
    <main>
      <ServicesHero />
      <ServicesGroups services={services} />
      <ComplianceStrip />
      <ServicesCTA />
    </main>
  )
}
