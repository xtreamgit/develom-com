import { RichText } from '@payloadcms/richtext-lexical/react'

export function BlogBody({ content }: { content: any }) {
  if (!content) return <p className="text-gray-400">No content yet</p>
  return (
    <div className="prose prose-invert max-w-none [&_h2]:text-develom-navy [&_h3]:text-develom-navy [&_a]:text-blue-400 [&_code]:bg-gray-800 [&_blockquote]:border-blue-500">
      <RichText data={content} />
    </div>
  )
}
