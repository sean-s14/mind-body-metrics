import { Schema, model, models } from "mongoose";
import { IMetrics } from "@/types/metrics";
import { choresSchema } from "./chores";
import { exerciseSchema } from "./exercise";
import { generalSchema } from "./general";
import { hygieneSchema } from "./hygiene";
import { nutritionSchema } from "./nutrition";
import { readingSchema } from "./reading";
import { sleepSchema } from "./sleep";

mongoose.Promise = global.Promise;

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
