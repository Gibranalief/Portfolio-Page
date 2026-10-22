"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

interface ViewportCanvasProps {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  /** DOM rendered on top of the canvas (e.g. labels positioned from 3D coordinates). */
  overlay?: ReactNode;
}

/**
 * Shared WebGL wrapper that keeps 3D scenes cheap:
 *  - the canvas is only created once it is near the viewport,
 *  - rendering stops while it is scrolled out of view,
 *  - pixel ratio is capped (retina screens would otherwise render 4x the pixels).
 */
export default function ViewportCanvas({
  children,
  className = "",
  cameraPosition = [0, 0, 5],
  fov = 45,
  overlay,
}: ViewportCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setHasBeenVisible(true);
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {hasBeenVisible && (
        <Canvas
          camera={{ position: cameraPosition, fov }}
          frameloop={isVisible ? "always" : "never"}
          dpr={[1, 1.5]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          {children}
        </Canvas>
      )}
      {overlay}
    </div>
  );
}
