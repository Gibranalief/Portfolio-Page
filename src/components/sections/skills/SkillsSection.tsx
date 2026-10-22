"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, LayoutGrid, Move3d } from "lucide-react";
import SkillSphere, { SkillItem } from "@/components/3d/SkillSphere";

const categories = ["All", "Web Dev", "ML & NLP", "Computer Vision", "Automation"];

const skillsData: SkillItem[] = [
  // Web Dev
  { id: "s1", name: "Next.js", category: "Web Dev" },
  { id: "s2", name: "React", category: "Web Dev" },
  { id: "s3", name: "TypeScript", category: "Web Dev" },
  { id: "s4", name: "Tailwind CSS", category: "Web Dev" },
  { id: "s5", name: "Node.js", category: "Web Dev" },
  { id: "s6", name: "NestJS", category: "Web Dev" },
  { id: "s7", name: "Prisma", category: "Web Dev" },
  { id: "s8", name: "PostgreSQL", category: "Web Dev" },
  // ML & NLP
  { id: "s9", name: "Python", category: "ML & NLP" },
  { id: "s10", name: "pandas", category: "ML & NLP" },
  { id: "s11", name: "NumPy", category: "ML & NLP" },
  { id: "s12", name: "scikit-learn", category: "ML & NLP" },
  { id: "s13", name: "LSTM", category: "ML & NLP" },
  { id: "s14", name: "GRU", category: "ML & NLP" },
  { id: "s15", name: "Perceptron", category: "ML & NLP" },
  // Computer Vision
  { id: "s16", name: "OpenCV", category: "Computer Vision" },
  { id: "s17", name: "SIFT", category: "Computer Vision" },
  { id: "s18", name: "SURF", category: "Computer Vision" },
  { id: "s19", name: "ORB", category: "Computer Vision" },
  { id: "s20", name: "Harris Corner", category: "Computer Vision" },
  { id: "s21", name: "Epipolar Geo", category: "Computer Vision" },
  // Automation
  { id: "s22", name: "FastAPI", category: "Automation" },
  { id: "s23", name: "Playwright", category: "Automation" },
  { id: "s24", name: "Groq API", category: "Automation" },
  { id: "s25", name: "Mendix", category: "Automation" },
];

type View = "3d" | "grid";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [view, setView] = useState<View>("3d");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredSkills = skillsData.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <section
      id="skills"
      className="relative flex w-full flex-col items-center overflow-hidden bg-bg px-4 py-28 isolate"
      ref={containerRef}
    >
      {/* Header */}
      <motion.div
        className="z-10 mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-subtle">Toolkit</p>
        <h2 className="mb-4 text-4xl font-semibold tracking-tight text-fg md:text-5xl">Technical Skills</h2>
        <p className="mx-auto max-w-xl text-muted">
          {view === "3d"
            ? "Drag the sphere to spin it a full 360° and explore the tools behind my projects."
            : "Drag, drop, and explore the tools behind my projects."}
        </p>
      </motion.div>

      {/* Controls */}
      <div className="z-20 mb-8 flex flex-col items-center gap-5">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                activeCategory === category ? "text-bg" : "text-muted hover:text-fg"
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeSkillTab"
                  className="absolute inset-0 rounded-full bg-fg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center rounded-full border border-line p-1 text-xs">
          {(
            [
              { id: "3d", label: "3D Sphere", icon: <Box size={13} /> },
              { id: "grid", label: "Grid", icon: <LayoutGrid size={13} /> },
            ] as const
          ).map((option) => (
            <button
              key={option.id}
              onClick={() => setView(option.id)}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-colors ${
                view === option.id ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content. The sphere stays mounted (just hidden) in Grid view: it stops rendering
          while hidden, and re-creating a WebGL canvas on every toggle is wasteful. */}
      <div className={`relative z-10 w-full max-w-3xl ${view === "3d" ? "" : "hidden"}`}>
        <SkillSphere
          skills={skillsData}
          activeCategory={activeCategory}
          className="h-[460px] w-full cursor-grab active:cursor-grabbing md:h-[560px]"
        />
        <p className="pointer-events-none mt-2 flex items-center justify-center gap-2 text-xs text-subtle">
          <Move3d size={14} /> Click and drag to rotate
        </p>
      </div>

      {view === "grid" && (
        <div className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-4">
          <ul className="flex flex-wrap items-center justify-center gap-4 pt-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => (
                <DraggableBadge key={skill.id} skill={skill} parentRef={containerRef} index={index} />
              ))}
            </AnimatePresence>
          </ul>
        </div>
      )}
    </section>
  );
}

// Individual draggable badge for the grid view
function DraggableBadge({
  skill,
  parentRef,
  index,
}: {
  skill: SkillItem;
  parentRef: React.RefObject<HTMLDivElement | null>;
  index: number;
}) {
  // Stagger the CSS float animation so the badges don't move in sync
  const floatDelay = (index % 5) * 0.4;
  const floatDuration = 3 + (index % 3);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{ layout: { type: "spring", stiffness: 300, damping: 25 } }}
      className="relative z-10 flex cursor-grab active:cursor-grabbing"
      drag
      dragConstraints={parentRef}
      dragElastic={0.4}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 20 }}
      whileHover={{ scale: 1.1, zIndex: 50, transition: { duration: 0.2 } }}
      whileDrag={{ scale: 1.18, zIndex: 100 }}
    >
      <div
        style={{ animationDuration: `${floatDuration}s`, animationDelay: `${floatDelay}s` }}
        className="float-y group flex items-center justify-center rounded-2xl border border-line bg-surface px-5 py-3 shadow-sm transition-colors duration-300 hover:border-accent/50"
      >
        <span className="whitespace-nowrap text-sm font-medium text-muted transition-colors group-hover:text-fg">
          {skill.name}
        </span>
      </div>
    </motion.li>
  );
}
