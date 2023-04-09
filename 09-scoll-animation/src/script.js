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
renderer.autoClear = false;
renderer.setClearAlpha(0);
renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.CineonToneMapping;
renderer.toneMappingExposure = 2;

// 初始化场景
const scene = new THREE.Scene();
// 初始化相机
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 10000)
camera.position.set(0, 10, 100);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.enablePan = false;

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

// 光照
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 20;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(1, 3, 5);
scene.add(directionalLight);

// 加载管理
const loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = () => {}

// 使用 dracoLoader 加载用blender压缩过的模型
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
dracoLoader.setDecoderConfig({ type: 'js' });
const loader = new GLTFLoader(loadingManager);
loader.setDRACOLoader(dracoLoader);

// 加载模型
let mixer = null;
let animations = [];
let model = null;

const play = (index) => {
  console.log(animations)
  let meshAnimation = animations[index];
  mixer = new THREE.AnimationMixer(model);
  let animationClip = meshAnimation;
  let clipAction = mixer.clipAction(animationClip).play();
  animationClip = clipAction.getClip();
}

loader.load('/models/test.glb', mesh => {
  if (mesh.scene) {
    mesh.scene.traverse(item => {
      if (item.isMesh) {
      }
    })
    mesh.scene.scale.set(60, 60, 60);
    scene.add(mesh.scene);
    animations = mesh.animations;
    model = mesh.scene;
    play(0);
  }
});

// 动画
const clock = new THREE.Clock();
const tick = () => {

  const time = clock.getDelta();
  mixer && mixer.update(time);

  controls && controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();


// window.addEventListener('scroll', (event) => {
//   console.log(event)
// })
var moveWheel1 = true;
var moveWheel2 = false;
var wheelClock;
function stopWheel() {
  if (moveWheel2 == true) {
    console.log("滚轮停止了");
    moveWheel2 = false;
    moveWheel1 = true;
    play(0)
  }
}
function moveWheel(e) {
  play(1)
  var e = e || window.event;
  if (moveWheel1 == true) {
    if (e.wheelDelta) {
      if (e.wheelDelta > 0) {
        console.log("鼠标滚轮向上滚动")
      };
      if (e.wheelDelta < 0) {
        console.log("鼠标滚轮向下滚动")
      }
    }
    moveWheel1 = false;
    moveWheel2 = true;
    wheelClock = setTimeout(stopWheel, 200);
  }
  else {
    clearTimeout(wheelClock);
    wheelClock = setTimeout(stopWheel, 150);
  }
}
// document.addEventListener('wheel', moveWheel, false);