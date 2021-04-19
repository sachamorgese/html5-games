import GameScreen, { Stats } from './screens/GameScreen';
import raptor from '../raptor/';
import LogoScreen from './screens/LogoScreen';
import TitleScreen from './screens/TitleScreen';
import GameOverScreen from './screens/GameOverScreen';

const { Game, KeyControls } = raptor;

const game = new Game(640, 480);
const controls = new KeyControls();

function titleScreen() {
  game.scene = new TitleScreen(game, controls, newGame);
}

function gameOverScreen(result: Stats) {
  game.scene = new GameOverScreen(game, controls, result, titleScreen);
}

function newGame() {
  game.scene = new GameScreen(game, controls, gameOverScreen);
}

game.scene = new LogoScreen(game, titleScreen);
game.run();
