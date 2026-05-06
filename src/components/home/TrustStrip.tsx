const signals = [
  { label: 'GCP Pro Architect' },
  { label: 'HIPAA-Ready' },
  { label: 'AML/KYC' },
  { label: 'Zero-Trust' },
]

export default function TrustStrip() {
  return (
    <section className="border-b border-white/10 bg-navy px-6 py-6">
      <div className="mx-auto max-w-content">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {signals.map((s, i) => (
            <span key={s.label} className="flex items-center gap-3">
              <span className="text-[13px] font-semibold text-white/60">
                {s.label}
              </span>
              {i < signals.length - 1 && (
                <span className="text-white/25" aria-hidden="true">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
