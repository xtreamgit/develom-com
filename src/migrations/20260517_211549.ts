import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Create new enum types (guard against re-run)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_latest_models_provider') THEN
        CREATE TYPE "public"."enum_latest_models_provider" AS ENUM('anthropic', 'openai', 'google', 'meta', 'mistral', 'xai', 'other');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_compliance_deadlines_vertical') THEN
        CREATE TYPE "public"."enum_compliance_deadlines_vertical" AS ENUM('healthcare', 'financial-services', 'legal', 'insurance', 'oil-gas', 'cross-industry');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_compliance_deadlines_recurrence_type') THEN
        CREATE TYPE "public"."enum_compliance_deadlines_recurrence_type" AS ENUM('annual', 'quarterly');
      END IF;
    END $$;
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "latest_models" (
      "id" serial PRIMARY KEY NOT NULL,
      "provider" "enum_latest_models_provider" NOT NULL,
      "model_name" varchar NOT NULL,
      "version" varchar,
      "release_date" timestamp(3) with time zone NOT NULL,
      "main_feature" varchar NOT NULL,
      "recommended_usage" varchar NOT NULL,
      "model_url" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE TABLE IF NOT EXISTS "compliance_deadlines" (
      "id" serial PRIMARY KEY NOT NULL,
      "requirement" varchar NOT NULL,
      "due_date" timestamp(3) with time zone NOT NULL,
      "vertical" "enum_compliance_deadlines_vertical" NOT NULL,
      "regulatory_body" varchar NOT NULL,
      "notes" varchar,
      "recurring" boolean DEFAULT false,
      "recurrence_type" "enum_compliance_deadlines_recurrence_type",
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "latest_models_updated_at_idx" ON "latest_models" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "latest_models_created_at_idx" ON "latest_models" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "compliance_deadlines_updated_at_idx" ON "compliance_deadlines" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "compliance_deadlines_created_at_idx" ON "compliance_deadlines" USING btree ("created_at");
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "latest_models_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "compliance_deadlines_id" integer;
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_latest_models_id_idx" ON "payload_locked_documents_rels" USING btree ("latest_models_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_compliance_deadlines_id_idx" ON "payload_locked_documents_rels" USING btree ("compliance_deadlines_id");
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_latest_models_fk') THEN
        ALTER TABLE "payload_locked_documents_rels"
          ADD CONSTRAINT "payload_locked_documents_rels_latest_models_fk"
          FOREIGN KEY ("latest_models_id") REFERENCES "public"."latest_models"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_compliance_deadlines_fk') THEN
        ALTER TABLE "payload_locked_documents_rels"
          ADD CONSTRAINT "payload_locked_documents_rels_compliance_deadlines_fk"
          FOREIGN KEY ("compliance_deadlines_id") REFERENCES "public"."compliance_deadlines"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_latest_models_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_compliance_deadlines_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_latest_models_id_idx";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_compliance_deadlines_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "latest_models_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "compliance_deadlines_id";
    DROP TABLE IF EXISTS "latest_models" CASCADE;
    DROP TABLE IF EXISTS "compliance_deadlines" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_latest_models_provider";
    DROP TYPE IF EXISTS "public"."enum_compliance_deadlines_vertical";
    DROP TYPE IF EXISTS "public"."enum_compliance_deadlines_recurrence_type";
  `)
}
