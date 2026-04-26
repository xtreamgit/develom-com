import { getPayload } from 'payload'
import config from '@payload-config'

const pillarTags = [
  {
    name: 'Automation',
    slug: 'automation',
    color: '#2563EB',
    description: 'AI-powered workflow automation and process optimization',
  },
  {
    name: 'Compliance',
    slug: 'compliance',
    color: '#F59E0B',
    description: 'HIPAA, AML, SOC 2, GDPR regulatory compliance',
  },
  {
    name: 'Scalability',
    slug: 'scalability',
    color: '#10B981',
    description: 'Cloud infrastructure and enterprise-grade scaling',
  },
  {
    name: 'Security',
    slug: 'security',
    color: '#EF4444',
    description: 'Cybersecurity, data protection, and threat modeling',
  },
  {
    name: 'Sustainability',
    slug: 'sustainability',
    color: '#8B5CF6',
    description: 'Long-term maintainability and green infrastructure',
  },
]

const initialCategories = [
  { name: 'AI & Machine Learning', slug: 'ai-ml', icon: 'brain' as const, parent: null },
  { name: 'RAG Systems', slug: 'rag-systems', icon: 'brain' as const, parentSlug: 'ai-ml' },
  { name: 'Cloud Infrastructure', slug: 'cloud-infra', icon: 'cloud' as const, parent: null },
  { name: 'Regulatory Compliance', slug: 'regulatory', icon: 'scale' as const, parent: null },
  { name: 'Voice AI', slug: 'voice-ai', icon: 'brain' as const, parentSlug: 'ai-ml' },
]

async function seedTags() {
  const payload = await getPayload({ config })

  console.log('Seeding pillar tags...')
  const tagIdMap = new Map<string, number>()

  for (const tag of pillarTags) {
    try {
      const existing = await payload.find({
        collection: 'tags',
        where: { slug: { equals: tag.slug } },
        limit: 1,
      })
      if (existing.docs.length === 0) {
        const created = await payload.create({ collection: 'tags', data: tag })
        tagIdMap.set(tag.slug, created.id)
        console.log(`  Created tag: ${tag.name}`)
      } else {
        tagIdMap.set(tag.slug, existing.docs[0]!.id)
        console.log(`  Tag already exists: ${tag.name}`)
      }
    } catch (err) {
      console.error(`  Error creating tag ${tag.name}:`, err)
    }
  }

  console.log('Seeding categories...')
  const categoryIdMap = new Map<string, number>()

  // First pass — create all without parents
  for (const cat of initialCategories) {
    try {
      const existing = await payload.find({
        collection: 'categories',
        where: { slug: { equals: cat.slug } },
        limit: 1,
      })
      if (existing.docs.length === 0) {
        const created = await payload.create({
          collection: 'categories',
          data: { name: cat.name, slug: cat.slug, icon: cat.icon },
        })
        categoryIdMap.set(cat.slug, created.id)
        console.log(`  Created category: ${cat.name}`)
      } else {
        categoryIdMap.set(cat.slug, existing.docs[0]!.id)
        console.log(`  Category already exists: ${cat.name}`)
      }
    } catch (err) {
      console.error(`  Error creating category ${cat.name}:`, err)
    }
  }

  // Second pass — set parent relationships
  for (const cat of initialCategories) {
    if ('parentSlug' in cat && cat.parentSlug) {
      const catId = categoryIdMap.get(cat.slug)
      const parentId = categoryIdMap.get(cat.parentSlug)
      if (catId && parentId) {
        await payload.update({
          collection: 'categories',
          id: catId,
          data: { parent: parentId },
        })
        console.log(`  Set parent for: ${cat.name}`)
      }
    }
  }

  console.log('Tags and categories seed complete.')
  process.exit(0)
}

seedTags().catch((err) => {
  console.error('Tags seed failed:', err)
  process.exit(1)
})
