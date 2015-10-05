import _ from 'lodash';
import THREE from 'three';

import log from './log';

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

    this.meshNames = [];
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
      if (this.meshesLoaded()) {
        log.debug("Finished loading meshes.");

        this.generateTerrain();

        if (this.hasNeverStarted) {
          this.started = true;
          this.start();
        }
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

  generateTerrain() {
    var colors = [0xc9847f, 0xe8d1cc, 0xe6e6e6, 0x8a7762, 0xa1d4a4, 0xbcd6bc];
    var geometry = new THREE.PlaneGeometry(1, 1);
    for (var i = -50; i < 50; i++) {
      for (var j = -100; j < 10; j++) {
        var color = colors[Math.floor((Math.random() * 6))];
        var material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = Math.PI / 2;
        mesh.position.set(i, 0, j);
        this.renderer.addMesh(mesh);
      }
    }
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
