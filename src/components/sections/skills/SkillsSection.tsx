"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Web Dev", "ML & NLP", "Computer Vision", "Automation"];

const skillsData = [
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

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredSkills = skillsData.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <section 
      id="skills" 
      className="relative w-full min-h-screen bg-black flex flex-col items-center py-24 overflow-hidden isolate"
      ref={containerRef}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <motion.div 
        className="text-center mb-12 z-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">Kemahiran Teknikal</h2>
        <p className="text-zinc-500 max-w-xl mx-auto px-4">
          Ekosistem teknologi interaktif. Tarik, lepaskan, dan teroka pelbagai instrumen yang mendorong pembangunan projek saya.
        </p>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-16 z-20 px-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeCategory === category ? "text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-blue-600/30 border border-blue-500/50 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>

      {/* Draggable Badge Constellation */}
      <motion.div layout className="relative w-full max-w-6xl mx-auto flex-1 px-8">
        <ul className="flex flex-wrap justify-center gap-6 md:gap-8 items-center h-full align-center pt-8">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <DraggableBadge 
                key={skill.id} 
                skill={skill} 
                parentRef={containerRef} 
                index={index} 
              />
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>

    </section>
  );
}

// Sub-component for individual floating badges
function DraggableBadge({ skill, parentRef, index }: { skill: any, parentRef: React.RefObject<HTMLDivElement | null>, index: number }) {
  // Generate random animation delays to make floating look natural and un-synchronized
  const floatDelay = (index % 5) * 0.4;
  const floatDuration = 3 + (index % 3);
  
  return (
    <motion.li
      layout
      layoutId={skill.id}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.2 } }}
      transition={{ layout: { type: "spring", stiffness: 300, damping: 25 } }}
      className="relative z-10 flex cursor-grab active:cursor-grabbing"
      
      // Draggable physics
      drag
      dragConstraints={parentRef}
      dragElastic={0.4}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 20 }}
      
      whileHover={{ 
        scale: 1.15, 
        zIndex: 50,
        transition: { duration: 0.2 }
      }}
      whileDrag={{ 
        scale: 1.25, 
        zIndex: 100, 
        cursor: "grabbing",
        boxShadow: "0 0 40px rgba(0, 195, 255, 0.4)",
      }}
    >
      {/* Container that handles the floating animation separate from the drag physics */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay
        }}
        className="px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-center group transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:border-blue-500/50 hover:bg-white/10"
      >
        <span className="text-zinc-200 font-medium whitespace-nowrap group-hover:text-white transition-colors">
          {skill.name}
        </span>
      </motion.div>
    </motion.li>
  );
}
