'use client';

import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Spotlight mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax tilt tracking (values represent rotation bounds)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  // Add spring physics to the tilt for smooth recovery/movement
  const springConfig = { damping: 20, stiffness: 150 };
  const smoothTiltX = useSpring(tiltX, springConfig);
  const smoothTiltY = useSpring(tiltY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Use motion values for spotlight
    mouseX.set(x);
    mouseY.set(y);

    // Calculate rotation (-10 to 10 degrees max)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxRotation = 8; // Gentle tilt for elegant feel
    const rotateY = ((x - centerX) / centerX) * maxRotation;
    const rotateX = -((y - centerY) / centerY) * maxRotation; // Negative to tilt towards mouse

    tiltX.set(rotateX);
    tiltY.set(rotateY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly reset 3D tilt
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      layoutId={`project-container-${project.id}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group relative flex h-[460px] w-full cursor-none flex-col items-start justify-end overflow-hidden rounded-[2rem] border border-white/5 bg-black/40 p-8 shadow-2xl backdrop-blur-md"
      data-cursor-project="true" // Triggers CustomCursor Explore effect
      style={{
        rotateX: smoothTiltX,
        rotateY: smoothTiltY,
        transformPerspective: 1200,
      }}
      // Scroll reveal settings (used by parent stagger)
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
      }}
    >
      {/* Spotlight Border Effect via radial gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(6, 182, 212, 0.1),
              transparent 60%
            )
          `,
        }}
      />
      
      {/* Project Image Background with Parallax */}
      <motion.div
        layoutId={`project-image-${project.id}`}
        className="absolute inset-0 z-[-1] bg-cover bg-center brightness-[0.35] transition-all duration-700 ease-in-out group-hover:brightness-[0.45]"
        style={{
          // Use generic background if none provided, ideally fallback local asset
          backgroundImage: `url(${project.thumbnailUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop'})`,
          // Parallax effect: moving image slightly in relation to cursor
          x: useMotionTemplate`${useSpring(tiltY, { damping: 40, stiffness: 100 })}px`,
          y: useMotionTemplate`${useSpring(tiltX, { damping: 40, stiffness: 100 })}px`, 
          scale: 1.15, // Scale up slightly to prevent edges showing during parallax
        }}
      />

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="relative z-10 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
        {/* Project Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] font-semibold tracking-wider text-cyan-300 backdrop-blur-md"
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Title */}
        <motion.h3 
          layoutId={`title-${project.id}`}
          className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          {project.title}
        </motion.h3>

        {/* Short Summary (Fades out partly on hover to make room for tech stack) */}
        <p className="mb-4 text-sm font-medium leading-relaxed text-gray-300/80 line-clamp-2 transition-opacity duration-300 group-hover:opacity-60">
          {project.summary}
        </p>

        {/* Tech Stack Reveal (Slide up on hover) */}
        <div className="h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:h-6 group-hover:opacity-100">
          <div className="flex items-center gap-3 text-xs font-semibold text-cyan-400">
            <span className="flex items-center gap-2 delay-100 placeholder:">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
              Modern Stack
            </span>
            <span className="opacity-40">•</span>
            <span className="flex items-center gap-2 delay-200">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]"></span>
              Interactive
            </span>
            <span className="opacity-40">•</span>
            <span className="flex items-center gap-1 font-bold text-white delay-300">
              View Case Study <span className="ml-1 text-lg leading-none">↗</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
