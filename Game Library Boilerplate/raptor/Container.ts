import { Pos } from '../utils/types';

export type ContainerChild = {
  update?: (dt: number, t: number) => void;
  dead?: boolean;
};

class Container<T extends Partial<ContainerChild>> {
  children: T[];
  pos: Pos;

  constructor() {
    this.pos = { x: 0, y: 0 };
    this.children = [];
  }

  // Container methods
  add(child: T): T {
    this.children.push(child);
    return child;
  }

  remove(child: T) {
    this.children = this.children.filter((c) => c !== child);
    return child;
  }

  update(dt: number, t: number) {
    this.children.forEach((child) => {
      if (child.update) {
        child.update(dt, t);
      }
      if (child.dead) {
        this.remove(child);
      }
    });
  }

  map(f: (...args: any) => void) {
    return this.children.map(f);
  }
}

export default Container;
