"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Download, Menu, Terminal, X } from "lucide-react";
import { useTerminalStore } from "@/store/useTerminalStore";
import ThemeToggle from "@/components/theme/ThemeToggle";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/** Scroll-spy: returns the id of the section currently crossing the middle of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id === "home" ? "" : entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["home", ...ids].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const ids = links.map((l) => l.id);

export default function Navbar() {
  const { setIsOpen } = useTerminalStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(ids);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <>
      {/* Reading progress */}
      <motion.div
        className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-accent"
        style={{ scaleX: progress }}
      />

      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div className="relative w-full max-w-3xl">
          <nav className="flex items-center justify-between gap-2 rounded-full border border-line bg-surface/80 py-1.5 pl-2 pr-2 shadow-sm backdrop-blur-md">
            <a
              href="#home"
              aria-label="Back to top"
              className="flex h-9 items-center gap-2 rounded-full pl-1 pr-3 text-sm font-semibold tracking-tight text-fg"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-fg text-[11px] font-bold text-bg">
                GA
              </span>
              <span className="hidden sm:inline">Gibran</span>
            </a>

            <ul className="hidden items-center md:flex">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`relative block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                      active === link.id ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {active === link.id && (
                      <motion.span
                        layoutId="navActive"
                        className="absolute inset-0 rounded-full bg-surface-2"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsOpen(true)}
                aria-label="Open CLI mode"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-fg/30 hover:text-fg"
              >
                <Terminal size={16} />
              </button>
              <ThemeToggle />
              <a
                href="/CV_Gibran_Alief_Irawan.pdf"
                download="CV_Gibran_Alief_Irawan.pdf"
                className="flex h-9 items-center gap-2 rounded-full bg-fg px-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
              >
                <Download size={15} />
                <span className="hidden sm:inline">CV</span>
              </a>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted md:hidden"
              >
                {menuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-3xl border border-line bg-surface p-2 shadow-lg md:hidden"
              >
                {links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => setMenuOpen(false)}
                      className={`block rounded-2xl px-4 py-3 text-sm ${
                        active === link.id ? "bg-surface-2 text-fg" : "text-muted"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
