import Entity from './entity';

export default class Player extends Entity {
  constructor(id, name) {
    super(id);
    this.name = name;
  }

  getName() {
    return this.name;
  }
}
