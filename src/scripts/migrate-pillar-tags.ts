/**
 * migrate-pillar-tags.ts
 *
 * Converts existing blog-posts (pillarTag: string) and portfolio-projects
 * (pillars: string[]) to use the new `tags` relationship field.
 *
 * Run AFTER:
 *   1. npx payload migrate   (schema changes applied)
 *   2. npx tsx src/seeds/tags.seed.ts   (tag documents exist)
 *
 * Run with:
 *   npx tsx src/migrations/migrate-pillar-tags.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'

async function migratePillarTags() {
  const payload = await getPayload({ config })

  // Build name → id map from tags collection
  const { docs: tags } = await payload.find({ collection: 'tags', limit: 100 })
  const tagMap = new Map(tags.map((t) => [t.name, t.id]))

  console.log(`Found ${tags.length} tags:`, [...tagMap.keys()])

  // ── Blog posts ────────────────────────────────────────────────────────────
  console.log('\nMigrating blog-posts...')
  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    limit: 1000,
    depth: 0,
  })

  let postsMigrated = 0
  for (const post of posts) {
    // @ts-expect-error — pillarTag exists in DB but has been removed from the schema
    const pillarTag = post.pillarTag as string | undefined
    if (pillarTag && typeof pillarTag === 'string') {
      const tagId = tagMap.get(pillarTag)
      if (tagId) {
        await payload.update({
          collection: 'blog-posts',
          id: post.id,
          data: { tags: [tagId] },
        })
        postsMigrated++
      } else {
        console.warn(`  No tag found for pillarTag: "${pillarTag}" on post "${post.title}"`)
      }
    }
  }
  console.log(`  Migrated ${postsMigrated} / ${posts.length} posts`)

  // ── Portfolio projects ────────────────────────────────────────────────────
  console.log('\nMigrating portfolio-projects...')
  const { docs: projects } = await payload.find({
    collection: 'portfolio-projects',
    limit: 100,
    depth: 0,
  })

  let projectsMigrated = 0
  for (const project of projects) {
    // @ts-expect-error — pillars exists in DB but has been removed from the schema
    const pillars = project.pillars as string[] | undefined
    if (Array.isArray(pillars) && pillars.length > 0) {
      const tagIds = pillars.map((p) => tagMap.get(p)).filter((id): id is number => id != null)
      if (tagIds.length > 0) {
        await payload.update({
          collection: 'portfolio-projects',
          id: project.id,
          data: { tags: tagIds },
        })
        projectsMigrated++
      } else {
        console.warn(`  No tags found for pillars: ${pillars.join(', ')} on "${project.title}"`)
      }
    }
  }
  console.log(`  Migrated ${projectsMigrated} / ${projects.length} projects`)

  console.log('\nMigration complete.')
  process.exit(0)
}

migratePillarTags().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
