import { Schema } from "mongoose";
import { IExercise, IMuscleGroups } from "@/types/exercise";

const muscleGroupsSchemaObject: Record<keyof IMuscleGroups, any> = {
  arms: Number,
  legs: Number,
  back: Number,
  chest: Number,
  shoulders: Number,
  abs: Number,
};

export const exerciseSchemaObject: Record<keyof IExercise, any> = {
  cardio: {
    walk: Number,
    jog: Number,
    run: Number,
    bike: Number,
  },
  weightLifting: muscleGroupsSchemaObject,
  calisthenics: muscleGroupsSchemaObject,
  yoga: muscleGroupsSchemaObject,
};

export const exerciseSchema = new Schema<IExercise>(exerciseSchemaObject, {
  _id: false,
});
