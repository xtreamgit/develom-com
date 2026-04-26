const columns = [
  {
    heading: 'Our Focus',
    body: 'We design and build AI architecture, applications, and automation systems for mid-market and enterprise clients in healthcare, financial services, insurance, and legal. The pilot phase is over. Our clients are deploying AI at scale — and they need an engineering partner who knows how to do it without creating regulatory risk.',
  },
  {
    heading: 'Our Approach',
    body: "Every Develom engagement starts with the architecture. We don't prototype first and figure out compliance later. We design systems where the audit trail, the access controls, and the data boundaries are part of the foundation — so when your compliance officer asks how it works, we have an answer.",
  },
  {
    heading: 'Our Commitment',
    body: "We build production-ready systems, document them completely, and hand them over ready to operate. We don't disappear after delivery. Our MLOps practices mean we design the monitoring and maintenance into the system itself — so what we ship is still running cleanly in three years.",
  },
]

export default function MissionSection() {
  return (
    <section className="bg-[#F8FAFC] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-content">
        <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-blue">
          Why We Exist
        </p>
        <h2
          className="max-w-[620px] text-navy"
          style={{ fontSize: 'clamp(1.625rem, 2.5vw + 0.5rem, 2.25rem)', fontWeight: 700, lineHeight: 1.25 }}
        >
          AI Automation for the Industries That Can&apos;t Cut Corners
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-4 text-[17px] font-bold text-navy">{col.heading}</h3>
              <p className="text-[15px] leading-[1.75] text-[#374151]" style={{ maxWidth: '38ch' }}>
                {col.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
