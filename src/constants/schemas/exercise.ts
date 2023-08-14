import { IExercise, IMuscleGroups, ICardio } from "@/types/exercise";
import { newNestedReducerState } from "@/utils/helpers";

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

export interface IExerciseFlattened extends IExercise {
  "cardio.walk": number;
  "cardio.jog": number;
  "cardio.run": number;
  "cardio.bike": number;
  "weightLifting.arms": number;
  "weightLifting.legs": number;
  "weightLifting.back": number;
  "weightLifting.chest": number;
  "weightLifting.shoulders": number;
  "weightLifting.abs": number;
  "calisthenics.arms": number;
  "calisthenics.legs": number;
  "calisthenics.back": number;
  "calisthenics.chest": number;
  "calisthenics.shoulders": number;
  "calisthenics.abs": number;
  "yoga.arms": number;
  "yoga.legs": number;
  "yoga.back": number;
  "yoga.chest": number;
  "yoga.shoulders": number;
  "yoga.abs": number;
}

function generateFields(
  type: string,
  muscleGroups: string[],
  exercise: string
): any[] {
  return muscleGroups.map((muscleGroup) => ({
    name: `${exercise}.${muscleGroup}`,
    type,
  }));
}

export const EXERCISE_FIELDS: {
  name: keyof IExerciseFlattened;
  type: string;
}[] = [
  {
    name: "cardio",
    type: "h1",
  },
  {
    name: "cardio.walk",
    type: "number",
  },
  {
    name: "cardio.jog",
    type: "number",
  },
  {
    name: "cardio.run",
    type: "number",
  },
  {
    name: "cardio.bike",
    type: "number",
  },
  {
    name: "weightLifting",
    type: "h1",
  },
  ...generateFields("number", Object.keys(MUSCLE_GROUPS), "weightLifting"),
  {
    name: "calisthenics",
    type: "h1",
  },
  ...generateFields("number", Object.keys(MUSCLE_GROUPS), "calisthenics"),
  {
    name: "yoga",
    type: "h1",
  },
  ...generateFields("number", Object.keys(MUSCLE_GROUPS), "yoga"),
];

export function exerciseReducer(state: IExercise, action: any) {
  switch (action.type) {
    case "replaceAllData":
      return action.payload;
    case "cardio.walk":
      return newNestedReducerState<IExercise, ICardio>(
        state,
        action,
        "cardio",
        "walk"
      );
    case "cardio.jog":
      return newNestedReducerState<IExercise, ICardio>(
        state,
        action,
        "cardio",
        "jog"
      );
    case "cardio.run":
      return newNestedReducerState<IExercise, ICardio>(
        state,
        action,
        "cardio",
        "run"
      );
    case "cardio.bike":
      return newNestedReducerState<IExercise, ICardio>(
        state,
        action,
        "cardio",
        "bike"
      );
    case "weightLifting.arms":
      return newNestedReducerState<IExercise, IMuscleGroups>(
        state,
        action,
        "weightLifting",
        "arms"
      );
    case "weightLifting.legs":
      return newNestedReducerState<IExercise, IMuscleGroups>(
        state,
        action,
        "weightLifting",
        "legs"
      );
    case "weightLifting.back":
      return newNestedReducerState<IExercise, IMuscleGroups>(
        state,
        action,
        "weightLifting",
        "back"
      );
    case "weightLifting.chest":
      return newNestedReducerState<IExercise, IMuscleGroups>(
        state,
        action,
        "weightLifting",
        "chest"
      );
    case "weightLifting.shoulders":
      return newNestedReducerState<IExercise, IMuscleGroups>(
        state,
        action,
        "weightLifting",
        "shoulders"
      );
    case "weightLifting.abs":
      return newNestedReducerState<IExercise, IMuscleGroups>(
        state,
        action,
        "weightLifting",
        "abs"
      );
    case "calisthenics.arms":
      return newNestedReducerState<IExercise, IMuscleGroups>(
        state,
        action,
        "calisthenics",
        "arms"
      );
    case "calisthenics.legs":
      return newNestedReducerState<IExercise, IMuscleGroups>(
        state,
        action,
        "calisthenics",
        "legs"
      );
    case "calisthenics.back":
      return newNestedReducerState<IExercise, IMuscleGroups>(
        state,
        action,
        "calisthenics",
        "back"
      );
    case "calisthenics.chest":
      return newNestedReducerState<IExercise, IMuscleGroups>(
        state,
        action,
        "calisthenics",
        "chest"
      );
    case "calisthenics.shoulders":
      return newNestedReducerState<IExercise, IMuscleGroups>(
        state,
        action,
        "calisthenics",
        "shoulders"
      );
    case "calisthenics.abs":
      return newNestedReducerState<IExercise, IMuscleGroups>(
        state,
        action,
        "calisthenics",
        "abs"
      );
    case "yoga.arms":
      return newNestedReducerState<IExercise, IMuscleGroups>(
        state,
        action,
        "yoga",
        "arms"
      );
    case "yoga.legs":
      return newNestedReducerState<IExercise, IMuscleGroups>(
        state,
        action,
        "yoga",
        "legs"
      );
    case "yoga.back":
      return newNestedReducerState<IExercise, IMuscleGroups>(
        state,
        action,
        "yoga",
        "back"
      );
    case "yoga.chest":
      return newNestedReducerState<IExercise, IMuscleGroups>(
        state,
        action,
        "yoga",
        "chest"
      );
    case "yoga.shoulders":
      return newNestedReducerState<IExercise, IMuscleGroups>(
        state,
        action,
        "yoga",
        "shoulders"
      );
    case "yoga.abs":
      return newNestedReducerState<IExercise, IMuscleGroups>(
        state,
        action,
        "yoga",
        "abs"
      );
    default:
      throw new Error();
  }
}

// TODO: Build an aggregation pipeline for exercise
