'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'SERVICES', href: '/services' },
  { label: 'PORTFOLIO', href: '/portfolio' },
  { label: 'ABOUT', href: '/about' },
  { label: 'BLOG', href: '/blog' },
  { label: 'CONTACT', href: '/contact' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E2E8F0] transition-shadow ${scrolled ? 'shadow-sm' : ''}`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-3">
        <Link href="/" aria-label="Develom home">
          <Image
            src="/develom_logo.svg"
            alt="Develom LLC"
            width={140}
            height={36}
            priority
            className="h-auto w-[140px]"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-label uppercase text-navy hover:text-blue transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded bg-blue px-5 py-2.5 text-[14px] font-semibold text-white hover:brightness-90 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Book a Discovery Call
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`block h-0.5 w-6 bg-navy transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-navy transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-navy transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-[#E2E8F0] bg-white px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-label uppercase text-navy hover:text-blue transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block rounded bg-blue px-5 py-2.5 text-center text-[14px] font-semibold text-white hover:brightness-90 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Book a Discovery Call
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
