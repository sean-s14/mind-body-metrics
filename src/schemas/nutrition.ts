import { Schema } from "mongoose";
import { INutrition } from "@/types/nutrition";

export const NUTRITION: INutrition = {
  waterDrank: 0,
  calories: 0,
  protein: {
    animal: 0,
    plant: 0,
    unknown: 0,
  },
  fat: {
    saturated: 0,
    monounsaturated: 0,
    polyunsaturated: 0,
    trans: 0,
    unknown: 0,
  },
  carbs: {
    starch: 0,
    fiber: {
      soluble: 0,
      insoluble: 0,
      unknown: 0,
    },
    sugar: {
      natural: 0,
      added: 0,
      unknown: 0,
    },
    unknown: 0,
  },
};

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
