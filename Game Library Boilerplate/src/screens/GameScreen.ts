import Game from '../../raptor/Game';
import KeyControls from '../../raptor/controls/keyControls';
import Container from '../../raptor/Container';
import Squizz from '../entities/Squizz';
import Level from '../Level';
import Baddie from '../entities/Baddie';
import Camera from '../../raptor/Camera';
import entity from '../../utils/entity';
import Text from '../../raptor/Text';
import math from '../../utils/math';
import TileSprite from '../../raptor/TileSprite';
import Texture from '../../raptor/Texture';

export type Stats = {
  pellets: number;
  maxPellets: number;
  lives: number;
  score: number;
};

type Gui = {
  complete: Text;
  score: Text;
};

type Icon = TileSprite & {
  visible: boolean;
};

const SCORE_PELLET = 8;

const textures = {
  squizz: new Texture('res/images/player-walk.png'),
};

class GameScreen extends Container<any> {
  private readonly baddies: Container<Baddie>;
  private readonly level: Level;
  private readonly camera: Camera;
  private readonly squizz: Squizz;
  private stats: Stats;
  private gui: Gui;
  private livesIcons: Icon[];

  constructor(
    game: Game,
    controls: KeyControls,
    private readonly gameOver: (res: any) => void,
  ) {
    super();
    this.gameOver = gameOver;
    this.livesIcons = [];

    const level = new Level(game.w * 3, game.h * 2);
    const squizz = new Squizz(controls);
    squizz.pos = {
      x: (level.w / 2) | 0,
      y: (level.h / 2) | 0,
    };

    const camera = this.add(
      new Camera(
        squizz,
        { w: game.w, h: game.h },
        { w: level.w, h: level.h },
        // @ts-ignore
        0.08,
      ),
    );

    // Add roaming baddies
    this.baddies = this.addBaddies(level);

    // Add it all to the game camera
    camera.add(level);
    camera.add(this.baddies);
    camera.add(squizz);

    // Add static graphic elements
    this.gui = this.createGUI(game);

    this.stats = {
      pellets: 0,
      maxPellets: level.totalFreeSpots,
      lives: 3,
      score: 0,
    };

    this.updateLivesIcons();

    // Keep references to things we need in "update"
    this.level = level;
    this.camera = camera;
    this.squizz = squizz;
  }

  addBaddies(level: Level) {
    const baddies = new Container<Baddie>();
    // Horizontal bad guys
    for (let i = 0; i < 5; i++) {
      const b = baddies.add(new Baddie(32 * 5, 0));
      b.pos.y = Math.floor(level.h / 5) * i + level.tileH * 2;
    }
    // Vertical bad guys
    for (let i = 0; i < 10; i++) {
      const b = baddies.add(new Baddie(0, 32 * 5));
      b.pos.x = Math.floor(level.w / 10) * i + level.tileW;
    }
    return baddies;
  }

  addScore(score: number) {
    const { stats, gui } = this;
    const complete = (stats.pellets / stats.maxPellets) * 100;

    stats.score += score;
    gui.score.text = stats.score.toString();
    gui.complete.text = `${complete.toFixed(1)}%`;
  }

  createGUI(game: Game) {
    const font = { font: "28pt 'VT323', monospace", fill: '#5f0' };
    const complete = this.add(new Text('', font));
    const score = this.add(
      new Text('', Object.assign({ align: 'center' }, font)),
    );
    complete.pos = { x: 20, y: 20 };
    score.pos = { x: game.w / 2, y: 20 };

    this.livesIcons = Array.from(new Array(4), (_, i) => {
      const icon = this.add(new TileSprite(textures.squizz, 32, 32));
      icon.pos = {
        x: game.w - 48,
        y: i * 48 + 180,
      };
      return icon;
    });

    return {
      complete,
      score,
    };
  }

  updateLivesIcons() {
    this.livesIcons.forEach((icon, i) => {
      icon.visible = i < this.stats.lives - 1;
    });
    console.log(this.livesIcons);
  }

  loseLife() {
    const { squizz, stats } = this;

    squizz.reset();

    if (--stats.lives === 0) {
      this.gameOver(stats);
    }
    this.updateLivesIcons();
  }

  updateBaddies() {
    const { squizz, level } = this;

    this.baddies.map((b) => {
      const { pos } = b;
      if (entity.distance(squizz, b) < 32) {
        // A hit!
        this.loseLife();

        // Send off screen for a bit
        if (b.xSpeed) pos.x = -level.w;
        else pos.y = -level.h;
      }

      // Screen wrap
      if (pos.x > level.w) pos.x = -32;
      if (pos.y > level.h) pos.y = -32;
    });
  }

  update(dt: number, t: number) {
    super.update(dt, t);
    const { squizz, level, stats } = this;

    // Make this game harder the longer you play
    squizz.minSpeed -= 0.005 * dt;
    squizz.speed -= 0.004 * dt;

    // Update game containers
    this.updateBaddies();

    // Confine player to the level bounds
    const { pos } = squizz;
    const {
      bounds: { top, bottom, left, right },
    } = level;
    pos.x = math.clamp(pos.x, left, right);
    pos.y = math.clamp(pos.y, top, bottom);

    // See if we're on new ground
    const ground = level.checkGround(entity.center(squizz));
    if (ground === 'solid') {
      stats.pellets++;
      this.addScore(SCORE_PELLET);
    }
    if (ground === 'cleared' && !squizz.isPoweredUp) {
      this.loseLife();
    }
    // Flash the background if in powerup mode
    level.blank.y = squizz.isPoweredUp && (t / 100) % 2 | 0 ? 1 : 0;
  }
}

export default GameScreen;
