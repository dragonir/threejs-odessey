import './style.css';
import { Clock, Scene, LoadingManager, WebGLRenderer, sRGBEncoding, Group, PerspectiveCamera, DirectionalLight, PointLight, MeshPhongMaterial } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// 定义渲染尺寸
const section = document.getElementsByClassName('section')[0];
let oldMaterial;
let width = section.clientWidth;
let height = section.clientHeight;

// 初始化渲染器
const renderer = new WebGLRenderer({
  canvas: document.querySelector('#canvas-container'),
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance'
});
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.autoClear = true;
renderer.outputEncoding = sRGBEncoding;

const renderer2 = new WebGLRenderer({
  canvas: document.querySelector('#canvas-container-details'),
  antialias: false
});
renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer2.setSize(width, height);
renderer2.outputEncoding = sRGBEncoding;

// 初始化场景
const scene = new Scene();

// 初始化相机
const cameraGroup = new Group();
scene.add(cameraGroup);
const camera = new PerspectiveCamera(35, width / height, 1, 100)
camera.position.set(19, 1.54, -.1);
cameraGroup.add(camera);
// 相机2
const camera2 = new PerspectiveCamera(35, section.clientWidth / section.clientHeight, 1, 100);
camera2.position.set(3.2, 2.8, 3.2);
camera2.rotation.set(0, 1, 0);
scene.add(camera2);

// 页面缩放事件监听
window.addEventListener('resize', () => {
  let section = document.getElementsByClassName('section')[0];
  camera.aspect = section.clientWidth / section.clientHeight
  camera.updateProjectionMatrix();
  camera2.aspect = section.clientWidth / section.clientHeight;
  camera2.updateProjectionMatrix();
  renderer.setSize(section.clientWidth, section.clientHeight);
  renderer2.setSize(section.clientWidth, section.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// 直射光
const directionLight = new DirectionalLight(0xffffff, .8);
directionLight.position.set(-100, 0, -100);
scene.add(directionLight);

// 点光源
const fillLight = new PointLight(0x88ffee, 2.7, 4, 3);
fillLight.position.set(30, 3, 1.8);
scene.add(fillLight);

// 加载管理
const ftsLoader = document.querySelector('.lds-roller');
const loadingCover = document.getElementById('loading-text-intro');
const loadingManager = new LoadingManager();
loadingManager.onLoad = () => {
  document.querySelector('.content').style.visibility = 'visible';
  const yPosition = { y: 0 };
  // 隐藏加载页面动画
  new TWEEN.Tween(yPosition)
    .to({ y: 100 }, 900)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
    .onUpdate(() => { loadingCover.style.setProperty('transform', `translate(0, ${yPosition.y}%)`) })
    .onComplete(function () {
      loadingCover.parentNode.removeChild(document.getElementById('loading-text-intro'));
      TWEEN.remove(this);
    });
  // 使用Tween给相机添加入场动画
  new TWEEN.Tween(
    camera.position.set(0, 4, 2))
    .to({ x: 0, y: 2.4, z: 5.8 }, 3500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
    .onComplete(function () {
      TWEEN.remove(this);
      document.querySelector('.header').classList.add('ended');
      document.querySelector('.description').classList.add('ended');
    });
  ftsLoader.parentNode.removeChild(ftsLoader);
  window.scroll(0, 0)
}

// 使用 dracoLoader 加载用blender压缩过的模型
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
dracoLoader.setDecoderConfig({ type: 'js' });
const loader = new GLTFLoader(loadingManager);
loader.setDRACOLoader(dracoLoader);

// 模型加载
loader.load('/models/statue.glb', function (gltf) {
  gltf.scene.traverse((obj) => {
    if (obj.isMesh) {
      oldMaterial = obj.material;
      obj.material = new MeshPhongMaterial({ shininess: 100 });
    }
  });
  scene.add(gltf.scene);
  oldMaterial.dispose();
  renderer.renderLists.dispose();
});

// 鼠标移动时添加虚拟光标
const cursor = { x: 0, y: 0 };
document.addEventListener('mousemove', event => {
  event.preventDefault();
  cursor.x = event.clientX / window.innerWidth - .5;
  cursor.y = event.clientY / window.innerHeight - .5;
  document.querySelector('.cursor').style.cssText = `left: ${event.clientX}px; top: ${event.clientY}px;`;
}, false);

// 基于容器视图禁用渲染器
let secondContainer = false;
const ob = new IntersectionObserver(payload => {
  secondContainer = payload[0].intersectionRatio > 0.05;
}, { threshold: 0.05 });
ob.observe(document.querySelector('.second'));

// 页面重绘动画
const clock = new Clock()
let previousTime = 0;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;
  const parallaxY = cursor.y;
  const parallaxX = cursor.x
  fillLight.position.y -= (parallaxY * 9 + fillLight.position.y - 2) * deltaTime;
  fillLight.position.x += (parallaxX * 8 - fillLight.position.x) * 2 * deltaTime;
  cameraGroup.position.z -= (parallaxY / 3 + cameraGroup.position.z) * 2 * deltaTime;
  cameraGroup.position.x += (parallaxX / 3 - cameraGroup.position.x) * 2 * deltaTime;
  TWEEN.update();
  secondContainer ? renderer2.render(scene, camera2) : renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();

// 鼠标悬浮到菜单动画
const btn = document.querySelectorAll('nav > .a');
function update(e) {
  const span = this.querySelector('span');
  if (e.type === 'mouseleave') {
    span.style.cssText = '';
  } else {
    const { offsetX: x, offsetY: y } = e;
    const { offsetWidth: width, offsetHeight: height } = this;
    const walk = 20;
    const xWalk = (x / width) * (walk * 2) - walk, yWalk = (y / height) * (walk * 2) - walk;
    span.style.cssText = `transform: translate(${xWalk}px, ${yWalk}px);`
  }
}
btn.forEach(b => b.addEventListener('mousemove', update));
btn.forEach(b => b.addEventListener('mouseleave', update));

// 相机动画
function animateCamera(position, rotation) {
  new TWEEN.Tween(camera2.position)
    .to(position, 1800)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
    .onComplete(function () {
      TWEEN.remove(this)
    })
  new TWEEN.Tween(camera2.rotation)
    .to(rotation, 1800)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
    .onComplete(function () {
      TWEEN.remove(this);
    });
}

// 页面Tab点击事件监听
document.getElementById('one').addEventListener('click', () => {
  document.getElementById('one').classList.add('active');
  document.getElementById('three').classList.remove('active');
  document.getElementById('two').classList.remove('active');
  document.getElementById('content').innerHTML = '昨夜西风凋碧树。独上高楼，望尽天涯路。';
  animateCamera({ x: 3.2, y: 2.8, z: 3.2 }, { y: 1 });
});

document.getElementById('two').addEventListener('click', () => {
  document.getElementById('two').classList.add('active');
  document.getElementById('one').classList.remove('active');
  document.getElementById('three').classList.remove('active');
  document.getElementById('content').innerHTML = '衣带渐宽终不悔，为伊消得人憔悴。';
  animateCamera({ x: -1.4, y: 2.8, z: 4.4 }, { y: -0.1 });
});

document.getElementById('three').addEventListener('click', () => {
  document.getElementById('three').classList.add('active');
  document.getElementById('one').classList.remove('active');
  document.getElementById('two').classList.remove('active');
  document.getElementById('content').innerHTML = '众里寻他千百度，蓦然回首，那人却在灯火阑珊处。';
  animateCamera({ x: -4.8, y: 2.9, z: 3.2 }, { y: -0.75 });
});