"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

export default function AnimatedIntro() {
  // Motion values update the DOM directly, so tracking the mouse does not
  // re-render this component on every mousemove event.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { damping: 30, stiffness: 50, mass: 2 });
  const glowY = useSpring(mouseY, { damping: 30, stiffness: 50, mass: 2 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized mouse position relative to window center, scaled to a 20px offset
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2 * 20);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2 * 20);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full min-h-[70vh] flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-20 overflow-hidden">

      {/* Background glow (radial gradient instead of a huge blur filter, which is far cheaper to paint) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(59,130,246,0.14), transparent)" }}
      />

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
          I am a <span className="font-semibold text-blue-400">Computer Science student at BINUS University</span> with a deep passion for software engineering and artificial intelligence.
        </p>

        <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
          Always diving into the latest technology, building automation tools, and analyzing algorithms to solve complex problems elegantly.
        </p>
      </motion.div>

      {/* Floating Profile Picture */}
      <motion.div
        className="z-10 flex-1 flex justify-center items-center mt-12 md:mt-0 relative"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Glowing border element tracking cursor */}
        <motion.div
          className="absolute w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-gradient-to-tr from-blue-600 via-zinc-800 to-purple-600 opacity-60"
          style={{ x: glowX, y: glowY }}
        />

        {/* Photo card */}
        <motion.div
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl border border-zinc-700 overflow-hidden shadow-2xl bg-zinc-900"
          animate={{
            y: [0, -15, 0], // Floating up and down slowly
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Image
            src="/profile.png"
            alt="Gibran Alief Irawan"
            fill
            sizes="(min-width: 768px) 320px, 256px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-5">
            <h3 className="text-lg font-semibold text-zinc-100">Gibran Alief Irawan</h3>
            <p className="text-sm text-zinc-400">Computer Science · BINUS University</p>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
