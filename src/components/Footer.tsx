import Image from 'next/image'
import Link from 'next/link'
import { getNavigation, getSiteSettings } from '@/lib/getGlobals'

const SOCIAL_ICONS: Record<string, { icon: string; label: string }> = {
  linkedinUrl: { icon: '/linkedin.svg', label: 'LinkedIn' },
  twitterUrl: { icon: '/twitter.svg', label: 'Twitter' },
  youtubeUrl: { icon: '/youtube.svg', label: 'YouTube' },
  instagramUrl: { icon: '/instagram.svg', label: 'Instagram' },
  githubUrl: { icon: '/github.svg', label: 'GitHub' },
}

export default async function Footer() {
  let nav = null
  let settings = null

  try {
    ;[nav, settings] = await Promise.all([getNavigation(), getSiteSettings()])
  } catch {
    // Globals not yet seeded — render fallback
  }

  const footerGroups = nav?.footerNav ?? [
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
  ]

  // Build active social links from settings
  const socialLinks = Object.entries(SOCIAL_ICONS)
    .map(([key, meta]) => {
      const url = settings?.[key as keyof typeof settings] as string | null | undefined
      return url ? { href: url, ...meta } : null
    })
    .filter(Boolean) as { href: string; icon: string; label: string }[]

  const contactEmail = settings?.contactEmail ?? 'contact@agents.develom.com'

  return (
    <footer className="bg-[#0A0F1A]">
      <div className="mx-auto max-w-content px-6 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1fr_repeat(3,auto)]">
          {/* Brand column */}
          <div>
            <p className="text-[16px] font-bold text-white">DEVELOM</p>
            <p className="mt-2 text-[14px] text-muted">AI Automation for Regulated Industries</p>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-3 block text-[13px] text-white/50 hover:text-white/80 transition-colors"
            >
              {contactEmail}
            </a>
            <p className="mt-4 text-micro text-muted">
              &copy; {new Date().getFullYear()} Develom LLC. All rights reserved.
            </p>
          </div>

          {/* Footer nav groups */}
          {footerGroups.map((group) => (
            <div key={group.groupLabel}>
              <p className="text-label uppercase text-white/60">{group.groupLabel}</p>
              <div className="mt-4 flex flex-col gap-3">
                {(group.links ?? []).map((link) => (
                  <Link
                    key={link.link}
                    href={link.link}
                    className="text-[14px] text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <Link
            href="/privacy-policy"
            className="text-micro text-white/50 hover:text-white/80 transition-colors"
          >
            Privacy Policy
          </Link>
          {socialLinks.length > 0 && (
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="opacity-50 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={social.icon}
                    alt={social.label}
                    width={20}
                    height={20}
                    className="invert"
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
