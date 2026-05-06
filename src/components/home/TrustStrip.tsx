// SOC 2 Aligned marked as placeholder (#11) pending Hector's certification confirmation.
const signals = [
  { label: 'GCP Pro Architect',      placeholder: false },
  { label: 'HIPAA-Ready',            placeholder: false },
  { label: 'AML/KYC',                placeholder: false },
  { label: 'Zero-Trust',             placeholder: false },
  { label: 'SOC 2 Aligned',          placeholder: true  },
]

export default function TrustStrip() {
  return (
    <section className="border-b border-white/10 bg-navy px-6 py-6">
      <div className="mx-auto max-w-content">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {signals.map((s, i) => (
            <span key={s.label} className="flex items-center gap-3">
              <span
                className={
                  'text-[13px] font-semibold ' +
                  (s.placeholder ? 'text-white/35' : 'text-white/60')
                }
              >
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
