"use client";

import { createContext, useContext } from "react";

export type Theme = "light" | "dark";

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // - Crear un useState<Theme>("light")
  // - Implementar toggleTheme que alterne entre "light" y "dark"
  // - Pasar { theme, toggleTheme } al value del Provider
  return <>{children}</>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }
  return context;
}
