let instance = null;

export default class FPS {
  constructor() {
    if (!instance) {
      instance = this;
    }
    this.start = new Date().getTime();
    this.frame = 0;
    return instance;
  }
  tick() {
    this.frame++;
    var now = new Date().getTime();
    var elapsed = (now - this.start) / 1000;

    this.fps = Math.floor(this.frame / elapsed);
  }
  getFPS() {
    return this.fps;
  }
}
