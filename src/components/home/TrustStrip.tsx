const logos = [
  'Nexora',
  'Veridian',
  'Axcelent',
  'Prismify',
  'Orbitex',
]

export default function TrustStrip() {
  return (
    <section className="border-y border-gray-100 bg-white px-6 py-8">
      <div className="mx-auto max-w-content">
        <p className="mb-6 text-center text-[12px] font-semibold uppercase tracking-widest text-gray-400">
          Trusted by innovative companies worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {logos.map((name) => (
            <div
              key={name}
              className="flex items-center gap-1.5 text-[14px] font-semibold text-gray-300 select-none"
              aria-label={name}
            >
              <div className="w-5 h-5 rounded bg-gray-200 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-gray-300" />
              </div>
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
