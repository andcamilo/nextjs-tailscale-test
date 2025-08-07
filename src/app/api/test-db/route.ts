import { db } from '@/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    const result = await db.execute(sql`SELECT version()`);
    return Response.json({ 
      success: true, 
      version: result.rows[0],
      environment: process.env.NODE_ENV,
      vercel_env: process.env.VERCEL_ENV,
      is_vercel: !!process.env.VERCEL,
      proxy_config: {
        http_proxy: process.env.http_proxy,
        https_proxy: process.env.https_proxy
      }
    });
  } catch (error: unknown) {
    console.error('Database connection error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ 
      success: false, 
      error: errorMessage,
      environment: process.env.NODE_ENV 
    }, { status: 500 });
  }
}