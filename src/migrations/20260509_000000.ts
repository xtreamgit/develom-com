import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // image_url was added via dev mode — this makes it official without failing if it already exists
  await db.execute(sql`
    ALTER TABLE "portfolio_projects" ADD COLUMN IF NOT EXISTS "image_url" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "portfolio_projects" DROP COLUMN IF EXISTS "image_url";
  `)
}
