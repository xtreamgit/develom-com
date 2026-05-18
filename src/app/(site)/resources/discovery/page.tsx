import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Solution Discovery | Develom',
  description:
    'Not sure which AI solution fits your team? Talk to Velom — our AI discovery guide will find the right fit in minutes.',
}

export default function DiscoveryPage() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-[#F8FAFC] px-6 py-20 text-center">
      <div className="mx-auto max-w-lg">
        <div className="mb-8 flex justify-center">
          <Image
            src="/velom/velomxl.svg"
            alt="Velom"
            width={96}
            height={108}
            className="h-24 w-auto drop-shadow-md"
          />
        </div>
        <h1 className="mb-4 text-[2rem] font-bold leading-tight text-navy">
          Find Your AI Solution
        </h1>
        <p className="mb-8 text-[1.1rem] leading-relaxed text-muted">
          Not sure where to start? Meet Velom — Develom&apos;s AI discovery guide. Answer a few
          quick questions and get a personalized recommendation in under two minutes.
        </p>
        <p className="text-[0.95rem] text-muted">
          Click the{' '}
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue align-middle">
            <Image src="/velom/velomxs.svg" alt="chat" width={18} height={18} />
          </span>{' '}
          icon in the bottom-right corner to get started.
        </p>
      </div>
    </main>
  )
}
