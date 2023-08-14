import { INutrition, IProtein, IFat, ICarbs } from "@/types/nutrition";
import { newReducerState, newNestedReducerState } from "@/utils/helpers";

export const NUTRITION: INutrition = {
  water: 0,
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

export interface INutritionFlattened extends INutrition {
  fiber: number;
  sugar: number;
  "protein.animal": number;
  "protein.plant": number;
  "protein.unknown": number;
  "fat.saturated": number;
  "fat.monounsaturated": number;
  "fat.polyunsaturated": number;
  "fat.trans": number;
  "fat.unknown": number;
  "carbs.starch": number;
  "carbs.fiber.soluble": number;
  "carbs.fiber.insoluble": number;
  "carbs.fiber.unknown": number;
  "carbs.sugar.natural": number;
  "carbs.sugar.added": number;
  "carbs.sugar.unknown": number;
  "carbs.unknown": number;
}

export const NUTRITION_FIELDS: {
  name: keyof INutritionFlattened;
  type: string;
}[] = [
  {
    name: "water",
    type: "number",
  },
  {
    name: "calories",
    type: "number",
  },
  {
    name: "protein",
    type: "h1",
  },
  {
    name: "protein.animal",
    type: "number",
  },
  {
    name: "protein.plant",
    type: "number",
  },
  {
    name: "protein.unknown",
    type: "number",
  },
  {
    name: "fat",
    type: "h1",
  },
  {
    name: "fat.unknown",
    type: "number",
  },
  {
    name: "fat.saturated",
    type: "number",
  },
  {
    name: "fat.monounsaturated",
    type: "number",
  },
  {
    name: "fat.polyunsaturated",
    type: "number",
  },
  {
    name: "fat.trans",
    type: "number",
  },
  {
    name: "carbs",
    type: "h1",
  },
  {
    name: "carbs.unknown",
    type: "number",
  },
  {
    name: "carbs.starch",
    type: "number",
  },
  {
    name: "fiber",
    type: "h2",
  },
  {
    name: "carbs.fiber.unknown",
    type: "number",
  },
  {
    name: "carbs.fiber.soluble",
    type: "number",
  },
  {
    name: "carbs.fiber.insoluble",
    type: "number",
  },
  {
    name: "sugar",
    type: "h2",
  },
  {
    name: "carbs.sugar.unknown",
    type: "number",
  },
  {
    name: "carbs.sugar.natural",
    type: "number",
  },
  {
    name: "carbs.sugar.added",
    type: "number",
  },
];

export function nutritionReducer(state: INutrition, action: any) {
  switch (action.type) {
    case "replaceAllData":
      return action.payload;
    case "water":
      return newReducerState<INutrition>(state, "water", action.payload);
    case "calories":
      return newReducerState<INutrition>(state, "calories", action.payload);
    case "protein.animal":
      return newNestedReducerState<INutrition, IProtein>(
        state,
        action,
        "protein",
        "animal"
      );
    case "protein.plant":
      return newNestedReducerState<INutrition, IProtein>(
        state,
        action,
        "protein",
        "plant"
      );
    case "protein.unknown":
      return newNestedReducerState<INutrition, IProtein>(
        state,
        action,
        "protein",
        "unknown"
      );
    case "fat.saturated":
      return newNestedReducerState<INutrition, IFat>(
        state,
        action,
        "fat",
        "saturated"
      );
    case "fat.monounsaturated":
      return newNestedReducerState<INutrition, IFat>(
        state,
        action,
        "fat",
        "monounsaturated"
      );
    case "fat.polyunsaturated":
      return newNestedReducerState<INutrition, IFat>(
        state,
        action,
        "fat",
        "polyunsaturated"
      );
    case "fat.trans":
      return newNestedReducerState<INutrition, IFat>(
        state,
        action,
        "fat",
        "trans"
      );
    case "fat.unknown":
      return newNestedReducerState<INutrition, IFat>(
        state,
        action,
        "fat",
        "unknown"
      );
    case "carbs.starch":
      return newNestedReducerState<INutrition, ICarbs>(
        state,
        action,
        "carbs",
        "starch"
      );
    case "carbs.fiber.soluble":
      return {
        ...state,
        carbs: {
          ...state.carbs,
          fiber: {
            ...state.carbs?.fiber,
            soluble: action.payload,
          },
        },
      };
    case "carbs.fiber.insoluble":
      return {
        ...state,
        carbs: {
          ...state.carbs,
          fiber: {
            ...state.carbs?.fiber,
            insoluble: action.payload,
          },
        },
      };
    case "carbs.fiber.unknown":
      return {
        ...state,
        carbs: {
          ...state.carbs,
          fiber: {
            ...state.carbs?.fiber,
            unknown: action.payload,
          },
        },
      };
    case "carbs.sugar.natural":
      return {
        ...state,
        carbs: {
          ...state.carbs,
          sugar: {
            ...state.carbs?.sugar,
            natural: action.payload,
          },
        },
      };
    case "carbs.sugar.added":
      return {
        ...state,
        carbs: {
          ...state.carbs,
          sugar: {
            ...state.carbs?.sugar,
            added: action.payload,
          },
        },
      };
    case "carbs.sugar.unknown":
      return {
        ...state,
        carbs: {
          ...state.carbs,
          sugar: {
            ...state.carbs?.sugar,
            unknown: action.payload,
          },
        },
      };
    case "carbs.unknown":
      return newNestedReducerState<INutrition, ICarbs>(
        state,
        action,
        "carbs",
        "unknown"
      );
    default:
      throw new Error();
  }
}

export const NUTRITION_AGGREGATION_STAGES = [
  {
    $addFields: {
      nutrition: { $ifNull: ["$nutrition", {}] },
    },
  },
  {
    $replaceRoot: { newRoot: "$nutrition" },
  },
  {
    $match: {
      $or: [
        { water: { $exists: true, $ne: 0 } },
        { calories: { $exists: true, $ne: 0 } },
      ],
    },
  },
  {
    $group: {
      _id: null,
      water: { $avg: { $sum: "$water" } },
      calories: { $avg: { $sum: "$calories" } },
    },
  },
  {
    $project: {
      _id: 0,
      water: { $round: ["$water", 2] },
      calories: { $round: ["$calories", 2] },
    },
  },
];
