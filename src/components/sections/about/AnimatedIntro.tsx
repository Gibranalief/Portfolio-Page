"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image"; // We will use a placeholder or generic icon if user image is missing.

export default function AnimatedIntro() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position relative to window center, from -1 to 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full min-h-[70vh] flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-20 overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Text Content */}
      <motion.div 
        className="z-10 flex-[1.2] flex flex-col items-start max-w-2xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-500 mb-6">
          Hello, world.
        </h2>
        
        <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-6 font-light">
          Saya adalah seorang <span className="font-semibold text-blue-400">pelajar Sains Komputer dari BINUS University</span> yang mempunyai keghairahan mendalam terhadap kejuruteraan perisian dan kecerdasan buatan.
        </p>

        <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
          Sentiasa mendalami teknologi terkini, mencipta alat automasi, dan menganalisa algoritma untuk menyelesaikan masalah kompleks secara elegan.
        </p>
      </motion.div>

      {/* Floating Profile Picture / Avatar Element */}
      <motion.div 
        className="z-10 flex-1 flex justify-center items-center mt-12 md:mt-0 relative"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Glowing border element tracking cursor */}
        <motion.div 
          className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600 via-zinc-800 to-purple-600 blur-md opacity-70"
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 50, mass: 2 }}
        />
        
        {/* Core floating card */}
        <motion.div 
          className="relative w-64 h-64 md:w-80 md:h-80 bg-zinc-900/80 backdrop-blur-xl rounded-3xl border border-zinc-800 flex items-center justify-center p-8 overflow-hidden shadow-2xl"
          animate={{
            y: [0, -15, 0], // Floating up and down slowly
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Inner details of the profile visual representation */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950/50" />
          <div className="relative text-center w-full h-full border border-zinc-700/50 rounded-2xl flex flex-col items-center justify-center bg-zinc-950/50">
             <span className="text-6xl mb-4">🚀</span>
             <h3 className="text-xl font-medium text-zinc-200">Software Eng.</h3>
             <p className="text-sm text-zinc-500 mt-2">BINUS University</p>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
