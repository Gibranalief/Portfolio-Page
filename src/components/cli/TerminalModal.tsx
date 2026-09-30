"use client";

import { useTerminalStore } from "@/store/useTerminalStore";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { processCommand } from "./commandRegistry";
import { motion, AnimatePresence } from "framer-motion";

export default function TerminalModal() {
  const { isOpen, setIsOpen, history, addHistory, clearHistory } = useTerminalStore();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input.trim();
      if (!cmd) return;
      
      if (cmd === "clear") {
        clearHistory();
      } else {
        const output = processCommand(cmd);
        addHistory({ command: cmd, output });
      }
      setInput("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div 
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden flex flex-col h-[70vh]"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
              <div className="flex gap-2">
                <div onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-xs text-zinc-400 font-mono">gibran@portfolio:~</div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white">
                <X size={16} />
              </button>
            </div>
            
            {/* Terminal Body */}
            <div 
              className="flex-1 p-4 overflow-y-auto font-mono text-sm text-zinc-300"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="mb-4 text-green-400">
                Welcome to Gibran OS v1.0.0. Type <span className="text-white">&apos;help&apos;</span> to see available commands.
              </div>
              
              {history.map((entry, i) => (
                <div key={i} className="mb-4">
                  <div className="flex gap-2">
                    <span className="text-blue-400">~/portfolio$</span>
                    <span className="text-white">{entry.command}</span>
                  </div>
                  <div className="mt-1 whitespace-pre-wrap text-zinc-400">{entry.output}</div>
                </div>
              ))}
              
              <div className="flex gap-2">
                <span className="text-blue-400">~/portfolio$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-white focus:ring-0"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
              <div ref={endOfMessagesRef} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
