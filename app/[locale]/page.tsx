import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";
import LocaleSwitcher2 from "@/components/LocaleSwitcher/LocaleSwitcher2";

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("home");

  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-500">
      <main className="max-w-3xl text-center space-y-10">
        <h1 className="text-6xl font-semibold">ciao</h1>
        <Button>Button 1</Button>
        <LocaleSwitcher2 />
        <Button variant="secondary">Button 2</Button>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <LocaleSwitcher2 />
        <h1 className="text-6xl font-semibold">{t("heroSubtitle")}</h1>
        <LocaleSwitcher2 />
      </main>
      <ThemeToggle />
    </div>
  );
}
