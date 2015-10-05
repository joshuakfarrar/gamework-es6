import Keyboard from './keyboard';

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
    this.input.poll(() => {
      var self = this;

      var camera = this.game.renderer.camera;

      function bind(key, cb = function(){}) {
        if (self.input.isKeyDown(key)) {
          cb();
        }
      }

      bind(Keyboard.Q, () => {
        camera.strafeLeft();
      });
      bind(Keyboard.W, () => {
        camera.forward();
      });
      bind(Keyboard.E, () => {
        camera.strafeRight();
      });
      bind(Keyboard.A, () => {
        camera.turnLeft();
      });
      bind(Keyboard.S, () => {
        camera.backward();
      });
      bind(Keyboard.D, () => {
        camera.turnRight();
      });
    });
    this.agents.think();
    this.physics.step();
  }
}
