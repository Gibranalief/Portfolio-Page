'use client';

import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

// Each project gets a distinct gradient backdrop (no external image request needed)
const gradients = [
  'from-cyan-900/60 via-zinc-900 to-zinc-950',
  'from-purple-900/60 via-zinc-900 to-zinc-950',
  'from-emerald-900/60 via-zinc-900 to-zinc-950',
  'from-blue-900/60 via-zinc-900 to-zinc-950',
  'from-rose-900/50 via-zinc-900 to-zinc-950',
];

function gradientFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return gradients[hash % gradients.length];
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

  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(6, 182, 212, 0.12), transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    const maxRotation = 6; // Gentle tilt for elegant feel
    tiltY.set(((x - rect.width / 2) / (rect.width / 2)) * maxRotation);
    tiltX.set(-((y - rect.height / 2) / (rect.height / 2)) * maxRotation);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group relative flex h-[400px] w-full cursor-none flex-col justify-end overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 p-7 shadow-xl"
      data-cursor-project="true" // Triggers CustomCursor Explore effect
      style={{
        rotateX: smoothTiltX,
        rotateY: smoothTiltY,
        transformPerspective: 1200,
      }}
    >
      {/* Backdrop */}
      {project.thumbnailUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.4] transition-[filter] duration-500 group-hover:brightness-[0.5]"
          style={{ backgroundImage: `url(${project.thumbnailUrl})` }}
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientFor(project.id)}`} />
      )}

      {/* Spotlight effect following the cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      {/* Readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      <div className="relative z-10 flex w-full flex-col">
        {/* Project Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/10 px-3 py-1 font-mono text-[10px] font-semibold tracking-wider text-cyan-300"
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="mb-3 line-clamp-3 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-[1.65rem]">
          {project.title}
        </h3>

        {/* Short Summary */}
        <p className="mb-5 line-clamp-3 text-sm font-medium leading-relaxed text-gray-300/80">
          {project.summary}
        </p>

        {/* Footer: always visible so every card has the same shape */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold">
          <span className="text-gray-400">
            {project.links?.some((l) => l.type === 'demo' && l.url !== '#') ? 'Live demo available' : 'Case study'}
          </span>
          <span className="flex items-center gap-1 text-cyan-400 transition-transform duration-300 group-hover:translate-x-1">
            View details <span className="text-base leading-none">↗</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
