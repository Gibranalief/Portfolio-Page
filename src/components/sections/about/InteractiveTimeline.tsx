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
      title: "Full-Stack Engineering",
      description: "Building complex web applications and booking systems with a modern ecosystem including Next.js, React, Node.js, NestJS, Prisma, and PostgreSQL.",
      icon: <Server className="w-6 h-6 text-fg" />,
      hoverEffect: "spring"
    },
    {
      id: "mentorship",
      title: "Academic Leadership & Mentorship",
      description: "Experience mentoring fellow students in challenging technical subjects such as Computer Vision, Natural Language Processing (NLP), Machine Learning, and Scientific Computing, including preparing step-by-step explanatory guides and teaching modules.",
      icon: <BookOpen className="w-6 h-6 text-fg" />,
      hoverEffect: "scale"
    },
    {
      id: "communication",
      title: "Communication & Flexible Teaching",
      description: "Experience as a private Mandarin tutor, designing tailored lesson plans and scripts. This shows strong communication (soft) skills and the ability to turn complex information into something easy to understand.",
      icon: <MessageCircle className="w-6 h-6 text-fg" />,
      hoverEffect: "pulse"
    }
  ];

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-24 px-6 md:px-12">
      
      {/* Background Line */}
      <div className="absolute left-[39px] md:left-1/2 md:-ml-[1px] top-24 bottom-24 w-[2px] bg-line rounded-full" />
      
      {/* Illuminated Scroll Line */}
      <motion.div 
        className="absolute left-[39px] md:left-1/2 md:-ml-[1px] top-24 w-[2px] bg-accent rounded-full origin-top"
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
      boxShadow: "0px 0px 20px rgba(128, 128, 140, 0.35)",
    };
  } else if (node.hoverEffect === "pulse") {
    hoverAnimateX = {
      scale: [1, 1.1, 1],
      boxShadow: ["0px 0px 0px rgba(128, 128, 140, 0)", "0px 0px 20px rgba(128, 128, 140, 0.45)", "0px 0px 0px rgba(128, 128, 140, 0)"],
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
        className="absolute left-0 md:left-1/2 ml-[22px] md:-ml-[22px] mt-2 md:mt-0 w-11 h-11 rounded-full bg-bg border border-line flex items-center justify-center z-20 group-hover:border-accent transition-colors duration-300"
        whileHover={hoverAnimateX}
      >
        <div className="absolute inset-0 rounded-full bg-fg/5" />
        <div className="relative z-10">
          {node.icon}
        </div>
      </motion.div>

      {/* Content wrapper */}
      <div className={`pl-[70px] md:pl-0 w-full md:w-1/2 flex flex-col ${isEven ? 'md:pr-16 md:items-end md:text-right' : 'md:pl-16 md:items-start md:text-left'}`}>
        <h3 className="text-2xl font-semibold tracking-tight text-fg mb-3">{node.title}</h3>
        <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm group-hover:border-fg/20 transition-all duration-300">
          <p className="text-muted text-base leading-relaxed">
            {node.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
