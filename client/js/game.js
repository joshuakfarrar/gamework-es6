import _ from 'lodash';
import THREE from 'three';

import Renderer from './renderer';
import Entity from './entity';
import Mesh from './mesh';

import Player from './player';

export default class Game {
  constructor() {
    this.hasNeverStarted = true;
    this.started = false;
    this.isStopped = false;

    this.entities = [];
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

      this.initMutalisks();

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

  initMutalisks() {
    for (var i = 0; i < 12; i++) {
      var mutalisk = this.meshes['mutalisk'].getMesh();
      var entity = new Entity(i);
      entity.setMesh(mutalisk);
      this.entities.push(entity);
    }
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
