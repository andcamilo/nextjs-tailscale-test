import { db } from '@/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    const result = await db.execute(sql`SELECT version()`);
    return Response.json({ 
      success: true, 
      version: result[0],
      environment: process.env.NODE_ENV 
    });
  } catch (error: any) {
    console.error('Database connection error:', error);
    return Response.json({ 
      success: false, 
      error: error.message,
      environment: process.env.NODE_ENV 
    }, { status: 500 });
  }
}