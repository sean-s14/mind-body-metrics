import { Schema, model, models } from "mongoose";
import { INutrition } from "@/types/nutrition";

mongoose.Promise = global.Promise;

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

const nutritionSchema = new Schema<INutrition>({
  waterDrank: {
    type: Number,
    default: 0,
  },
  calories: {
    type: Number,
    default: 0,
  },
  protein: {
    animal: {
      type: Number,
      default: 0,
    },
    plant: {
      type: Number,
      default: 0,
    },
    unknown: {
      type: Number,
      default: 0,
    },
  },
  fat: {
    saturated: {
      type: Number,
      default: 0,
    },
    monounsaturated: {
      type: Number,
      default: 0,
    },
    polyunsaturated: {
      type: Number,
      default: 0,
    },
    trans: {
      type: Number,
      default: 0,
    },
    unknown: {
      type: Number,
      default: 0,
    },
  },
  carbs: {
    starch: {
      type: Number,
      default: 0,
    },
    fiber: {
      soluble: {
        type: Number,
        default: 0,
      },
      insoluble: {
        type: Number,
        default: 0,
      },
      unknown: {
        type: Number,
        default: 0,
      },
    },
    sugar: {
      natural: {
        type: Number,
        default: 0,
      },
      added: {
        type: Number,
        default: 0,
      },
      unknown: {
        type: Number,
        default: 0,
      },
    },
    unknown: {
      type: Number,
      default: 0,
    },
  },
});

const Nutrition =
  models.Nutrition || model<INutrition>("Nutrition", nutritionSchema);

export default Nutrition;
