export default class Key {
  constructor() {
    this.isDown = false;
  }
  keyDown() {
    this.isDown = true;
  }
  keyUp() {
    this.isDown = false;
  }
}
