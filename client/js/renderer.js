import THREE from 'three';

export default class Renderer {
  constructor(game, canvas) {
    this.game = game;
    this.canvas = canvas;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, this.canvas.width / this.canvas.height, 1, 10000);
    this.camera.position.z = 2;
    this.camera.position.y = 1;

    this.clock = new THREE.Clock;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize( this.canvas.width, this.canvas.height );
  }

  addMeshToScene(mesh) {
    this.mesh = mesh;

    this.scene.add(this.mesh);

    this.animation = new THREE.Animation(
      this.mesh,
      this.mesh.geometry.animations[ 2 ]
    );

    this.animation.play();
  }

  renderFrame() {
    THREE.AnimationHandler.update(this.clock.getDelta());

    this.renderer.render(this.scene, this.camera);
  }
}
