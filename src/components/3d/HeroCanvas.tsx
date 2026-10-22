"use client";

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null);

  const [sphere] = useState(() => {
    const points = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
        const phi = Math.acos(-1 + (2 * i) / 3000);
        const theta = Math.sqrt(3000 * Math.PI) * phi;
        const radius = 1.5 + Math.random() * 0.2;

        points[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
        points[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
        points[i * 3 + 2] = radius * Math.cos(phi);
    }
    return points;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;

      // Parallax effect based on mouse pointer
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, (state.pointer.x * 0.3), 0.1);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, (state.pointer.y * 0.3), 0.1);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.007}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Stop rendering the WebGL scene once the hero is scrolled out of view,
  // otherwise it keeps eating GPU time while the user scrolls the rest of the page.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 3] }}
        frameloop={isVisible ? 'always' : 'never'}
        dpr={[1, 1.5]} // Cap pixel ratio; retina screens otherwise render 4x the pixels
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}
