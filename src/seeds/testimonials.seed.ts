import { getPayload } from 'payload'
import configPromise from '@payload-config'

const TESTIMONIALS = [
  {
    quote:
      'Develom transformed our compliance workflow from a 3-week manual audit into an automated, real-time monitoring system. The AI-powered approach gave us confidence we never had before.',
    authorName: 'Sarah Chen',
    authorTitle: 'VP of Compliance',
    company: 'MedSecure Health',
    rating: 5,
    tagSlugs: ['compliance', 'automation'],
    featured: true,
    order: 1,
  },
  {
    quote:
      'The voice-optimized RAG system handles questions our team used to spend hours researching. Response accuracy is above 95% and the audit trail satisfies our regulators.',
    authorName: 'Marcus Rodriguez',
    authorTitle: 'CTO',
    company: 'Pacific Financial Group',
    rating: 5,
    tagSlugs: ['automation', 'security'],
    featured: true,
    order: 2,
  },
  {
    quote:
      "What impressed me most was the architecture-first approach. They didn't just build a solution — they designed a system that scales with our growth.",
    authorName: 'Dr. Amira Osei',
    authorTitle: 'Director of IT',
    company: 'Sentinel Insurance',
    rating: 5,
    tagSlugs: ['scalability'],
    featured: false,
    order: 3,
  },
]

export async function seedTestimonials() {
  const payload = await getPayload({ config: configPromise })

  // Resolve tag slugs to IDs
  const { docs: allTags } = await payload.find({
    collection: 'tags',
    limit: 100,
  })
  const tagSlugToId = Object.fromEntries(allTags.map((t) => [t.slug, t.id]))

  for (const { tagSlugs, ...data } of TESTIMONIALS) {
    const existing = await payload.find({
      collection: 'testimonials',
      where: { authorName: { equals: data.authorName } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  → "${data.authorName}" already exists, skipping`)
      continue
    }

    const tagIds = tagSlugs
      .map((slug) => tagSlugToId[slug])
      .filter((id): id is number => id !== undefined)

    await payload.create({
      collection: 'testimonials',
      data: { ...data, tags: tagIds },
    })

    console.log(`  ✓ Created testimonial: ${data.authorName} — ${data.company}`)
  }

  console.log('\nTestimonials seed complete.')
}

const _isMain = import.meta.url === `file://${process.argv[1]}`
if (_isMain) {
  seedTestimonials()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
