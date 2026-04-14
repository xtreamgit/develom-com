import { getPayload } from 'payload'
import config from '@payload-config'

const adminUsers = [
  { name: 'Hector DeJesus', email: 'hector@develom.com', password: 'Develom@2026!', role: 'admin' as const },
  { name: 'Robert Hughes', email: 'robert@develom.com', password: 'Develom@2026!', role: 'admin' as const },
  { name: 'Mila Hughes', email: 'mila@develom.com', password: 'Develom@2026!', role: 'admin' as const },
  { name: 'Neyda DeJesus', email: 'neyda@develom.com', password: 'Develom@2026!', role: 'admin' as const },
]

const portfolioProjects: Array<{
  title: string
  stack: string
  problem: string
  pillars: ('Automation' | 'Compliance' | 'Scalability' | 'Security' | 'Sustainability')[]
  flagship: boolean
  status: 'coming-soon' | 'live'
  order: number
}> = [
  {
    title: 'Agentic RAG with Google ADK',
    stack: 'Google Agent Development Kit \u00b7 Gemini \u00b7 Cloud Run \u00b7 GCP',
    problem: 'Enterprises drowning in internal documentation that no one can query in real time.',
    pillars: ['Automation', 'Scalability', 'Security'],
    flagship: false,
    status: 'coming-soon',
    order: 1,
  },
  {
    title: 'Agentic RAG with PGVector + LangGraph',
    stack: 'LangGraph \u00b7 PostgreSQL/PGVector \u00b7 Cloud SQL \u00b7 GCP',
    problem: 'Organizations that need semantic search over structured data without replacing existing Postgres infrastructure.',
    pillars: ['Automation', 'Scalability', 'Sustainability'],
    flagship: false,
    status: 'coming-soon',
    order: 2,
  },
  {
    title: 'Voice-Optimized Agentic RAG for Compliance',
    stack: 'LangGraph \u00b7 PGVector \u00b7 Voice I/O \u00b7 Compliance Guardrails \u00b7 GCP',
    problem: 'Regulated-industry staff who need instant, spoken answers to compliance questions \u2014 with a full audit trail.',
    pillars: ['Automation', 'Compliance', 'Security', 'Scalability', 'Sustainability'],
    flagship: true,
    status: 'coming-soon',
    order: 3,
  },
]

async function seed() {
  const payload = await getPayload({ config })

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

  console.log('Seeding portfolio projects...')
  for (const project of portfolioProjects) {
    try {
      const existing = await payload.find({
        collection: 'portfolio-projects',
        where: { title: { equals: project.title } },
        limit: 1,
      })
      if (existing.docs.length === 0) {
        await payload.create({ collection: 'portfolio-projects', data: project })
        console.log(`  Created project: ${project.title}`)
      } else {
        console.log(`  Project already exists: ${project.title}`)
      }
    } catch (err) {
      console.error(`  Error creating project ${project.title}:`, err)
    }
  }

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
