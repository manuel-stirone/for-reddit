// =============================================================================
// FILE: components/LocaleSwitcher/LocaleSwitcher2.tsx
// Purpose: Tailwind-based locale switcher for Next.js 16
// =============================================================================
"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState, useRef, useEffect, useTransition } from "react";

// Locale configuration with display information
const localeConfig = [
  {
    code: "en",
    label: "English",
    shortLabel: "EN",
    flag: (
      <svg
        className="w-6 h-4"
        viewBox="0 0 640 480"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="#012169" d="M0 0h640v480H0z" />
        <path
          fill="#FFF"
          d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
        />
        <path
          fill="#C8102E"
          d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
        />
        <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
        <path fill="#C8102E" d="M0 193v94h640v-94H0zM273 0v480h94V0h-94z" />
      </svg>
    ),
  },
  {
    code: "it",
    label: "Italiano",
    shortLabel: "IT",
    flag: (
      <svg
        className="w-6 h-4"
        viewBox="0 0 640 480"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fillRule="evenodd" strokeWidth="1pt">
          <path fill="#fff" d="M0 0h640v480H0z" />
          <path fill="#009246" d="M0 0h213.3v480H0z" />
          <path fill="#ce2b37" d="M426.7 0H640v480H426.7z" />
        </g>
      </svg>
    ),
  },
];

export default function LocaleSwitcher2() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // UI state
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Refs for managing focus
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentLocaleConfig = localeConfig.find(
    (l) => l.code === currentLocale
  );

  /**
   * Handle locale switching with proper navigation
   */
  const switchLocale = (newLocale: string) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });

    setIsOpen(false);
    buttonRef.current?.focus();
  };

  /**
   * Close dropdown when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  /**
   * Keyboard navigation for accessibility
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;

      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev < localeConfig.length - 1 ? prev + 1 : prev
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;

      case "Home":
        e.preventDefault();
        setFocusedIndex(0);
        break;

      case "End":
        e.preventDefault();
        setFocusedIndex(localeConfig.length - 1);
        break;

      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedIndex >= 0) {
          switchLocale(localeConfig[focusedIndex].code);
        }
        break;

      case "Tab":
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <span className="flex items-center shrink-0">
          {currentLocaleConfig?.flag}
        </span>
        <span className="hidden sm:inline">{currentLocaleConfig?.label}</span>
        <span className="sm:hidden">{currentLocaleConfig?.shortLabel}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Language options"
          onKeyDown={handleKeyDown}
          className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {localeConfig.map((locale, index) => {
            const isSelected = locale.code === currentLocale;
            const isFocused = focusedIndex === index;

            return (
              <button
                key={locale.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => switchLocale(locale.code)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 ${
                  isFocused
                    ? "bg-gray-100 dark:bg-gray-700"
                    : isSelected
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : "bg-white dark:bg-gray-800"
                } ${
                  isSelected
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-gray-700 dark:text-gray-200"
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <span className="flex items-center shrink-0">
                  {locale.flag}
                </span>
                <span className="flex-1 text-left">{locale.label}</span>
                {isSelected && (
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
