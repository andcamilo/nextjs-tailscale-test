import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const client = postgres({
  host: process.env.DB_HOST || '100.66.76.2',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'n8n_db',
  username: process.env.DB_USER || 'n8n_user',
  password: process.env.DB_PASSWORD || 'sg*?esXL}>z9wO4f',
  max: 1,
  ssl: false,
});

export const db = drizzle(client, { schema });