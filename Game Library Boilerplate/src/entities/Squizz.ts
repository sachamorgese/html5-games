import pop from '../../raptor';
import { Pos } from '../../utils/types';
import KeyControls from '../../raptor/controls/keyControls';

const { TileSprite, Texture } = pop;
const texture = new Texture('res/images/player-walk.png');

class Squizz extends TileSprite {
  speed: number;
  dir: Pos;
  dead: boolean;
  nextCell: number;
  minSpeed: number;
  isPoweredUp: boolean;

  constructor(private readonly controls: KeyControls) {
    super(texture, 32, 32);
    this.controls = controls;

    const { anims } = this;
    anims.add(
      'walk',
      [0, 1, 2, 3].map((x) => ({ x, y: 0 })),
      0.1,
    );

    this.minSpeed = 0.5;
    this.reset();

    this.speed = this.minSpeed;
    this.dir = {
      x: 1,
      y: 0,
    };
    this.nextCell = this.speed;
    this.dead = false;
    this.isPoweredUp = false;
  }

  reset() {
    this.speed = this.minSpeed * 5;
    this.anims.play('walk');
  }

  update(dt: number) {
    super.update(dt);
    const { pos, controls, minSpeed, speed, dir } = this;

    if ((this.nextCell -= dt) <= 0) {
      this.nextCell += speed;
      const { x, y } = controls;
      if (x && x !== dir.x) {
        dir.x = x;
        dir.y = 0;
        pos.y = Math.round(pos.y / 32) * 32;
      } else if (y && y !== dir.y) {
        dir.x = 0;
        dir.y = y;
        pos.x = Math.round(pos.x / 32) * 32;
      }
    }

    // Speed adjustments
    if (this.speed > minSpeed) {
      this.speed -= dt;
    }

    pos.x += dir.x * dt * (32 / speed);
    pos.y += dir.y * dt * (32 / speed);
  }
}

export default Squizz;
