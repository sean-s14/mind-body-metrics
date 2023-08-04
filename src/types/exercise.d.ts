export interface IExercise {
  cardio: ICardio;
  weightLifting: IMuscleGroups;
  calisthenics: IMuscleGroups;
  yoga: IMuscleGroups;
}

export interface ICardio {
  walk: number;
  jog: number;
  run: number;
  bike: number;
}

export interface IMuscleGroups {
  arms: number;
  legs: number;
  back: number;
  chest: number;
  shoulders: number;
  abs: number;
}
