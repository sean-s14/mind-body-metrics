import { Schema } from "mongoose";
import { ISleep } from "@/types/sleep";

export const SLEEP: ISleep = {
  sleepStart: undefined,
  sleepEnd: undefined,
  sleepQuality: undefined,
  napStart: undefined,
  napEnd: undefined,
};

export const sleepSchemaObject: Record<keyof ISleep, any> = {
  sleepStart: Date,
  sleepEnd: Date,
  sleepQuality: {
    type: String,
    enum: ["poor", "fair", "good", "excellent"],
    default: undefined,
  },
  napStart: Date,
  napEnd: Date,
};

export const sleepSchema = new Schema<ISleep>(sleepSchemaObject, {
  _id: false,
});
