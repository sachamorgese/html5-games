import Container from '../../raptor/Container';
import Sprite from '../../raptor/Sprite';
import Texture from '../../raptor/Texture';
import Game from '../../raptor/Game';

const texture = new Texture('/res/images/logo-mompop.png');

class LogoScreen extends Container<any> {
  life: number;
  private readonly logo: Sprite;

  constructor(game: Game, private onStart: () => void) {
    super();
    this.onStart = onStart;
    this.life = 2;
    const logo = (this.logo = this.add(new Sprite(texture)));
    logo.pos = { x: 220, y: 130 };
  }

  update(dt: number, t: number) {
    super.update(dt, t);
    this.life -= dt;

    const { logo, life } = this;
    if (life < 0) {
      this.onStart();
    }
    if (life < 0.4) {
      logo.pos.y -= 1000 * dt;
    }
  }
}

export default LogoScreen;
