import LexicalContent from './LexicalContent'

interface RichTextBlockProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any
}

export default function RichTextBlock({ content }: RichTextBlockProps) {
  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-[680px]">
        <LexicalContent data={content} className="text-[16px]" />
      </div>
    </section>
  )
}
