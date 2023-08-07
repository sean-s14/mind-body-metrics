import { IGeneral, IGeneralClient } from "@/types/general";

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
