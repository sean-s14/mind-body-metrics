"use client";

import { TCategories } from "@/types/document";
import { capitalise, splitOnUpper } from "@sean14/utils";
import useSWR from "swr";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const categories: TCategories[] = [
  "general",
  "chores",
  "hygiene",
  "exercise",
  "nutrition",
  "reading",
  "sleep",
];

type TData = {
  general: {};
  chores: {};
  hygiene: {};
  exercise: {};
  nutrition: {};
  reading: {};
  sleep: {};
};

async function fetcher(url: string) {
  const res = await fetch(url);
  const { metrics }: { metrics: TData } = await res.json();
  return metrics;
}

export default function Dashboard() {
  const { data, error, isLoading } = useSWR<TData>("/api/avg", fetcher);

  // TODO: Improve error component
  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="flex w-full min-h-full items-center justify-center">
        <AiOutlineLoading3Quarters size={100} className="animate-spin" />
      </div>
    );

  console.log(data);

  // Transform data so that the categories within the object are sorted based on the number of properties they have
  const sortedData =
    data &&
    Object.fromEntries(
      Object.entries(data).sort(
        (a, b) => Object.keys(b[1]).length - Object.keys(a[1]).length
      )
    );

  return (
    <section className="flex flex-wrap items-start justify-center min-w-full h-fit p-2 py-5 xs:py-10 gap-6">
      {sortedData &&
        Object.keys(sortedData).length > 0 &&
        Object.entries(sortedData).map(([key, value]: [string, any], index) => (
          <div
            key={key}
            className="w-72 h-fit rounded-lg p-2 border-2 border-slate-400 bg-slate-200 dark:bg-slate-700"
          >
            <h1 className="font-bold text-xl text-center mb-2">
              {capitalise(key)}
            </h1>
            {value &&
              Object.entries(value).map(
                ([key, value]: [string, any], index) => (
                  <div key={key} className="flex gap-2 my-1">
                    <span className="w-2/3 text-right text-slate-500 dark:text-slate-400">
                      {capitalise(splitOnUpper(key))}:
                    </span>
                    <span className="w-1/3 text-slate-950 dark:text-slate-200">
                      {value}
                    </span>
                  </div>
                )
              )}
          </div>
        ))}
      {/* {categories.map((category, index) => (
        <div
          key={category}
          className="w-72 h-fit rounded-lg p-2 border-2 border-slate-400 bg-slate-200 dark:bg-slate-700"
        >
          <h1 className="font-bold text-xl text-center mb-2">
            {capitalise(category)}
          </h1>
          {data &&
            Object.entries(data).map(([key, value]: [string, any], index) => (
              <div key={key} className="flex gap-2 my-1">
                <span className="w-2/3 text-right text-slate-500 dark:text-slate-400">
                  {capitalise(splitOnUpper(key))}:
                </span>
                <span className="w-1/3 text-slate-950 dark:text-slate-200">
                  {value}
                </span>
              </div>
            ))}
        </div>
      ))} */}
    </section>
  );
}
