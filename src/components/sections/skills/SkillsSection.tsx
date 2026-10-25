"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Box, LayoutGrid, Move3d } from "lucide-react";
import SkillSphere, { SkillItem } from "@/components/3d/SkillSphere";
import { useMediaQuery } from "@/hooks/useMediaQuery";

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

// Scroll score for the pinned peak (progress 0..1 across the pinned travel):
//   0 .. FIRST        authored silence: only the heading, the sphere has not arrived yet
//   FIRST .. LAST     four equal beats, one per discipline, while the sphere turns one full revolution
//   LAST .. 1         resolve: everything lit again, the sphere settles
const FIRST = 0.1;
const LAST = 0.92;
const SEGMENT = (LAST - FIRST) / (categories.length - 1);

function categoryAt(p: number) {
  if (p < FIRST || p >= LAST) return "All";
  return categories[1 + Math.min(categories.length - 2, Math.floor((p - FIRST) / SEGMENT))];
}

function progressFor(category: string) {
  if (category === "All") return 0.96;
  return FIRST + (categories.indexOf(category) - 0.5) * SEGMENT;
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [view, setView] = useState<View>("3d");
  const reduced = useReducedMotion();
  const canDrag = useMediaQuery("(hover: hover) and (pointer: fine)");
  const sectionRef = useRef<HTMLElement>(null);

  // The peak pins for ~4.5 screens. Grid view and reduced motion fall back to normal flow.
  const pinned = view === "3d" && !reduced;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (pinned) setActiveCategory(categoryAt(p));
  });

  const sphereOpacity = useTransform(scrollYProgress, [0.03, 0.12, 1], [0, 1, 1]);
  const sphereScale = useTransform(scrollYProgress, [0.03, 0.14, 1], [0.65, 1, 1]);

  const filteredSkills = skillsData.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );
  const count = activeCategory === "All" ? skillsData.length : filteredSkills.length;

  const selectCategory = (category: string) => {
    if (!pinned) {
      setActiveCategory(category);
      return;
    }
    // In the pinned view the pills are a readout of scroll position, so a click scrolls there
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + progressFor(category) * range, behavior: "smooth" });
  };

  const changeView = (next: View) => {
    setView(next);
    setActiveCategory("All");
    requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ block: "start" }));
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full border-t border-line bg-surface isolate"
      style={pinned ? { height: "520vh" } : undefined}
    >
      <div
        className={
          pinned
            ? "sticky top-0 flex h-screen flex-col items-center overflow-hidden px-4 pb-6 pt-20"
            : "flex flex-col items-center overflow-hidden px-4 py-28"
        }
      >
        {/* Header */}
        <motion.div
          className={`z-10 text-center ${pinned ? "mb-2" : "mb-5"}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-subtle">Toolkit</p>
          <h2
            className={`font-semibold tracking-tight text-fg ${
              pinned ? "text-3xl md:text-4xl" : "mb-3 text-4xl md:text-5xl"
            }`}
          >
            Technical Skills
          </h2>
          {!pinned && (
            <p className="mx-auto max-w-xl text-muted">
              {view === "3d"
                ? "Drag the sphere to spin it a full 360° and explore the tools behind my projects."
                : "Drag, drop, and explore the tools behind my projects."}
            </p>
          )}
        </motion.div>

        {/* Controls */}
        <div className="z-20 mb-1 flex flex-col items-center gap-2">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => selectCategory(category)}
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

          <div className="flex items-center gap-4">
            <p className="font-mono text-xs text-subtle" aria-live="polite">
              {activeCategory === "All" ? "Everything" : activeCategory} · {count} tools
            </p>
            <div className="flex items-center rounded-full border border-line p-1 text-xs">
              {(
                [
                  { id: "3d", label: "3D Sphere", icon: <Box size={13} /> },
                  { id: "grid", label: "Grid", icon: <LayoutGrid size={13} /> },
                ] as const
              ).map((option) => (
                <button
                  key={option.id}
                  onClick={() => changeView(option.id)}
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
        </div>

        {/* The sphere stays mounted (just hidden) in Grid view: it stops rendering while hidden,
            and re-creating a WebGL canvas on every toggle is wasteful. */}
        <div
          className={`relative z-10 w-full max-w-3xl ${pinned ? "min-h-0 flex-1" : ""} ${view === "3d" ? "" : "hidden"}`}
        >
          <motion.div
            className="h-full w-full"
            style={pinned ? { opacity: sphereOpacity, scale: sphereScale } : undefined}
          >
            <SkillSphere
              skills={skillsData}
              activeCategory={activeCategory}
              progress={pinned ? scrollYProgress : undefined}
              className={`w-full cursor-grab active:cursor-grabbing ${
                pinned ? "h-full" : "h-[460px] md:h-[560px]"
              }`}
            />
          </motion.div>
          <p className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 text-xs text-subtle">
            <Move3d size={14} /> {pinned ? (canDrag ? "Scroll to rotate. Drag to take over." : "Scroll to rotate") : "Click and drag to rotate"}
          </p>
        </div>

        {view === "grid" && (
          <div className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-4">
            <ul className="flex flex-wrap items-center justify-center gap-4 pt-4 md:gap-6">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill, index) => (
                  <DraggableBadge key={skill.id} skill={skill} parentRef={sectionRef} index={index} />
                ))}
              </AnimatePresence>
            </ul>
          </div>
        )}
      </div>
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
  parentRef: React.RefObject<HTMLElement | null>;
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
        className="float-y group flex items-center justify-center rounded-2xl border border-line bg-bg px-5 py-3 shadow-sm transition-colors duration-300 hover:border-accent/50"
      >
        <span className="whitespace-nowrap text-sm font-medium text-muted transition-colors group-hover:text-fg">
          {skill.name}
        </span>
      </div>
    </motion.li>
  );
}
