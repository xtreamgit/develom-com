/**
 * Drops legacy pillar enum columns/tables created by the initial migration
 * so drizzle push has no ambiguous rename candidates for the new enum types.
 *
 * Run once: npx tsx --env-file=.env.local src/scripts/fix-schema.ts
 */
import pg from 'pg'

const { Pool } = pg

async function fixSchema() {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  })

  const client = await pool.connect()
  try {
    console.log('Removing legacy pillar enum columns and types...')

    await client.query(`
      -- Drop columns that reference the old enum types
      ALTER TABLE blog_posts DROP COLUMN IF EXISTS pillar_tag;
      ALTER TABLE _blog_posts_v DROP COLUMN IF EXISTS version_pillar_tag;
    `)
    console.log('  ✓ Dropped pillar_tag columns')

    await client.query(`
      -- Drop the legacy table and its enum
      DROP TABLE IF EXISTS portfolio_projects_pillars CASCADE;
    `)
    console.log('  ✓ Dropped portfolio_projects_pillars table')

    await client.query(`
      DROP TYPE IF EXISTS "public"."enum_blog_posts_pillar_tag";
      DROP TYPE IF EXISTS "public"."enum__blog_posts_v_version_pillar_tag";
      DROP TYPE IF EXISTS "public"."enum_portfolio_projects_pillars";
    `)
    console.log('  ✓ Dropped legacy enum types')

    console.log('\nSchema fix complete. You can now run seeds.')
  } finally {
    client.release()
    await pool.end()
  }
}

fixSchema().catch((err) => {
  console.error(err)
  process.exit(1)
})
