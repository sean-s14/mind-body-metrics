"use client";

import Link from "next/link";
import { DIMENSIONS } from "@/constants/styles";
import dynamic from "next/dynamic";
const ThemeSwitch = dynamic(
  () => import("@/components/ThemeSwitch/ThemeSwitch"),
  { ssr: false }
);

const links = [
  { href: "/", label: "Home" },
  { href: "/log", label: "Daily Log" },
];

export default function Navigation() {
  return (
    <nav
      style={{ height: DIMENSIONS.NAV_HEIGHT }}
      className="flex items-center justify-between px-4 xs:px-6 bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-200"
    >
      <h1 className="text-xl xs:text-2xl font-bold">
        <Link href="/">Mind Body Metrics</Link>
      </h1>
      <ul className="flex items-center space-x-2 xs:space-x-4">
        {links.map(({ href, label }) => (
          <li
            key={`${href}${label}`}
            // className="bg-slate-500 rounded p-0.5 px-2"
          >
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
      <ThemeSwitch />
    </nav>
  );
}
