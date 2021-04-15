import { Pos } from '../utils/types';

class Text {
  pos: Pos;
  text: string;
  style: {
    [k: string]: string;
  };

  constructor(text = '', style = {}) {
    this.pos = { x: 0, y: 0 };
    this.text = text;
    this.style = style;
  }
}

export default Text;
