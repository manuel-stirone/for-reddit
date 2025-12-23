import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "it"],
  defaultLocale: "it",
  pathnames: {
    "/": "/",
    "/home": {
      en: "/home",
      it: "/home",
    },
    "/about-me": {
      en: "/about-me",
      it: "/chi-sono",
    },
    "/services": {
      en: "/services",
      it: "/servizi",
    },
    "/insights": {
      en: "/insights",
      it: "/insights",
    },
    "/contacts": {
      en: "/contacts",
      it: "/contatti",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
