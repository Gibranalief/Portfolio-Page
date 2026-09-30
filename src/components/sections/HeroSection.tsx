"use client";

import HeroCanvas from "@/components/3d/HeroCanvas";
import { useTerminalStore } from "@/store/useTerminalStore";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const roles = [
  "Full-Stack Web Developer",
  "Artificial Intelligence Enthusiast",
  "Computer Science Academic Mentor"
];

export default function HeroSection() {
  const { setIsOpen } = useTerminalStore();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
      <HeroCanvas />
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            Hi, I&apos;m <span className="text-blue-500">Gibran Alief Irawan</span>
          </h1>
          
          <div className="h-[40px] md:h-[60px] flex items-center justify-center overflow-hidden mb-8">
            <motion.h2 
              key={roleIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-2xl md:text-4xl text-gray-300 font-medium"
            >
              {roles[roleIndex]}
            </motion.h2>
          </div>
          
          <p className="max-w-xl mx-auto text-gray-400 mb-10 text-lg">
            Building robust software solutions, exploring artificial intelligence, 
            and helping others navigate the world of computer science.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#projects" 
              className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all transform hover:scale-105"
            >
              Explore Projects
            </a>
            <button 
              onClick={() => setIsOpen(true)}
              className="px-8 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold flex items-center gap-2 border border-zinc-700 transition-all transform hover:scale-105"
            >
              <span>Open Terminal</span>
              <span className="text-xs text-zinc-400 font-mono ml-2">_</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
