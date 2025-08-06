import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Configuración para desarrollo vs producción
const isProduction = process.env.NODE_ENV === 'production';

// Configurar proxy HTTP para producción (Fixie)
let clientConfig: Record<string, any> = {
  host: isProduction 
    ? (process.env.DB_HOST || '34.41.173.45')
    : (process.env.DB_HOST || '100.66.76.2'),
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'n8n_db',
  username: process.env.DB_USER || 'n8n_user',
  password: process.env.DB_PASSWORD || 'sg*?esXL}>z9wO4f',
  max: 1,
  ssl: false,
};

// En producción, configurar proxy HTTP para Fixie
if (isProduction && process.env.FIXIE_URL) {
  const proxyUrl = new URL(process.env.FIXIE_URL);
  clientConfig = {
    ...clientConfig,
    connection: {
      host: clientConfig.host,
      port: clientConfig.port,
    },
    proxy: {
      host: proxyUrl.hostname,
      port: parseInt(proxyUrl.port || '80'),
      username: proxyUrl.username,
      password: proxyUrl.password,
    }
  };
  
  // Configurar variables de entorno para el cliente PostgreSQL
  process.env.HTTP_PROXY = process.env.FIXIE_URL;
  process.env.HTTPS_PROXY = process.env.FIXIE_URL;
}

const client = postgres(clientConfig);

export const db = drizzle(client, { schema });