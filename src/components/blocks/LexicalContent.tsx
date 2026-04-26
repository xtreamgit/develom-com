/**
 * LexicalContent — lightweight server-side renderer for Payload lexical JSON.
 * Handles paragraphs, headings, bold/italic/underline, links, lists.
 * Used by block components that receive richText field data.
 */
import React from 'react'

// Minimal type coverage for lexical node shapes
interface LexicalTextNode {
  type: 'text'
  text: string
  format?: number
}

interface LexicalLinkNode {
  type: 'link' | 'autolink'
  children: LexicalNode[]
  fields?: { url?: string; newTab?: boolean }
  url?: string
}

interface LexicalListItemNode {
  type: 'listitem'
  children: LexicalNode[]
}

interface LexicalListNode {
  type: 'list'
  listType: 'bullet' | 'number'
  children: LexicalListItemNode[]
}

interface LexicalHeadingNode {
  type: 'heading'
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: LexicalNode[]
}

interface LexicalParagraphNode {
  type: 'paragraph'
  children: LexicalNode[]
}

interface LexicalRootNode {
  type: 'root'
  children: LexicalNode[]
}

type LexicalNode =
  | LexicalTextNode
  | LexicalLinkNode
  | LexicalListItemNode
  | LexicalListNode
  | LexicalHeadingNode
  | LexicalParagraphNode
  | LexicalRootNode
  | { type: string; children?: LexicalNode[] }

// Text format flags used by Lexical
const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2
const FORMAT_UNDERLINE = 8
const FORMAT_CODE = 16

function renderNode(node: LexicalNode, key: string | number): React.ReactNode {
  switch (node.type) {
    case 'text': {
      const text = node as LexicalTextNode
      let content: React.ReactNode = text.text
      if (!content) return null
      const fmt = text.format ?? 0
      if (fmt & FORMAT_CODE) content = <code key={key} className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.875em] text-navy">{content}</code>
      if (fmt & FORMAT_BOLD) content = <strong key={key}>{content}</strong>
      if (fmt & FORMAT_ITALIC) content = <em key={key}>{content}</em>
      if (fmt & FORMAT_UNDERLINE) content = <u key={key}>{content}</u>
      return content
    }

    case 'link':
    case 'autolink': {
      const link = node as LexicalLinkNode
      const href = link.fields?.url ?? link.url ?? '#'
      const newTab = link.fields?.newTab ?? false
      return (
        <a
          key={key}
          href={href}
          target={newTab ? '_blank' : undefined}
          rel={newTab ? 'noopener noreferrer' : undefined}
          className="text-blue underline underline-offset-2 hover:text-blue/80"
        >
          {link.children?.map((c, i) => renderNode(c, i))}
        </a>
      )
    }

    case 'paragraph': {
      const para = node as LexicalParagraphNode
      const children = para.children?.map((c, i) => renderNode(c, i))
      if (!children?.some(Boolean)) return null
      return (
        <p key={key} className="leading-[1.75] text-text">
          {children}
        </p>
      )
    }

    case 'heading': {
      const h = node as LexicalHeadingNode
      const children = h.children?.map((c, i) => renderNode(c, i))
      const Tag = h.tag
      const sizeMap: Record<string, string> = {
        h1: 'text-[2rem] font-bold leading-[1.2] tracking-[-0.02em]',
        h2: 'text-[1.5rem] font-bold leading-[1.25]',
        h3: 'text-[1.25rem] font-semibold leading-[1.3]',
        h4: 'text-[1.1rem] font-semibold',
        h5: 'text-[1rem] font-semibold',
        h6: 'text-[0.9rem] font-semibold uppercase tracking-wide',
      }
      return (
        <Tag key={key} className={`text-navy ${sizeMap[h.tag] ?? ''}`}>
          {children}
        </Tag>
      )
    }

    case 'list': {
      const list = node as LexicalListNode
      const items = list.children.map((item, i) => (
        <li key={i}>{item.children?.map((c, j) => renderNode(c, j))}</li>
      ))
      if (list.listType === 'number') {
        return (
          <ol key={key} className="list-decimal pl-6 space-y-1 text-text">
            {items}
          </ol>
        )
      }
      return (
        <ul key={key} className="list-disc pl-6 space-y-1 text-text">
          {items}
        </ul>
      )
    }

    case 'root': {
      const root = node as LexicalRootNode
      return (
        <React.Fragment key={key}>
          {root.children?.map((c, i) => renderNode(c, i))}
        </React.Fragment>
      )
    }

    default:
      return null
  }
}

interface LexicalContentProps {
  data: { root: LexicalRootNode } | null | undefined
  className?: string
}

export default function LexicalContent({ data, className }: LexicalContentProps) {
  if (!data?.root) return null
  return (
    <div className={`flex flex-col gap-4 ${className ?? ''}`}>
      {data.root.children?.map((node, i) => renderNode(node, i))}
    </div>
  )
}
