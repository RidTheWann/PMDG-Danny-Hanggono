import io from 'socket.io-client';
let socket: ReturnType<typeof io> | null = null;

export function getSocket(): ReturnType<typeof io> {
  if (!socket) {
    socket = io({
      path: '/api/antrean/socket',
      transports: ['websocket'],
    });
  }
  return socket;
}
