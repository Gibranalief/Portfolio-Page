"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Code, Bot, LineChart } from "lucide-react";

interface InterestCard {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const cards: InterestCard[] = [
  {
    id: "cv-ml",
    title: "Computer Vision & ML",
    description: "Ongoing exploration of algorithms such as Long Short-Term Memory (LSTM) and Gated Recurrent Unit (GRU) models, as well as epipolar geometry in stereo vision.",
    icon: <Bot className="w-8 h-8 text-accent" />
  },
  {
    id: "automation",
    title: "Automation & Internal Tools",
    description: "Building browser automation scripts and API integrations (FastAPI, Groq API, Playwright) to streamline everyday processes and tasks.",
    icon: <Code className="w-8 h-8 text-accent" />
  },
  {
    id: "quantitative",
    title: "Quantitative Analysis & Logic",
    description: "Applying programming logic to finance, such as equity analysis and quantitative valuation strategies in the stock market (observing the LQ45 index).",
    icon: <LineChart className="w-8 h-8 text-accent" />
  }
];

export default function InterestCards() {
  const reduced = useReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  // Pan device: vertical scroll drives lateral travel. The travel is measured, not assumed,
  // because a rail narrower than the viewport would otherwise pin the screen for nothing.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setTravel(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  const pinned = !reduced && travel > 0;

  return (
    <div
      ref={outerRef}
      className="relative w-full"
      style={pinned ? { height: `calc(100vh + ${travel}px)` } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-screen items-center overflow-hidden" : "py-24"}>
        <motion.div
          ref={trackRef}
          className={`flex w-max items-center gap-6 px-6 md:gap-8 md:px-16 ${pinned ? "" : "overflow-x-auto"}`}
          style={pinned ? { x } : undefined}
        >
          {/* Rail heading doubles as the first item, so the act opens with content already present */}
          <div className="w-[min(78vw,22rem)] shrink-0 pr-4 md:w-[26rem] md:pr-8">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-subtle">Interests</p>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-fg md:text-4xl">
              Exploration & Interests
            </h2>
            <p className="text-muted">
              Ongoing study spanning artificial intelligence, process automation, and quantitative logic.
            </p>
          </div>

          {cards.map((card) => (
            <HoverTiltCard key={card.id} card={card} />
          ))}

          {/* Closing note gives the rail a resolution and the travel its extra width */}
          <a
            href="https://github.com/Gibranalief"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-[min(60vw,16rem)] shrink-0 items-center gap-2 pr-6 text-lg font-medium text-fg md:pr-16"
          >
            See the code on GitHub
            <ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

function HoverTiltCard({ card }: { card: InterestCard }) {
  const ref = useRef<HTMLDivElement>(null);

  // Normalized pointer position over the card (-0.5..0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative h-[340px] w-[min(78vw,22rem)] shrink-0 md:w-[24rem]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
    >
      <div className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-8 shadow-sm transition-colors hover:border-fg/25">
        <div className="mb-6 w-max rounded-2xl border border-line bg-surface-2 p-4">{card.icon}</div>
        <h3 className="mb-4 text-xl font-semibold tracking-tight text-fg">{card.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{card.description}</p>
      </div>
    </motion.div>
  );
}
