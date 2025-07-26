import type { NextApiRequest, NextApiResponse } from 'next';

let clients: NextApiResponse[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  clients.push(res);

  req.on('close', () => {
    clients = clients.filter((client) => client !== res);
  });
}

export function sendAntreanSSE(data: unknown) {
  for (const client of clients) {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  }
}
