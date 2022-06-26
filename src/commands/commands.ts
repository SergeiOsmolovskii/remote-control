import { WebSocket } from 'ws';
import { mouseCommadns } from './mouseMoveCommands.js';
import { drawingCommadns } from './drawingCommands.js';
import { printScreen } from './print.js';
import robot from 'robotjs';

export const commands = (command: string, ws: WebSocket, params: string[]) => {
  
  if (command === 'mouse_position' ) {
    const curreentMousePosition = robot.getMousePos();
    ws.send(`mouse_position ${curreentMousePosition.x},${curreentMousePosition.y}`);
  } else if (command.includes('mouse_')) {
    mouseCommadns(command, params);
    ws.send(command);
  } else if (command.includes('draw_')) {
    drawingCommadns(command, params);
    ws.send(command);
  } else if (command.includes('prnt_')) {
    printScreen(ws);
  }
}