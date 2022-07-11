import robot from 'robotjs';
import Jimp from 'jimp';
import internal from 'stream';

export const printScreen = (wsStream: internal.Duplex) => {
  const mousePos = robot.getMousePos();
  const currentX = mousePos.x - 100;
  const currentY = mousePos.y - 100;
  const screen = robot.screen.capture(currentX, currentY, 200, 200).image;

  new Jimp({ data: screen, width: 200, height: 200 }, (err: Error, image) => {
    let pos = 0;

    image.scan(0, 0, 200, 200, (x, y, idx) => {
      image.bitmap.data[idx + 2] = screen.readUInt8(pos++);
      image.bitmap.data[idx + 1] = screen.readUInt8(pos++);
      image.bitmap.data[idx + 0] = screen.readUInt8(pos++);
      image.bitmap.data[idx + 3] = screen.readUInt8(pos++);
    });

    image.getBuffer(Jimp.MIME_PNG, (err: Error, buffer: string) => {
      const data = Buffer.from(buffer, 'base64');
      wsStream.write(`prnt_scrn ${data.toString('base64')}`);
    });
  });
};
