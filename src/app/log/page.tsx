"use client";

import { useState } from "react";
import Tabs from "@/components/Tabs/Tabs";
import useSWR from "swr";
import { IMetrics } from "@/types/metrics";

const years = Array.from({ length: 3 }, (_, i) => 2023 + i);
const months = Array.from({ length: 12 }, (_, i) => i);

const monthsString = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
const currentDay = new Date().getDate();

const categories = [
  "None",
  "General",
  "Chores",
  "Hygiene",
  "Exercise",
  "Nutrition",
  "Reading",
  "Sleep",
];

const categoryNumbers = Array.from({ length: categories.length }, (_, i) => i);

function NoneMetric({ selectedDay }: { selectedDay?: IMetrics }) {
  return (
    <div className="border border-slate-500 p-4 mt-4 rounded-lg min-w-fit max-w-[90%] w-96">
      <div className="flex gap-2">
        <span className="w-1/3 text-right text-slate-500 dark:text-slate-400">
          ID:
        </span>
        <span className="w-2/3 break-all text-slate-950 dark:text-slate-200">
          {selectedDay && selectedDay?._id?.toString()}
        </span>
      </div>
      <div className="flex gap-2">
        <span className="w-1/3 text-right text-slate-500 dark:text-slate-400">
          Created At:
        </span>
        <span className="w-2/3 text-slate-950 dark:text-slate-200">
          {selectedDay?.createdAt &&
            new Date(selectedDay.createdAt).toDateString()}
        </span>
      </div>
      <div className="flex gap-2">
        <span className="w-1/3 text-right text-slate-500 dark:text-slate-400">
          Updated At:
        </span>
        <span className="w-2/3 text-slate-950 dark:text-slate-200">
          {selectedDay?.updatedAt &&
            new Date(selectedDay.updatedAt).toDateString()}
        </span>
      </div>
    </div>
  );
}

async function fetchDays(url: string) {
  const res = await fetch(url);
  const { metrics }: { metrics: IMetrics[] } = await res.json();
  return metrics;
}

export default function DailyActivityLog() {
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [day, setDay] = useState(currentDay);
  const [category, setCategory] = useState(0);

  const {
    data: metrics,
    error: metricsError,
    isLoading: metricsIsLoading,
  } = useSWR(`/api/metrics?year=${year}&month=${month + 1}`, fetchDays);

  if (metricsError) return <div>failed to load</div>;
  if (metricsIsLoading)
    return (
      <div className="flex w-full h-full items-center justify-center">
        loading...
      </div>
    );

  const days =
    metrics?.map((metric) =>
      metric?.createdAt ? new Date(metric.createdAt).getDate() : 0
    ) || [];

  // From metrics get the item that matches 'day'
  const selectedDay = metrics?.find(
    (metric) =>
      metric?.createdAt && new Date(metric.createdAt).getDate() === day
  );

  let Metric: any = () => <div className="mt-4">Not implemented yet</div>;
  if (categories[category] === "None") {
    Metric = NoneMetric;
  }

  return (
    <section className="flex flex-col items-center justify-start min-w-full">
      {/* Years */}
      <Tabs tabs={years} selectedKey={year} onChange={setYear} />

      {/* Months */}
      <Tabs
        containerClassName="border-y border-y-slate-300 dark:border-y-slate-600"
        tabs={months}
        tabTitles={monthsString}
        selectedKey={month}
        onChange={setMonth}
      />

      {/* Days */}
      <Tabs tabs={days} selectedKey={day} onChange={setDay} />

      {/* Categories */}
      <div className="w-[80%] mt-3">
        <Tabs
          containerClassName="rounded-lg border-2 border-slate-600"
          scrollClassName="py-1.5 px-2 gap-3"
          tabClassName="py-1.5 px-2 rounded"
          tabs={categoryNumbers}
          tabTitles={categories}
          selectedKey={category}
          onChange={setCategory}
        />
      </div>

      {/* Metrics */}
      <Metric selectedDay={selectedDay} />
    </section>
  );
}
