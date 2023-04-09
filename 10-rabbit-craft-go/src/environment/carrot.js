import * as THREE from 'three';

export default class Carrot {
  constructor() {
    this.carrotMesh = new THREE.Group();
    this.generate();
  }

  generate() {
    const carrotMat = new THREE.MeshLambertMaterial({
      color: 0xd9721e
    });

    const leafMat = new THREE.MeshLambertMaterial({
      color: 0x339e33
    });

    const bodyGeom = new THREE.CylinderBufferGeometry(5, 3, 12, 4, 1);
    bodyGeom.attributes.position.setY(8, bodyGeom.attributes.position.getY(8) + 2);
    bodyGeom.attributes.position.setY(9, bodyGeom.attributes.position.getY(9) - 3);
    bodyGeom.attributes.position.needsUpdate = true;
    this.body = new THREE.Mesh(bodyGeom, carrotMat);
    // 叶子
    const leafGeom = new THREE.BoxBufferGeometry(5, 10, 1, 1);
    leafGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 5, 0));
    leafGeom.attributes.position.setX(2, leafGeom.attributes.position.getX(2) - 1);
    leafGeom.attributes.position.setX(3, leafGeom.attributes.position.getX(3) - 1);
    leafGeom.attributes.position.setX(6, leafGeom.attributes.position.getX(6) + 1);
    leafGeom.attributes.position.setX(7, leafGeom.attributes.position.getX(7) + 1);
    leafGeom.attributes.position.needsUpdate = true;

    this.leaf1 = new THREE.Mesh(leafGeom, leafMat);
    this.leaf1.position.y = 7;
    this.leaf1.rotation.z = 0.3;
    this.leaf1.rotation.x = 0.2;

    this.leaf2 = this.leaf1.clone();
    this.leaf2.scale.set(1, 1.3, 1);
    this.leaf2.position.y = 7;
    this.leaf2.rotation.z = -0.3;
    this.leaf2.rotation.x = -0.2;

    this.carrotMesh.add(this.body);
    this.carrotMesh.add(this.leaf1);
    this.carrotMesh.add(this.leaf2);

    this.body.traverse(function (object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    this.carrotMesh.scale.set(2, 2, 2);
    this.carrotMesh.position.set(-50, 0, 50);
  }
};
