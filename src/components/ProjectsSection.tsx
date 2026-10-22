'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData, ProjectTag, Project } from '@/data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectTag | 'All'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Extract unique categories from projects + 'All'
  const filterCategories = ['All' as const, ...Array.from(new Set(projectsData.flatMap(p => p.tags)))];

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.tags.includes(activeCategory as ProjectTag));

  return (
    <section id="projects" className="relative w-full bg-zinc-950 py-24 px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Background Decorative */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-1/4 left-1/4 h-[600px] w-[600px]"
          style={{ background: 'radial-gradient(closest-side, rgba(22,78,99,0.25), transparent)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px]"
          style={{ background: 'radial-gradient(closest-side, rgba(88,28,135,0.2), transparent)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-4xl font-extrabold text-white md:text-6xl tracking-tight"
          >
            Featured Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl text-lg text-gray-400"
          >
            A curated selection of case studies demonstrating advanced web development, AI engineering, and interactive design.
          </motion.p>
        </div>

        {/* Filter Pill Tabs */}
        <div className="mb-14 flex flex-wrap justify-center gap-3 md:justify-start">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="relative rounded-full px-6 py-2.5 text-sm font-semibold transition-colors"
              data-cursor-magnetic="true"
            >
              <span className={`relative z-10 ${activeCategory === category ? 'text-black' : 'text-gray-300 hover:text-white'}`}>
                {category}
              </span>
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategoryIndicator"
                  className="absolute inset-0 z-0 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Uniform grid: every card is the same size, and an incomplete last row is centered */}
        <div className="flex flex-wrap justify-center gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout="position"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Cinematic Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
