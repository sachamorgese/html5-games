import Texture from './Texture';
import { Pos } from '../utils/types';

class Sprite {
  private texture;
  public pos: Pos;
  anchor: Pos;
  scale: Pos;
  pivot: Pos;
  rotation;

  constructor(texture: Texture) {
    this.texture = texture;
    this.pos = { x: 0, y: 0 };
    this.anchor = { x: 0, y: 0 };
    this.scale = { x: 1, y: 1 };
    this.pivot = { x: 0, y: 0 };
    this.rotation = 0;
  }
}
export default Sprite;
