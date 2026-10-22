"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experienceData, experienceTabs, ExperienceTab } from "@/data/experience";

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<ExperienceTab>("Work");
  const items = experienceData.filter((item) => item.tab === activeTab);

  return (
    <section
      id="experience"
      className="relative w-full scroll-mt-16 bg-black px-4 py-24 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-4xl font-bold text-zinc-100 md:text-5xl">Experience</h2>
          <p className="mx-auto max-w-xl text-zinc-500">
            Teaching, mentoring, studies, and research that shaped how I build.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {experienceTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                activeTab === tab ? "text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeExperienceTab"
                  className="absolute inset-0 rounded-full border border-blue-500/50 bg-blue-600/30"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <AnimatePresence mode="wait">
          <motion.ol
            key={activeTab}
            className="relative ml-3 border-l border-zinc-800 md:ml-0"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {items.map((item) => (
              <li key={item.id} className="relative mb-10 pl-8 last:mb-0">
                {/* Timeline dot */}
                <span
                  className={`absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full border-2 border-black ${
                    item.badge ? "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" : "bg-zinc-600"
                  }`}
                />

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition-colors duration-300 hover:border-zinc-700 hover:bg-zinc-900">
                  <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-xl font-bold text-zinc-100">{item.title}</h3>
                    {item.badge && (
                      <span className="rounded-full border border-blue-500/40 bg-blue-600/20 px-2.5 py-0.5 text-[11px] font-semibold text-blue-300">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-blue-400">{item.organization}</p>
                  <p className="mb-4 mt-1 font-mono text-xs text-zinc-500">{item.period}</p>

                  {item.points && (
                    <ul className="space-y-2 text-sm leading-relaxed text-zinc-400">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.highlights && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-full border border-emerald-500/30 bg-emerald-900/30 px-3 py-1 font-mono text-xs font-semibold text-emerald-300"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </section>
  );
}
