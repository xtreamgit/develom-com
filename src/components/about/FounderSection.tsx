import Link from 'next/link'

const credentials = [
  'Google Cloud Professional Architect',
  '33 Years Enterprise IT in Regulated Industries',
  'AI & Machine Learning Certified',
  'GCP-Native Architecture Specialist',
  'DevSecOps & Zero-Trust Design',
]

export default function FounderSection() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-[800px]">
        <p className="text-label uppercase text-blue">WHY DEVELOM</p>

        <h2 className="mt-3 text-h2 text-navy">
          33 Years Building Infrastructure for Regulated Industries. Now Applied to AI.
        </h2>

        <p className="mt-5 text-lg leading-relaxed text-text">
          Hector DeJesus has spent 33 years building the infrastructure that regulated industries
          run on — data systems for healthcare organizations, platforms for financial institutions,
          architecture for environments where downtime isn{"'"}t acceptable and data handling
          isn{"'"}t negotiable. That experience is the foundation of every Develom engagement.
          Not as a credential on a page — as the design constraint that shapes how we build.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-text">
          Every system Develom ships is documented against the applicable regulatory framework,
          tested for compliance, and handed over production-ready. Because the industries we work
          with don{"'"}t have the option of figuring it out later.
        </p>

        {/* Pull quote — pending Hector's confirmation (#10) */}
        <blockquote className="mt-8 border-l-4 border-blue pl-6">
          <p className="text-[17px] italic leading-relaxed text-navy/80">
            {'"'}The organizations that will get the most from AI in regulated industries are the
            ones that deploy systems built for their environment — not general-purpose platforms
            that describe themselves as compliant.{'"'}
          </p>
          <footer className="mt-3 text-[14px] font-semibold text-muted">
            — Hector DeJesus, Founder &amp; CEO, Develom
          </footer>
        </blockquote>

        <div className="mt-8 flex items-center gap-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hector-dejesus.jpg"
            alt="Hector DeJesus — Founder &amp; CEO, Develom"
            width={96}
            height={96}
            className="h-24 w-24 rounded-full object-cover bg-[#E2E8F0]"
          />
          <div>
            <p className="text-[15px] font-semibold text-navy">Hector DeJesus</p>
            <p className="text-[13px] text-muted">Founder &amp; CEO, Develom</p>
          </div>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {credentials.map((cred) => (
            <div
              key={cred}
              className="flex items-start gap-3 rounded border border-[#E2E8F0] bg-bg-alt px-5 py-3.5 hover:border-blue transition-colors"
            >
              <span className="text-[16px] font-bold text-blue" aria-hidden="true">
                &#10003;
              </span>
              <span className="text-[15px] font-semibold text-navy">{cred}</span>
            </div>
          ))}
        </div>

        <Link
          href="/about"
          className="mt-8 inline-block text-[16px] font-semibold text-blue hover:underline"
        >
          Read Hector{"'"}s full background &rarr;
        </Link>
      </div>
    </section>
  )
}
