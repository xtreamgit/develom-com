import React from 'react'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/shared/CookieConsent'
import VelomChatLoader from '@/components/VelomChatLoader'
import { getSiteSettings } from '@/lib/getGlobals'
import './globals.css'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Develom LLC',
  url: 'https://develom.com',
  logo: 'https://develom.com/develom_logo.svg',
  sameAs: [
    'https://www.linkedin.com/company/develom',
    'https://twitter.com/develom',
    'https://github.com/develom-dev',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: 'https://develom.com/contact',
  },
}

export const metadata: Metadata = {
  metadataBase: new URL('https://develom.com'),
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  let settings = null
  try {
    settings = await getSiteSettings()
  } catch {
    // Global not yet seeded — use env var fallback
  }

  const gaId = settings?.googleAnalyticsId ?? process.env.NEXT_PUBLIC_GA_ID ?? null
  const headScripts = settings?.scripts?.headScripts ?? null
  const bodyScripts = settings?.scripts?.bodyScripts ?? null

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {process.env.NODE_ENV === 'production' && headScripts && (
          <div dangerouslySetInnerHTML={{ __html: headScripts }} />
        )}
      </head>
      <body className="font-sans text-text antialiased">
        <Nav />
        {children}
        <Footer />
        <CookieConsent gaId={gaId} />
        {process.env.NEXT_PUBLIC_API_URL && <VelomChatLoader />}
        <Analytics />
        <SpeedInsights />
        {process.env.NODE_ENV === 'production' && bodyScripts && (
          <div dangerouslySetInnerHTML={{ __html: bodyScripts }} />
        )}
      </body>
    </html>
  )
}
