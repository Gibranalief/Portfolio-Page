"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { experienceData, experienceTabs, ExperienceTab } from "@/data/experience";

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<ExperienceTab>("Work");
  const items = experienceData.filter((item) => item.tab === activeTab);

  // The timeline rail fills as the list scrolls through the viewport
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const railFill = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <section
      id="experience"
      className="relative w-full border-t border-line bg-bg px-4 py-28 sm:px-8 md:px-16 lg:px-24"
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
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-subtle">Journey</p>
          <h2 className="mb-4 text-4xl font-semibold tracking-tight text-fg md:text-5xl">Experience</h2>
          <p className="mx-auto max-w-xl text-muted">
            Teaching, mentoring, studies, and research that shaped how I build.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {experienceTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative rounded-full px-5 py-2 text-sm transition-colors duration-300 ${
                activeTab === tab ? "text-bg" : "text-muted hover:text-fg"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeExperienceTab"
                  className="absolute inset-0 rounded-full bg-fg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div ref={listRef} className="relative ml-3 md:ml-0">
          {/* Rail + scroll-driven fill */}
          <div className="absolute bottom-0 left-0 top-0 w-px bg-line" />
          <motion.div
            className="absolute left-0 top-0 w-px origin-top bg-accent"
            style={{ scaleY: railFill, height: "100%" }}
          />

          <AnimatePresence mode="wait">
            <motion.ol
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {items.map((item) => (
                <li key={item.id} className="relative mb-8 pl-8 last:mb-0">
                  {/* Timeline dot */}
                  <span
                    className={`absolute -left-[5px] top-7 h-[11px] w-[11px] rounded-full border-2 border-bg ${
                      item.badge ? "bg-accent" : "bg-subtle"
                    }`}
                  />

                  <div className="rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-fg/25">
                    <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="text-xl font-semibold tracking-tight text-fg">{item.title}</h3>
                      {item.badge && (
                        <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-muted">{item.organization}</p>
                    <p className="mb-4 mt-1 font-mono text-xs text-subtle">{item.period}</p>

                    {item.points && (
                      <ul className="space-y-2 text-sm leading-relaxed text-muted">
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-2">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-subtle" />
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
                            className="rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-xs font-medium text-fg"
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
      </div>
    </section>
  );
}
