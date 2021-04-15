import { Pos } from '../utils/types';

class Anim {
  private curTime: number = 0;
  private curFrame: number = 0;
  frame: Pos = { x: 0, y: 0 };

  constructor(private readonly frames: Pos[], private rate: number) {
    this.frames = frames;
    this.rate = rate;
    this.reset();
  }

  update(dt: number) {
    const { rate, frames } = this;
    if ((this.curTime += dt) > rate) {
      this.curFrame++;
      this.frame = frames[this.curFrame % frames.length];
      this.curTime -= rate;
    }
  }

  reset() {
    this.frame = this.frames[0];
    this.curFrame = 0;
    this.curTime = 0;
  }
}

export default Anim;
