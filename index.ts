import { httpServer } from './src/http_server/index.js';
import { WebSocketServer } from 'ws';
import { commands } from './src/commands/commands.js';

const HTTP_PORT = 3000;
const HTTP_WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({
  port: HTTP_WS_PORT
});

wss.on('connection', (ws) => {
  ws.on('message', function incoming(message) {
    const command = message.toString().split(' ')[0];
    const params = message.toString().split(' ').slice(1);
    commands(command, ws, params);
  });
});