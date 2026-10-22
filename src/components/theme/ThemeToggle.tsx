"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme, syncFromDocument } = useThemeStore();

  // The real theme is decided before paint by the inline script in layout.tsx;
  // read it back so the store (used by the 3D scenes) matches the document.
  useEffect(() => {
    syncFromDocument();
  }, [syncFromDocument]);

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-fg/30 hover:text-fg"
    >
      {/* Icons swap with CSS keyed on the <html class="dark"> set before paint, so there is
          no flash or hydration mismatch regardless of the saved theme. */}
      <Sun
        size={16}
        className="absolute -rotate-90 scale-50 opacity-0 transition-all duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
      <Moon
        size={16}
        className="absolute rotate-0 scale-100 opacity-100 transition-all duration-300 dark:rotate-90 dark:scale-50 dark:opacity-0"
      />
    </button>
  );
}
