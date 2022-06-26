import { mouseCommadns } from './mouseMoveCommands.js';
import { drawingCommadns } from './drawingCommands.js';
import { printScreen } from './print.js';
import robot from 'robotjs';
import internal from 'stream';

export const commands = (command: string, wsStream: internal.Duplex, params: string[]) => {
  
  if (command === 'mouse_position' ) {
    const curreentMousePosition = robot.getMousePos();
    wsStream.write(`mouse_position ${curreentMousePosition.x},${curreentMousePosition.y}`);
  } else if (command.includes('mouse_')) {
    mouseCommadns(command, params);
    wsStream.write(command);
  } else if (command.includes('draw_')) {
    drawingCommadns(command, params);
    wsStream.write(command);
  } else if (command.includes('prnt_')) {
    printScreen(wsStream);
  }
}