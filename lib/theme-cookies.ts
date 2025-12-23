"use client";

export function setThemeCookie(theme: string) {
  document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
}

export function getThemeCookie(): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "theme") {
      return value;
    }
  }
  return null;
}
