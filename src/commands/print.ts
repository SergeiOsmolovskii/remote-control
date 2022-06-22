import robot from 'robotjs';
import Jimp from 'jimp';
import { WebSocket } from 'ws';


export const printScreen = (ws: WebSocket) => {
  const mousePos = robot.getMousePos();
  const currentX = mousePos.x - 100;
  const currentY = mousePos.y - 100; 
  const screen: string = robot.screen.capture(currentX, currentY, 200, 200).image;

  new Jimp({data: screen, width: 200, height: 200}, (err: Error, image) => { 
    image.getBuffer(Jimp.MIME_PNG, (err: Error, buffer: string) => {
      const data = Buffer.from(buffer, 'base64');
      ws.send(`prnt_scrn ${data.toString('base64')}`);
    }); 
  });
};