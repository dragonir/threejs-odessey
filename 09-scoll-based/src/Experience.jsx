import * as THREE from 'three'
import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Preload, useIntersect, ScrollControls, Scroll, Image as ImageImpl } from '@react-three/drei'

function Image({ c = new THREE.Color(), ...props }) {
  const visible = useRef(false)
  const [hovered, hover] = useState(false)
  const ref = useIntersect((isVisible) => (visible.current = isVisible))
  useFrame((state, delta) => {
    ref.current.material.color.lerp(c.set(hovered ? '#fff' : '#ccc'), hovered ? 0.4 : 0.05);
    ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, visible.current ? 1 : 4, 4, delta)
  })
  return <ImageImpl ref={ref} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} {...props} />
}

function Images() {
  const { width, height } = useThree((state) => state.viewport);
  const group = useRef();
  useFrame(() => {
    // 取消 zelda logo 缩放动画
    group.current.children[1].material.zoom = 1;
  });
  return (
    <group ref={group}>
      {/* 第1页 */}
      <Image position={[0, 0, 0]} scale={[width, height, 1]} url="./images/0.jpg" />
      <Image position={[0, 0, 1]} scale={3.2} url="./images/banner.png" transparent={true} />
      {/* 第2页 */}
      <Image position={[-2.5, -height + 1, 2]} scale={3} url="./images/1.jpg" />
      <Image position={[0, -height, 3]} scale={2} url="./images/2.jpg" />
      <Image position={[1.25, -height - 1, 3.5]} scale={1.5} url="./images/3.jpg" />
      {/* 第3页 */}
      <Image position={[0, -height * 1.5, 2.5]} scale={[6, 3, 1]} url="./images/4.jpg" />
      {/* 第3页 */}
      <Image position={[0, -height * 2 - height / 4, 0]} scale={[width, height, 1]} url="./images/5.jpg" />
      {/* 第4页 */}
      <Image position={[-3, -height * 3 - height / 4, 2]} scale={[width / 2.6, height / 2.675, 1]} url="./images/6.jpg" />
      <Image position={[3, -height * 3 - height / 4, 1]} scale={[width / 2.5, height / 2, 1]} url="./images/7.jpg" />
      {/* 第5页 */}
      <Image position={[-5, -height * 4, 0]} scale={[width / 3, height / 1.5, 1]} url="./images/8.jpg" />
      <Image position={[0, -height * 4, 0]} scale={[width / 3, height / 1.5 , 1]} url="./images/9.jpg" />
      <Image position={[5, -height * 4, 0]} scale={[width / 3, height / 1.5, 1]} url="./images/10.jpg" />
      {/* 第6页 */}
      <Image position={[0, -height * 5, 0]} scale={[width, height, 1]} url="./images/11.jpg" />
      {/* 第7页 */}
      <Image position={[0, -height * 6, 1]} scale={[width, height, 1]} url="./images/12.jpg" />
      <Image position={[-1.5, -height * 6, 3]} scale={2.5} url="./images/link.png" transparent={true} />
    </group>
  )
}

export default function Experience() {
  return (
    <>
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ScrollControls damping={1} pages={7}>
            <Scroll>
              <Images />
            </Scroll>
            <Scroll html>
              <h1 className='text'>王</h1>
              <h1 className='text'>国</h1>
              <h1 className='text'>之</h1>
              <h1 className='text'>泪</h1>
            </Scroll>
          </ScrollControls>
          <Preload />
        </Suspense>
      </Canvas>
      <div className='sheikah-box'></div>
      <a className='github' href='https://github.com/dragonir/threejs-odessey' target='_blank' rel='noreferrer'>
        <svg height='36' aria-hidden='true' viewBox='0 0 16 16' version='1.1' width='36' data-view-component='true'>
          <path fill='#ffffff' fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
        <span className='author'>three.js odessey</span>
      </a>
    </>
  );
}
