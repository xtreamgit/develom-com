const REASONS = [
  {
    title: 'AI Architecture Review',
    desc: 'We assess your current stack and map a path to AI-readiness — with compliance built in from the start.',
  },
  {
    title: 'Custom Agentic Systems',
    desc: 'RAG pipelines, multi-agent workflows, and LLM-backed APIs tailored to your domain and regulatory context.',
  },
  {
    title: 'GCP-Native Deployment',
    desc: 'Production infrastructure on Google Cloud — GKE, Cloud SQL, Vertex AI, Cloud Run — managed end-to-end.',
  },
  {
    title: 'Workflow Automation',
    desc: 'Identify manual processes that AI can own. We build the pipeline, test it, and hand it off production-ready.',
  },
]

const STATS = [
  { value: '33+', label: 'Years of IT engineering' },
  { value: 'GCP', label: 'Professional Architect certified' },
  { value: '24h', label: 'Response within one business day' },
]

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-10">
      {/* What we can help with */}
      <div>
        <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">
          What we can help with
        </p>
        <div className="flex flex-col gap-5">
          {REASONS.map((r) => (
            <div key={r.title} className="flex gap-4">
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#2563EB',
                  flexShrink: 0,
                  marginTop: 7,
                }}
              />
              <div>
                <p className="text-[15px] font-600 text-[#111827]" style={{ fontWeight: 600 }}>
                  {r.title}
                </p>
                <p className="mt-1 text-[14px] leading-[1.65] text-muted">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#E5E7EB]" />

      {/* Stats */}
      <div className="flex flex-col gap-5">
        {STATS.map((s) => (
          <div key={s.label} className="flex items-center gap-4">
            <span
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: '#0F2444',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                fontFamily: 'DM Sans, sans-serif',
                minWidth: 56,
              }}
            >
              {s.value}
            </span>
            <span className="text-[14px] text-muted">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-[#E5E7EB]" />

      {/* Direct contact */}
      <div>
        <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">
          Direct contact
        </p>
        <a
          href="mailto:hector@develom.com"
          className="text-[15px] font-medium text-blue hover:opacity-80 transition-opacity"
        >
          hector@develom.com
        </a>
        <p className="mt-3 text-[13px] leading-relaxed text-muted">
          Based in the United States. Working with clients across regulated industries
          nationally and internationally.
        </p>
      </div>
    </div>
  )
}
