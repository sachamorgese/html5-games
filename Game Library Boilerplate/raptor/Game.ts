import Container from './Container';
import CanvasRenderer from './renderer/CanvasRenderer';

const STEP = 1 / 60;
const MAX_FRAME = STEP * 5;

class Game {
  private readonly renderer;
  scene: Container<any>;

  constructor(readonly w: number, readonly h: number, parent = '#board') {
    this.w = w;
    this.h = h;
    this.renderer = new CanvasRenderer(w, h);
    const parentElement = document.querySelector(parent);
    if (parentElement) {
      parentElement.appendChild(this.renderer.view);
    }

    this.scene = new Container();
  }

  run(gameUpdate = (dt: number, t: number) => {}) {
    let dt = 0;
    let last = 0;
    const loopy = (ms: number) => {
      requestAnimationFrame(loopy);

      const t = ms / 1000; // Let's work in seconds
      dt = Math.min(t - last, MAX_FRAME);
      last = t;

      this.scene.update(dt, t);
      gameUpdate(dt, t);
      this.renderer.render(this.scene);
    };
    requestAnimationFrame(loopy);
  }
}

export default Game;
