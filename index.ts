import { httpServer } from './src/http_server/index.js';
import { createWebSocketStream, WebSocketServer } from 'ws';
import { commands } from './src/commands/commands.js';
import internal from 'stream';

const HTTP_PORT = 3000;
const HTTP_WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: HTTP_WS_PORT });

wss.on('connection', (ws) => {

  const wsStream: internal.Duplex = createWebSocketStream(ws, {
    encoding: 'utf8',
    decodeStrings: false,
  });

  wsStream.on('data', (data) => {
    const command = data.toString().split(' ')[0];
    const params = data.toString().split(' ').slice(1);
    commands(command, wsStream, params);
  });
});