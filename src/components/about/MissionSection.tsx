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
    <section className="bg-bg-alt px-6 py-20">
      <div className="mx-auto max-w-content">
        <p className="mb-3 text-label uppercase text-blue">WHY WE EXIST</p>
        <h2 className="text-[36px] font-bold text-navy">
          AI Automation for the Industries That Can&apos;t Cut Corners
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-4 text-[18px] font-bold text-navy">{col.heading}</h3>
              <p className="text-[15px] leading-[1.7] text-[#374151]">{col.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
