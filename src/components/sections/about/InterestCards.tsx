"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef } from "react";
import { Code, Bot, LineChart } from "lucide-react";

const cards = [
  {
    id: "cv-ml",
    title: "Computer Vision & ML",
    description: "Eksplorasi berterusan terhadap algoritma seperti model Long Short-Term Memory (LSTM), Gated Recurrent Unit (GRU), serta geometri epipolar dalam penglihatan stereo.",
    icon: <Bot className="w-8 h-8 text-blue-400" />
  },
  {
    id: "automation",
    title: "Automasi & Alat Dalaman",
    description: "Pembangunan skrip automasi pelayar web dan integrasi API (FastAPI, Groq API, Playwright) untuk mengoptimumkan proses dan tugasan harian.",
    icon: <Code className="w-8 h-8 text-purple-400" />
  },
  {
    id: "quantitative",
    title: "Analisis & Logik Kuantitatif",
    description: "Aplikasi logik pengaturcaraan ke dalam bidang kewangan, seperti analisis ekuiti dan strategi valuasi kuantitatif dalam pasaran saham (pemerhatian indeks LQ45).",
    icon: <LineChart className="w-8 h-8 text-emerald-400" />
  }
];

export default function InterestCards() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-24 pb-32">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">Eksplorasi & Minat</h2>
        <p className="text-zinc-500 max-w-2xl mx-auto">Kajian berterusan yang merangkumi kecerdasan buatan, proses automasi, dan logik kuantitatif.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <HoverTiltCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

function HoverTiltCard({ card }: { card: any }) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values to track mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth the mouse values
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse position to rotation angles (max 15 degrees as requested in PRD)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // Glare effect mapping
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareOpacity = useTransform(
    mouseXSpring,
    [-0.5, 0, 0.5],
    [0.1, 0, 0.1]
  );
  const glareOpacityY = useTransform(
    mouseYSpring,
    [-0.5, 0, 0.5],
    [0.1, 0, 0.1]
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    // Normalized position from -0.5 to 0.5
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative w-full h-[350px] rounded-3xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="absolute inset-0 rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-white/10 p-8 flex flex-col shadow-2xl overflow-hidden"
        style={{ transform: "translateZ(30px)" }} // Push content outwards
      >
        {/* Dynamic glare effect reflecting mouse movement */}
        <motion.div 
          className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-tr from-white to-transparent mix-blend-overlay"
          style={{
            opacity: useTransform(() => Math.max(glareOpacity.get(), glareOpacityY.get())),
            backgroundPosition: `${glareX.get()} ${glareY.get()}`,
            backgroundSize: "200% 200%",
          }}
        />

        <div className="p-4 bg-zinc-800/80 rounded-2xl w-max mb-6 border border-zinc-700/50">
          {card.icon}
        </div>
        
        <h3 className="text-xl font-bold text-zinc-100 mb-4">{card.title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{card.description}</p>
      </div>
    </motion.div>
  );
}
