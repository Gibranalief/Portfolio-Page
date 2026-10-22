"use client";

import { MutableRefObject, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import ViewportCanvas from "./ViewportCanvas";
import { usePointerRef } from "@/hooks/usePointerRef";
import { threeColors, useThemeStore } from "@/store/useThemeStore";

type Pointer = MutableRefObject<{ x: number; y: number }>;

function HeroObject({ pointer }: { pointer: Pointer }) {
  const theme = useThemeStore((s) => s.theme);
  const colors = threeColors[theme];

  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current || !ring.current) return;
    // Slow idle spin, plus a gentle lean toward the pointer
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.current.y * 0.35, 0.05);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointer.current.x * 0.25, 0.05);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, pointer.current.y * 0.15, 0.05);
    ring.current.rotation.z += delta * 0.35;
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} color={colors.accent} />

      <group ref={group}>
        {/* Solid core */}
        <mesh>
          <icosahedronGeometry args={[0.95, 1]} />
          <meshStandardMaterial color={colors.accent} flatShading metalness={0.25} roughness={0.4} />
        </mesh>
        {/* Wireframe shell */}
        <mesh>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial color={colors.fg} wireframe transparent opacity={0.28} />
        </mesh>
        {/* Outer wireframe, counter-oriented for depth */}
        <mesh rotation={[0.6, 0.3, 0]}>
          <icosahedronGeometry args={[2.05, 0]} />
          <meshBasicMaterial color={colors.fg} wireframe transparent opacity={0.12} />
        </mesh>
      </group>

      {/* Orbiting ring with a small satellite */}
      <group rotation={[1.15, 0.2, 0]}>
        <group ref={ring}>
          <mesh>
            <torusGeometry args={[2.5, 0.006, 8, 160]} />
            <meshBasicMaterial color={colors.fg} transparent opacity={0.35} />
          </mesh>
          <mesh position={[2.5, 0, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color={colors.accent} />
          </mesh>
        </group>
      </group>
    </>
  );
}

export default function HeroScene({ className = "" }: { className?: string }) {
  const pointer = usePointerRef();

  return (
    <ViewportCanvas className={className} cameraPosition={[0, 0, 7.4]}>
      <HeroObject pointer={pointer} />
    </ViewportCanvas>
  );
}
