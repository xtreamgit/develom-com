import { getPayload } from 'payload'
import configPromise from '@payload-config'

/** Minimal Lexical rich-text node wrapping a plain paragraph */
function lexicalParagraph(text: string) {
  return {
    root: {
      type: 'root' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph' as const,
          format: '' as const,
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text' as const,
              format: 0 as const,
              style: '',
              mode: 'normal' as const,
              text,
              version: 1,
              detail: 0,
            },
          ],
          direction: 'ltr' as const,
          textFormat: 0,
          textStyle: '',
        },
      ],
      direction: 'ltr' as const,
    },
  }
}

const CASE_STUDIES = [
  {
    title: 'Voice-Optimized RAG for Healthcare Compliance',
    slug: 'voice-rag-healthcare-compliance',
    client: 'Confidential Healthcare Provider',
    industry: 'healthcare' as const,
    challenge: lexicalParagraph(
      'Compliance officers spent 15+ hours weekly manually searching regulatory databases for policy answers.',
    ),
    solution: lexicalParagraph(
      'Built a voice-optimized agentic RAG system with LangGraph, PGVector, and compliance guardrails.',
    ),
    results: [
      {
        metric: 'Query Response Time',
        value: '< 2 seconds',
        description: 'Down from 15-30 minutes of manual research',
      },
      {
        metric: 'Accuracy Rate',
        value: '96.2%',
        description: 'Validated against certified compliance experts',
      },
      {
        metric: 'Weekly Hours Saved',
        value: '12 hours',
        description: 'Per compliance officer',
      },
    ],
    stack: 'LangGraph · PGVector · Voice I/O · Compliance Guardrails · GCP',
    tagSlugs: ['automation', 'compliance', 'security'],
    published: false,
    order: 1,
  },
]

export async function seedCaseStudies() {
  const payload = await getPayload({ config: configPromise })

  // Resolve tag slugs to IDs
  const { docs: allTags } = await payload.find({
    collection: 'tags',
    limit: 100,
  })
  const tagSlugToId = Object.fromEntries(allTags.map((t) => [t.slug, t.id]))

  for (const { tagSlugs, ...data } of CASE_STUDIES) {
    const existing = await payload.find({
      collection: 'case-studies',
      where: { slug: { equals: data.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  → "${data.title}" already exists, skipping`)
      continue
    }

    const tagIds = tagSlugs
      .map((slug) => tagSlugToId[slug])
      .filter((id): id is number => id !== undefined)

    await payload.create({
      collection: 'case-studies',
      data: { ...data, tags: tagIds },
    })

    console.log(`  ✓ Created case study: ${data.title} (draft)`)
  }

  console.log('\nCase studies seed complete.')
}

const _isMain = import.meta.url === `file://${process.argv[1]}`
if (_isMain) {
  seedCaseStudies()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
