import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { SocksProxyAgent } from 'socks-proxy-agent';
import * as schema from './schema';

// Configuración para desarrollo vs producción
const isProduction = process.env.NODE_ENV === 'production';

let pool: Pool;

if (isProduction) {
  // Para producción, configurar proxy SOCKS
  const proxyAgent = new SocksProxyAgent(
    'socks5://fixie:hwAXP1CEv6zp2P4@century.usefixie.com:1080'
  );

  pool = new Pool({
    host: '34.41.173.45',
    port: 5432,
    database: 'n8n_db',
    user: 'n8n_user',
    password: 'sg*?esXL}>z9wO4f',
    max: 1,
    ssl: false,
    // Configurar el proxy para las conexiones TCP
    connectionTimeoutMillis: 60000,
    idleTimeoutMillis: 20000,
    // @ts-expect-error - pg types don't include agent option but it works
    agent: proxyAgent,
  });
} else {
  // Desarrollo sin proxy
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