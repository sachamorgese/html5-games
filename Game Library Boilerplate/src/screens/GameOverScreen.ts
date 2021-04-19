import raptor from '../../raptor';
const { Container } = raptor;
import Text from '../../raptor/Text';
import hiscore from '../hiscore';
import Level from '../Level';
import Game from '../../raptor/Game';
import KeyControls from '../../raptor/controls/keyControls';
import { Pos } from '../../utils/types';
import { Stats } from './GameScreen';

class GameOverScreen extends Container<any> {
  constructor(
    game: Game,
    private readonly controls: KeyControls,
    stats: Stats,
    private readonly onStart: () => void,
  ) {
    super();

    this.onStart = onStart;
    this.controls = controls;
    controls.reset();

    const drawText = (msg: string, pos: Pos, size = 24) => {
      const font = `${size}pt 'VT323', monospace`;
      const text = new Text(msg, { font: font, fill: '#111', align: 'center' });
      text.pos = pos;
      this.add(text);
    };

    this.add(new Level(game.w, game.h));

    const complete = +((stats.pellets / stats.maxPellets) * 100).toFixed(1);
    if (stats.score > hiscore.bestScore) {
      hiscore.bestScore = stats.score;
    }
    if (complete > hiscore.bestComplete) {
      hiscore.bestComplete = complete;
    }

    drawText('GAME OVER', { x: game.w / 2, y: 120 }, 44);
    drawText(`Completed: ${complete}%`, { x: game.w / 2, y: 230 }, 30);
    drawText(`best: ${hiscore.bestComplete}%`, { x: game.w / 2, y: 260 });
    drawText('Score: ' + stats.score, { x: game.w / 2, y: 310 }, 30);
    drawText('best: ' + hiscore.bestScore, { x: game.w / 2, y: 340 });
  }

  update(dt: number, t: number) {
    super.update(dt, t);

    if (this.controls.action) {
      this.onStart();
    }
  }
}

export default GameOverScreen;
