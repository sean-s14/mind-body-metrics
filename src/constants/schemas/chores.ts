import { IChores } from "@/types/chores";
import { newReducerState } from "@/utils/helpers";

export const CHORES: IChores = {
  dishWashing: 0,
  groceryShopping: 0,
  cooking: 0,
  rubbishDisposal: false,
  laundry: false,
  vacuuming: false,
  windowCleaning: false,
  replacedBedding: false,
};

export const CHORES_FIELDS: { name: keyof IChores; type: string }[] = [
  {
    name: "dishWashing",
    type: "number",
  },
  {
    name: "groceryShopping",
    type: "number",
  },
  {
    name: "cooking",
    type: "number",
  },
  {
    name: "rubbishDisposal",
    type: "boolean",
  },
  {
    name: "laundry",
    type: "boolean",
  },
  {
    name: "vacuuming",
    type: "boolean",
  },
  {
    name: "windowCleaning",
    type: "boolean",
  },
  {
    name: "replacedBedding",
    type: "boolean",
  },
];

export function choresReducer(state: IChores, action: any) {
  switch (action.type) {
    case "replaceAllData":
      return action.payload;
    case "dishWashing":
      return newReducerState<IChores>(state, "dishWashing", action.payload);
    case "groceryShopping":
      return newReducerState<IChores>(state, "groceryShopping", action.payload);
    case "cooking":
      return newReducerState<IChores>(state, "cooking", action.payload);
    case "rubbishDisposal":
      return newReducerState<IChores>(state, "rubbishDisposal", action.payload);
    case "laundry":
      return newReducerState<IChores>(state, "laundry", action.payload);
    case "vacuuming":
      return newReducerState<IChores>(state, "vacuuming", action.payload);
    case "windowCleaning":
      return newReducerState<IChores>(state, "windowCleaning", action.payload);
    case "replacedBedding":
      return newReducerState<IChores>(state, "replacedBedding", action.payload);
    default:
      throw new Error();
  }
}

export const CHORES_AGGREGATION_STAGES = [
  {
    $addFields: {
      chores: { $ifNull: ["$chores", {}] },
    },
  },
  {
    $replaceRoot: { newRoot: "$chores" },
  },
  {
    $group: {
      _id: null,
      dishWashing: { $avg: { $sum: "$dishWashing" } },
      groceryShopping: { $avg: { $sum: "$groceryShopping" } },
      cooking: { $avg: { $sum: "$cooking" } },
      rubbishDisposal: {
        $avg: { $sum: { $cond: ["$rubbishDisposal", 1, 0] } },
      },
      laundry: { $avg: { $sum: { $cond: ["$laundry", 1, 0] } } },
      vacuuming: { $avg: { $sum: { $cond: ["$vacuuming", 1, 0] } } },
      windowCleaning: { $avg: { $sum: { $cond: ["$windowCleaning", 1, 0] } } },
      replacedBedding: {
        $avg: { $sum: { $cond: ["$replacedBedding", 1, 0] } },
      },
    },
  },
  {
    $project: {
      _id: 0,
      dishWashing: { $round: ["$dishWashing", 2] },
      groceryShopping: { $round: ["$groceryShopping", 2] },
      cooking: { $round: ["$cooking", 2] },
      rubbishDisposal: { $round: ["$rubbishDisposal", 2] },
      laundry: { $round: ["$laundry", 2] },
      vacuuming: { $round: ["$vacuuming", 2] },
      windowCleaning: { $round: ["$windowCleaning", 2] },
      replacedBedding: { $round: ["$replacedBedding", 2] },
    },
  },
];
