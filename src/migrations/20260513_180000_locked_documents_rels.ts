import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "leads_id" integer,
      ADD COLUMN IF NOT EXISTS "interviews_id" integer;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_leads_fk') THEN
        ALTER TABLE "payload_locked_documents_rels"
          ADD CONSTRAINT "payload_locked_documents_rels_leads_fk"
          FOREIGN KEY ("leads_id") REFERENCES "leads"("id") ON DELETE CASCADE;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_interviews_fk') THEN
        ALTER TABLE "payload_locked_documents_rels"
          ADD CONSTRAINT "payload_locked_documents_rels_interviews_fk"
          FOREIGN KEY ("interviews_id") REFERENCES "interviews"("id") ON DELETE CASCADE;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_leads_id_idx"
      ON "payload_locked_documents_rels" ("leads_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_interviews_id_idx"
      ON "payload_locked_documents_rels" ("interviews_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_interviews_id_idx";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_leads_id_idx";
    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_interviews_fk",
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_leads_fk",
      DROP COLUMN IF EXISTS "interviews_id",
      DROP COLUMN IF EXISTS "leads_id";
  `)
}
