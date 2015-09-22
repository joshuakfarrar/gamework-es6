import Physics from './physics';
import Input from './input';
import Agents from './agents';

import Play from './play';

export default class Updater {
  constructor(game) {
    this.game = game;

    this.engines = {
      input: new Input(this.game),
      physics: new Physics(this.game),
      agents: new Agents(this.game)
    }
  }
  update() {
    var play = Play.getInstance(this.game, this.engines);
    play.tick();
  }
}
