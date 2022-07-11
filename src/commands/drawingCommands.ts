import robot from 'robotjs';

export const drawingCommadns = (command: string, params: string[]) => {

  switch (command) {
    case 'draw_circle': drawCircle(params[0]);
      break;
    case 'draw_rectangle': drawRectangle(params[0], params[1]);
      break;
    case 'draw_square': drawSquare(params[0]);
      break;
    default: return;
  }
};

const drawCircle = (radius: string) => {
  const mousePos = robot.getMousePos();

  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const x = mousePos.x + (Number(radius) * Math.cos(i)) - (Number(radius));
    const y = mousePos.y + (Number(radius) * Math.sin(i));
    robot.dragMouse(x, y);
    robot.mouseToggle('down', 'left');
  }
  
  robot.mouseToggle('up');
}

const drawRectangle = (width: string,  length: string) => {
  const mousePos = robot.getMousePos();
  robot.mouseToggle('down', 'left');
  robot.moveMouseSmooth(mousePos.x + Number(width), mousePos.y, 40);
  robot.moveMouseSmooth(mousePos.x + Number(width), mousePos.y + Number(length), 40);
  robot.moveMouseSmooth(mousePos.x, mousePos.y + Number(length), 40);
  robot.moveMouseSmooth(mousePos.x, mousePos.y, 40);
  robot.mouseToggle('up');
}

const drawSquare = (width: string) => {
  const mousePos = robot.getMousePos();
    robot.mouseToggle('down', 'left');
    robot.moveMouseSmooth(mousePos.x + Number(width), mousePos.y, 40);
    robot.moveMouseSmooth(mousePos.x + Number(width), mousePos.y + Number(width), 40);
    robot.moveMouseSmooth(mousePos.x, mousePos.y + Number(width), 40);
    robot.moveMouseSmooth(mousePos.x, mousePos.y, 40);
    robot.mouseToggle('up');
}