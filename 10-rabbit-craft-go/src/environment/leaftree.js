import * as THREE from 'three';

// 矮树
export default class LeafTree {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.treeMesh = new THREE.Group();
    this.generate();
  }

  generate() {
    // 树干
    var trunkMat = new THREE.MeshLambertMaterial({
      color: 0x543b14,
      side: THREE.DoubleSide
    });
    var trunkGeom = new THREE.BoxGeometry(20, 200, 20);
    this.trunkMesh = new THREE.Mesh(trunkGeom, trunkMat);
    this.trunkMesh.position.set(0, 58, 0);
    this.trunkMesh.castShadow = true;
    this.trunkMesh.receiveShadow = true;

    // 树叶
    var leavesMat = new THREE.MeshLambertMaterial({
      color: 0xff395e,
      side: THREE.DoubleSide
    });
    var leavesGeom = new THREE.BoxGeometry(150, 230, 150);
    this.leavesMesh = new THREE.Mesh(leavesGeom, leavesMat);
    this.leavesMesh.position.set(0, 250, 0);
    this.leavesMesh.castShadow = true;

    this.treeMesh.add(this.trunkMesh);
    this.treeMesh.add(this.leavesMesh);
    this.treeMesh.castShadow = true;
    this.treeMesh.position.set(this.x, this.y, this.z);
  }
}
