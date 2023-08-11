import { IGeneral, IGeneralClient } from "@/types/general";
import { newReducerState } from "@/utils/helpers";

export const GENERAL: IGeneral = {
  selfStimTime: 0,
  selfStimCount: 0,
  timeOfDefecation: [],
  timeOfUrination: [],
  timeOfBreakfast: undefined,
  timeOfLunch: undefined,
  timeOfDinner: undefined,
};

export const GENERAL_CLIENT: IGeneralClient = {
  selfStimTime: 0,
  selfStimCount: 0,
  timeOfDefecation: [],
  timeOfUrination: [],
  timeOfBreakfast: "",
  timeOfLunch: "",
  timeOfDinner: "",
};

export const GENERAL_FIELDS: { name: keyof IGeneralClient; type: string }[] = [
  {
    name: "selfStimTime",
    type: "number",
  },
  {
    name: "selfStimCount",
    type: "number",
  },
  {
    name: "timeOfBreakfast",
    type: "time",
  },
  {
    name: "timeOfLunch",
    type: "time",
  },
  {
    name: "timeOfDinner",
    type: "time",
  },
];

export const GENERAL_ARRAY_FIELDS: {
  name: keyof IGeneralClient;
  type: string;
}[] = [
  {
    name: "timeOfUrination",
    type: "time",
  },
  {
    name: "timeOfDefecation",
    type: "time",
  },
];

export function generalReducer(state: IGeneralClient, action: any) {
  switch (action.type) {
    case "replaceAllData":
      return action.payload;
    case "selfStimTime":
      return {
        ...state,
        selfStimTime: action.payload,
      };
    case "selfStimCount":
      return {
        ...state,
        selfStimCount: action.payload,
      };
    case "timeOfUrination":
      if (action.payload?.mutator === "push") {
        return {
          ...state,
          timeOfUrination: state?.timeOfUrination
            ? [...state.timeOfUrination, action.payload.value]
            : [action.payload.value],
        };
      } else if (action.payload?.mutator === "slice") {
        return {
          ...state,
          timeOfUrination: state?.timeOfUrination?.map((time, index) =>
            index === action.payload.index ? action.payload.value : time
          ),
        };
      } else if (action.payload?.mutator === "pop") {
        return {
          ...state,
          timeOfUrination: state?.timeOfUrination?.filter(
            (_, index) => index !== action.payload.index
          ),
        };
      }
    case "timeOfDefecation":
      if (action.payload?.mutator === "push") {
        return {
          ...state,
          timeOfDefecation: state?.timeOfDefecation
            ? [...state.timeOfDefecation, action.payload.value]
            : [action.payload.value],
        };
      } else if (action.payload?.mutator === "slice") {
        return {
          ...state,
          timeOfDefecation: state?.timeOfDefecation?.map((time, index) =>
            index === action.payload.index ? action.payload.value : time
          ),
        };
      } else if (action.payload?.mutator === "pop") {
        return {
          ...state,
          timeOfDefecation: state?.timeOfDefecation?.filter(
            (_, index) => index !== action.payload.index
          ),
        };
      }
    case "timeOfBreakfast":
      return {
        ...state,
        timeOfBreakfast: action.payload,
      };
    case "timeOfLunch":
      return {
        ...state,
        timeOfLunch: action.payload,
      };
    case "timeOfDinner":
      return {
        ...state,
        timeOfDinner: action.payload,
      };
    default:
      throw new Error();
  }
}
