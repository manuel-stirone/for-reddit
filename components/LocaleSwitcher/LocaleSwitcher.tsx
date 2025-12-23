"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";
import styles from "./LocaleSwitcher.module.css";

const locales = [
  {
    value: "en",
    label: "EN",
    flag: (
      <svg
        width="25.5"
        height="19.2"
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
    value: "it",
    label: "IT",
    flag: (
      <svg
        width="25.5"
        height="19.2"
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

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentLocale = locales.find((l) => l.value === locale);

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  // Close dropdown when clicking outside
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

  // Keyboard navigation
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
          prev < locales.length - 1 ? prev + 1 : prev
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
        setFocusedIndex(locales.length - 1);
        break;

      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedIndex >= 0) {
          switchLocale(locales[focusedIndex].value);
        }
        break;

      case "Tab":
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  const handleOptionClick = (value: string) => {
    switchLocale(value);
  };

  return (
    <div className={styles.localeSwitcher} ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.localeButton}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <span className={styles.localeFlagWrapper}>{currentLocale?.flag}</span>
        <svg
          className={`${styles.localeIcon} ${
            isOpen ? styles.localeIconOpen : ""
          }`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={styles.localeDropdown}
          role="listbox"
          aria-label="Language options"
          onKeyDown={handleKeyDown}
        >
          {locales.map((l, index) => (
            <div
              key={l.value}
              role="option"
              aria-selected={l.value === locale}
              className={`${styles.localeOption} ${
                l.value === locale ? styles.localeOptionActive : ""
              } ${focusedIndex === index ? styles.localeOptionFocused : ""}`}
              onClick={() => handleOptionClick(l.value)}
              onMouseEnter={() => setFocusedIndex(index)}
            >
              <span className={styles.localeFlagWrapper}>{l.flag}</span>
              <span className={styles.localeLabel}>{l.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
