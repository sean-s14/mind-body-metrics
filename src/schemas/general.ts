import { Schema } from "mongoose";
import { IGeneral } from "@/types/general";

export const GENERAL: IGeneral = {
  selfStimTime: 0,
  selfStimCount: 0,
  timeOfDefecation: [],
  timeOfUrination: [],
  timeOfBreakfast: undefined,
  timeOfLunch: undefined,
  timeOfDinner: undefined,
};

export const generalSchemaObject: Record<keyof IGeneral, any> = {
  selfStimTime: Number,
  selfStimCount: Number,
  timeOfDefecation: { type: [Date], default: undefined },
  timeOfUrination: { type: [Date], default: undefined },
  timeOfBreakfast: Date,
  timeOfLunch: Date,
  timeOfDinner: Date,
};

export const generalSchema = new Schema<IGeneral>(generalSchemaObject, {
  _id: false,
});
