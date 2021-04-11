import raptor from '../raptor/';
import Squizz from './entities/Squizz'

const { Game, Sprite, Texture, math, MouseControls, Container } = raptor;

const game = new Game(640, 320);
const mouse = new MouseControls(game.renderer.view);


const { scene, w, h } = game;

const balls = scene.add(new Container());
for (let i = 0; i < 100; i++) {
  const squizz = balls.add(new Squizz());

  squizz.pos.x = math.rand(w);
  squizz.pos.y = math.rand(h);
}

game.run((dt, t) => {
  const { pressed, pos } = mouse;

  balls.map(b => {
    if (b.pos.x > w) {
      b.right = false;
    } else if (b.pos.x < -32) {
      b.right = true;
      b.speed *= 1.1;
    }

    if (pressed && math.distance(pos, b.pos) < 16) {
      if (b.speed > 0) {
        b.speed = 0;
      } else {
        b.dead = true;
      }
    }
  })

  mouse.update()
});
