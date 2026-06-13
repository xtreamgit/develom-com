import Image from 'next/image'
import Link from 'next/link'

interface MediaDoc {
  url?: string | null
  width?: number | null
  height?: number | null
  alt?: string | null
}

interface HeroBlockProps {
  heading: string
  subheading?: string | null
  ctaText?: string | null
  ctaLink?: string | null
  background?: 'navy' | 'white' | null
  heroImage?: MediaDoc | null
}

export default function HeroBlock({ heading, subheading, ctaText, ctaLink, background, heroImage }: HeroBlockProps) {
  const isNavy = background !== 'white'

  const textContent = (
    <div>
      <h1
        className={isNavy ? 'text-white' : 'text-navy'}
        style={{
          fontSize: 'clamp(2.25rem, 4vw + 1rem, 3.25rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
          maxWidth: '18ch',
        }}
      >
        {heading}
      </h1>

      {subheading && (
        <p
          className={`mt-6 text-[17px] leading-[1.75] ${isNavy ? 'text-white/75' : 'text-muted'}`}
          style={{ maxWidth: '52ch' }}
        >
          {subheading}
        </p>
      )}

      {ctaText && ctaLink && (
        <div className="mt-10">
          <Link
            href={ctaLink}
            className={`inline-block min-h-[44px] rounded px-8 py-3 text-[15px] font-semibold tracking-wide text-white transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
              isNavy ? 'bg-blue focus:ring-offset-navy' : 'bg-blue'
            }`}
          >
            {ctaText}
          </Link>
        </div>
      )}
    </div>
  )

  if (heroImage?.url) {
    return (
      <section
        className={`px-6 pb-24 pt-32 md:pb-28 md:pt-36 ${isNavy ? 'bg-navy' : 'bg-white'}`}
      >
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 md:grid-cols-2">
          {textContent}
          <div className="flex justify-center">
            <Image
              src={heroImage.url}
              alt={heroImage.alt ?? ''}
              width={heroImage.width ?? 600}
              height={heroImage.height ?? 400}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className={`px-6 pb-24 pt-32 md:pb-28 md:pt-36 ${isNavy ? 'bg-navy' : 'bg-white'}`}
    >
      <div className="mx-auto max-w-content">
        {textContent}
      </div>
    </section>
  )
}
