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
            className="fixed inset-0 z-[100] bg-black/60"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-6 md:p-12 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pointer-events-auto relative flex max-h-[90vh] sm:max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-bg shadow-2xl border border-line"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 sm:right-6 sm:top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-surface text-fg border border-line transition-all hover:bg-surface-2 hover:scale-110"
                data-cursor-magnetic="true"
              >
                <X size={20} />
              </button>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* Hero Header */}
                <div className="relative h-[45vh] min-h-[300px] w-full shrink-0">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-accent/15 via-surface to-bg bg-cover bg-center"
                    style={project.thumbnailUrl ? { backgroundImage: `url(${project.thumbnailUrl})` } : undefined}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-12">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-4xl font-semibold text-fg md:text-6xl tracking-tight leading-none">
                      {project.title}
                    </h2>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 md:p-12 lg:grid lg:grid-cols-3 lg:gap-16 bg-bg">
                  <div className="col-span-2 space-y-12">
                    <section>
                      <h3 className="mb-4 text-2xl font-semibold text-fg flex items-center gap-2">
                         <Activity className="text-accent" /> Overview
                      </h3>
                      <p className="text-lg leading-relaxed text-muted">
                        {project.description}
                      </p>
                    </section>

                    {/* Interactive Features */}
                    {project.interactiveFeatures?.length > 0 && (
                      <section>
                        <h3 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-fg">
                          <Code className="text-accent" /> Key Features & Interactions
                        </h3>
                        <div className="grid gap-5 sm:grid-cols-2">
                          {project.interactiveFeatures.map((feat, i) => (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * i + 0.3, type: "spring", stiffness: 100 }}
                              key={i}
                              className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-6 hover:border-fg/25 transition-colors"
                            >
                                                            <h4 className="mb-3 font-semibold text-fg flex items-start gap-3">
                                <CheckCircle className="mt-0.5 shrink-0 text-accent" size={18} />
                                {feat.title}
                              </h4>
                              <p className="text-sm leading-relaxed text-muted">{feat.description}</p>
                            </motion.div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>

                  {/* Sidebar Info */}
                  <div className="mt-12 lg:mt-0 space-y-8">
                    {/* Role */}
                    <section className="rounded-3xl border border-line bg-surface p-6">
                      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">My Role</h3>
                      <p className="text-sm font-medium leading-relaxed text-fg">{project.myRole || 'Full-Stack Developer'}</p>
                    </section>

                    {/* Collaborators */}
                    {project.collaborators && project.collaborators.length > 0 && (
                      <section className="rounded-3xl border border-line bg-surface p-6">
                        <h3 className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
                          <Users size={16} /> Collaborators
                        </h3>
                        <ul className="space-y-4">
                          {project.collaborators.map((collab, i) => (
                            <li key={i} className="flex flex-col gap-1">
                              <span className="font-semibold text-fg">{collab.name}</span>
                              {collab.role && <span className="text-xs font-medium text-muted">{collab.role}</span>}
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {/* Links */}
                    {project.links && project.links.some(l => l.url !== '#') && (
                      <section className="flex flex-col gap-4 pt-4">
                        {project.links.filter(l => l.url !== '#').map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor-magnetic="true"
                            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-semibold transition-all duration-300 hover:opacity-85 ${
                              link.type === 'github'
                                ? 'border border-line bg-surface text-fg hover:bg-surface-2'
                                : 'bg-fg text-bg'
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
