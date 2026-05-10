import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import HeroSection from '@/components/home/HeroSection'
import TrustStrip from '@/components/home/TrustStrip'
import SolutionsOutcome from '@/components/home/SolutionsOutcome'
import SolutionFinder from '@/components/home/SolutionFinder'
import ReferralBanner from '@/components/home/ReferralBanner'
import UseCasesSection from '@/components/home/UseCasesSection'
import ResourcesSection from '@/components/home/ResourcesSection'
import BlogSection from '@/components/home/BlogSection'
import FooterCTA from '@/components/home/FooterCTA'

export const metadata: Metadata = {
  title: 'Develom | Intelligent AI Solutions. Measurable Impact.',
  description:
    'We help businesses of all sizes automate, optimize, and accelerate with AI solutions built for real-world results.',
  openGraph: {
    title: 'Develom | Intelligent AI Solutions. Measurable Impact.',
    description:
      'AI solutions that automate, optimize, and accelerate your business — with measurable results.',
    url: 'https://develom.com',
    siteName: 'Develom',
    images: [{ url: '/og-home.png', width: 1200, height: 630, alt: 'Develom' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Develom | Intelligent AI Solutions. Measurable Impact.',
    description:
      'AI solutions that automate, optimize, and accelerate your business — with measurable results.',
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
      where: { published: { equals: true } },
      sort: '-date',
      limit: 3,
    })
    posts = postsResult.docs
  } catch {
    /* DB may not be migrated yet */
  }

  return (
    <>
      <HeroSection />
      <TrustStrip />
      <SolutionsOutcome />
      <SolutionFinder />
      <ReferralBanner />
      <UseCasesSection />
      <ResourcesSection />
      {posts.length > 0 && <BlogSection posts={posts} />}
      <FooterCTA />
    </>
  )
}
