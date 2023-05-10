import * as THREE from 'three';
import { Suspense, useEffect, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Html, Scroll, Sky, useScroll, useGLTF, useAnimations } from '@react-three/drei';

function ShubaDuck({ ...props }) {
  // This hook gives you offets, ranges and other useful things
  const scroll = useScroll()
  const { scene, nodes, animations } = useGLTF('./models/duck.glb')
  const { actions } = useAnimations(animations, scene)

  scene.rotation.y = - Math.PI / 1.8;

  useLayoutEffect(() => Object.values(nodes).forEach((node) => (node.receiveShadow = node.castShadow = true)))
  useEffect(() => void (actions['LironShuba'].play().paused = true), [actions])
  useFrame((state, delta) => {
    const action = actions['LironShuba']
    // The offset is between 0 and 1, you can apply it to your models any way you like
    const offset = 1 - scroll.offset
    action.time = THREE.MathUtils.damp(action.time, (action.getClip().duration / 2) * offset, 100, delta)
    state.camera.position.set(Math.sin(offset) * -10, Math.atan(offset * Math.PI * 2) * 5, Math.cos((offset * Math.PI) / 3) * -10)
    state.camera.lookAt(0, 0, 0)
  })
  return <primitive object={scene} {...props} />
}

useGLTF.preload('./models/duck.glb')

export default function Experience() {
  return (
    <>
      <Canvas className='test' shadows camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={1} />
        {/* <fog attach="fog" args={['#ffffff', 5, 18]} /> */}
        <spotLight angle={0.14} color="#ffffff" penumbra={1} position={[25, 50, -20]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
        {/* <Sky scale={1000} sunPosition={[2, 0.4, 10]} /> */}
        <Suspense fallback={null}>
          <ScrollControls pages={4}>
            <Html wrapperClass='articles'>
              <article className='page page1'>
                <div className='content'>
                  <div className='top'></div>
                  <div className='bottom'></div>
                </div>
              </article>
              <article className='page page2'>2</article>
              <article className='page page3'>3</article>
              <article className='page page4'>4</article>
            </Html>
            <ShubaDuck scale={.05} position={[0, 0, 0]} />
          </ScrollControls>
        </Suspense>
      </Canvas>
      <header className='header'>
        <span className='logo'></span>
        <div className='menus'>
          <span className="menu">第一页</span>
          <span className="menu">第二页</span>
          <span className="menu">第三页</span>
          <span className="menu">第四页</span>
        </div>
      </header>
      <a className='github' href='https://github.com/dragonir/threejs-odessey' target='_blank' rel='noreferrer'>
        <svg height='36' aria-hidden='true' viewBox='0 0 16 16' version='1.1' width='36' data-view-component='true'>
          <path fill='#ffffff' fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
        <span className='author'>three.js odessey</span>
      </a>
    </>
  );
}
