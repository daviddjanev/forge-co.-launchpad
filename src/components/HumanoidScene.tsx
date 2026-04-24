import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

/**
 * Reactive voice orb — a distorted sphere whose surface and scale
 * pulse to a synthesized "voice" waveform (layered sine waves).
 * Used as the on-brand replacement for the humanoid figure.
 */
function VoiceOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<any>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Synthesized voice envelope: layered sines for organic speech-like motion
    const env =
      Math.sin(t * 2.1) * 0.5 +
      Math.sin(t * 5.3 + 1.2) * 0.3 +
      Math.sin(t * 11.7 + 0.6) * 0.2;
    const amp = (env + 1) / 2; // 0..1

    if (meshRef.current) {
      const s = 1 + amp * 0.07;
      meshRef.current.scale.set(s, s, s);
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
    if (matRef.current) {
      matRef.current.distort = 0.32 + amp * 0.18;
      matRef.current.speed = 1.5 + amp * 1.5;
    }
    if (innerRef.current) {
      const s = 0.55 + amp * 0.12;
      innerRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      {/* Inner glowing core */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#f5d28a" transparent opacity={0.35} />
      </mesh>

      {/* Main distorted orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.25, 128, 128]} />
        <MeshDistortMaterial
          ref={matRef}
          color="#d4a548"
          metalness={0.85}
          roughness={0.18}
          distort={0.35}
          speed={2}
          emissive="#3a2a10"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Outer halo */}
      <mesh>
        <sphereGeometry args={[1.85, 64, 64]} />
        <meshBasicMaterial color="#e9c275" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

/**
 * Concentric audio-style waveform rings — each ring's segments
 * scale with a phase-shifted sine, mimicking a voice spectrogram.
 */
function WaveformRings() {
  const groupRef = useRef<THREE.Group>(null);

  const bars = useMemo(() => {
    const out: { angle: number; radius: number; ring: number }[] = [];
    const ringCounts = [48, 64, 80];
    const radii = [2.15, 2.5, 2.85];
    ringCounts.forEach((count, ringIdx) => {
      for (let i = 0; i < count; i++) {
        out.push({
          angle: (i / count) * Math.PI * 2,
          radius: radii[ringIdx],
          ring: ringIdx,
        });
      }
    });
    return out;
  }, []);

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) groupRef.current.rotation.z = t * 0.05;
    bars.forEach((bar, i) => {
      const m = meshRefs.current[i];
      if (!m) return;
      const phase = bar.angle * 3 + bar.ring * 0.5;
      const v = Math.sin(t * 2 + phase) * 0.5 + Math.sin(t * 5 + phase * 1.7) * 0.3;
      const h = 0.08 + Math.abs(v) * 0.18;
      m.scale.y = h * 10;
    });
  });

  return (
    <group ref={groupRef}>
      {bars.map((bar, i) => {
        const x = Math.cos(bar.angle) * bar.radius;
        const y = Math.sin(bar.angle) * bar.radius;
        return (
          <mesh
            key={i}
            ref={(el) => {
              meshRefs.current[i] = el;
            }}
            position={[x, y, 0]}
            rotation={[0, 0, bar.angle + Math.PI / 2]}
          >
            <boxGeometry args={[0.018, 0.04, 0.018]} />
            <meshBasicMaterial
              color="#d4a548"
              transparent
              opacity={bar.ring === 0 ? 0.7 : bar.ring === 1 ? 0.45 : 0.25}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function HumanoidScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 4]} intensity={1.4} color="#fff1d0" />
        <directionalLight position={[-3, 2, -2]} intensity={0.6} color="#e9c275" />
        <pointLight position={[0, 2, 3]} intensity={1} color="#f5d28a" />
        <VoiceOrb />
        <WaveformRings />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
}
