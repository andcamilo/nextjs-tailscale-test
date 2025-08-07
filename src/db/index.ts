import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { SocksProxyAgent } from 'socks-proxy-agent';
import * as schema from './schema';

// Configuración para desarrollo vs producción
const isProduction = process.env.NODE_ENV === 'production';

let sql: any;

if (isProduction) {
  // Crear el proxy agent para Fixie
  const proxyAgent = new SocksProxyAgent(
    'socks5://fixie:hwAXP1CEv6zp2P4@century.usefixie.com:1080'
  );

  // Configurar postgres con el proxy
  sql = postgres("postgres://n8n_user:sg*?esXL}>z9wO4f@34.41.173.45:5432/n8n_db", {
    socket: proxyAgent,
    max: 1,
    idle_timeout: 20,
    connect_timeout: 60,
  });
} else {
  // Desarrollo sin proxy
  sql = postgres({
    host: process.env.DB_HOST || '100.66.76.2',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'n8n_db',
    user: process.env.DB_USER || 'n8n_user',
    password: process.env.DB_PASSWORD || 'sg*?esXL}>z9wO4f',
    max: 1,
    ssl: false,
  });
}

export const db = drizzle(sql, { schema });