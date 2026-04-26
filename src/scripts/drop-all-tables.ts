/**
 * Drops all tables in the public schema so Payload can recreate them
 * from the current schema definition.
 *
 * Run once: npx tsx --env-file=.env.local src/scripts/drop-all-tables.ts
 */
import pg from 'pg'

const { Pool } = pg

async function dropAllTables() {
  const pool = new Pool({ connectionString: process.env.POSTGRES_URL })
  const client = await pool.connect()
  try {
    const { rows } = await client.query<{ tablename: string }>(`
      SELECT tablename FROM pg_tables
      WHERE schemaname = 'public'
    `)
    if (rows.length === 0) {
      console.log('No tables to drop.')
      return
    }
    const tables = rows.map((r) => `"public"."${r.tablename}"`).join(', ')
    console.log(`Dropping ${rows.length} tables...`)
    await client.query(`DROP TABLE IF EXISTS ${tables} CASCADE`)
    console.log('  ✓ All tables dropped')

    // Also drop all custom enum types
    const { rows: enumRows } = await client.query<{ typname: string }>(`
      SELECT typname FROM pg_type
      WHERE typtype = 'e' AND typnamespace = 'public'::regnamespace
    `)
    if (enumRows.length > 0) {
      for (const row of enumRows) {
        await client.query(`DROP TYPE IF EXISTS "public"."${row.typname}" CASCADE`)
      }
      console.log(`  ✓ Dropped ${enumRows.length} enum types`)
    }

    console.log('\nDatabase cleared. Ready for fresh schema creation.')
  } finally {
    client.release()
    await pool.end()
  }
}

dropAllTables().catch((err) => {
  console.error(err)
  process.exit(1)
})
