import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "forge:theme";

function readInitial(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  return stored === "light" || stored === "dark" ? stored : "dark";
}

/**
 * Theme controller — toggles a `data-theme` attribute on <html>.
 * Defaults to dark. Persists choice in localStorage.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const initial = readInitial();
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const apply = (next: Theme) => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  return { theme, setTheme: apply, toggle: () => apply(theme === "dark" ? "light" : "dark") };
}
