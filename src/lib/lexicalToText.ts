type LexicalNode = {
  type?: string
  text?: string
  children?: LexicalNode[]
  nodes?: LexicalNode[]
}

export function lexicalToText(richText: unknown): string {
  if (!richText || typeof richText !== 'object') return ''
  const chunks: string[] = []

  function traverse(node: LexicalNode) {
    if (node.type === 'text' && typeof node.text === 'string' && node.text.trim()) {
      chunks.push(node.text.trim())
    }
    const children = node.children ?? node.nodes ?? []
    children.forEach(traverse)
  }

  const root = (richText as { root?: LexicalNode }).root ?? (richText as LexicalNode)
  traverse(root)
  return chunks.join(' ')
}
