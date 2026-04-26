import HeroBlock from './HeroBlock'
import RichTextBlock from './RichTextBlock'
import TwoColumnBlock from './TwoColumnBlock'
import CTABlock from './CTABlock'
import ImageBlock from './ImageBlock'
import FAQBlock from './FAQBlock'

// Payload returns blocks with a `blockType` discriminator matching the block slug
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = Record<string, any> & { blockType: string; id?: string }

interface RenderBlocksProps {
  blocks: Block[] | null | undefined
}

export default function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, i) => {
        const key = block.id ?? i

        switch (block.blockType) {
          case 'hero-block':
            return (
              <HeroBlock
                key={key}
                heading={block.heading}
                subheading={block.subheading}
                ctaText={block.ctaText}
                ctaLink={block.ctaLink}
                background={block.background}
              />
            )

          case 'rich-text-block':
            return <RichTextBlock key={key} content={block.content} />

          case 'two-column-block':
            return (
              <TwoColumnBlock
                key={key}
                leftContent={block.leftContent}
                rightType={block.rightType}
                rightContent={block.rightContent}
                rightImage={block.rightImage}
              />
            )

          case 'cta-block':
            return (
              <CTABlock
                key={key}
                heading={block.heading}
                body={block.body}
                buttonText={block.buttonText}
                buttonLink={block.buttonLink}
              />
            )

          case 'image-block':
            return (
              <ImageBlock
                key={key}
                image={block.image}
                caption={block.caption}
                width={block.width}
              />
            )

          case 'faq-block':
            return <FAQBlock key={key} heading={block.heading} items={block.items} />

          default:
            return null
        }
      })}
    </>
  )
}
