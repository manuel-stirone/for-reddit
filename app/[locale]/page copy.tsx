import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-500">
      <main className="max-w-3xl text-center space-y-10">
        <h1 className="text-6xl font-semibold">ciao</h1>
        <Button>Button 1</Button>
        <Button variant="secondary">Button 2</Button>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <h1 className="text-6xl font-semibold">ciao</h1>
        <h1 className="text-6xl font-semibold">ciao</h1>
      </main>
      <ThemeToggle />
    </div>
  );
}
