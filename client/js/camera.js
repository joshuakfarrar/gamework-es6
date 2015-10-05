import THREE from 'three';

export default class Camera {
  constructor(renderer) {
    this.SPEED = 0.08;
    this.renderer = renderer;
    this.canvas = this.renderer.canvas;
    this.camera = new THREE.PerspectiveCamera(75, this.canvas.width / this.canvas.height, 1, 10000);
    this.camera.position.set(0, 2, 10);
  }
  forward() {
    this.camera.position.z -= this.SPEED;
  }
  backward() {
    this.camera.position.z += this.SPEED;
  }
  strafeLeft() {
    this.camera.position.x -= this.SPEED;
  }
  turnLeft() {
    this.camera.rotation.y += this.SPEED / 5;
  }
  strafeRight() {
    this.camera.position.x += this.SPEED;
  }
  turnRight() {
    this.camera.rotation.y -= this.SPEED / 5;
  }
}
