"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef } from "react";
import Image from "next/image";

export default function AnimatedIntro() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Pointer position over the photo card, normalized to -0.5..0.5. Motion values
  // update the DOM directly, so tilting never re-renders React.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 200, damping: 22 });
  const sy = useSpring(py, { stiffness: 200, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const sheenX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div className="relative mx-auto flex min-h-[80vh] w-full max-w-6xl flex-col items-center justify-center gap-14 px-6 py-28 md:flex-row md:gap-20 md:px-10">
      {/* Text */}
      <motion.div
        className="z-10 flex max-w-xl flex-1 flex-col items-start"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-subtle">
          <span className="h-px w-8 bg-subtle" />
          About
        </p>
        <h2 className="mb-6 text-4xl font-semibold tracking-tight text-fg md:text-5xl">Hello, world.</h2>

        <p className="mb-5 text-lg leading-relaxed text-muted md:text-xl">
          I am a <span className="font-medium text-fg">Computer Science student at BINUS University</span> with a deep passion for software engineering and artificial intelligence.
        </p>

        <p className="text-lg leading-relaxed text-subtle md:text-xl">
          Always diving into the latest technology, building automation tools, and analyzing algorithms to solve complex problems elegantly.
        </p>
      </motion.div>

      {/* Photo card with 3D tilt */}
      <motion.div
        className="z-10 flex flex-1 items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        style={{ perspective: 1000 }}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative h-72 w-72 md:h-96 md:w-96"
        >
          {/* Offset outline frame sitting behind the photo */}
          <div
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border border-line"
            style={{ transform: "translateZ(-30px) translate(16px, 16px)" }}
          />

          <div className="relative h-full w-full overflow-hidden rounded-3xl border border-line bg-surface shadow-xl">
            <Image
              src="/profile.png"
              alt="Gibran Alief Irawan"
              fill
              sizes="(min-width: 768px) 384px, 288px"
              className="object-cover"
              priority
            />
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
              style={{
                background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.9) 50%, transparent 70%)",
                backgroundSize: "250% 100%",
                backgroundPositionX: sheenX,
              }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-12">
              <h3 className="text-lg font-semibold text-white">Gibran Alief Irawan</h3>
              <p className="text-sm text-white/70">Computer Science · BINUS University</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
