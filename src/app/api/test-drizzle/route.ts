import { NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from 'drizzle-orm';
import { connectPgViaFixie } from '@/lib/pgViaFixie';
import * as schema from '@/db/schema';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const client = await connectPgViaFixie();
    const db = drizzle(client, { schema });

    const result = await db.execute(sql`SELECT version(), NOW() AS current_time`);
    await client.end();

    type Row = { version: string; current_time: string };
    const row = (result as unknown as { rows: Row[] }).rows[0];

    return NextResponse.json({
      success: true,
      environment: process.env.VERCEL ? 'vercel' : 'local',
      data: {
        version: row.version,
        current_time: row.current_time,
      },
      connection_info: {
        host: '34.41.173.45',
        port: 5432,
        database: 'n8n_db',
        proxy: 'SOCKS5 via Fixie (century.usefixie.com:1080)',
        driver: 'drizzle-orm/node-postgres',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: message, environment: process.env.VERCEL ? 'vercel' : 'local' },
      { status: 500 },
    );
  }
} 