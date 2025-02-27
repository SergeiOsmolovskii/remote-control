import robot from 'robotjs';

export const mouseCommadns = (command: string, params: string[]) => {

  switch (command) {
    case 'mouse_up': mouseUp(params[0]);
      break;
    case 'mouse_down': mouseDown(params[0]);
      break;
    case 'mouse_left': mouseLeft(params[0]);
      break;
    case 'mouse_right': mouseRight(params[0]);
      break;
    default: return;
  }
};

const mouseUp = (Y: string) => {
  const curreentMousePosition = robot.getMousePos();
  robot.moveMouse(curreentMousePosition.x, curreentMousePosition.y - Number(Y));
}

const mouseDown = (Y: string) => {
  const curreentMousePosition = robot.getMousePos();
  robot.moveMouse(curreentMousePosition.x, curreentMousePosition.y + Number(Y));
}

const mouseLeft = (X: string) => {
  const curreentMousePosition = robot.getMousePos();
  robot.moveMouse(curreentMousePosition.x - Number(X), curreentMousePosition.y);
}

const mouseRight = (X: string) => {
  const curreentMousePosition = robot.getMousePos();
  robot.moveMouse(curreentMousePosition.x + Number(X), curreentMousePosition.y);
}
