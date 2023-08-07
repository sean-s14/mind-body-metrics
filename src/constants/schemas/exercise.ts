import { IExercise, IMuscleGroups } from "@/types/exercise";

const MUSCLE_GROUPS: IMuscleGroups = {
  arms: 0,
  legs: 0,
  back: 0,
  chest: 0,
  shoulders: 0,
  abs: 0,
};

export const EXERCISE: IExercise = {
  cardio: {
    walk: 0,
    jog: 0,
    run: 0,
    bike: 0,
  },
  weightLifting: MUSCLE_GROUPS,
  calisthenics: MUSCLE_GROUPS,
  yoga: MUSCLE_GROUPS,
};
