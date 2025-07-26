import { Server } from 'socket.io';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Server as HTTPServer } from 'http';

// Singleton pattern to prevent multiple Socket.io servers
let io: Server | null = null;

export function getIO(server?: HTTPServer): Server | null {
  if (!io && server) {
    io = new Server(server, {
      path: '/api/antrean/socket',
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });
  }
  return io;
}

// Next.js API Route handler for WebSocket upgrade
export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  const sock = res.socket as unknown as { server: HTTPServer & { io?: Server } };
  if (sock && sock.server) {
    const server = sock.server;
    if (!('io' in server)) {
      const ioInstance = getIO(server);
      server.io = ioInstance!;
      if (ioInstance) {
        ioInstance.on('connection', (socket) => {
          socket.on('disconnect', () => {});
        });
      }
    }
  }
  res.end();
}

// Helper to emit antrean update to all clients
export function emitAntreanUpdate(data: unknown): void {
  io?.emit('antrean-update', data);
}
