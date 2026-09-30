import { create } from 'zustand';

export interface TerminalEntry {
  command: string;
  output: React.ReactNode;
}

interface TerminalState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  history: TerminalEntry[];
  addHistory: (entry: TerminalEntry) => void;
  clearHistory: () => void;
}

export const useTerminalStore = create<TerminalState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  history: [],
  addHistory: (entry) => set((state) => ({ history: [...state.history, entry] })),
  clearHistory: () => set({ history: [] }),
}));
