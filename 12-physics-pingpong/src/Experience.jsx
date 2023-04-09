import { Perf } from "r3f-perf";
import { Canvas } from "@react-three/fiber";
import { useStore } from "./store.jsx";
import PingPong from "./PingPong.jsx";

const style = (welcome) => ({
  color: '#000000',
  display: welcome ? 'block' : 'none',
  fontSize: '1.8em',
  left: '50%',
  position: "absolute",
  top: 40,
  transform: 'translateX(-50%)',
  background: 'rgba(255, 255, 255, .2)',
  backdropFilter: 'blur(4px)',
  padding: '16px',
  whiteSpace: 'nowrap',
  borderRadius: '12px',
  boxShadow: '1px 1px 2px rgba(0, 0, 0, .2)',
  border: '1px groove rgba(255, 255, 255, .2)',
  textShadow: '0px 1px 2px rgba(255, 255, 255, .2), 0px 2px 2px rgba(255, 255, 255, .8), 0px 2px 4px rgba(0, 0, 0, .5)',
  zIndex: '11111'
});

export default function Experience() {
  const welcome = useStore((state) => state.welcome);
  const { reset } = useStore((state) => state.api);
  return (
    <>
      <Canvas
        shadows
        camera={{ fov: 50, position: [0, 5, 12] }}
        onPointerMissed={() => welcome && reset(false)}
      >
        <Perf position="top-right" />
        <color attach="background" args={["#171720"]} />
        <ambientLight intensity={.5} />
        <pointLight position={[-10, -10, -10]} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />
        <PingPong />
        <gridHelper args={[50, 50, '#11f1ff', '#0b50aa']} position={[0, -1.1, -4]} rotation={[Math.PI / 2.68, 0, 0]} />
      </Canvas>
      <div className="tips" style={style(welcome)}>🏓 点击任意区域开始颠球</div>
      <a className='github' href='https://github.com/dragonir/threejs-odessey' target='_blank' rel='noreferrer'>
        <svg height='36' aria-hidden='true' viewBox='0 0 16 16' version='1.1' width='36' data-view-component='true'>
          <path fill='#ffffff' fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
        <span className='author'>three.js odessey</span>
      </a>
    </>
  );
}
