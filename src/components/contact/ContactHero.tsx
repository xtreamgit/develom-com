export default function ContactHero() {
  return (
    <section className="bg-navy px-6 pb-16 pt-32 md:pb-20 md:pt-40">
      <div className="mx-auto max-w-[720px]">
        <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-blue">
          Contact
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
          Let&apos;s Talk About What You&apos;re Building
        </h1>

        <p className="mt-6 max-w-[560px] text-[17px] leading-[1.75] text-white/80">
          Tell us your biggest automation or compliance challenge. We&apos;ll tell you exactly how
          we&apos;d approach it — no pitch, no fluff. Just a real conversation.
        </p>
      </div>
    </section>
  )
}
