import './style.css';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 定义渲染尺寸
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// 初始化渲染器
const canvas = document.querySelector('canvas.webgl');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2;
renderer.outputEncoding = THREE.sRGBEncoding

// 初始化场景
const scene = new THREE.Scene();
// 初始化相机
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
camera.position.set(0, 1.2, 10);
// 镜头控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;

// 页面缩放事件监听
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // 更新渲染
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  // 更新相机
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
});

// 全景背景
const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMap = cubeTextureLoader.load([
  '/textures/environmentMaps/px.jpg',
  '/textures/environmentMaps/nx.jpg',
  '/textures/environmentMaps/py.jpg',
  '/textures/environmentMaps/ny.jpg',
  '/textures/environmentMaps/pz.jpg',
  '/textures/environmentMaps/nz.jpg'
]);
environmentMap.encoding = THREE.sRGBEncoding;
scene.background = environmentMap;
scene.environment = environmentMap;

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);
// 平行光
const directionalLight = new THREE.DirectionalLight('#ffffff', 3);
directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(1, 10, -10);
scene.add(directionalLight);

// 创建视频材质
const video = document.getElementById('video');
const videoTexture = new THREE.VideoTexture(video);

// 模型加载
const screen = {
  mesh: null,
  material: null,
  videoMaterial: new THREE.MeshPhysicalMaterial({
    map: videoTexture,
    envMap: environmentMap
  })
};
// 加载管理
const loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = () => { }
// 使用dracoLoader加载用blender压缩过的模型
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
dracoLoader.setDecoderConfig({ type: 'js' });
const loader = new GLTFLoader(loadingManager);
loader.setDRACOLoader(dracoLoader);

let model = null;
loader.load('/models/iphone.glb', mesh => {
  if (mesh.scene) {
    mesh.scene.traverse(child => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.envMap = environmentMap;
        child.material.envMapIntensity = 2;
        if (child.name === '屏幕') {
          screen.mesh = child;
          screen.material = child.material;
        }
        if (child.name.includes('边框')) {
          child.material.metalness = .8;
        }
        if (child.name.includes('logo')) {
          child.material.metalness = 1;
        }
      }
    })
    mesh.scene.scale.set(60, 60, 60);
    mesh.scene.position.y = -5;
    mesh.scene.rotation.y = -Math.PI;
    model = mesh.scene;
    scene.add(mesh.scene);
  }
});

// 点击事件捕获
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('click', event => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects([screen.mesh]);
  if (intersects.length > 0) {
    const mesh = intersects[0].object;
    if (mesh.material.type === 'MeshStandardMaterial') {
      mesh.material = screen.videoMaterial;
    } else {
      mesh.material = screen.material;
    }
  }
}, false);

// 动画
const tick = () => {
  model && (model.rotation.y += .005);
  controls && controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();