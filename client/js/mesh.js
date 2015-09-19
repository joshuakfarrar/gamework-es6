import THREE from 'three';

export default class Mesh {
  constructor(name) {
    this.name = name;
    this.loaded = false;
    this.filepath = `./meshes/${this.name}.json`
    this.load();
  }

  load() {
    var loader = new THREE.JSONLoader();
    loader.load(this.filepath, (geometry) => {
      this.geometry = geometry;
      var material = new THREE.MeshBasicMaterial( { color: 0x00ffff, wireframe: true } );
      this.mesh = new THREE.Mesh(geometry, material);
      this.loaded = true;
    });
  }
}
