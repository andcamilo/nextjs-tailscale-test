import { Client } from 'pg';

export async function GET() {
  let client: Client | null = null;
  
  try {
    // Configurar proxy SOCKS para Vercel usando variables de entorno
    const isVercel = !!process.env.VERCEL;
    
    if (isVercel) {
      // En Vercel: configurar proxy SOCKS globalmente
      process.env.http_proxy = 'socks5://fixie:hwAXP1CEv6zp2P4@44.219.233.55:1080';
      process.env.https_proxy = 'socks5://fixie:hwAXP1CEv6zp2P4@44.219.233.55:1080';
      
      client = new Client({
        host: '34.41.173.45',
        port: 5432,
        database: 'n8n_db',
        user: 'n8n_user',
        password: 'sg*?esXL}>z9wO4f',
        connectionTimeoutMillis: 60000,
      });
    } else {
      // Local: conexión directa
      client = new Client({
        host: '100.66.76.2',
        port: 5432,
        database: 'n8n_db',
        user: 'n8n_user',
        password: 'sg*?esXL}>z9wO4f',
      });
    }

    await client.connect();
    
    // Ejecutar query de prueba
    const result = await client.query('SELECT version(), now() as current_time');
    
    await client.end();
    
    return Response.json({
      success: true,
      environment: isVercel ? 'vercel' : 'local',
      data: result.rows[0],
      connection_info: {
        host: client.host,
        port: client.port,
        database: client.database
      }
    });
    
  } catch (error: unknown) {
    if (client) {
      try { await client.end(); } catch {}
    }
    
    console.error('PostgreSQL connection error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return Response.json({
      success: false,
      error: errorMessage,
      environment: !!process.env.VERCEL ? 'vercel' : 'local'
    }, { status: 500 });
  }
}