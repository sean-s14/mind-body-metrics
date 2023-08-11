"use client";

import { useState } from "react";
import Link from "next/link";
import { DIMENSIONS } from "@/constants/styles";
import dynamic from "next/dynamic";
const ThemeSwitch = dynamic(
  () => import("@/components/ThemeSwitch/ThemeSwitch"),
  { ssr: false }
);
import { FiMenu } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useTheme } from "next-themes";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/log", label: "Daily Log" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  return (
    <nav
      style={{ height: DIMENSIONS.NAV_HEIGHT }}
      className="flex items-center justify-between px-4 xs:px-6 bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-200"
    >
      <div className="hidden">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={true}
          draggable={true}
          pauseOnHover={true}
          theme={theme === "light" ? "light" : "dark"}
          progressStyle={{
            background: "#07bc0c",
          }}
          className="text-base xs:text-lg min-w-fit max-w-full"
          toastClassName={
            "xs:rounded-lg bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-200 h-[80px] xs:h-fit"
          }
        />
      </div>

      {/* Menu Toggle */}
      <button
        className="flex sm:hidden transition-colors rounded-lg p-1.5 hover:bg-slate-400/40"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <MdOutlineClose
            size={30}
            className="fill-slate-500 dark:fill-slate-50"
            color="white"
          />
        ) : (
          <FiMenu size={30} className="fill-slate-500 dark:fill-slate-50" />
        )}
      </button>
      <h1 className="text-lg xs:text-xl sm:text-2xl font-semibold xs:font-bold">
        <Link href="/">Mind Body Metrics</Link>
      </h1>
      <ul className="hidden sm:flex items-center space-x-2 xs:space-x-4">
        {links.map(({ href, label }, index) => (
          <li
            key={`${label}-#${index}`}
            // className="bg-slate-500 rounded p-0.5 px-2"
          >
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
      <ThemeSwitch />

      {/* Mobile Navigation */}
      <ul
        className={`backdrop-blur-sm bg-slate-300/80 dark:bg-slate-900/80 w-full height-minus-nav pl-2 absolute left-0 top-nav flex-col ${
          isMenuOpen ? "flex" : "hidden"
        }`}
      >
        {links.map(({ href, label }, index) => (
          <li
            key={`${label}-#${index}`}
            className="text-2xl xs:text-3xl py-4 px-3 w-full"
          >
            <Link href={href} onClick={toggleMenu}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
