import { IHygiene } from "@/types/hygiene";
import { newReducerState } from "@/utils/helpers";

export const HYGIENE: IHygiene = {
  brushedTeeth: 0,
  shaved: false,
  showered: false,
  cutNails: false,
  cutToeNails: false,
  washedHair: false,
};

export const HYGIENE_FIELDS: { name: keyof IHygiene; type: string }[] = [
  {
    name: "brushedTeeth",
    type: "number",
  },
  {
    name: "shaved",
    type: "boolean",
  },
  {
    name: "showered",
    type: "boolean",
  },
  {
    name: "cutNails",
    type: "boolean",
  },
  {
    name: "cutToeNails",
    type: "boolean",
  },
  {
    name: "washedHair",
    type: "boolean",
  },
];

export function hygieneReducer(state: IHygiene, action: any) {
  switch (action.type) {
    case "replaceAllData":
      return action.payload;
    case "shaved":
      return newReducerState<IHygiene>(state, "shaved", action.payload);
    case "showered":
      return newReducerState<IHygiene>(state, "showered", action.payload);
    case "brushedTeeth":
      return newReducerState<IHygiene>(state, "brushedTeeth", action.payload);
    case "cutNails":
      return newReducerState<IHygiene>(state, "cutNails", action.payload);
    case "cutToeNails":
      return newReducerState<IHygiene>(state, "cutToeNails", action.payload);
    case "washedHair":
      return newReducerState<IHygiene>(state, "washedHair", action.payload);
    default:
      throw new Error();
  }
}

export const HYGIENE_AGGREGATION_STAGES = [
  {
    $addFields: {
      hygiene: { $ifNull: ["$hygiene", {}] },
    },
  },
  {
    $replaceRoot: { newRoot: "$hygiene" },
  },
  {
    $group: {
      _id: null,
      brushedTeeth: { $avg: { $sum: "$brushedTeeth" } },
      shaved: { $avg: { $sum: { $cond: ["$shaved", 1, 0] } } },
      showered: { $avg: { $sum: { $cond: ["$showered", 1, 0] } } },
      cutNails: { $avg: { $sum: { $cond: ["$cutNails", 1, 0] } } },
      cutToeNails: { $avg: { $sum: { $cond: ["$cutToeNails", 1, 0] } } },
      washedHair: { $avg: { $sum: { $cond: ["$washedHair", 1, 0] } } },
    },
  },
  {
    $project: {
      _id: 0,
      brushedTeeth: { $round: ["$brushedTeeth", 2] },
      shaved: { $round: ["$shaved", 2] },
      showered: { $round: ["$showered", 2] },
      cutNails: { $round: ["$cutNails", 2] },
      cutToeNails: { $round: ["$cutToeNails", 2] },
      washedHair: { $round: ["$washedHair", 2] },
    },
  },
];
