"use client";

import { Switch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { BsSunFill as SunIcon, BsMoonFill as MoonIcon } from "react-icons/bs";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      isSelected={theme === "light"}
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      size="lg"
      color="primary"
      thumbIcon={({ isSelected }) =>
        isSelected ? (
          <SunIcon size={16} className="text-slate-600" />
        ) : (
          <MoonIcon size={16} className="text-slate-600" />
        )
      }
    />
  );
}
