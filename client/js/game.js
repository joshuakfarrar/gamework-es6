import _ from 'lodash';
import THREE from 'three';

import Updater from './updater';
import Renderer from './renderer';

import Mortal from './mortal';
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

    this.meshNames = ['mutalisk', 'battlecruiser'];
  }

  setRenderer(renderer) {
    this.renderer = renderer;
  }

  setUpdater(updater) {
    this.updater = updater;
  }

  setup(canvas) {
    this.setRenderer(new Renderer(this, canvas));
  }

  run() {
    this.loadMeshes();
    this.setUpdater(new Updater(this));

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
      var entity = new Mortal(i);
      entity.setMesh(mutalisk);
      this.entities.push(entity);
    }

    var battlecruiser = this.meshes['battlecruiser'].getMesh();
    var entity = new Mortal(12);
    entity.setMesh(battlecruiser);
    this.entities.push(entity);
    console.log(battlecruiser.geometry.animations);
  }

  start() {
    this.tick();
    this.hasNeverStarted = false;
  }

  tick() {
    if (this.started) {
      this.updater.update();
      this.renderer.renderFrame();
    }

    if(!this.isStopped) {
      window.requestAnimationFrame(this.tick.bind(this));
    }
  }

}
