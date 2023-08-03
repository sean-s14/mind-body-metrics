"use client";

import Link from "next/link";
import { DIMENSIONS } from "@/constants/styles";
import dynamic from "next/dynamic";
const ThemeSwitch = dynamic(
  () => import("@/components/ThemeSwitch/ThemeSwitch"),
  { ssr: false }
);

export default function Navigation() {
  return (
    <nav
      style={{ height: DIMENSIONS.NAV_HEIGHT }}
      className="flex items-center justify-between px-4 xs:px-6 bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-200"
    >
      <h1 className="text-xl xs:text-2xl font-bold">
        <Link href="/">Mind Body Metrics</Link>
      </h1>
      <ThemeSwitch />
    </nav>
  );
}
