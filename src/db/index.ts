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
  // NOTE: Use the new pgViaFixie helper instead for SOCKS connection
  pool = new Pool({
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT || '5432'),
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    max: 1,
    ssl: false,
    connectionTimeoutMillis: 60000,
    idleTimeoutMillis: 20000,
  });
} else {
  // Desarrollo local sin proxy
  pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 1,
    ssl: false,
  });
}

export const db = drizzle(pool, { schema });