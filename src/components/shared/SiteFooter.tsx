import Link from 'next/link'

const services = [
  'Agentic AI Systems',
  'Compliance Automation',
  'GCP-Native MLOps',
]

const nav = [
  { label: 'Home',      href: '/' },
  { label: 'About',     href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog',      href: '/blog' },
  { label: 'Contact',   href: '/contact' },
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy px-6 py-14">
      <div className="mx-auto max-w-content">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* Brand */}
          <div>
            <p className="text-[18px] font-bold text-white">Develom</p>
            <p className="mt-2 max-w-[260px] text-[14px] leading-relaxed text-white/50">
              AI automation for regulated industries — built for compliance, security, and auditability.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
              Services
            </p>
            <ul className="mt-4 space-y-2">
              {services.map((s) => (
                <li key={s} className="text-[14px] text-white/60">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
              Company
            </p>
            <ul className="mt-4 space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-[14px] text-white/60 transition-colors hover:text-white"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-[12px] text-white/30">
          © {new Date().getFullYear()} Develom. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
