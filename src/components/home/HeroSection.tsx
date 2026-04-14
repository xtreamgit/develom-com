import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-navy md:min-h-screen" style={{ minHeight: '80vh' }}>
      {/* Hero banner image — LCP element */}
      <Image
        src="/hero_banner/Hero_banner_1920.webp"
        alt="Develom AI automation platform"
        priority
        fetchPriority="high"
        sizes="(max-width: 428px) 428px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1728px) 1728px, 1920px"
        width={1920}
        height={1080}
        placeholder="blur"
        blurDataURL="data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADQAQCdASoBAAEAAgA0JZACdAEO/gHOAAA="
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />

      {/* Content overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center md:min-h-screen" style={{ minHeight: '80vh' }}>
        <div className="max-w-text">
          <p className="text-label uppercase text-blue">OUR MISSION</p>

          <h1 className="mt-6 text-hero text-white max-w-text">
            Your Compliance Workflows Are Slower Than Your Competition.
          </h1>

          <p className="mx-auto mt-6 max-w-narrow text-lg text-white/90">
            Develom builds agentic AI systems that handle your compliance queries, data workflows, and regulatory reporting — so your team focuses on decisions, not documentation.
          </p>

          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block rounded bg-blue px-8 py-3.5 text-[16px] font-bold text-white hover:brightness-90 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Book a Discovery Call
            </Link>
          </div>

          <div className="mt-4">
            <Link
              href="/portfolio"
              className="text-[16px] text-white/70 hover:text-white transition-colors"
            >
              Or explore our portfolio &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
