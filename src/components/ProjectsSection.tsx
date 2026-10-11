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
    <section id="projects" className="relative min-h-screen w-full bg-zinc-950 py-24 px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Background Decorative */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-900/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-purple-900/10 blur-[100px]" />
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

        {/* Bento Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                // Emulate Bento Grid by making the first item wider on large screens if desired
                // Since user has 3 items, making 1 large and 2 small creates a perfect Bento!
                className={`${idx === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : 'sm:col-span-1 lg:col-span-1'} flex`}
              >
                <div className="w-full h-full">
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Cinematic Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
