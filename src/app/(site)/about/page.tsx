import type { Metadata } from 'next'

import AboutHero from '@/components/about/AboutHero'
import FounderSection from '@/components/about/FounderSection'
import MissionSection from '@/components/about/MissionSection'
import TeamSection from '@/components/about/TeamSection'
import AboutCTA from '@/components/about/AboutCTA'

export const metadata: Metadata = {
  title: 'About Develom | AI Engineering for Regulated Industries',
  description:
    'Develom is an AI engineering firm founded by Hector DeJesus — 33 years of IT engineering, Google Cloud certified, building AI systems that regulated industries can trust.',
}

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <FounderSection />
      <MissionSection />
      <TeamSection />
      <AboutCTA />
    </main>
  )
}
