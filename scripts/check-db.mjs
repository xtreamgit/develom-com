// Diagnostic: tests the raw pg connection before migrations run.
// Remove this file once the production DB connection is confirmed stable.
import pg from 'pg';

const url = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
const label = process.env.POSTGRES_URL_NON_POOLING ? 'POSTGRES_URL_NON_POOLING' : 'POSTGRES_URL';

if (!url) {
  console.error('[check-db] No Postgres URL found in env');
  process.exit(1);
}

console.log(`[check-db] Testing connection via ${label} ...`);

const client = new pg.Client({ connectionString: url });
try {
  await client.connect();
  const { rows } = await client.query('SELECT current_database(), version()');
  console.log('[check-db] Connected OK. DB:', rows[0].current_database);
  await client.end();
} catch (err) {
  console.error('[check-db] Connection FAILED');
  console.error('[check-db] Message :', err.message);
  console.error('[check-db] Code    :', err.code);
  console.error('[check-db] Detail  :', err.detail ?? '(none)');
  await client.end().catch(() => {});
  process.exit(1);
}
