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
  update(dt) {}

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
