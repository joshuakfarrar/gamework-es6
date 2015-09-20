export default class Entity {
  constructor(id) {
    this.id = id;
    this.alive = false;
    this.onScene = false;
  }

  setMesh(mesh) {
    this.mesh = mesh;
  }
}
