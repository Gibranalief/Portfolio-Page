"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Server, BookOpen, MessageCircle } from "lucide-react";

export default function InteractiveTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate the height of the illuminated line based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const nodes = [
    {
      id: "full-stack",
      title: "Kejuruteraan Penuh-Susunan",
      description: "Pembangunan aplikasi web kompleks dan sistem tempahan dengan ekosistem moden termasuk Next.js, React, Node.js, NestJS, Prisma, dan PostgreSQL.",
      icon: <Server className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />,
      hoverEffect: "spring"
    },
    {
      id: "mentorship",
      title: "Kepimpinan Akademik & Pembimbing",
      description: "Pengalaman membimbing rakan mahasiswa dalam subjek-subjek teknikal yang mencabar seperti Computer Vision, Natural Language Processing (NLP), Machine Learning, dan Scientific Computing. Menerangkan penyediaan panduan penjelasan langkah demi langkah dan modul pengajaran.",
      icon: <BookOpen className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />,
      hoverEffect: "scale"
    },
    {
      id: "communication",
      title: "Komunikasi & Pendidikan Fleksibel",
      description: "Pengalaman sebagai tutor peribadi bahasa Mandarin. Menonjolkan kebolehan merangka pelan pengajaran dan skrip yang disesuaikan, membuktikan kemahiran komunikasi (soft skills) yang cemerlang untuk menterjemahkan maklumat kompleks kepada bentuk yang mudah difahami.",
      icon: <MessageCircle className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300" />,
      hoverEffect: "pulse"
    }
  ];

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-24 px-6 md:px-12">
      
      {/* Background Line */}
      <div className="absolute left-[39px] md:left-1/2 md:-ml-[1px] top-24 bottom-24 w-[2px] bg-zinc-800 rounded-full" />
      
      {/* Illuminated Scroll Line */}
      <motion.div 
        className="absolute left-[39px] md:left-1/2 md:-ml-[1px] top-24 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 rounded-full origin-top"
        style={{ height: lineHeight }}
      />

      {/* Timeline Nodes */}
      <div className="relative z-10 flex flex-col gap-20">
        {nodes.map((node, index) => {
          const isEven = index % 2 === 0;
          return (
            <TimelineNode 
              key={node.id} 
              node={node} 
              isEven={isEven} 
            />
          );
        })}
      </div>
    </div>
  );
}

function TimelineNode({ node, isEven }: { node: any, isEven: boolean }) {
  // Determine interaction properties based on specific node type
  let hoverAnimateX = {};
  
  if (node.hoverEffect === "spring") {
    hoverAnimateX = {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: { type: "spring", stiffness: 300 }
    };
  } else if (node.hoverEffect === "scale") {
    hoverAnimateX = {
      scale: 1.15,
      boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.4)",
    };
  } else if (node.hoverEffect === "pulse") {
    hoverAnimateX = {
      scale: [1, 1.1, 1],
      boxShadow: ["0px 0px 0px rgba(16, 185, 129, 0)", "0px 0px 20px rgba(16, 185, 129, 0.5)", "0px 0px 0px rgba(16, 185, 129, 0)"],
      transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
    };
  }

  return (
    <motion.div 
      className={`relative flex flex-col md:flex-row items-start md:items-center w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Icon Circle */}
      <motion.div 
        className="absolute left-0 md:left-1/2 ml-[22px] md:-ml-[22px] mt-2 md:mt-0 w-11 h-11 rounded-full bg-zinc-950 border-2 border-zinc-700 flex items-center justify-center z-20 group-hover:border-zinc-500 transition-colors duration-300"
        whileHover={hoverAnimateX}
      >
        <div className="absolute inset-0 rounded-full bg-zinc-100/5 backdrop-blur-sm" />
        <div className="relative z-10">
          {node.icon}
        </div>
      </motion.div>

      {/* Content wrapper */}
      <div className={`pl-[70px] md:pl-0 w-full md:w-1/2 flex flex-col ${isEven ? 'md:pr-16 md:items-end md:text-right' : 'md:pl-16 md:items-start md:text-left'}`}>
        <h3 className="text-2xl font-bold text-zinc-100 mb-3">{node.title}</h3>
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-md shadow-xl group-hover:bg-zinc-900/60 transition-all duration-300">
          <p className="text-zinc-400 text-base leading-relaxed">
            {node.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
