import Image from 'next/image'
import Link from 'next/link'

const serviceLinks = [
  { label: 'Automation', href: '/services#automation' },
  { label: 'Compliance', href: '/services#compliance' },
  { label: 'Scalability', href: '/services#scalability' },
  { label: 'Security', href: '/services#security' },
  { label: 'Sustainability', href: '/services#sustainability' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = [
  { icon: '/linkedin.svg', alt: 'LinkedIn', href: 'https://www.linkedin.com/company/develom' },
  { icon: '/twitter.svg', alt: 'Twitter', href: 'https://twitter.com/develom' },
  { icon: '/youtube.svg', alt: 'YouTube', href: 'https://youtube.com/@develom' },
  { icon: '/instagram.svg', alt: 'Instagram', href: 'https://instagram.com/develom' },
  { icon: '/github.svg', alt: 'GitHub', href: 'https://github.com/develom-dev' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A0F1A]">
      <div className="mx-auto max-w-content px-6 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <p className="text-[16px] font-bold text-white">DEVELOM</p>
            <p className="mt-2 text-[14px] text-muted">
              AI Automation for Regulated Industries
            </p>
            <p className="mt-4 text-micro text-muted">
              &copy; 2026 Develom LLC. All rights reserved.
            </p>
          </div>

          {/* Services column */}
          <div>
            <p className="text-label uppercase text-white/60">Services</p>
            <div className="mt-4 flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[14px] text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company column */}
          <div>
            <p className="text-label uppercase text-white/60">Company</p>
            <div className="mt-4 flex flex-col gap-3">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[14px] text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect column */}
          <div>
            <p className="text-label uppercase text-white/60">Connect</p>
            <div className="mt-4 flex gap-4">
              {socialLinks.slice(0, 2).map((social) => (
                <a
                  key={social.alt}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.alt}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={social.icon}
                    alt={social.alt}
                    width={20}
                    height={20}
                    className="invert"
                  />
                </a>
              ))}
            </div>
            <form className="mt-6">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email address"
                  className="min-w-0 flex-1 rounded border border-white/20 bg-white/10 px-3 py-2 text-[13px] text-white placeholder:text-white/40 focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
                />
                <button
                  type="submit"
                  className="rounded bg-blue px-3 py-2 text-[13px] font-semibold text-white hover:brightness-90 transition-all"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <Link href="/privacy" className="text-micro text-white/50 hover:text-white/80 transition-colors">
            Privacy Policy
          </Link>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.alt}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.alt}
                className="opacity-50 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={social.icon}
                  alt={social.alt}
                  width={20}
                  height={20}
                  className="invert"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
