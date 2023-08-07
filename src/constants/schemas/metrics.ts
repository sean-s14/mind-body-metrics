import { IMetrics, IMetricsClient } from "@/types/metrics";
import { CHORES } from "./chores";
import { EXERCISE } from "./exercise";
import { GENERAL, GENERAL_CLIENT } from "./general";
import { HYGIENE } from "./hygiene";
import { NUTRITION } from "./nutrition";
import { READING } from "./reading";
import { SLEEP, SLEEP_CLIENT } from "./sleep";

export const METRICS: IMetrics = {
  chores: CHORES,
  exercise: EXERCISE,
  general: GENERAL,
  hygiene: HYGIENE,
  nutrition: NUTRITION,
  reading: READING,
  sleep: SLEEP,
};

export const METRICS_CLIENT: IMetricsClient = {
  ...METRICS,
  general: GENERAL_CLIENT,
  sleep: SLEEP_CLIENT,
};
