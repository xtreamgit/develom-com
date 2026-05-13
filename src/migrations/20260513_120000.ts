import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "users"
      ADD COLUMN IF NOT EXISTS "enable_a_p_i_key" boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS "api_key" varchar,
      ADD COLUMN IF NOT EXISTS "api_key_index" varchar;

    CREATE UNIQUE INDEX IF NOT EXISTS "users_api_key_index_idx"
      ON "users" ("api_key_index")
      WHERE "api_key_index" IS NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "users_api_key_index_idx";

    ALTER TABLE "users"
      DROP COLUMN IF EXISTS "enable_a_p_i_key",
      DROP COLUMN IF EXISTS "api_key",
      DROP COLUMN IF EXISTS "api_key_index";
  `)
}
