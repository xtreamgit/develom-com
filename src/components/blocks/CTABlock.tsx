import Link from 'next/link'

interface CTABlockProps {
  heading: string
  body?: string | null
  buttonText?: string | null
  buttonLink?: string | null
}

export default function CTABlock({ heading, body, buttonText, buttonLink }: CTABlockProps) {
  return (
    <section className="bg-navy px-6 py-20 md:py-24">
      <div className="mx-auto max-w-[680px]">
        <h2
          className="text-white"
          style={{
            fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2.5rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          {heading}
        </h2>

        {body && (
          <p className="mt-5 text-[17px] leading-[1.75] text-white/75" style={{ maxWidth: '52ch' }}>
            {body}
          </p>
        )}

        {buttonText && buttonLink && (
          <div className="mt-10">
            <Link
              href={buttonLink}
              className="inline-block min-h-[44px] rounded bg-blue px-8 py-3 text-[15px] font-semibold tracking-wide text-white transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-navy"
            >
              {buttonText}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
