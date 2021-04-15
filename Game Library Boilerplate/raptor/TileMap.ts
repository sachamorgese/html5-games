import Container, { ContainerChild } from './Container';
import TileSprite from './TileSprite';
import Texture from './Texture';
import { Pos } from '../utils/types';

class TileMap extends Container<ContainerChild> {
  private w: number;
  private h: number;

  constructor(
    tiles: Pos[],
    private readonly mapW: number,
    private readonly mapH: number,
    private readonly tileW: number,
    private readonly tileH: number,
    texture: Texture,
  ) {
    super();
    this.mapW = mapW;
    this.mapH = mapH;
    this.tileW = tileW;
    this.tileH = tileH;
    this.w = mapW * tileW;
    this.h = mapH * tileH;

    // Add all TileSprites
    this.children = tiles.map((frame, i) => {
      const s = new TileSprite(texture, tileW, tileH);
      s.frame = frame;
      s.pos.x = (i % mapW) * tileW;
      s.pos.y = Math.floor(i / mapW) * tileH;
      return s;
    });
  }

  pixelToMapPos(pos: Pos) {
    const { tileW, tileH } = this;
    return {
      x: Math.floor(pos.x / tileW),
      y: Math.floor(pos.y / tileH),
    };
  }

  mapToPixelPos(mapPos: Pos) {
    const { tileW, tileH } = this;
    return {
      x: mapPos.x * tileW,
      y: mapPos.y * tileH,
    };
  }

  tileAtMapPos(mapPos: Pos) {
    return this.children[mapPos.y * this.mapW + mapPos.x];
  }

  tileAtPixelPos(pos: Pos) {
    return this.tileAtMapPos(this.pixelToMapPos(pos));
  }
}

export default TileMap;
