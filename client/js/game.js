import _ from 'lodash';

import Renderer from './renderer';
import Mesh from './mesh';

import Player from './player';

export default class Game {
  constructor() {
    this.hasNeverStarted = true;
    this.started = false;
    this.isStopped = false;

    this.meshes = [];

    this.player = new Player("player", "Joshua");

    this.meshNames = ['mutalisk'];
  }

  setRenderer(renderer) {
    this.renderer = renderer;
  }

  setup(canvas) {
    this.setRenderer(new Renderer(this, canvas));
  }

  run() {
    this.loadMeshes();

    var wait = setInterval(() => {
      var loaded = this.meshesLoaded();
      if (!loaded) {
        return;
      }

      this.initMutalisk();

      if (this.hasNeverStarted) {
        this.started = true;
        this.start();
      }
      clearInterval(wait);
    }, 100);
  }

  loadMeshes() {
    for (var i = 0, len = this.meshNames.length; i < len; i++) {
      var name = this.meshNames[i];
      this.meshes[name] = new Mesh(name);
    }
  }

  loadMesh(name) {
    return new Mesh(name);
  }

  meshesLoaded() {
    var loaded = true;
    Object.keys(this.meshes).forEach(k => {
      if (this.meshes[k].loaded == false) loaded = false;
    });
    return loaded;
  }

  initMutalisk() {
    var mutalisk = this.meshes['mutalisk'];
    this.renderer.addMeshToScene(mutalisk.mesh);
  }

  start() {
    this.tick();
    this.hasNeverStarted = false;
  }

  tick() {
    if (this.started) {
      this.renderer.renderFrame();
    }

    if(!this.isStopped) {
      window.requestAnimationFrame(this.tick.bind(this));
    }
  }

}
