export default function AboutHero() {
  return (
    <section className="bg-navy px-6 pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-[720px]">
        <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-blue">
          About Develom
        </p>

        <h1
          className="max-w-[680px] text-white"
          style={{
            fontSize: 'clamp(2rem, 3.5vw + 1rem, 3rem)',
            lineHeight: 1.2,
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          We Build AI Systems. We Just Make Them Compliance-Ready by Default.
        </h1>

        <p className="mt-8 max-w-[600px] text-[17px] leading-[1.75] text-white/80">
          Develom is an AI engineering firm that builds production-grade systems for mid-market and
          enterprise clients in regulated industries. We are not a compliance consultancy. We are an
          AI firm that regulated industries can trust — because compliance is built into our
          architecture from day one, not added as a layer at the end.
        </p>
      </div>
    </section>
  )
}
