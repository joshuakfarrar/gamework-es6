import Entity from './entity';

export default class Mortal extends Entity {
  constructor(id) {
    super(id);
  }
  damage(amount) {
    this.health -= amount;

    if (this.health <= 0) {
      this.kill();
    }
  }
  kill() {
    throw new Error("Kill method must be overridden.");
  }
}
