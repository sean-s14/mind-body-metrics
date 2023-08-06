"use client";

import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";

export default function Tabs({
  tabs,
  tabTitles,
  selectedKey,
  onChange,
  containerClassName,
  scrollClassName,
  tabClassName,
}: {
  tabs: number[];
  tabTitles?: string[];
  selectedKey: number;
  onChange: (tab: number) => void;
  containerClassName?: string;
  scrollClassName?: string;
  tabClassName?: string;
}) {
  return (
    <div
      className={[
        "w-full flex justify-center bg-slate-400 dark:bg-slate-900 text-sm xs:text-base",
        containerClassName,
      ].join(" ")}
    >
      {tabs.length === 0 ? (
        <span>No Data</span>
      ) : (
        <ScrollContainer
          className={[
            "flex !cursor-auto !hover:cursor-auto",
            scrollClassName || "gap-2 p-1",
          ].join(" ")}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              className={[
                `py-0.5 px-2 rounded ${
                  selectedKey === tab
                    ? "bg-slate-500 dark:bg-slate-600 text-slate-200"
                    : ""
                }`,
                tabClassName || "py-0.5 px-2 rounded",
              ].join(" ")}
              onClick={() => onChange(tab)}
            >
              {tabTitles ? tabTitles[tab] : tab}
            </button>
          ))}
        </ScrollContainer>
      )}
    </div>
  );
}
