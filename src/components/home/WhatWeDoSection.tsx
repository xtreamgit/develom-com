import Link from 'next/link'

export default function WhatWeDoSection() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-text">
        <p className="text-label uppercase text-blue">OUR SERVICES</p>

        <h2 className="mt-3 text-h2 text-navy">
          AI Automation That Meets Your Industry{'\u2019'}s Standards
        </h2>

        <p className="mt-5 text-lg text-text leading-relaxed">
          Develom designs and deploys AI automation systems for mid-market and enterprise clients in regulated industries. From agentic RAG pipelines and voice-enabled compliance bots to full MLOps infrastructure on Google Cloud Platform — we build the complete system, document it against your compliance requirements, and hand it over production-ready.
        </p>

        <Link
          href="/services"
          className="mt-6 inline-block text-[16px] font-semibold text-blue hover:underline"
        >
          See all services &rarr;
        </Link>
      </div>
    </section>
  )
}
