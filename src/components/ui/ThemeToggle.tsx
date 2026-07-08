"use client";

import { useEffect, useState } from "react";
import { Laptop, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

type ThemeMode = "light" | "dark" | "system";

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  if (mode === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = prefersDark ? "dark" : "light";
    return;
  }
  root.dataset.theme = mode;
}

export function ThemeToggle({ className }: { className?: string }) {
  const [mode, setMode] = useState<ThemeMode>("system");

  useEffect(() => {
    const saved = (localStorage.getItem("softbridge-theme") as ThemeMode | null) ?? "system";
    setMode(saved);
    applyTheme(saved);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystem = () => {
      if ((localStorage.getItem("softbridge-theme") as ThemeMode | null) === "system") applyTheme("system");
    };
    media.addEventListener("change", syncSystem);
    return () => media.removeEventListener("change", syncSystem);
  }, []);

  function cycleTheme() {
    const next: ThemeMode = mode === "system" ? "light" : mode === "light" ? "dark" : "system";
    setMode(next);
    localStorage.setItem("softbridge-theme", next);
    applyTheme(next);
  }

  const Icon = mode === "dark" ? Moon : mode === "light" ? Sun : Laptop;
  const label = mode === "dark" ? "Koyu tema" : mode === "light" ? "Açık tema" : "Sistem teması";

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={label}
      title={label}
      className={cn("grid size-11 place-items-center rounded-2xl border border-[var(--sb-line)] bg-[var(--sb-surface)] text-[var(--sb-text)] shadow-[var(--sb-shadow-sm)] transition hover:-translate-y-0.5 hover:shadow-[var(--sb-shadow-md)]", className)}
    >
      <Icon size={18} />
    </button>
  );
}
