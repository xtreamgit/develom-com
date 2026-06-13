import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_media_format_note" AS ENUM('raster', 'vector-svg');
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "title" varchar;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "creator" varchar;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "format_note" "enum_media_format_note";
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "in_use" boolean DEFAULT false;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" DROP COLUMN IF EXISTS "title";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "creator";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "format_note";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "in_use";
    DROP TYPE IF EXISTS "public"."enum_media_format_note";
  `)
}
