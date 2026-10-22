"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, Download, MapPin, Code, Camera } from "lucide-react";

const EMAIL = "gbrnalief@gmail.com";

const socials = [
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
      className="relative w-full scroll-mt-16 bg-zinc-950 px-4 pb-10 pt-24 sm:px-8 md:px-16 lg:px-24"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[800px] max-w-full -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(closest-side, rgba(59,130,246,0.12), transparent)" }}
      />

      <motion.div
        className="relative mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="mb-4 text-4xl font-bold text-zinc-100 md:text-5xl">Let&apos;s Work Together</h2>
        <p className="mx-auto mb-10 max-w-xl text-lg text-zinc-400">
          Open to internships and collaborations in AI and software engineering. Send me a message and I&apos;ll get back to you.
        </p>

        {/* Primary actions */}
        <div className="mb-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <Mail size={18} />
            {EMAIL}
          </a>
          <button
            onClick={copyEmail}
            className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-zinc-700"
            aria-live="polite"
          >
            {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
            {copied ? "Copied!" : "Copy email"}
          </button>
        </div>

        {/* Social + CV cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-left transition-colors hover:border-blue-500/50 hover:bg-zinc-900"
            >
              <span className="rounded-xl border border-zinc-700/50 bg-zinc-800 p-3 text-blue-400 transition-colors group-hover:text-blue-300">
                {s.icon}
              </span>
              <span className="flex flex-col">
                <span className="font-semibold text-zinc-100">{s.name}</span>
                <span className="text-sm text-zinc-500">{s.handle}</span>
              </span>
            </a>
          ))}
          <a
            href="/CV_Gibran_Alief_Irawan.pdf"
            download="CV_Gibran_Alief_Irawan.pdf"
            className="group flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-left transition-colors hover:border-blue-500/50 hover:bg-zinc-900"
          >
            <span className="rounded-xl border border-zinc-700/50 bg-zinc-800 p-3 text-blue-400 transition-colors group-hover:text-blue-300">
              <Download className="h-5 w-5" />
            </span>
            <span className="flex flex-col">
              <span className="font-semibold text-zinc-100">Download CV</span>
              <span className="text-sm text-zinc-500">PDF</span>
            </span>
          </a>
        </div>

        <p className="mt-10 flex items-center justify-center gap-2 text-sm text-zinc-500">
          <MapPin size={14} /> Tangerang, Banten, Indonesia
        </p>
      </motion.div>

      <footer className="relative mx-auto mt-20 max-w-3xl border-t border-zinc-800 pt-6 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} Gibran Alief Irawan. Built with Next.js, Tailwind CSS, and Framer Motion.
      </footer>
    </section>
  );
}
