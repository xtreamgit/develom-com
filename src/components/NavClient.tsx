'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export interface NavItem {
  label: string
  link: string
  children?: { label: string; link: string }[] | null
  id?: string | null
}

export interface CtaButton {
  label?: string | null
  link?: string | null
  variant?: 'primary' | 'outline' | null
}

interface NavClientProps {
  mainNav: NavItem[]
  ctaButton: CtaButton
}

function DropdownItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const hasChildren = item.children && item.children.length > 0

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (!hasChildren) {
    return (
      <Link
        href={item.link}
        className="text-label uppercase text-navy hover:text-blue transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        className="flex items-center gap-1 text-label uppercase text-navy hover:text-blue transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
      >
        {item.label}
        <svg
          className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          onMouseLeave={() => setOpen(false)}
          className="absolute top-full left-0 z-50 mt-1 min-w-[180px] rounded border border-slate-100 bg-white py-1 shadow-md"
        >
          {item.children!.map((child) => (
            <Link
              key={child.link}
              href={child.link}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-[13px] text-navy hover:bg-slate-50 hover:text-blue transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  if (!hasChildren) {
    return (
      <Link
        href={item.link}
        onClick={onClose}
        className="text-label uppercase text-navy hover:text-blue transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-label uppercase text-navy hover:text-blue transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
      >
        {item.label}
        <svg
          className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="mt-2 flex flex-col gap-0.5 border-l-2 border-[#E2E8F0] pl-4">
          {item.children!.map((child) => (
            <Link
              key={child.link}
              href={child.link}
              onClick={onClose}
              className="py-1.5 text-[13px] text-navy hover:text-blue transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function NavClient({ mainNav, ctaButton }: NavClientProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const ctaLabel = ctaButton.label ?? 'Book a Discovery Call'
  const ctaLink = ctaButton.link ?? '/contact'
  const ctaIsOutline = ctaButton.variant === 'outline'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E2E8F0] transition-shadow ${scrolled ? 'shadow-sm' : ''}`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-3">
        <Link href="/" aria-label="Develom home">
          <img src="/develom_logo.svg" alt="Develom LLC" className="h-9 w-auto" />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {mainNav.map((item) => (
            <DropdownItem key={item.link} item={item} />
          ))}
          <Link
            href={ctaLink}
            className={
              ctaIsOutline
                ? 'rounded px-5 py-2.5 text-[14px] font-semibold text-blue border border-blue hover:bg-blue hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
                : 'rounded bg-blue px-5 py-2.5 text-[14px] font-semibold text-white hover:brightness-90 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
            }
          >
            {ctaLabel}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
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
            {mainNav.map((item) => (
              <MobileNavItem key={item.link} item={item} onClose={() => setMenuOpen(false)} />
            ))}
            <Link
              href={ctaLink}
              onClick={() => setMenuOpen(false)}
              className="mt-2 block rounded bg-blue px-5 py-2.5 text-center text-[14px] font-semibold text-white hover:brightness-90 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
