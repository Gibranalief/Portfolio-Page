"use client";

import { MutableRefObject, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { TrackballControls } from "@react-three/drei";
import * as THREE from "three";
import ViewportCanvas from "./ViewportCanvas";
import { threeColors, useThemeStore } from "@/store/useThemeStore";

export interface SkillItem {
  id: string;
  name: string;
  category: string;
}

const RADIUS = 2.6;
const CAMERA_DISTANCE = 7.2;

/** Evenly spread points over a sphere (Fibonacci lattice). */
function spherePoints(count: number): THREE.Vector3[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(RADIUS);
  });
}

type LabelRefs = MutableRefObject<(HTMLDivElement | null)[]>;

function Cloud({
  skills,
  activeCategory,
  autoRotate,
  labelRefs,
}: {
  skills: SkillItem[];
  activeCategory: string;
  autoRotate: boolean;
  labelRefs: LabelRefs;
}) {
  const theme = useThemeStore((s) => s.theme);
  const colors = threeColors[theme];
  const group = useRef<THREE.Group>(null);
  const points = useMemo(() => spherePoints(skills.length), [skills.length]);
  const scratch = useMemo(() => new THREE.Vector3(), []);

  const near = CAMERA_DISTANCE - RADIUS;
  const far = CAMERA_DISTANCE + RADIUS;

  useFrame(({ camera, size }, delta) => {
    const g = group.current;
    if (!g) return;
    if (autoRotate) g.rotation.y += delta * 0.12;
    g.updateWorldMatrix(true, false);

    // Labels are plain DOM (one overlay div) instead of one React root per label.
    // Each frame: world position -> distance to camera (depth) -> screen position.
    skills.forEach((skill, i) => {
      const el = labelRefs.current[i];
      if (!el) return;

      scratch.copy(points[i]).applyMatrix4(g.matrixWorld);
      const depth = THREE.MathUtils.clamp((far - camera.position.distanceTo(scratch)) / (far - near), 0, 1);
      scratch.project(camera);

      const x = (scratch.x * 0.5 + 0.5) * size.width;
      const y = (-scratch.y * 0.5 + 0.5) * size.height;
      const dimmed = activeCategory !== "All" && skill.category !== activeCategory;

      // Far-side labels fade and shrink, which sells the depth
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${0.7 + 0.35 * depth})`;
      el.style.opacity = String((dimmed ? 0.1 : 1) * (0.18 + 0.82 * depth));
      el.style.zIndex = String(Math.round(depth * 100));
    });
  });

  return (
    <>
      <group ref={group}>
        {/* Quiet wireframe core so the sphere reads as an object, not just floating text */}
        <mesh>
          <icosahedronGeometry args={[RADIUS * 0.82, 2]} />
          <meshBasicMaterial color={colors.fg} wireframe transparent opacity={0.05} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.55, 0]} />
          <meshBasicMaterial color={colors.accent} wireframe transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Trackball (not Orbit) so the sphere can be spun a full 360° on every axis */}
      <TrackballControls noZoom noPan rotateSpeed={2.2} dynamicDampingFactor={0.08} />
    </>
  );
}

export default function SkillSphere({
  skills,
  activeCategory,
  className = "",
}: {
  skills: SkillItem[];
  activeCategory: string;
  className?: string;
}) {
  const labelRefs: LabelRefs = useRef([]);
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const overlay = (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {skills.map((skill, i) => (
        <div
          key={skill.id}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
          // Starts hidden; Cloud's frame loop positions and reveals it
          style={{ opacity: 0 }}
          className="absolute left-0 top-0 select-none whitespace-nowrap rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-fg shadow-sm transition-opacity duration-300 will-change-transform"
        >
          {skill.name}
        </div>
      ))}
    </div>
  );

  return (
    <ViewportCanvas
      className={`relative ${className}`}
      cameraPosition={[0, 0, CAMERA_DISTANCE]}
      fov={42}
      overlay={overlay}
    >
      <Cloud
        skills={skills}
        activeCategory={activeCategory}
        autoRotate={!reducedMotion}
        labelRefs={labelRefs}
      />
    </ViewportCanvas>
  );
}
