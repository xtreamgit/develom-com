export default function BlogHero() {
  return (
    <section className="bg-navy px-6 pb-16 pt-32 md:pb-20 md:pt-40">
      <div className="mx-auto max-w-[720px]">
        <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-blue">
          Insights
        </p>

        <h1
          className="text-white"
          style={{
            fontSize: 'clamp(2rem, 3.5vw + 1rem, 3rem)',
            lineHeight: 1.2,
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          What We&apos;re Thinking About
        </h1>

        <p className="mt-6 max-w-[560px] text-[17px] leading-[1.75] text-white/80">
          Original analysis on AI automation, compliance engineering, and what actually works in
          production — from an engineer who has been doing this for three decades.
        </p>
      </div>
    </section>
  )
}
