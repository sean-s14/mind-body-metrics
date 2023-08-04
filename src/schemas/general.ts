import { Schema, model, models } from "mongoose";
import { IGeneral } from "@/types/general";

mongoose.Promise = global.Promise;

export const GENERAL: IGeneral = {
  selfStimTime: 0,
  selfStimCount: 0,
  timeOfDefecation: [],
  timeOfUrination: [],
  timeOfBreakfast: null,
  timeOfLunch: null,
  timeOfDinner: null,
};

const generalSchema = new Schema<IGeneral>({
  selfStimTime: {
    type: Number,
    default: 0,
  },
  selfStimCount: {
    type: Number,
    default: 0,
  },
  timeOfDefecation: {
    type: [Date],
    default: [],
  },
  timeOfUrination: {
    type: [Date],
    default: [],
  },
  timeOfBreakfast: {
    type: Date,
    default: null,
  },
  timeOfLunch: {
    type: Date,
    default: null,
  },
  timeOfDinner: {
    type: Date,
    default: null,
  },
});

const General = models.General || model<IGeneral>("General", generalSchema);

export default General;
