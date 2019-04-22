import {
  pointMouseDownEvents, setAddPointsEventsCanvas, pointMouseUpEvents, drawLine, mouseOverEvents,
} from '../eventWorkers/addPointsEventsWorker';

function assignAddPointsOnExistingPolygonEvents(canvas) {
  setAddPointsEventsCanvas(canvas);

  canvas.on('mouse:down', (e) => {
    pointMouseDownEvents(e);
  });

  canvas.on('mouse:over', (e) => {
    mouseOverEvents(e);
  });

  canvas.on('mouse:move', (e) => {
    drawLine(e);
  });

  canvas.on('mouse:up', (e) => {
    pointMouseUpEvents(e);
  });

  canvas.on('mouse:out', () => {

  });
}

export { assignAddPointsOnExistingPolygonEvents as default };
