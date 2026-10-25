"use client";

import HeroScene from "@/components/3d/HeroScene";
import { useTerminalStore } from "@/store/useTerminalStore";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const roles = [
  "Full-Stack Web Developer",
  "Artificial Intelligence Enthusiast",
  "Computer Science Academic Mentor",
];

const nameWords = ["Gibran", "Alief", "Irawan"];

export default function HeroSection() {
  const { setIsOpen } = useTerminalStore();
  const [roleIndex, setRoleIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // The hero pins for ~0.9 screens. Progress (0..1) drives layers at different rates:
  // the name lifts fastest, the supporting copy slower, the 3D object grows toward the viewer.
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const nameY = useTransform(scrollYProgress, [0, 0.65, 1], [0, -150, -150]);
  const nameOpacity = useTransform(scrollYProgress, [0.12, 0.6, 1], [1, 0, 0]);
  const bodyY = useTransform(scrollYProgress, [0, 0.65, 1], [0, -70, -70]);
  const bodyOpacity = useTransform(scrollYProgress, [0.05, 0.5, 1], [1, 0, 0]);
  const copyEvents = useTransform(scrollYProgress, (v) => (v > 0.45 ? "none" : "auto"));
  const sceneX = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  const pinned = !reduced;

  return (
    <section
      id="home"
      ref={ref}
      className="relative w-full"
      style={pinned ? { height: "190vh" } : undefined}
    >
      <div className={`flex w-full items-center overflow-hidden ${pinned ? "sticky top-0 h-screen" : "min-h-screen"}`}>
        {/* 3D object: faint backdrop on mobile, a full column on desktop */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-40 md:left-1/3 md:opacity-100"
          style={pinned ? { x: sceneX } : undefined}
        >
          <HeroScene className="h-full w-full" progress={pinned ? scrollYProgress : undefined} />
        </motion.div>

        {/* Soft fade so text stays readable over the 3D object */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-transparent md:via-bg/40" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-32 md:px-10">
          <motion.div style={pinned ? { y: nameY, opacity: nameOpacity } : undefined}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-subtle"
            >
              <span className="h-px w-8 bg-subtle" />
              Computer Science · BINUS University
            </motion.p>

            <h1 className="mb-6 text-5xl font-semibold leading-[1.02] tracking-tight text-fg sm:text-6xl md:text-7xl lg:text-8xl">
              {nameWords.map((word, i) => (
                <span key={word} className="block overflow-hidden pb-1">
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {i === nameWords.length - 1 ? <span className="text-accent">{word}</span> : word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </motion.div>

          <motion.div style={pinned ? { y: bodyY, opacity: bodyOpacity, pointerEvents: copyEvents } : undefined}>
            <div className="mb-6 h-9 overflow-hidden md:h-10">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={roleIndex}
                  initial={{ y: 32, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -32, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="text-xl font-medium text-muted md:text-2xl"
                >
                  {roles[roleIndex]}
                </motion.h2>
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-10 max-w-md text-base leading-relaxed text-muted"
            >
              Building robust software, exploring artificial intelligence, and helping others navigate the world of computer science.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-col items-start gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="#projects"
                className="group flex items-center gap-2 rounded-full bg-fg px-7 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85"
              >
                Explore Projects
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 rounded-full border border-line px-7 py-3 text-sm font-medium text-fg transition-colors hover:bg-surface-2"
              >
                Open Terminal
                <span className="font-mono text-xs text-subtle">_</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
