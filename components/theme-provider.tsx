"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { setThemeCookie } from "@/lib/theme-cookies";

function ThemeSync() {
  const { theme, systemTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    // Sync theme to cookie on every change
    if (theme) {
      setThemeCookie(theme);
    }
  }, [theme]);

  // Force theme application on mount (fixes locale switch flicker)
  useEffect(() => {
    const actualTheme =
      resolvedTheme || (theme === "system" ? systemTheme : theme);
    if (actualTheme) {
      document.documentElement.classList.toggle("dark", actualTheme === "dark");
      document.documentElement.style.colorScheme = actualTheme;
    }
  }, [theme, systemTheme, resolvedTheme]);

  return null;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeSync />
      {children}
    </NextThemesProvider>
  );
}
