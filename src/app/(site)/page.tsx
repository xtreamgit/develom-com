import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import HeroSection from '@/components/home/HeroSection'
import TrustStrip from '@/components/home/TrustStrip'
import SocialProof from '@/components/home/SocialProof'
import PillarsStrip from '@/components/home/PillarsStrip'
import WhatWeDoSection from '@/components/home/WhatWeDoSection'
import PortfolioTeaser from '@/components/home/PortfolioTeaser'
import AuthoritySignal from '@/components/home/AuthoritySignal'
import BlogSection from '@/components/home/BlogSection'
import FooterCTA from '@/components/home/FooterCTA'

export const metadata: Metadata = {
  title: 'Develom | AI Automation for Regulated Industries',
  description:
    'Develom builds AI systems for healthcare, finance, insurance, and legal — where compliance, security, and auditability are non-negotiable.',
  openGraph: {
    title: 'Develom | AI Automation for Regulated Industries',
    description:
      'AI systems built for industries where getting it wrong is not an option.',
    url: 'https://develom.com',
    siteName: 'Develom',
    images: [{ url: '/og-home.png', width: 1200, height: 630, alt: 'Develom' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Develom | AI Automation for Regulated Industries',
    description:
      'AI systems built for industries where getting it wrong is not an option.',
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
  let projects: any[] = []

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

  try {
    const projectsResult = await payload.find({
      collection: 'portfolio-projects',
      sort: 'order',
    })
    projects = projectsResult.docs
  } catch {
    /* DB may not be migrated yet */
  }

  return (
    <>
      <HeroSection />
      <TrustStrip />
      <SocialProof />
      <PillarsStrip />
      <WhatWeDoSection />
      {/* Industry row — Option A: static text only, no /industries/[vertical] links.
          Build routes post-launch. */}
      <div className="bg-[#0A0F1E] px-6 py-10 text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/40">
          Built for
        </p>
        <p className="mt-2 text-[16px] font-semibold text-white/70">
          Healthcare &nbsp;·&nbsp; Finance &nbsp;·&nbsp; Legal &nbsp;·&nbsp; Insurance
        </p>
      </div>
      <PortfolioTeaser projects={projects} />
      <AuthoritySignal />
      <BlogSection posts={posts} />
      <FooterCTA />
    </>
  )
}
