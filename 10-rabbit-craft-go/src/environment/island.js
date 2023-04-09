import * as THREE from 'three';
import Tree from './tree';
import Bridge from './bridge';
import LeafTree from './leaftree';

export default class Island {
  constructor() {
    this.floorMesh = new THREE.Group();
    this.generate();
  }

  generate() {
    // 左侧地面
    const leftFieldMat = new THREE.MeshToonMaterial({
      color: 0x015521d,
      side: THREE.DoubleSide,
    });
    const leftFieldGeom = new THREE.BoxBufferGeometry(800, 30, 1800);
    this.leftFieldMesh = new THREE.Mesh(leftFieldGeom, leftFieldMat);
    this.leftFieldMesh.position.set(-500, -30, 0);
    this.leftFieldMesh.receiveShadow = true;

    // 右侧地面
    this.rightFieldMesh = this.leftFieldMesh.clone();
    this.rightFieldMesh.receiveShadow = true;
    this.rightFieldMesh.position.set(500, -30, 0);

    const mapCapMat = new THREE.MeshMatcapMaterial({
      matcap: new THREE.TextureLoader().load('./images/matcap.png'),
      side: THREE.DoubleSide
    })

    // 顶部棱柱
    const topFieldGeom = new THREE.CylinderBufferGeometry(1200, 900, 200, 4, 4);
    this.topFieldMesh = new THREE.Mesh(topFieldGeom, mapCapMat);
    this.topFieldMesh.position.set(0, -200, 0);
    this.topFieldMesh.rotation.y = - Math.PI / 4;

    // 中间棱柱
    const middleFieldGeom = new THREE.CylinderBufferGeometry(850, 600, 200, 4, 4);
    this.middleFieldMesh = new THREE.Mesh(middleFieldGeom, mapCapMat);
    this.middleFieldMesh.position.set(0, -450, 0);
    this.middleFieldMesh.rotation.y = - Math.PI / 4;

    // 底部棱锥
    const bottomFieldGeom = new THREE.ConeBufferGeometry(550, 400, 4);
    this.bottomFieldMesh = new THREE.Mesh(bottomFieldGeom, mapCapMat);
    this.bottomFieldMesh.position.set(0, -800, 0);
    this.bottomFieldMesh.rotation.z = - Math.PI;
    this.bottomFieldMesh.rotation.y = - Math.PI / 4;

    // 河面
    const strGroundMat = new THREE.MeshLambertMaterial({
      color: 0x75bd2d,
      side: THREE.DoubleSide,
    });
    const strCroundGeom = new THREE.BoxBufferGeometry(205, 10, 1800);
    this.strGroundMesh = new THREE.Mesh(strCroundGeom, strGroundMat);
    this.strGroundMesh.position.set(0, -40, 0);

    // 小河
    const streamMat = new THREE.MeshLambertMaterial({
      color: 0x0941ba,
      side: THREE.DoubleSide,
    });
    const streamGeom = new THREE.BoxBufferGeometry(200, 16, 1800);
    this.streamMesh = new THREE.Mesh(streamGeom, streamMat);
    this.streamMesh.position.set(0, -32, 0);

    // 树
    const tree1 = new Tree(-100, 0, -100);
    const tree2 = new Tree(-150, 0, -180);
    const tree3 = new Tree(-100, 0, -220);
    const tree4 = new LeafTree(-400, 0, -400);
    const tree5 = new Tree(-878, 0, -878);
    const tree6 = new Tree(-810, 0, -810);
    const tree7 = new Tree(-740, 0, -870);
    const tree8 = new Tree(688, 0, -680);
    const tree9 = new Tree(-880, 0, 680);
    const tree10 = new Tree(-320, 0, 240);
    const tree11 = new LeafTree(-630, 0, 130);
    const tree12 = new LeafTree(-480, 0, 480);
    const tree13 = new Tree(100, 0, 100);
    const tree14 = new Tree(150, 0, 180);
    const tree15 = new Tree(100, 0, 220);
    const tree16 = new LeafTree(400, 0, 400);
    const tree17 = new LeafTree(878, 0, -680);
    const tree18 = new Tree(320, 0, -240);
    const tree19 = new Tree(630, 0, -130);
    const tree20 = new Tree(480, 0, -480);

    // 桥
    this.bridge = new Bridge();
    this.floorMesh.add(this.leftFieldMesh);
    this.floorMesh.add(this.rightFieldMesh);
    this.floorMesh.add(this.topFieldMesh);
    this.floorMesh.add(this.middleFieldMesh);
    this.floorMesh.add(this.bottomFieldMesh);
    this.floorMesh.add(this.streamMesh);
    this.floorMesh.add(this.strGroundMesh);
    this.floorMesh.add(this.bridge.bridgeMesh);
    this.floorMesh.add(tree1.treeMesh);
    this.floorMesh.add(tree2.treeMesh);
    this.floorMesh.add(tree3.treeMesh);
    this.floorMesh.add(tree4.treeMesh);
    this.floorMesh.add(tree5.treeMesh);
    this.floorMesh.add(tree6.treeMesh);
    this.floorMesh.add(tree7.treeMesh);
    this.floorMesh.add(tree8.treeMesh);
    this.floorMesh.add(tree9.treeMesh);
    this.floorMesh.add(tree10.treeMesh);
    this.floorMesh.add(tree11.treeMesh);
    this.floorMesh.add(tree12.treeMesh);
    this.floorMesh.add(tree13.treeMesh);
    this.floorMesh.add(tree14.treeMesh);
    this.floorMesh.add(tree15.treeMesh);
    this.floorMesh.add(tree16.treeMesh);
    this.floorMesh.add(tree17.treeMesh);
    this.floorMesh.add(tree18.treeMesh);
    this.floorMesh.add(tree19.treeMesh);
    this.floorMesh.add(tree20.treeMesh);
  }
};
