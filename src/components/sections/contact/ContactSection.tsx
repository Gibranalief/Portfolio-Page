"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, Camera, Check, Code, Copy, Download, Mail, MapPin } from "lucide-react";
import ContactScene from "@/components/3d/ContactScene";

const EMAIL = "gbrnalief@gmail.com";

const socials = [
  {
    name: "LinkedIn",
    handle: "gibran-alief-irawan",
    href: "https://www.linkedin.com/in/gibran-alief-irawan-394775311/",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    name: "GitHub",
    handle: "@Gibranalief",
    href: "https://github.com/Gibranalief",
    icon: <Code className="h-5 w-5" />,
  },
  {
    name: "Instagram",
    handle: "@gibrannalf",
    href: "https://www.instagram.com/gibrannalf",
    icon: <Camera className="h-5 w-5" />,
  },
];

const cardClass =
  "group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 text-left transition-colors hover:border-fg/25";
const iconClass =
  "rounded-xl border border-line bg-surface-2 p-3 text-muted transition-colors group-hover:text-fg";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); the mailto button still works.
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden border-t border-line bg-bg px-4 pb-10 pt-28 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-subtle">Contact</p>
          <h2 className="mb-5 text-4xl font-semibold tracking-tight text-fg md:text-6xl">
            Let&apos;s work <span className="text-accent">together.</span>
          </h2>
          <p className="mb-8 max-w-md text-lg leading-relaxed text-muted">
            Open to internships and collaborations in AI and software engineering. Send me a message and I&apos;ll get back to you.
          </p>

          <div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85"
            >
              <Mail size={16} />
              {EMAIL}
            </a>
            <button
              onClick={copyEmail}
              className="flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-fg transition-colors hover:bg-surface-2"
              aria-live="polite"
            >
              {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
              {copied ? "Copied!" : "Copy email"}
            </button>
          </div>

          <p className="flex items-center gap-2 text-sm text-subtle">
            <MapPin size={14} /> Tangerang, Banten, Indonesia
          </p>
        </motion.div>

        {/* Interactive 3D object: leans toward the pointer */}
        <ContactScene className="pointer-events-none h-[280px] w-full md:h-[380px]" />
      </div>

      {/* Links */}
      <div className="relative mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {socials.map((s, i) => (
          <motion.a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cardClass}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <span className={iconClass}>{s.icon}</span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="font-medium text-fg">{s.name}</span>
              <span className="truncate text-sm text-subtle">{s.handle}</span>
            </span>
            <ArrowUpRight size={16} className="text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.a>
        ))}
        <motion.a
          href="/CV_Gibran_Alief_Irawan.pdf"
          download="CV_Gibran_Alief_Irawan.pdf"
          className={cardClass}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: socials.length * 0.08 }}
        >
          <span className={iconClass}>
            <Download className="h-5 w-5" />
          </span>
          <span className="flex flex-1 flex-col">
            <span className="font-medium text-fg">Download CV</span>
            <span className="text-sm text-subtle">PDF</span>
          </span>
        </motion.a>
      </div>

      <footer className="relative mx-auto mt-20 max-w-6xl border-t border-line pt-6 text-center text-xs text-subtle">
        © {new Date().getFullYear()} Gibran Alief Irawan. Built with Next.js, Three.js, and Framer Motion.
      </footer>
    </section>
  );
}
