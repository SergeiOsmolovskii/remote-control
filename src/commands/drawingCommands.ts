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
    const x = mousePos.x + (Number(radius) * Math.cos(i));
    const y = mousePos.y + (Number(radius) * Math.sin(i));
    robot.dragMouse(x, y);
    robot.mouseToggle('down', 'left');
  }
  
  robot.mouseToggle('up');
}

const drawRectangle = (X: string, Y: string) => {

}

const drawSquare = (X) => {

}