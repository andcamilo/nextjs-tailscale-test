import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Configuración para desarrollo vs producción
// En Vercel, usar VERCEL_ENV para detectar producción
const isProduction = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
const isVercel = !!process.env.VERCEL;

let pool: Pool;

if (isVercel && isProduction) {
  // En Vercel producción: usar proxy SOCKS para BD externa
  process.env.http_proxy = 'socks5://fixie:hwAXP1CEv6zp2P4@44.219.233.55:1080';
  process.env.https_proxy = 'socks5://fixie:hwAXP1CEv6zp2P4@44.219.233.55:1080';

  pool = new Pool({
    host: '34.41.173.45',
    port: 5432,
    database: 'n8n_db',
    user: 'n8n_user',
    password: 'sg*?esXL}>z9wO4f',
    max: 1,
    ssl: false,
    connectionTimeoutMillis: 60000,
    idleTimeoutMillis: 20000,
  });
} else {
  // Desarrollo local sin proxy
  pool = new Pool({
    host: process.env.DB_HOST || '100.66.76.2',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'n8n_db',
    user: process.env.DB_USER || 'n8n_user',
    password: process.env.DB_PASSWORD || 'sg*?esXL}>z9wO4f',
    max: 1,
    ssl: false,
  });
}

export const db = drizzle(pool, { schema });