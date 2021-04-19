import math from './math';
import { Pos } from './types';

export type Entity = {
  pos: Pos;
  w: number;
  h: number;
  anchor?: Pos;
};

function center(entity: Entity) {
  const { pos, w, h } = entity;

  return {
    x: pos.x + w / 2,
    y: pos.y + h / 2,
  };
}

function distance(a: Entity, b: Entity) {
  return math.distance(center(a), center(b));
}

export default { center, distance };
