export interface IGeneral {
  selfStimTime?: number;
  selfStimCount?: number;
  timeOfUrination?: Date[];
  timeOfDefecation?: Date[];
  timeOfBreakfast?: Date;
  timeOfLunch?: Date;
  timeOfDinner?: Date;
}

export interface IGeneralClient
  extends Omit<
    IGeneral,
    | "timeOfUrination"
    | "timeOfDefecation"
    | "timeOfBreakfast"
    | "timeOfLunch"
    | "timeOfDinner"
  > {
  selfStimTime?: number;
  selfStimCount?: number;
  timeOfUrination?: string[];
  timeOfDefecation?: string[];
  timeOfBreakfast?: Date | string;
  timeOfLunch?: Date | string;
  timeOfDinner?: Date | string;
}
