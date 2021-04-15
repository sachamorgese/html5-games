import { Pos } from '../../utils/types';

class MouseControls {
  private readonly el: HTMLDivElement;
  private pos: Pos;
  private isDown: boolean;
  private pressed: boolean;
  private released: boolean;

  constructor(container: HTMLDivElement) {
    this.el = container || document.body;
    // State
    this.pos = { x: 0, y: 0 };
    this.isDown = false;
    this.pressed = false;
    this.released = false;
    // Handlers
    document.addEventListener('mousemove', this.move, false);
    document.addEventListener('mousedown', this.down, false);
    document.addEventListener('mouseup', this.up, false);
  }

  mousePosFromEvent({
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
  }) {
    const { el, pos } = this;
    // @ts-ignore
    const { width = 0, height = 0 } = el;
    const rect = el.getBoundingClientRect();
    const xr = width / el.clientWidth;
    const yr = height / el.clientHeight;
    pos.x = (clientX - rect.left) * xr;
    pos.y = (clientY - rect.top) * yr;
  }

  move = (e: MouseEvent) => {
    this.mousePosFromEvent(e);
  };

  down = (e: MouseEvent) => {
    this.isDown = true;
    this.pressed = true;
    this.mousePosFromEvent(e);
  };

  up() {
    this.isDown = false;
    this.released = true;
  }

  update() {
    this.released = false;
    this.pressed = false;
  }
}

export default MouseControls;
