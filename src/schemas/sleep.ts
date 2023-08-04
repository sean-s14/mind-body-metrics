import { Schema, model, models } from "mongoose";
import { ISleep } from "@/types/sleep";

mongoose.Promise = global.Promise;

export const SLEEP: ISleep = {
  sleepStart: null,
  sleepEnd: null,
  sleepQuality: null,
  napStart: null,
  napEnd: null,
};

const sleepSchema = new Schema<ISleep>({
  sleepStart: {
    type: Date,
    default: null,
  },
  sleepEnd: {
    type: Date,
    default: null,
  },
  sleepQuality: {
    type: String,
    enum: ["poor", "fair", "good", "excellent"],
    default: null,
  },
  napStart: {
    type: Date,
    default: null,
  },
  napEnd: {
    type: Date,
    default: null,
  },
});

const Sleep = models.Sleep || model<ISleep>("Sleep", sleepSchema);

export default Sleep;
