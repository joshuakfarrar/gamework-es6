import Game from './game';

class App {
  constructor() {
    var canvas = document.getElementById("canvas");
    var ui = document.getElementById("ui");

    this.game = new Game();
    this.game.setup(canvas, ui);

    this.game.run();
  }
}

var app = new App();
