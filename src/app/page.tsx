"use client";

import { ThemeContext, useTheme } from "../components/theme-context";
import { ThemeToggle } from "../components/theme-toggle";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center bg-white">
        Valor actual del tema: {theme}
      </main>
    </div>
  );
}
