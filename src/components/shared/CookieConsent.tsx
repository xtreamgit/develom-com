'use client'

import { useState, useEffect } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'

const COOKIE_NAME = 'consent_analytics'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function readCookie(): boolean | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`))
  if (!match) return null
  return match[1] === 'true'
}

function writeCookie(value: boolean) {
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${COOKIE_NAME}=${value}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`
}

interface Props {
  gaId: string | null
}

export default function CookieConsent({ gaId }: Props) {
  const [consent, setConsent] = useState<boolean | null>(null)
  const [bannerVisible, setBannerVisible] = useState(false)

  useEffect(() => {
    const stored = readCookie()
    if (stored === null) {
      const t = setTimeout(() => setBannerVisible(true), 600)
      return () => clearTimeout(t)
    }
    setConsent(stored)
  }, [])

  function accept() {
    writeCookie(true)
    setConsent(true)
    setBannerVisible(false)
  }

  function decline() {
    writeCookie(false)
    setConsent(false)
    setBannerVisible(false)
  }

  return (
    <>
      {/* GA4 — deferred until consent; Vercel Analytics/SpeedInsights are server-side, ungated */}
      {consent === true && gaId && <GoogleAnalytics gaId={gaId} />}

      {bannerVisible && consent === null && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0A0F1E]/95 px-6 py-5 backdrop-blur-sm"
        >
          <div className="mx-auto flex max-w-content flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-[13px] leading-relaxed text-white/70">
              <p className="mb-1 font-medium text-white/90">We use cookies</p>
              <p>
                <strong className="font-medium text-white/80">Essential</strong> cookies keep the
                site working.{' '}
                <strong className="font-medium text-white/80">Analytics</strong> cookies (Google
                Analytics, Vercel) help us understand how the site is used — only loaded with your
                consent.{' '}
                <a href="/privacy-policy" className="underline hover:text-white">
                  Privacy Policy
                </a>
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <button
                onClick={decline}
                className="rounded px-4 py-2 text-[13px] font-medium text-white/50 hover:text-white"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="rounded bg-blue px-5 py-2 text-[13px] font-semibold text-white hover:opacity-90"
              >
                Accept analytics
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
