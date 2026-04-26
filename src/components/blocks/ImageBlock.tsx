import Image from 'next/image'

interface MediaDoc {
  url?: string | null
  width?: number | null
  height?: number | null
  alt?: string | null
}

interface ImageBlockProps {
  image: MediaDoc
  caption?: string | null
  width?: 'contained' | 'full' | null
}

export default function ImageBlock({ image, caption, width }: ImageBlockProps) {
  if (!image?.url) return null

  const maxWidth = width === 'full' ? 'max-w-content' : 'max-w-[680px]'

  return (
    <section className="px-6 py-12">
      <figure className={`mx-auto ${maxWidth}`}>
        <Image
          src={image.url}
          alt={image.alt ?? ''}
          width={image.width ?? 1100}
          height={image.height ?? 620}
          className="rounded-lg object-cover"
        />
        {caption && (
          <figcaption className="mt-3 text-[13px] text-muted">{caption}</figcaption>
        )}
      </figure>
    </section>
  )
}
