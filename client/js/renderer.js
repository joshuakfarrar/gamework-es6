import THREE from 'three';
import _ from 'lodash';

export default class Renderer {
  constructor(game, canvas) {
    this.game = game;
    this.canvas = canvas;

    this.isFrameStepping = false;
    this.timeToStep = 0;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, this.canvas.width / this.canvas.height, 1, 10000);
    this.camera.position.z = 10;
    this.camera.position.y = 4;
    this.camera.position.x = 4;

    this.clock = new THREE.Clock;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize( this.canvas.width, this.canvas.height );
  }

  renderFrame() {
    var newEntities = _.select(this.game.entities, 'onScene', false);
    this.addEntities(newEntities);

    var delta = this.clock.getDelta();
    var scale = 1;
    var stepSize = (!this.isFrameStepping) ? delta * scale: this.timeToStep;

    THREE.AnimationHandler.update(stepSize);

    this.renderer.render(this.scene, this.camera);

    this.timeToStep = 0;
  }

  addEntities(entities) {
    _.each(entities, (entity) => {
      var x = (entity.id % 4) * 3;
      var y = (entity.id % 3) * 3;
      var mesh = entity.mesh;
      this.scene.add(mesh);
      mesh.position.x = x;
      mesh.position.y = y;
      var id = (entity.id !== 12) ? entity.id : 5;
      var animation = this.createAnimation(mesh, id);
      animation.play();

      entity.onScene = true;
    });
  }

  createAnimation(mesh, id) {
    return new THREE.Animation(mesh, mesh.geometry.animations[ id ]);
  }
}
