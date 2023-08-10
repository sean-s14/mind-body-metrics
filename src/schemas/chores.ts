import { Schema } from "mongoose";
import { IChores } from "@/types/chores";

export const choresSchemaObject: Record<keyof IChores, any> = {
  dishWashing: Number,
  groceryShopping: Number,
  cooking: Number,
  rubbishDisposal: Boolean,
  laundry: Boolean,
  vacuuming: Boolean,
  windowCleaning: Boolean,
  replacedBedding: Boolean,
};

export const choresSchema = new Schema<IChores>(choresSchemaObject, {
  _id: false,
});
