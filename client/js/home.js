import Game from './game';

class App {
  constructor() {
    var canvas = document.getElementById("canvas");

    this.game = new Game();
    this.game.setup(canvas);

    this.game.run();
  }
}

var app = new App();
