import Sprite from './Sprite';
import AnimManager from './AnimManager';
import Texture from './Texture';
import { Pos } from '../utils/types';

class TileSprite extends Sprite {
  private readonly tileW: number;
  private readonly tileH: number;
  protected anims;
  frame: Pos;

  constructor(texture: Texture, w: number, h: number) {
    super(texture);
    this.tileW = w;
    this.tileH = h;
    this.frame = { x: 0, y: 0 };
    this.anims = new AnimManager(this);
  }

  update(dt: number, t?: number) {
    this.anims.update(dt);
  }

  get w() {
    return this.tileW * Math.abs(this.scale.x);
  }

  get h() {
    return this.tileH * Math.abs(this.scale.y);
  }
}

export default TileSprite;
