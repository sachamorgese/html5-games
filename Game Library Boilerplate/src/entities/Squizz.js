import pop from '../../raptor';
import math from '../../utils/math';
const { TileSprite, Texture } = pop;
const texture = new Texture('res/images/player-walk.png');

class Squizz extends TileSprite {
  constructor(controls) {
    super(texture, 32, 32);
    this.curTime = 0;
    this.speed = 0.15;
    this.dir = {
      x: 1,
      y: 0,
    };

    const { x, y } = controls;
    if (x && x !== this.dir.x) {
      // Change to horizontal movement
    } else if (y && y !== this.dir.y) {
      // Change to vertical movement
    }

    // Set up the different animations
    const { anims } = this;
    anims.add(
      'walk',
      [0, 1, 2, 3].map((x) => ({ x, y: 0 })),
      0.07 * this.speed,
    );
    anims.add(
      'idle',
      [
        { x: 0, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: 1 },
        { x: 4, y: 0 },
      ],
      0.001 * this.speed,
    );

    // Play one of them!
    anims.play('walk');
  }
  update(dt, t) {
    super.update(dt);
    const { pos, speed } = this;

    pos.x += speed * dt;
  }
}

export default Squizz;
