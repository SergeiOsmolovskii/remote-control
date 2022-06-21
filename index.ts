import Jimp from 'jimp';
import { httpServer } from './src/http_server/index.js';
import robot from 'robotjs';
import { WebSocketServer } from 'ws';
import { mouseCommadns } from './src/commands/mouseMoveCommands.js';

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
    if (command === 'mouse_position' ) {
      const curreentMousePosition = robot.getMousePos();
      ws.send(`mouse_position ${curreentMousePosition.x},${curreentMousePosition.y}`);
    } else if (command.includes('mouse_')) {
      mouseCommadns(command, params);
      ws.send(command);
    } else if (command.includes('draw_')) {
      console.log('draw');
      ws.send(command);
    } else if (command.includes('prnt_')) {
      ws.send(command);
      console.log('prnt');
    }
  });
});