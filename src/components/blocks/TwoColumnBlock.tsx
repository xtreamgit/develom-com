import Image from 'next/image'
import LexicalContent from './LexicalContent'

interface MediaDoc {
  url?: string | null
  width?: number | null
  height?: number | null
  alt?: string | null
  filename?: string | null
}

interface TwoColumnBlockProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  leftContent: any
  rightType?: 'richText' | 'image' | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rightContent?: any
  rightImage?: MediaDoc | null
}

export default function TwoColumnBlock({
  leftContent,
  rightType,
  rightContent,
  rightImage,
}: TwoColumnBlockProps) {
  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <LexicalContent data={leftContent} className="text-[16px]" />
        </div>

        <div>
          {rightType === 'image' && rightImage?.url ? (
            <Image
              src={rightImage.url}
              alt={rightImage.alt ?? ''}
              width={rightImage.width ?? 600}
              height={rightImage.height ?? 400}
              className="rounded-lg object-cover"
            />
          ) : (
            <LexicalContent data={rightContent} className="text-[16px]" />
          )}
        </div>
      </div>
    </section>
  )
}
