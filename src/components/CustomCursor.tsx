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
    // Zero-size anchor that follows the mouse; only transforms/opacity are animated
    // (no width/height), so the cursor never triggers layout.
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] h-0 w-0"
      style={{ x: cursorX, y: cursorY }}
    >
      <motion.div
        className="absolute -left-[10px] -top-[10px] h-5 w-5 rounded-full mix-blend-difference"
        initial={false}
        animate={{
          // 20px base circle: x2.5 = 50px (buttons), x6 = 120px (project cards)
          scale: isHoveringProject ? 6 : isHoveringButton ? 2.5 : 1,
          backgroundColor: isHoveringProject
            ? 'rgba(255, 255, 255, 1)' // White (inverts to black or accent color underneath)
            : 'rgba(6, 182, 212, 1)', // Neon Cyan
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
      <motion.span
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold tracking-[0.2em] text-black"
        initial={false}
        animate={{ opacity: isHoveringProject ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        EXPLORE
      </motion.span>
    </motion.div>
  );
}
