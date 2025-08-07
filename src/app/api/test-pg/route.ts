import { NextResponse } from 'next/server';
import { connectPgViaFixie } from '@/lib/pgViaFixie';

export const runtime = 'nodejs';   // asegura que NO sea Edge

export async function GET() {
  try {
    const db = await connectPgViaFixie();
    const { rows } = await db.query('SELECT version(), NOW() AS current_time');
    await db.end();

    return NextResponse.json({
      success: true,
      environment: process.env.VERCEL ? 'vercel' : 'local',
      data: {
        version: rows[0].version,
        current_time: rows[0].current_time,
      },
      connection_info: {
        host: '34.41.173.45',
        port: 5432,
        database: 'n8n_db',
        proxy: 'SOCKS5 via Fixie (century.usefixie.com:1080)',
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message ?? 'unknown',
        environment: process.env.VERCEL ? 'vercel' : 'local',
      },
      { status: 500 },
    );
  }
}
