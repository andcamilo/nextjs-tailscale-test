import { Client } from 'pg';
import { SocksClient } from 'socks';
import type { Socket } from 'net';

export async function connectPgViaFixie() {
  // 1. Establecer el túnel SOCKS5
  const { socket } = await SocksClient.createConnection({
    command: 'connect',
    proxy: {
      host: 'century.usefixie.com',
      port: 1080,
      type: 5,
      userId: 'fixie',
      password: 'hwAXP1CEv6zp2P4',
    },
    destination: {
      host: '34.41.173.45',
      port: 5432,
    },
    timeout: 20_000,
  });

  // 2. Entregar ese *mismo* socket (ya conectado) a pg
  const client = new Client({
    user: 'n8n_user',
    password: 'sg*?esXL}>z9wO4f',
    database: 'n8n_db',
    stream: () => {
      const s = socket as Socket;
      type ConnectFn = typeof s.connect;
      const noopConnect = ((..._args: Parameters<ConnectFn>): Socket => {
        void _args; // silence unused param
        setImmediate(() => s.emit('connect'));
        return s;
      }) as ConnectFn;
      (s as unknown as { connect: ConnectFn }).connect = noopConnect;
      return s;
    },
    statement_timeout: 60_000,
  });

  await client.connect();        // no vuelve a llamar .connect() al socket
  return client;
}
