import { Schema, model, models } from "mongoose";
import { IMetrics } from "@/types/metrics";
import { choresSchema, CHORES } from "./chores";
import { exerciseSchema, EXERCISE } from "./exercise";
import { generalSchema, GENERAL } from "./general";
import { hygieneSchema, HYGIENE } from "./hygiene";
import { nutritionSchema, NUTRITION } from "./nutrition";
import { readingSchema, READING } from "./reading";
import { sleepSchema, SLEEP } from "./sleep";

mongoose.Promise = global.Promise;

export const METRICS: IMetrics = {
  chores: CHORES,
  exercise: EXERCISE,
  general: GENERAL,
  hygiene: HYGIENE,
  nutrition: NUTRITION,
  reading: READING,
  sleep: SLEEP,
};

const metricsSchema = new Schema<IMetrics>(
  {
    chores: choresSchema,
    exercise: exerciseSchema,
    general: generalSchema,
    hygiene: hygieneSchema,
    nutrition: nutritionSchema,
    reading: readingSchema,
    sleep: sleepSchema,
  },
  {
    timestamps: true,
  }
);

const Metrics = models.Metrics || model<IMetrics>("Metrics", metricsSchema);

export default Metrics;
