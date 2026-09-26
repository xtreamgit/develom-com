import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import HeroSection from '@/components/home/HeroSection'
import PillarsSection from '@/components/home/PillarsSection'
import OutcomesSection from '@/components/home/OutcomesSection'
import SolutionsOutcome from '@/components/home/SolutionsOutcome'
import SolutionFinder from '@/components/home/SolutionFinder'
import UseCasesSection from '@/components/home/UseCasesSection'
import ResourcesSection from '@/components/home/ResourcesSection'
import BlogSection from '@/components/home/BlogSection'
import FooterCTA from '@/components/home/FooterCTA'
import ComplianceCalendar from '@/components/home/ComplianceCalendar'
import type { ComplianceItem } from '@/components/home/ComplianceCalendar'
import { getComplianceDeadlines } from '@/lib/getGlobals'
import { formatDate } from '@/lib/relativeTime'

export const metadata: Metadata = {
  title: 'Develom | Operational AI Agents, Managed for You.',
  description:
    'Develom manages operational AI agents end-to-end for regulated industries — so your team stays in control without the operational overhead.',
  openGraph: {
    title: 'Develom | Operational AI Agents, Managed for You.',
    description:
      'Operational AI workflows running continuously in regulated industries — managed by Develom.',
    url: 'https://develom.com',
    siteName: 'Develom',
    images: [{ url: '/og-home.png', width: 1200, height: 630, alt: 'Develom' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Develom | Operational AI Agents, Managed for You.',
    description:
      'Operational AI workflows running continuously in regulated industries — managed by Develom.',
    images: ['/og-home.png'],
  },
  alternates: {
    canonical: 'https://develom.com',
  },
}

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })

  let posts: any[] = []

  try {
    const postsResult = await payload.find({
      collection: 'blog-posts',
      where: { _status: { equals: 'published' } },
      sort: '-date',
      limit: 3,
    })
    posts = postsResult.docs
  } catch {
    /* DB may not be migrated yet */
  }

  const rawDeadlines = await getComplianceDeadlines()
  const complianceItems: ComplianceItem[] = rawDeadlines.map((d) => ({
    requirement: d.requirement,
    dueDate: formatDate(d.dueDate),
    vertical: d.vertical,
    regulatoryBody: d.regulatoryBody,
  }))

  return (
    <>
      <HeroSection />
      <PillarsSection />
      <OutcomesSection />
      <SolutionsOutcome />
      <SolutionFinder />
      {complianceItems.length > 0 && <ComplianceCalendar items={complianceItems} />}
      <UseCasesSection />
      <ResourcesSection />
      {posts.length > 0 && <BlogSection posts={posts} />}
      <FooterCTA />
    </>
  )
}
