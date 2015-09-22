export default class Play {
  constructor(game, engines) {
    this.game = game;
    this.input = engines.input;
    this.agents = engines.agents;
    this.physics = engines.physics;
  }
  static getInstance(game, engines) {
    var play = this.play || new Play(game, engines);
    return play;
  }
  tick() {
    this.input.poll();
    this.agents.think();
    this.physics.step();
  }
}
