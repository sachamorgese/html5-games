import raptor from '../raptor/';
import Squizz from './entities/Squizz';

const { Game, Level, KeyControls, math } = raptor;

const game = new Game(640, 320);

const { scene, w, h } = game;

const controls = new KeyControls();
const squizz = new Squizz(controls);
const level = new Level(w, h);
scene.add(level);
scene.add(squizz);

game.run(() => {
  const { pos } = squizz;
  const {
    bounds: { top, bottom, left, right },
  } = level;

  squizz.pos = {
    x: math.clamp(pos.x, left, right),
    y: math.clamp(pos.y, top, bottom),
  };
});
