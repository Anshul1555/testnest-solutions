import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ geometry, position, color, speed = 1, rotAxis = [1, 1, 0] }) {
  const mesh = useRef();
  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * speed * rotAxis[0] * 0.4;
    mesh.current.rotation.y += delta * speed * rotAxis[1] * 0.5;
    mesh.current.rotation.z += delta * speed * rotAxis[2] * 0.2;
  });
  return (
    <Float speed={speed * 1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={mesh} position={position} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          wireframe={false}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
}

function WireShape({ geometry, position, color, speed = 0.5 }) {
  const mesh = useRef();
  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * speed * 0.3;
    mesh.current.rotation.y += delta * speed * 0.5;
  });
  return (
    <Float speed={speed * 2} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={mesh} position={position} geometry={geometry}>
        <meshStandardMaterial color={color} wireframe roughness={0.2} metalness={0.6} transparent opacity={0.5} />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const count = 120;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);
  const points = useRef();
  useFrame((state) => {
    if (points.current) points.current.rotation.y = state.clock.elapsedTime * 0.03;
  });
  return (
    <points ref={points} geometry={geo}>
      <pointsMaterial color="#818cf8" size={0.06} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function Scene() {
  const icosa = useMemo(() => new THREE.IcosahedronGeometry(0.9, 0), []);
  const torus = useMemo(() => new THREE.TorusGeometry(0.7, 0.25, 12, 48), []);
  const dodeca = useMemo(() => new THREE.DodecahedronGeometry(0.75, 0), []);
  const octa = useMemo(() => new THREE.OctahedronGeometry(0.65, 0), []);
  const torusKnot = useMemo(() => new THREE.TorusKnotGeometry(0.5, 0.18, 80, 12), []);
  const box = useMemo(() => new THREE.BoxGeometry(0.9, 0.9, 0.9), []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#6366f1" />
      <pointLight position={[-5, -3, 2]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[0, 6, -4]} intensity={1} color="#a78bfa" />

      <Stars radius={60} depth={30} count={800} factor={3} saturation={0.5} fade speed={0.6} />
      <ParticleField />

      <FloatingShape geometry={icosa} position={[-3.5, 1.2, -1]} color="#6366f1" speed={0.8} rotAxis={[1, 1, 0]} />
      <FloatingShape geometry={torus} position={[3.8, -0.5, -2]} color="#06b6d4" speed={0.6} rotAxis={[0, 1, 1]} />
      <FloatingShape geometry={dodeca} position={[2.2, 2.2, -3]} color="#a78bfa" speed={1.0} rotAxis={[1, 0, 1]} />
      <FloatingShape geometry={octa} position={[-4.2, -1.8, -1.5]} color="#22d3ee" speed={0.7} rotAxis={[1, 1, 1]} />
      <FloatingShape geometry={torusKnot} position={[0.5, -2.5, -3]} color="#818cf8" speed={0.5} rotAxis={[0, 1, 0]} />

      <WireShape geometry={box} position={[4.5, 2.5, -4]} color="#6366f1" speed={0.4} />
      <WireShape geometry={icosa} position={[-2.5, 3.0, -5]} color="#06b6d4" speed={0.35} />
      <WireShape geometry={dodeca} position={[-5, 0.5, -4]} color="#a78bfa" speed={0.45} />
    </>
  );
}

export default function ThreeHero() {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
