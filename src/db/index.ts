import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Configuración para desarrollo vs producción
const isProduction = process.env.NODE_ENV === 'production';

// En producción, configurar proxy HTTP para Fixie
if (isProduction && process.env.FIXIE_URL) {
  process.env.HTTP_PROXY = process.env.FIXIE_URL;
  process.env.HTTPS_PROXY = process.env.FIXIE_URL;
}

const pool = new Pool({
  host: isProduction 
    ? (process.env.DB_HOST || '34.41.173.45')
    : (process.env.DB_HOST || '100.66.76.2'),
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'n8n_db',
  user: process.env.DB_USER || 'n8n_user',
  password: process.env.DB_PASSWORD || 'sg*?esXL}>z9wO4f',
  max: 1,
  ssl: false,
});

export const db = drizzle(pool, { schema });