const signals = [
  'Google Cloud Professional Architect',
  'GCP-Native Infrastructure',
  'HIPAA-Aligned Architecture',
  'AML/KYC-Ready',
  'Zero-Trust by Default',
  'DevSecOps',
]

export default function TrustSignalStrip() {
  return (
    <section className="border-t border-white/10 bg-navy px-6 py-8">
      <div className="mx-auto max-w-content">
        <p className="mb-4 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-white/40">
          Built on credentials, not claims.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {signals.map((signal, i) => (
            <span key={signal} className="flex items-center gap-3">
              <span className="text-[13px] font-semibold text-white/60">{signal}</span>
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
