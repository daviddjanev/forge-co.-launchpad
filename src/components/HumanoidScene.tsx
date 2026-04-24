import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, MeshDistortMaterial } from "@react-three/drei";
import { useRef, Suspense, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

/**
 * Reactive voice orb — a distorted sphere whose surface and scale
 * pulse to a synthesized "voice" waveform AND react to the cursor:
 * - cursor position tilts the orb toward the pointer
 * - clicks trigger a brief distortion burst
 */
function VoiceOrb({ pulse }: { pulse: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<any>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const env =
      Math.sin(t * 2.1) * 0.5 +
      Math.sin(t * 5.3 + 1.2) * 0.3 +
      Math.sin(t * 11.7 + 0.6) * 0.2;
    const amp = (env + 1) / 2; // 0..1
    const burst = pulse; // 0..1, decays in parent

    if (meshRef.current) {
      const s = 1 + amp * 0.07 + burst * 0.12;
      meshRef.current.scale.set(s, s, s);
      // Smoothly tilt toward cursor
      const targetY = pointer.x * 0.6 + t * 0.2;
      const targetX = -pointer.y * 0.4 + Math.sin(t * 0.4) * 0.15;
      meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.06;
      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.06;
    }
    if (matRef.current) {
      matRef.current.distort = 0.32 + amp * 0.18 + burst * 0.35;
      matRef.current.speed = 1.5 + amp * 1.5 + burst * 4;
    }
    if (innerRef.current) {
      const s = 0.55 + amp * 0.12 + burst * 0.2;
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
  const [pulse, setPulse] = useState(0);
  const pulseRef = useRef(0);

  // Decay loop for click burst
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      pulseRef.current *= 0.92;
      if (pulseRef.current < 0.001) pulseRef.current = 0;
      setPulse(pulseRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const trigger = () => {
    pulseRef.current = 1;
    setPulse(1);
  };

  return (
    <div
      className="h-full w-full cursor-pointer"
      onPointerDown={trigger}
      role="button"
      aria-label="Pulse the voice orb"
    >
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
          <VoiceOrb pulse={pulse} />
          <WaveformRings />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}
