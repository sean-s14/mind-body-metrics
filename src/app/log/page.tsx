"use client";

import { useState } from "react";
import Tabs from "@/components/Tabs/Tabs";
import useSWR from "swr";
import { IMetrics } from "@/types/metrics";
import Category from "@/components/Category/Category";
import Select from "@/components/Select/Select";
import {
  HYGIENE_FIELDS,
  hygieneReducer,
  HYGIENE,
} from "@/constants/schemas/hygiene";
import { IHygiene } from "@/types/hygiene";
import { IGeneral, IGeneralClient } from "@/types/general";
import {
  GENERAL_FIELDS,
  GENERAL_ARRAY_FIELDS,
  generalReducer,
  GENERAL_CLIENT,
} from "@/constants/schemas/general";
import { IChores } from "@/types/chores";
import {
  CHORES_FIELDS,
  choresReducer,
  CHORES,
} from "@/constants/schemas/chores";
import { IExercise } from "@/types/exercise";
import {
  EXERCISE_FIELDS,
  exerciseReducer,
  EXERCISE,
} from "@/constants/schemas/exercise";
import { INutrition } from "@/types/nutrition";
import {
  NUTRITION_FIELDS,
  nutritionReducer,
  NUTRITION,
} from "@/constants/schemas/nutrition";
import { IReading } from "@/types/reading";
import {
  READING_FIELDS,
  readingReducer,
  READING,
} from "@/constants/schemas/reading";
import { ISleep, ISleepClient } from "@/types/sleep";
import {
  SLEEP_FIELDS,
  sleepReducer,
  SLEEP_CLIENT,
} from "@/constants/schemas/sleep";
import { TCategories } from "@/types/document";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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

const categories: TCategories[] = [
  "general",
  "chores",
  "hygiene",
  "exercise",
  "nutrition",
  "reading",
  "sleep",
];

const categoryNumbers = Array.from(
  { length: categories.length + 1 },
  (_, i) => i
);

// TODO: add button to delete object
function NoneMetric({ selectedDay }: { selectedDay?: IMetrics }) {
  return (
    <div className="border border-slate-500 p-4 mt-4 rounded-lg min-w-fit max-w-96 w-96">
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
          Date:
        </span>
        <span className="w-2/3 text-slate-950 dark:text-slate-200">
          {selectedDay?.date && new Date(selectedDay.date).toDateString()}
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
  const [year, setYear] = useState<number | undefined>(currentYear);
  const [month, setMonth] = useState<number | undefined>(currentMonth);
  const [day, setDay] = useState<number | undefined>(currentDay);
  const [category, setCategory] = useState(0);

  const {
    data: metrics,
    error: metricsError,
    isLoading: metricsIsLoading,
  } = useSWR(
    year && month ? `/api/metrics?year=${year}&month=${month + 1}` : null,
    fetchDays
  );

  // TODO: Improve error component
  if (metricsError) return <div>failed to load</div>;
  if (metricsIsLoading)
    return (
      <div className="flex w-full min-h-full items-center justify-center">
        <AiOutlineLoading3Quarters size={100} className="animate-spin" />
      </div>
    );

  const days =
    metrics?.map((metric) =>
      metric?.date ? new Date(metric.date).getDate() : 0
    ) || [];

  // From metrics get the item that matches 'day'
  const selectedDay = metrics?.find(
    (metric) => metric?.date && new Date(metric.date).getDate() === day
  );

  function handleChangeYear(e: React.ChangeEvent<HTMLSelectElement>) {
    setYear(parseInt(e.target.value));
  }

  function handleChangeMonth(e: React.ChangeEvent<HTMLSelectElement>) {
    setMonth(parseInt(e.target.value));
  }

  function handleChangeDay(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = parseInt(e.target.value);
    setDay(isNaN(value) ? undefined : value);
  }

  return (
    <section className="flex flex-col items-center justify-start min-w-full">
      {/* Year, Month, and Day */}
      <div className="flex gap-4 mt-4 max-w-[90%]">
        <Select
          title="Year"
          defaultValue={year}
          options={years}
          onChange={handleChangeYear}
        />
        <Select
          title="Month"
          defaultValue={month}
          options={months}
          optionsTitles={monthsString}
          onChange={handleChangeMonth}
        />
        <Select
          title="Day"
          defaultValue={day}
          options={days}
          onChange={handleChangeDay}
        />
      </div>

      {/* Categories */}
      <div className="max-w-[90%] mt-3">
        <Tabs
          containerClassName="rounded-lg border-2 border-slate-500"
          scrollClassName="py-1.5 px-2 gap-3"
          tabClassName="py-1.5 px-2 rounded"
          tabs={categoryNumbers}
          tabTitles={["none"].concat(categories)}
          selectedKey={category}
          onChange={setCategory}
        />
      </div>

      {/* Metrics */}
      <div
        id="metrics-container"
        className="flex w-full h-full items-start justify-center p-4 xs:p-10"
      >
        {category === 0 ? (
          <NoneMetric selectedDay={selectedDay} />
        ) : categories[category - 1] === "general" ? (
          <Category<IGeneral, IGeneralClient>
            key={"general"}
            id={selectedDay?._id?.toString()}
            category={categories[category - 1]}
            fields={GENERAL_FIELDS}
            arrayFields={GENERAL_ARRAY_FIELDS}
            reducer={generalReducer}
            initialState={GENERAL_CLIENT}
          />
        ) : categories[category - 1] === "chores" ? (
          <Category<IChores, IChores>
            key={"chores"}
            id={selectedDay?._id?.toString()}
            category={categories[category - 1]}
            fields={CHORES_FIELDS}
            reducer={choresReducer}
            initialState={CHORES}
          />
        ) : categories[category - 1] === "hygiene" ? (
          <Category<IHygiene, IHygiene>
            key={"hygiene"}
            id={selectedDay?._id?.toString()}
            category={categories[category - 1]}
            fields={HYGIENE_FIELDS}
            reducer={hygieneReducer}
            initialState={HYGIENE}
          />
        ) : categories[category - 1] === "exercise" ? (
          <Category<IExercise, IExercise>
            key={"exercise"}
            id={selectedDay?._id?.toString()}
            category={categories[category - 1]}
            fields={EXERCISE_FIELDS}
            reducer={exerciseReducer}
            initialState={EXERCISE}
          />
        ) : categories[category - 1] === "nutrition" ? (
          <Category<INutrition, INutrition>
            key={"nutrition"}
            id={selectedDay?._id?.toString()}
            category={categories[category - 1]}
            fields={NUTRITION_FIELDS}
            reducer={nutritionReducer}
            initialState={NUTRITION}
          />
        ) : categories[category - 1] === "reading" ? (
          <Category<IReading, IReading>
            key={"reading"}
            id={selectedDay?._id?.toString()}
            category={categories[category - 1]}
            fields={READING_FIELDS}
            reducer={readingReducer}
            initialState={READING}
          />
        ) : categories[category - 1] === "sleep" ? (
          <Category<ISleep, ISleepClient>
            key={"sleep"}
            id={selectedDay?._id?.toString()}
            category={categories[category - 1]}
            fields={SLEEP_FIELDS}
            reducer={sleepReducer}
            initialState={SLEEP_CLIENT}
          />
        ) : (
          <div className="mt-4">Not implemented yet</div>
        )}
      </div>
    </section>
  );
}
