import Anim from './Anim';
import TileSprite from './TileSprite';
import { Pos } from '../utils/types';

type Anims = {
  [name: string]: Anim;
};

class AnimManager {
  private anims: Anims;
  private running: boolean;
  private frameSource;
  private current: string;

  constructor(e: TileSprite) {
    this.anims = {};
    this.running = false;
    this.frameSource = e.frame || e;
    this.current = '';
  }

  add(name: string, frames: Pos[], speed: number) {
    this.anims[name] = new Anim(frames, speed);
    return this.anims[name];
  }

  update(dt: number) {
    const { current, anims, frameSource } = this;
    if (!current) {
      return;
    }
    const anim = anims[current];
    anim.update(dt);

    // Sync the TileSprite frame
    frameSource.x = anim.frame.x;
    frameSource.y = anim.frame.y;
  }

  play(anim: string) {
    const { current, anims } = this;
    if (anim === current) {
      return;
    }
    this.current = anim;
    anims[anim].reset();
  }

  stop() {
    this.current = '';
  }
}

export default AnimManager;
