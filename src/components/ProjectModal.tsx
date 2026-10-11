'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/projects';
import { X, CheckCircle, ExternalLink, Users, Code, Activity } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-6 md:p-12 pointer-events-none">
            <motion.div
              layoutId={`project-container-${project.id}`}
              className="pointer-events-auto relative flex max-h-[90vh] sm:max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] bg-zinc-950 shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-white/10"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 sm:right-6 sm:top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110"
                data-cursor-magnetic="true"
              >
                <X size={20} />
              </button>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* Hero Header */}
                <div className="relative h-[45vh] min-h-[300px] w-full shrink-0">
                  <motion.div
                    layoutId={`project-image-${project.id}`}
                    className="absolute inset-0 bg-cover bg-center brightness-[0.6]"
                    style={{
                      backgroundImage: `url(${project.thumbnailUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop'})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  </motion.div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-12">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="rounded-full border border-cyan-500/30 bg-cyan-900/40 px-3 py-1 font-mono text-xs font-semibold text-cyan-300 backdrop-blur-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <motion.h2 
                      layoutId={`title-${project.id}`}
                      className="text-4xl font-black text-white md:text-6xl tracking-tight leading-none"
                    >
                      {project.title}
                    </motion.h2>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 md:p-12 lg:grid lg:grid-cols-3 lg:gap-16 bg-zinc-950">
                  <div className="col-span-2 space-y-12">
                    <section>
                      <h3 className="mb-4 text-2xl font-bold text-white flex items-center gap-2">
                         <Activity className="text-cyan-400" /> Overview
                      </h3>
                      <p className="text-lg leading-relaxed text-gray-300">
                        {project.description}
                      </p>
                    </section>

                    {/* Interactive Features */}
                    {project.interactiveFeatures?.length > 0 && (
                      <section>
                        <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-white">
                          <Code className="text-purple-400" /> Key Features & Interactions
                        </h3>
                        <div className="grid gap-5 sm:grid-cols-2">
                          {project.interactiveFeatures.map((feat, i) => (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * i + 0.3, type: "spring", stiffness: 100 }}
                              key={i}
                              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors"
                            >
                              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-500/10 blur-xl transition-all group-hover:bg-cyan-500/20" />
                              <h4 className="mb-3 font-semibold text-white flex items-start gap-3">
                                <CheckCircle className="mt-0.5 shrink-0 text-cyan-400" size={18} />
                                {feat.title}
                              </h4>
                              <p className="text-sm leading-relaxed text-gray-400">{feat.description}</p>
                            </motion.div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>

                  {/* Sidebar Info */}
                  <div className="mt-12 lg:mt-0 space-y-8">
                    {/* Role */}
                    <section className="rounded-3xl border border-white/5 bg-white/[0.02] p-6">
                      <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-500">My Role</h3>
                      <p className="text-sm font-medium leading-relaxed text-gray-200">{project.myRole || 'Full-Stack Developer'}</p>
                    </section>

                    {/* Collaborators */}
                    {project.collaborators && project.collaborators.length > 0 && (
                      <section className="rounded-3xl border border-white/5 bg-white/[0.02] p-6">
                        <h3 className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400">
                          <Users size={16} /> Collaborators
                        </h3>
                        <ul className="space-y-4">
                          {project.collaborators.map((collab, i) => (
                            <li key={i} className="flex flex-col gap-1">
                              <span className="font-semibold text-white">{collab.name}</span>
                              {collab.role && <span className="text-xs font-medium text-gray-400">{collab.role}</span>}
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {/* Links */}
                    {project.links && project.links.length > 0 && (
                      <section className="flex flex-col gap-4 pt-4">
                        {project.links.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor-magnetic="true"
                            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-extrabold transition-all duration-300 hover:scale-105 ${
                              link.type === 'github'
                                ? 'bg-white text-black hover:bg-gray-200'
                                : 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]'
                            }`}
                          >
                            {link.type === 'github' ? <Code size={20} /> : <ExternalLink size={20} />}
                            {link.title}
                          </a>
                        ))}
                      </section>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
