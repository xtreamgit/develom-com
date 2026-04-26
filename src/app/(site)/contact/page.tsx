import type { Metadata } from 'next'

import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact Develom | Book a Discovery Call',
  description:
    'Tell us your biggest automation or compliance challenge. Book a free 30-minute discovery call with Develom — no pitch, no fluff.',
  alternates: {
    canonical: 'https://develom.com/contact',
  },
}

export default function ContactPage() {
  return (
    <main>
      <ContactHero />

      <section className="bg-bg-alt px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-content gap-16 md:grid-cols-[1fr_400px]">
          {/* Form column */}
          <div>
            <p className="mb-8 text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">
              Send us a message
            </p>
            <ContactForm />
          </div>

          {/* Info column */}
          <div className="md:pt-10">
            <ContactInfo />
          </div>
        </div>
      </section>
    </main>
  )
}
