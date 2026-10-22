"use client";

import HeroScene from "@/components/3d/HeroScene";
import { useTerminalStore } from "@/store/useTerminalStore";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const roles = [
  "Full-Stack Web Developer",
  "Artificial Intelligence Enthusiast",
  "Computer Science Academic Mentor",
];

const nameWords = ["Gibran", "Alief", "Irawan"];

export default function HeroSection() {
  const { setIsOpen } = useTerminalStore();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative flex min-h-screen w-full items-center overflow-hidden">
      {/* 3D object: faint backdrop on mobile, a full column on desktop */}
      <HeroScene className="pointer-events-none absolute inset-0 opacity-40 md:left-1/3 md:opacity-100" />

      {/* Soft fade so text stays readable over the 3D object */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-transparent md:via-bg/40" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-32 md:px-10">
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
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="scroll-hint absolute inset-x-0 top-0 h-1/2 bg-fg" />
        </span>
      </div>
    </section>
  );
}
