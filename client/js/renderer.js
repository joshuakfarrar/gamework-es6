import THREE from 'three';
import _ from 'lodash';

import Camera from './camera';

export default class Renderer {
  constructor(game, canvas) {
    this.game = game;
    this.canvas = canvas;

    this.isFrameStepping = false;
    this.timeToStep = 0;

    this.scene = new THREE.Scene();

    this.clock = new THREE.Clock;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize( this.canvas.width, this.canvas.height );

    this.createCamera();
  }

  addMesh(mesh) {
    console.log("Added mesh.");
    this.mesh = mesh;
    this.scene.add(mesh);
  }

  renderFrame() {
    this.renderer.render(this.scene, this.camera.camera);
  }

  createCamera() {
    this.camera = new Camera(this);
  }
}
