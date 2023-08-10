import { ISleep, ISleepClient } from "@/types/sleep";

export const SLEEP: ISleep = {
  wake: undefined,
  sleep: undefined,
  sleepQuality: undefined,
  napStart: undefined,
  napEnd: undefined,
};

export const SLEEP_CLIENT: ISleepClient = {
  wake: "",
  sleep: "",
  sleepQuality: "",
  napStart: "",
  napEnd: "",
};

export const SLEEP_FIELDS: { name: keyof ISleepClient; type: string }[] = [
  {
    name: "wake",
    type: "time",
  },
  {
    name: "sleep",
    type: "time",
  },
  {
    name: "sleepQuality",
    type: "number",
  },
  {
    name: "napStart",
    type: "time",
  },
  {
    name: "napEnd",
    type: "time",
  },
];

export function sleepReducer(state: ISleepClient, action: any) {
  switch (action.type) {
    case "replaceAllData":
      return action.payload;
    case "wake":
      return {
        ...state,
        wake: action.payload,
      };
    case "sleep":
      return {
        ...state,
        sleep: action.payload,
      };
    case "sleepQuality":
      return {
        ...state,
        sleepQuality: action.payload,
      };
    case "napStart":
      return {
        ...state,
        napStart: action.payload,
      };
    case "napEnd":
      return {
        ...state,
        napEnd: action.payload,
      };
    default:
      throw new Error();
  }
}
