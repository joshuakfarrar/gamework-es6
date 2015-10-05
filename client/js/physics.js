import CANNON from 'cannon';

export default class Physics {
  constructor(game) {
    this.game = game;
    this.world = new CANNON.World();
  }
  step() {
    //console.log("Stepped physics simulation!");
  }
}
