import Anim from './Anim'

class AnimManager {
  constructor(e) {
    this.anims = {};
    this.running = false;
    this.frameSource = e.frame || e;
    this.current = null;
  }

  add(name, frames, speed) {
    this.anims[name] = new Anim(frames, speed);
    return this.anims[name];
  }

  update(dt) {
    const { current, anims, frameSource } = this;
    if (!current) {
      return;
    }
    const anim = anims[current];
    anim.update(dt)

    // Sync the TileSprite frame
    frameSource.x = anim.frame.x;
    frameSource.y = anim.frame.y;
  }

  play(anim) {
    const { current, anims } = this;
    if (anim === current) {
      return;
    }
    this.current = anim;
    anims[anim].reset();
  }

  stop() {
    this.current = null;
  }
}

export default AnimManager
