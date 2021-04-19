import raptor from '../../raptor';
const { Container } = raptor;
import Squizz from '../entities/Squizz';
import Level from '../Level';
import Game from '../../raptor/Game';
import KeyControls from '../../raptor/controls/keyControls';
import { Pos } from '../../utils/types';
import Text from '../../raptor/Text';

class TitleScreen extends Container<any> {
  private title: Text;

  constructor(
    game: Game,
    private readonly controls: KeyControls,
    private readonly onStart: () => void,
  ) {
    super();
    this.onStart = onStart;
    this.controls = controls;
    controls.reset();

    const drawText = (msg: string, pos: Pos, size = 24) => {
      const font = `${size}pt 'VT323', monospace`;
      const text = new Text(msg, { font: font, fill: '#111' });
      text.pos = pos;
      return this.add(text);
    };

    this.add(new Level(game.w, game.h));

    this.title = drawText('SQUIZZBALL', { x: 170, y: 100 }, 40);

    drawText('Fill up the screen!', { x: 170, y: 200 });
    drawText('Avoid the wildebeest.', { x: 170, y: 300 });

    const fakeControls = {
      x: 0,
      y: 0,
      action: false,
    };

    const squizz = this.add(new Squizz(fakeControls as KeyControls));
    squizz.update = () => {};
    squizz.pos = { x: 100, y: 200 };
  }

  update(dt: number, t: number) {
    super.update(dt, t);
    const { title, controls } = this;
    title.pos.y += Math.sin(t / 0.3) * 0.3;
    title.pos.x += Math.cos(t / 0.25) * 0.3;
    if (controls.action) {
      this.onStart();
    }
  }
}

export default TitleScreen;
