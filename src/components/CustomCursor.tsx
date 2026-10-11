'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Native Framer Motion values for 60fps performance without React re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for trailing aura
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable heavy animation on mobile below 768px
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Project card hover
      if (target.closest('[data-cursor-project="true"]')) {
        setIsHoveringProject(true);
      } else {
        setIsHoveringProject(false);
      }
      
      // Magnetic button effect check
      if (target.closest('button') || target.closest('a') || target.closest('[data-cursor-magnetic="true"]')) {
        setIsHoveringButton(true);
      } else {
        setIsHoveringButton(false);
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'none'; // Hide default cursor
    } else {
      document.body.style.cursor = 'auto'; // Fallback for mobile
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Small trailing aura dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHoveringProject ? 120 : isHoveringButton ? 50 : 20,
          height: isHoveringProject ? 120 : isHoveringButton ? 50 : 20,
          backgroundColor: isHoveringProject
            ? 'rgba(255, 255, 255, 1)' // White (inverts to black or accent color underneath)
            : 'rgba(6, 182, 212, 1)', // Neon Cyan
          scale: isHoveringProject ? 1 : isHoveringButton ? 1.2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {isHoveringProject && (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-black text-[10px] font-bold tracking-[0.2em] mix-blend-normal">
              EXPLORE
            </span>
          </div>
        )}
      </motion.div>
    </>
  );
}
