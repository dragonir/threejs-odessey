import * as THREE from 'three';

export default class Waterfall {
  constructor (scene) {
    this.scene = scene;
    this.drop = null;
    this.generate();
  }
  generate () {
    this.geometry = new THREE.BoxBufferGeometry(15, 50, 5);
    this.material = new THREE.MeshLambertMaterial({ color: 0x0941ba });
    this.drop = new THREE.Mesh(this.geometry, this.material);
    this.drop.position.set(
      (Math.random() - 0.5) * 200,
      -50,
      900 + Math.random(1, 50) * 10
    );
    this.scene.add(this.drop);
    this.speed = 0;
    this.lifespan = Math.random() * 50 + 50;
    this.update = function() {
      this.speed += 0.07;
      this.lifespan--;
      this.drop.position.x += (5 - this.drop.position.x) / 70;
      this.drop.position.y -= this.speed;
    };
  }
};