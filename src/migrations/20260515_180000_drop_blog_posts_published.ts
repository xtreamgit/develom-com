import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Backfill _status from the legacy `published` boolean before dropping it,
  // so any post that was visible on the site stays visible after the cutover.
  await db.execute(sql`
    UPDATE "blog_posts"
       SET "_status" = 'published'
     WHERE "published" = true
       AND ("_status" IS NULL OR "_status" = 'draft');

    UPDATE "_blog_posts_v"
       SET "version__status" = 'published'
     WHERE "version_published" = true
       AND ("version__status" IS NULL OR "version__status" = 'draft');
  `)

  await db.execute(sql`
    ALTER TABLE "blog_posts"        DROP COLUMN IF EXISTS "published";
    ALTER TABLE "_blog_posts_v"     DROP COLUMN IF EXISTS "version_published";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "blog_posts"
      ADD COLUMN IF NOT EXISTS "published" boolean DEFAULT false;
    ALTER TABLE "_blog_posts_v"
      ADD COLUMN IF NOT EXISTS "version_published" boolean DEFAULT false;
  `)

  // Best-effort restore: anything currently published in _status flips published=true.
  await db.execute(sql`
    UPDATE "blog_posts"
       SET "published" = true
     WHERE "_status" = 'published';
    UPDATE "_blog_posts_v"
       SET "version_published" = true
     WHERE "version__status" = 'published';
  `)
}
