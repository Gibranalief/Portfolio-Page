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
    <section id="projects" className="relative w-full border-t border-line bg-bg px-4 py-28 sm:px-8 md:px-16 lg:px-24">
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-subtle"
          >
            Selected Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mb-4 text-4xl font-semibold tracking-tight text-fg md:text-5xl"
          >
            Featured Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl text-lg text-muted"
          >
            A curated selection of case studies demonstrating advanced web development, AI engineering, and interactive design.
          </motion.p>
        </div>

        {/* Filter Pill Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-2 md:justify-start">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="relative rounded-full px-5 py-2 text-sm font-medium transition-colors"
              data-cursor-magnetic="true"
            >
              <span className={`relative z-10 ${activeCategory === category ? 'text-bg' : 'text-muted hover:text-fg'}`}>
                {category}
              </span>
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategoryIndicator"
                  className="absolute inset-0 z-0 rounded-full bg-fg"
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

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
