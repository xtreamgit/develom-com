import { getPayload } from 'payload'
import config from '@payload-config'

const adminUsers = [
  { name: 'Hector DeJesus', email: 'hector@develom.com', password: 'Develom@2026!', role: 'admin' as const },
  { name: 'Robert Hughes', email: 'robert@develom.com', password: 'Develom@2026!', role: 'admin' as const },
  { name: 'Mila Hughes', email: 'mila@develom.com', password: 'Develom@2026!', role: 'admin' as const },
  { name: 'Neyda DeJesus', email: 'neyda@develom.com', password: 'Develom@2026!', role: 'admin' as const },
]

// Pillar tag names → seeded by tags.seed.ts; resolved here by slug lookup
const portfolioProjectDefs = [
  {
    title: 'Agentic RAG with Google ADK',
    stack: 'Google ADK \u00b7 Gemini \u00b7 Vertex AI \u00b7 Cloud Run \u00b7 GCP',
    problem:
      'Enterprise teams spend hours searching internal documentation that should take seconds. This system deploys a GCP-native agentic RAG pipeline using Google ADK and Gemini \u2014 giving staff instant, accurate answers from their own knowledge base, with every query logged and auditable.',
    tagSlugs: ['automation', 'scalability', 'security'],
    flagship: false,
    status: 'coming-soon' as const,
    order: 1,
  },
  {
    title: 'Agentic RAG with PGVector + LangGraph',
    stack: 'LangGraph \u00b7 PGVector \u00b7 Cloud SQL \u00b7 PostgreSQL \u00b7 GCP',
    problem:
      'Most organizations have years of structured data in Postgres they can\u2019t semantically query. This system adds a PGVector extension and LangGraph orchestration layer on top of existing Cloud SQL infrastructure \u2014 delivering AI-powered search without a costly database migration.',
    tagSlugs: ['automation', 'scalability', 'sustainability'],
    flagship: false,
    status: 'coming-soon' as const,
    order: 2,
  },
  {
    title: 'Voice-Optimized Agentic RAG for Compliance',
    stack: 'LangGraph \u00b7 PGVector \u00b7 Voice I/O \u00b7 Compliance Guardrails \u00b7 GCP',
    problem:
      'Compliance staff in regulated industries need instant answers to policy and regulatory questions \u2014 but they\u2019re often on the phone, not at a keyboard. This system delivers a voice-optimized AI agent that answers compliance queries in natural language, verifies caller identity, cites source documents, and logs every interaction for regulatory review.',
    tagSlugs: ['automation', 'compliance', 'security', 'scalability', 'sustainability'],
    flagship: true,
    status: 'coming-soon' as const,
    order: 3,
  },
]

async function seed() {
  const payload = await getPayload({ config })

  // ── Admin users ─────────────────────────────────────────────────────────
  console.log('Seeding admin users...')
  for (const user of adminUsers) {
    try {
      const existing = await payload.find({
        collection: 'users',
        where: { email: { equals: user.email } },
        limit: 1,
      })
      if (existing.docs.length === 0) {
        await payload.create({ collection: 'users', data: user })
        console.log(`  Created user: ${user.email}`)
      } else {
        console.log(`  User already exists: ${user.email}`)
      }
    } catch (err) {
      console.error(`  Error creating user ${user.email}:`, err)
    }
  }

  // ── Resolve tag IDs (requires tags.seed.ts to have run first) ───────────
  const { docs: allTags } = await payload.find({ collection: 'tags', limit: 100 })
  const tagBySlug = new Map(allTags.map((t) => [t.slug, t.id]))

  // ── Portfolio projects ───────────────────────────────────────────────────
  console.log('Seeding portfolio projects...')
  for (const def of portfolioProjectDefs) {
    try {
      const existing = await payload.find({
        collection: 'portfolio-projects',
        where: { title: { equals: def.title } },
        limit: 1,
      })

      const tagIds = def.tagSlugs
        .map((slug) => tagBySlug.get(slug))
        .filter((id): id is number => id != null)

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'portfolio-projects',
          data: {
            title: def.title,
            stack: def.stack,
            problem: def.problem,
            tags: tagIds,
            flagship: def.flagship,
            status: def.status,
            order: def.order,
          },
        })
        console.log(`  Created project: ${def.title}`)
      } else {
        console.log(`  Project already exists: ${def.title}`)
      }
    } catch (err) {
      console.error(`  Error creating project ${def.title}:`, err)
    }
  }

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
