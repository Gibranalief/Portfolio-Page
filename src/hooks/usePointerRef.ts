'use client';

import { useEffect, useRef } from 'react';

/**
 * Tracks the pointer as normalized coordinates (-1..1, y up) in a ref.
 * Using a ref instead of state means 3D scenes can read it every frame
 * without triggering any React re-render.
 */
export function usePointerRef() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return pointer;
}
