import type { Metadata } from 'next'
import HomeHero from '@/components/home/HomeHero'
import HomeWork from '@/components/home/HomeWork'
import HomeOrchestration from '@/components/home/HomeOrchestration'
import HomeGovernance from '@/components/home/HomeGovernance'
import HomeAccountability from '@/components/home/HomeAccountability'
import HomeCTA from '@/components/home/HomeCTA'

export const metadata: Metadata = {
  title: 'Develom | AI Agent Orchestration & Governance',
  description:
    'Develom builds, orchestrates, and governs AI agents that do real work for your business — with the accountability and data protection to back it.',
  openGraph: {
    title: 'Develom | AI Agent Orchestration & Governance',
    description:
      'Develom builds, orchestrates, and governs AI agents that do real work for your business — with the accountability and data protection to back it.',
    url: 'https://develom.com',
    siteName: 'Develom',
    images: [{ url: '/og-home.png', width: 1200, height: 630, alt: 'Develom' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Develom | AI Agent Orchestration & Governance',
    description:
      'Develom builds, orchestrates, and governs AI agents that do real work for your business — with the accountability and data protection to back it.',
    images: ['/og-home.png'],
  },
  alternates: {
    canonical: 'https://develom.com',
  },
}

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeWork />
      <HomeOrchestration />
      <HomeGovernance />
      <HomeAccountability />
      <HomeCTA />
    </>
  )
}
