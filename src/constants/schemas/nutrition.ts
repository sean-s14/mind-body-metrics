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
