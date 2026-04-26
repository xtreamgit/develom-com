import { getPayload } from 'payload'
import configPromise from '@payload-config'

const navigationData = {
  mainNav: [
    { label: 'Services', link: '/services', children: [] },
    { label: 'Portfolio', link: '/portfolio', children: [] },
    { label: 'About', link: '/about', children: [] },
    { label: 'Blog', link: '/blog', children: [] },
    { label: 'Contact', link: '/contact', children: [] },
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
    label: 'Book a Discovery Call',
    link: '/contact',
    variant: 'primary' as const,
  },
}

const siteSettingsData = {
  siteTitle: 'Develom',
  siteDescription:
    'AI consulting and development for regulated industries. HIPAA, AML, SOC 2 compliant solutions.',
  primaryCTA: 'Book a Discovery Call',
  contactEmail: 'hello@develom.com',
  linkedinUrl: 'https://www.linkedin.com/company/develom',
  githubUrl: 'https://github.com/develom-dev',
  twitterUrl: 'https://twitter.com/develom',
  youtubeUrl: 'https://youtube.com/@develom',
  instagramUrl: 'https://instagram.com/develom',
  googleAnalyticsId: 'G-CP1M66J7RB',
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
