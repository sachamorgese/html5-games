import { Pos } from './types';

function rand(min: number, max?: number) {
  // return random integer
  return Math.floor(randf(min, max));
}

function randf(min: number, max?: number) {
  // return random float
  if (max == null) {
    max = min || 1;
    min = 0;
  }
  return Math.random() * (max - min) + min;
}

function randOneIn(max = 2) {
  return rand(0, max) === 0;
}

function randOneFrom(items: any[]) {
  return items[rand(items.length)];
}

function distance(a: Pos, b: Pos) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function clamp(x: number, min: number, max: number) {
  return Math.max(min, Math.min(x, max));
}

// @ts-ignore
export default { rand, randf, randOneIn, randOneFrom, distance, clamp };
