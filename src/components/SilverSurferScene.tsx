import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Gold Silver Surfer bust — static GLB from
 * https://github.com/daviddjanev/silver-surfer1
 *
 * The model has no rig, no morph targets, no jaw bone — so true lip-sync
 * is not possible. Instead we drive:
 *  - body sway + head turn toward the cursor (alive feeling)
 *  - subtle "breathing" scale on idle, stronger pulse when `speaking`
 *  - eye emissive glow tied to `speaking`
 *  - slow board rotation
 *
 * `level` is a 0..1 audio amplitude (drive from getOutputByteFrequencyData
 * once the ElevenLabs agent is wired); `speaking` toggles the glow.
 */

const MODEL_URL = "/models/silver_surfer.glb";
useGLTF.preload(MODEL_URL);

function SurferModel({ level, speaking }: { level: number; speaking: boolean }) {
  const { scene } = useGLTF(MODEL_URL) as any;
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Object3D | null>(null);
  const boardRef = useRef<THREE.Object3D | null>(null);
  const eyesMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const { pointer } = useThree();

  // One-time: re-skin everything to gold, find the head & board, cache eye material
  useEffect(() => {
    if (!scene) return;

    const goldBody = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#d4a548"),
      metalness: 1,
      roughness: 0.18,
      emissive: new THREE.Color("#3a2a10"),
      emissiveIntensity: 0.35,
    });
    const goldBoard = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#b88a3a"),
      metalness: 1,
      roughness: 0.28,
      emissive: new THREE.Color("#2a1c08"),
      emissiveIntensity: 0.2,
    });
    const goldEyes = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#fff1c8"),
      metalness: 0.6,
      roughness: 0.1,
      emissive: new THREE.Color("#f5d28a"),
      emissiveIntensity: 1.2,
    });

    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const name = mesh.name.toLowerCase();
        if (name.includes("eye")) {
          mesh.material = goldEyes;
          eyesMatRef.current = goldEyes;
        } else if (name.includes("board")) {
          mesh.material = goldBoard;
          boardRef.current = mesh;
        } else {
          mesh.material = goldBody;
        }
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
      const lower = child.name.toLowerCase();
      if (
        !headRef.current &&
        (lower.includes("head") || lower.includes("body_posed") || lower === "silver_surfer_01_pose")
      ) {
        headRef.current = child;
      }
    });
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const breathe = Math.sin(t * 1.4) * 0.5 + 0.5; // 0..1
    const energy = Math.min(1, level * 1.2);

    if (groupRef.current) {
      // Sway toward cursor
      const targetY = pointer.x * 0.5;
      const targetX = -pointer.y * 0.15 + Math.sin(t * 0.5) * 0.04;
      groupRef.current.rotation.y +=
        (targetY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x +=
        (targetX - groupRef.current.rotation.x) * 0.05;

      // Subtle breathing + speaking pulse
      const s = 1 + breathe * 0.008 + energy * 0.025;
      groupRef.current.scale.setScalar(s);

      // Floating bob
      groupRef.current.position.y = -1.1 + Math.sin(t * 1.1) * 0.04 + energy * 0.05;
    }

    if (boardRef.current) {
      boardRef.current.rotation.y = t * 0.15;
    }

    if (eyesMatRef.current) {
      const target = speaking ? 1.5 + energy * 2.5 : 0.8 + breathe * 0.4;
      eyesMatRef.current.emissiveIntensity +=
        (target - eyesMatRef.current.emissiveIntensity) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.1, 0]} scale={1}>
      <primitive object={scene} />
    </group>
  );
}

export function SilverSurferScene({
  level = 0,
  speaking = false,
}: {
  level?: number;
  speaking?: boolean;
}) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.4, 4.2], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[3, 4, 3]}
          intensity={1.6}
          color="#fff1d0"
          castShadow
        />
        <directionalLight position={[-3, 2, -2]} intensity={0.7} color="#e9c275" />
        <pointLight position={[0, 1.5, 2]} intensity={0.8} color="#f5d28a" />

        <SurferModel level={level} speaking={speaking} />

        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.45}
          scale={6}
          blur={2.4}
          far={3}
          color="#3a2a10"
        />

        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
}
