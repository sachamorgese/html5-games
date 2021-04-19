import Container from './Container';
import math from '../utils/math';
import { Pos, Viewport } from '../utils/types';
import { Entity } from '../utils/entity';

class Camera extends Container<any> {
  w: number;
  h: number;
  subject: Pos | undefined;
  offset: Pos;

  constructor(
    subject: Entity | null,
    viewport: Viewport,
    private readonly worldSize = viewport,
  ) {
    super();
    this.w = viewport.w;
    this.h = viewport.h;
    this.worldSize = worldSize;
    this.offset = { x: 0, y: 0 };
    this.setSubject(subject);
  }

  setSubject(e: Entity | null) {
    this.subject = e ? e.pos || e : this.pos;
    // Center on the entity
    if (e?.w) {
      this.offset.x += e.w / 2;
      this.offset.y += e.h / 2;
    }
    if (e?.anchor) {
      this.offset.x -= e.anchor.x;
      this.offset.y -= e.anchor.y;
    }
    this.focus();
  }

  focus() {
    const { pos, w, h, worldSize, subject, offset } = this;
    if (!subject) return;
    const centeredX = subject.x + offset.x - w / 2;
    const maxX = worldSize.w - w;
    const x = -math.clamp(centeredX, 0, maxX);
    const centeredY = subject.y + offset.y - h / 2;
    const maxY = worldSize.h - h;
    const y = -math.clamp(centeredY, 0, maxY);
    pos.x = x;
    pos.y = y;
  }

  update(dt: number, t: number) {
    super.update(dt, t);

    if (this.subject) {
      this.focus();
    }
  }
}

export default Camera;
