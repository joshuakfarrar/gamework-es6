import THREE from 'three';
import _ from 'lodash';

import FPS from './fps';
import Camera from './camera';

export default class Renderer {
  constructor(game, canvas, ui) {
    this.game = game;
    this.canvas = canvas;
    this.uiCanvas = ui;

    this.ui = (ui && ui.getContext) ? ui.getContext("2d") : null;

    this.isFrameStepping = false;
    this.timeToStep = 0;

    this.scene = new THREE.Scene();

    this.clock = new THREE.Clock;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize( this.canvas.width, this.canvas.height );

    this.createCamera();
  }

  createCamera() {
    this.camera = new Camera(this);
  }

  addMesh(mesh) {
    console.log("Added mesh.");
    this.mesh = mesh;
    this.scene.add(mesh);
  }

  renderFrame() {
    var time = Date.now() * 0.0005;

    for (var i = 0, len = this.lights.length; i < len; i++) {
      var light = this.lights[i];
      var mod = (i % 2) ? -1 : 1;
      light.position.x = Math.sin( time * 0.4 ) * 10 * (i % 4) * mod;
      light.position.z = Math.cos( time * 0.6 ) * 10 - 20 * mod - 40;
    }

    this.renderer.render(this.scene, this.camera.camera);
    this.drawUI();
  }

  drawUI() {
    this.drawFPS();
  }

  drawFPS() {
    var fps = new FPS();
    var context = this.ui;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "white";
    context.font = "10px Arial";
    context.fillText(`FPS: ${fps.getFPS()}`, 10, 10);
  }
}
