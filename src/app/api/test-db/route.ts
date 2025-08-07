import { db } from '@/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    const result = await db.execute(sql`SELECT version()`);
    return Response.json({ 
      success: true, 
      version: result.rows[0],
      environment: process.env.NODE_ENV 
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