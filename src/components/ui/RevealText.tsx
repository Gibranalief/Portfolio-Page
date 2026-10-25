"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Kinetic headline: each word rises from behind a mask. The mask has bottom padding
 * so descenders (g, y, p, j) are never sheared off.
 */
export default function RevealText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.18em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduced ? false : { y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.75, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
