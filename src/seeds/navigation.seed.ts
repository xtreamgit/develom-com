import { getPayload } from 'payload'
import configPromise from '@payload-config'

const navigationData = {
  mainNav: [
    { label: 'Solutions', link: '/services', children: [] },
    { label: 'Use Cases', link: '/contact', children: [] },
    {
      label: 'Industry',
      link: '/industries/healthcare',
      children: [
        { label: 'Healthcare', link: '/industries/healthcare' },
        { label: 'Financial Services', link: '/industries/financial-services' },
        { label: 'Legal', link: '/industries/legal' },
        { label: 'Insurance', link: '/industries/insurance' },
        { label: 'Oil & Gas', link: '/industries/oil-gas' },
      ],
    },
    { label: 'Blog', link: '/blog', children: [] },
    {
      label: 'Resources',
      link: '/resources',
      children: [
        { label: 'AI Governance Guide', link: '/resources/ai-governance-guide' },
        { label: 'Agentic AI Tools', link: '/resources/agentic-ai-tools' },
      ],
    },
    { label: 'Pricing', link: '/contact', children: [] },
  ],
  footerNav: [
    {
      groupLabel: 'Services',
      links: [
        { label: 'AI Architecture & Systems Design', link: '/services' },
        { label: 'AI Application Development', link: '/services' },
        { label: 'Automation Solutioning', link: '/services' },
      ],
    },
    {
      groupLabel: 'Company',
      links: [
        { label: 'About', link: '/about' },
        { label: 'Portfolio', link: '/portfolio' },
        { label: 'Blog', link: '/blog' },
        { label: 'Contact', link: '/contact' },
      ],
    },
    {
      groupLabel: 'Legal',
      links: [
        { label: 'Privacy Policy', link: '/privacy-policy' },
        { label: 'Terms of Service', link: '/terms' },
      ],
    },
  ],
  ctaButton: {
    label: 'Get Started',
    link: '/contact',
    variant: 'primary' as const,
  },
}

const siteSettingsData = {
  siteTitle: 'Develom',
  siteDescription:
    'AI consulting and development for regulated industries. HIPAA-ready, AML/KYC-compliant solutions.',
  primaryCTA: 'Book a Discovery Call',
  contactEmail: 'contact@agents.develom.com',
  linkedinUrl: 'https://www.linkedin.com/company/develom',
  githubUrl: 'https://github.com/develom-dev',
  twitterUrl: 'https://twitter.com/develom',
  youtubeUrl: 'https://youtube.com/@develom',
  instagramUrl: 'https://instagram.com/develom',
  googleAnalyticsId: 'G-8TXQH76GDK',
}

export async function seedNavigation() {
  const payload = await getPayload({ config: configPromise })

  console.log('  Seeding navigation global...')
  await payload.updateGlobal({
    slug: 'navigation',
    data: navigationData,
  })
  console.log('  ✓ Navigation global seeded')

  console.log('  Seeding site-settings global...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: siteSettingsData,
  })
  console.log('  ✓ Site settings global seeded')

  console.log('\nNavigation seed complete.')
}

const _isMain = import.meta.url === `file://${process.argv[1]}`
if (_isMain) {
  seedNavigation()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
