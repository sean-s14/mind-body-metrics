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
