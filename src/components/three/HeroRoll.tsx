import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { makeKnitTexture, makeRollEndTexture } from './knitTexture';

type RollProps = {
  position: [number, number, number];
  base: string;
  shade: string;
  highlight: string;
  tilt?: number;
};

const R = 0.78; // roll radius
const L = 2.5; // roll length

function Roll({ position, base, shade, highlight, tilt = 0 }: RollProps) {
  const side = useMemo(() => makeKnitTexture(base, shade, highlight, [14, 3]), [base, shade, highlight]);
  const end = useMemo(() => makeRollEndTexture(base, shade), [base, shade]);
  return (
    <group position={position} rotation={[0, tilt, Math.PI / 2]}>
      {/* knitted body */}
      <mesh castShadow>
        <cylinderGeometry args={[R, R, L, 64, 1, true]} />
        <meshStandardMaterial map={side} bumpMap={side} bumpScale={0.9} roughness={0.92} metalness={0} side={THREE.DoubleSide} />
      </mesh>
      {/* wound end faces */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[0, (s * L) / 2, 0]} rotation={[s * -Math.PI / 2, 0, 0]}>
          <circleGeometry args={[R, 64]} />
          <meshStandardMaterial map={end} roughness={0.95} />
        </mesh>
      ))}
      {/* paper core, slightly proud of the ends */}
      <mesh>
        <cylinderGeometry args={[0.2, 0.2, L + 0.28, 32, 1, true]} />
        <meshStandardMaterial color="#cdb894" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/** Whole composition: eases in on mount, then follows the pointer with a small, damped parallax. */
function Scene() {
  const group = useRef<THREE.Group>(null);
  const intro = useRef(0);
  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    intro.current = Math.min(1, intro.current + dt / 1.6);
    const e = 1 - Math.pow(1 - intro.current, 3);
    const px = state.pointer.x;
    const py = state.pointer.y;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, -0.55 + px * 0.22, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -py * 0.08, 3, dt);
    g.position.y = THREE.MathUtils.lerp(-1.2, -0.45, e);
    g.scale.setScalar(0.86 + 0.14 * e);
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, px * 0.35, 2.5, dt);
    state.camera.lookAt(0, 0.1, 0);
  });

  return (
    <group ref={group}>
      <Roll position={[0, R, -R * 1.02]} base="#2a2a2e" shade="#16161a" highlight="#55555d" tilt={0.03} />
      <Roll position={[0.1, R, R * 1.02]} base="#e8323c" shade="#a31822" highlight="#ff8a90" tilt={-0.02} />
      <Roll position={[-0.05, R + Math.sqrt(3) * R, 0]} base="#f1e9dc" shade="#cdbfa9" highlight="#ffffff" tilt={0.02} />
    </group>
  );
}

export default function HeroRoll({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0.9, 6.2], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      shadows={false}
      aria-hidden
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 5]} intensity={2.1} />
      <directionalLight position={[-5, 2, -3]} intensity={0.6} color="#ffd9d9" />
      {/* Self-contained studio lighting — no external HDR download */}
      <Environment resolution={128} background={false}>
        <Lightformer form="rect" intensity={2.2} position={[0, 5, 3]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1.1} position={[-6, 1, 2]} scale={[3, 5, 1]} color="#ffe6e6" />
        <Lightformer form="rect" intensity={0.8} position={[6, 1, -2]} scale={[3, 5, 1]} />
      </Environment>
      <Scene />
      <ContactShadows position={[0, -0.46, 0]} opacity={0.55} scale={11} blur={2.6} far={4} resolution={512} color="#2b1013" />
    </Canvas>
  );
}
