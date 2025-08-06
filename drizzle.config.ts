import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST || '100.66.76.2',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'n8n_user',
    password: process.env.DB_PASSWORD || 'sg*?esXL}>z9wO4f',
    database: process.env.DB_NAME || 'n8n_db',
    ssl: false,
  },
} satisfies Config;