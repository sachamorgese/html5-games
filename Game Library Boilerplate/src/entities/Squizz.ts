import pop from '../../raptor';
import { Pos } from '../../utils/types';
import KeyControls from '../../raptor/controls/keyControls';

const { TileSprite, Texture } = pop;
const texture = new Texture('res/images/player-walk.png');

class Squizz extends TileSprite {
  speed: number;
  dir: Pos;

  constructor(private readonly controls: KeyControls) {
    super(texture, 32, 32);
    this.controls = controls;

    const { anims } = this;
    anims.add(
      'walk',
      [0, 1, 2, 3].map((x) => ({ x, y: 0 })),
      0.1,
    );
    anims.play('walk');

    this.speed = 0.15;
    this.dir = {
      x: 1,
      y: 0,
    };
  }

  update(dt: number) {
    super.update(dt);
    const { pos, speed, dir } = this;

    const { x, y } = this.controls;

    if (x && x !== dir.x) {
      // Change to horizontal movement
      dir.x = x;
      dir.y = 0;
      pos.y = Math.round(pos.y / 32) * 32;
    } else if (y && y !== dir.y) {
      dir.x = 0;
      dir.y = y;
      pos.x = Math.round(pos.x / 32) * 32;
    }

    pos.x += dir.x * dt * (32 / speed);
    pos.y += dir.y * dt * (32 / speed);
  }
}

export default Squizz;
