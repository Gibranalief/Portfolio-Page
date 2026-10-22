'use client';

import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Spotlight mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax tilt with spring physics for smooth recovery
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150 };
  const smoothTiltX = useSpring(tiltX, springConfig);
  const smoothTiltY = useSpring(tiltY, springConfig);

  // color-mix keeps the spotlight in the theme's accent color for both light and dark
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, color-mix(in srgb, var(--accent) 14%, transparent), transparent 65%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    const maxRotation = 6;
    tiltY.set(((x - rect.width / 2) / (rect.width / 2)) * maxRotation);
    tiltX.set(-((y - rect.height / 2) / (rect.height / 2)) * maxRotation);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const hasDemo = project.links?.some((l) => l.type === 'demo' && l.url !== '#');

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group relative flex h-[400px] w-full cursor-none flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface p-7 shadow-sm transition-colors hover:border-fg/25"
      data-cursor-project="true" // Triggers CustomCursor Explore effect
      style={{
        rotateX: smoothTiltX,
        rotateY: smoothTiltY,
        transformPerspective: 1200,
      }}
    >
      {/* Spotlight following the cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      {/* Top row: tags + arrow */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
          <ArrowUpRight size={16} />
        </span>
      </div>

      {/* Bottom: title, summary, footer */}
      <div className="relative z-10 flex w-full flex-col">
        <h3 className="mb-3 line-clamp-3 text-2xl font-semibold leading-tight tracking-tight text-fg">
          {project.title}
        </h3>
        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>
        <div className="flex items-center justify-between border-t border-line pt-4 text-xs">
          <span className="text-subtle">{hasDemo ? 'Live demo available' : 'Case study'}</span>
          <span className="font-medium text-fg">View details</span>
        </div>
      </div>
    </motion.div>
  );
}
