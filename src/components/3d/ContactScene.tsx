"use client";

import { MutableRefObject, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import ViewportCanvas from "./ViewportCanvas";
import { usePointerRef } from "@/hooks/usePointerRef";
import { threeColors, useThemeStore } from "@/store/useThemeStore";

type Pointer = MutableRefObject<{ x: number; y: number }>;

function Knot({ pointer }: { pointer: Pointer }) {
  const theme = useThemeStore((s) => s.theme);
  const colors = threeColors[theme];
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.25;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.current.y * 0.6, 0.06);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, pointer.current.x * 0.4, 0.06);
  });

  return (
    <group ref={group}>
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 90, 10]} />
        <meshBasicMaterial color={colors.fg} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh>
        <torusKnotGeometry args={[1, 0.18, 90, 8]} />
        <meshBasicMaterial color={colors.accent} wireframe transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

export default function ContactScene({ className = "" }: { className?: string }) {
  const pointer = usePointerRef();

  return (
    <ViewportCanvas className={className} cameraPosition={[0, 0, 4.6]}>
      <Knot pointer={pointer} />
    </ViewportCanvas>
  );
}
