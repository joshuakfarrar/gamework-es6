import THREE from 'three';

export default class Camera {
  constructor(renderer) {
    this.SPEED = 0.16;
    this.renderer = renderer;
    this.canvas = this.renderer.canvas;
    this.camera = new THREE.PerspectiveCamera(45, this.canvas.width / this.canvas.height, 1, 1000);
    this.camera.position.set(0, 2, 10);
    //this.camera.rotation.x = -2 * (Math.PI / 4);
  }
  forward() {
    this.camera.translateZ(-this.SPEED);
  }
  backward() {
    this.camera.translateZ(this.SPEED);
  }
  strafeLeft() {
    this.camera.translateX(-this.SPEED);
  }
  turnLeft() {
    this.camera.rotation.y += this.SPEED / 5;
  }
  strafeRight() {
    this.camera.translateX(this.SPEED);
  }
  turnRight() {
    this.camera.rotation.y -= this.SPEED / 5;
  }
}
