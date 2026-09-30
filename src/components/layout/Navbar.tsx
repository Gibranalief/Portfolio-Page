"use client";

import Link from "next/link";
import { Terminal, Download } from "lucide-react";
import { useTerminalStore } from "@/store/useTerminalStore";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { setIsOpen } = useTerminalStore();

  return (
    <header className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-white">
          Gibran<span className="text-blue-500">.dev</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <Link href="#about" className="hover:text-white transition-colors">About</Link>
          <Link href="#skills" className="hover:text-white transition-colors">Skills</Link>
          <Link href="#projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="#experience" className="hover:text-white transition-colors">Experience</Link>
          <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <Terminal size={18} />
            <span className="hidden md:inline">CLI Mode</span>
          </button>
          
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <Download size={16} />
            <span className="hidden md:inline">Resume</span>
          </a>
        </div>
      </div>
    </header>
  );
}
