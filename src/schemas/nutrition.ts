import { Schema } from "mongoose";
import { INutrition } from "@/types/nutrition";

export const nutritionSchemaObject: Record<keyof INutrition, any> = {
  waterDrank: Number,
  calories: Number,
  protein: {
    animal: Number,
    plant: Number,
    unknown: Number,
  },
  fat: {
    saturated: Number,
    monounsaturated: Number,
    polyunsaturated: Number,
    trans: Number,
    unknown: Number,
  },
  carbs: {
    starch: Number,
    fiber: {
      soluble: Number,
      insoluble: Number,
      unknown: Number,
    },
    sugar: {
      natural: Number,
      added: Number,
      unknown: Number,
    },
    unknown: Number,
  },
};

export const nutritionSchema = new Schema<INutrition>(nutritionSchemaObject, {
  _id: false,
});
