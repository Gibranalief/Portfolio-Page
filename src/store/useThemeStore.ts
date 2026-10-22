import { create } from 'zustand';

export type Theme = 'dark' | 'light';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  /** Read the theme the inline script in layout.tsx already applied to <html>. */
  syncFromDocument: () => void;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage can be blocked (private mode); the theme still applies for this visit.
  }
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'dark',
  setTheme: (theme) => {
    applyTheme(theme);
    set({ theme });
  },
  toggleTheme: () => get().setTheme(get().theme === 'dark' ? 'light' : 'dark'),
  syncFromDocument: () =>
    set({ theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light' }),
}));

/** Colors for WebGL materials, which can't read CSS variables. Keep in sync with globals.css. */
export const threeColors = {
  dark: { fg: '#e4e4e7', accent: '#a5b4fc', muted: '#71717a' },
  light: { fg: '#18181b', accent: '#4338ca', muted: '#a1a1aa' },
} as const;
