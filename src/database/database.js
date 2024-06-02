import pkg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { getEnvVariable } from '../utils/config.js';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pkg;

const pool = new Pool({
  host: getEnvVariable('DB_HOST'),
  port: Number(getEnvVariable('DB_PORT')),
  user: getEnvVariable('DB_USER'),
  password: getEnvVariable('DB_PASSWORD'),
  database: getEnvVariable('DB_NAME'),
});

export const db = drizzle(pool);

if (process.env.MIGRATE === 'true') {
  migrate(db, { migrationsFolder: __dirname + '/migrations' });
}
