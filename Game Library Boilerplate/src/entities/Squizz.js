import pop from '../../raptor';
import math from '../../utils/math'
const { TileSprite, Texture } = pop;
const texture = new Texture('res/images/player-walk.png');

class Squizz extends TileSprite {
  constructor() {
    super(texture, 32, 32);
    this.rate = 0.1;
    this.curTime = 0;
    this.curFrame = 0;
    this.frames = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ];
    this.frame = this.frames[this.curFrame];
    this.speed = math.rand(20, 100);
    this.right = true;
    this.anchor = { x: -16, y: -16 }
  }
  update(dt, t) {
    const { pos, speed, rate, frames } = this;
    this.curTime += dt;
    if (this.curTime > dt) {
      this.frame = frames[this.curFrame++ % frames.length]
      this.curTime -= rate;
    }

    pos.x += (this.right ? +1 : -1) * speed * dt;
  }
}

export default Squizz;
