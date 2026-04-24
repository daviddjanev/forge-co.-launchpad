import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function Humanoid() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.3) * 0.35;
    group.current.position.y = Math.sin(t * 0.6) * 0.05;
  });

  // Gold-ish material
  const goldMat = (
    <meshStandardMaterial
      color="#d4a548"
      metalness={0.85}
      roughness={0.25}
      emissive="#3a2a10"
      emissiveIntensity={0.4}
    />
  );

  return (
    <group ref={group} position={[0, -0.3, 0]}>
      {/* Head */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.32, 64, 64]} />
        {goldMat}
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.09, 0.11, 0.18, 32]} />
        {goldMat}
      </mesh>
      {/* Torso */}
      <mesh position={[0, 0.6, 0]}>
        <capsuleGeometry args={[0.42, 0.7, 16, 32]} />
        {goldMat}
      </mesh>
      {/* Shoulders */}
      <mesh position={[-0.55, 0.95, 0]}>
        <sphereGeometry args={[0.16, 32, 32]} />
        {goldMat}
      </mesh>
      <mesh position={[0.55, 0.95, 0]}>
        <sphereGeometry args={[0.16, 32, 32]} />
        {goldMat}
      </mesh>
      {/* Arms */}
      <mesh position={[-0.65, 0.45, 0]} rotation={[0, 0, 0.15]}>
        <capsuleGeometry args={[0.1, 0.85, 12, 24]} />
        {goldMat}
      </mesh>
      <mesh position={[0.65, 0.45, 0]} rotation={[0, 0, -0.15]}>
        <capsuleGeometry args={[0.1, 0.85, 12, 24]} />
        {goldMat}
      </mesh>
      {/* Hands */}
      <mesh position={[-0.78, -0.1, 0]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        {goldMat}
      </mesh>
      <mesh position={[0.78, -0.1, 0]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        {goldMat}
      </mesh>
      {/* Hips */}
      <mesh position={[0, -0.05, 0]}>
        <capsuleGeometry args={[0.32, 0.15, 12, 24]} />
        {goldMat}
      </mesh>
      {/* Legs */}
      <mesh position={[-0.18, -0.7, 0]}>
        <capsuleGeometry args={[0.13, 0.95, 12, 24]} />
        {goldMat}
      </mesh>
      <mesh position={[0.18, -0.7, 0]}>
        <capsuleGeometry args={[0.13, 0.95, 12, 24]} />
        {goldMat}
      </mesh>

      {/* Voice halo: distorted glowing sphere behind head */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh position={[0, 1.55, -0.4]}>
          <sphereGeometry args={[0.55, 64, 64]} />
          <MeshDistortMaterial
            color="#e9c275"
            distort={0.45}
            speed={2}
            transparent
            opacity={0.18}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Rings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) ring1.current.rotation.z = t * 0.15;
    if (ring2.current) ring2.current.rotation.z = -t * 0.1;
  });
  return (
    <>
      <mesh ref={ring1} position={[0, 0.4, -1]} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.2, 0.005, 16, 200]} />
        <meshBasicMaterial color="#d4a548" transparent opacity={0.35} />
      </mesh>
      <mesh ref={ring2} position={[0, 0.4, -1.2]} rotation={[Math.PI / 2.5, 0.3, 0]}>
        <torusGeometry args={[2.7, 0.004, 16, 200]} />
        <meshBasicMaterial color="#d4a548" transparent opacity={0.2} />
      </mesh>
    </>
  );
}

export function HumanoidScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.6, 4.2], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 5, 4]} intensity={1.4} color="#fff1d0" />
        <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#e9c275" />
        <pointLight position={[0, 2, 3]} intensity={0.8} color="#f5d28a" />
        <Humanoid />
        <Rings />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
}
