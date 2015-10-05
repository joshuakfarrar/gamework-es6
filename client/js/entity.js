import THREE from 'three';

export default class Entity {
  constructor(id) {
    this.id = id;
    this.alive = false;
    this.onScene = false;
    this.position = new THREE.Vector3(0, 0, 0);
  }
  setMesh(mesh) {
    this.mesh = mesh;
  }
  destroy() {
    this.alive = false;
  }
}
