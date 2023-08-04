import { Schema, model, models } from "mongoose";
import { IExercise } from "@/types/exercise";

mongoose.Promise = global.Promise;

export const PHYSICAL_HEALTH: IExercise = {
  cardio: {
    walk: 0,
    jog: 0,
    run: 0,
    bike: 0,
  },
  weightLifting: {
    arms: 0,
    legs: 0,
    back: 0,
    chest: 0,
    shoulders: 0,
    abs: 0,
  },
  calisthenics: {
    arms: 0,
    legs: 0,
    back: 0,
    chest: 0,
    shoulders: 0,
    abs: 0,
  },
  yoga: {
    arms: 0,
    legs: 0,
    back: 0,
    chest: 0,
    shoulders: 0,
    abs: 0,
  },
};

const exerciseSchema = new Schema<IExercise>({
  cardio: {
    walk: {
      type: Number,
      default: 0,
    },
    jog: {
      type: Number,
      default: 0,
    },
    run: {
      type: Number,
      default: 0,
    },
    bike: {
      type: Number,
      default: 0,
    },
  },
  weightLifting: {
    arms: {
      type: Number,
      default: 0,
    },
    legs: {
      type: Number,
      default: 0,
    },
    back: {
      type: Number,
      default: 0,
    },
    chest: {
      type: Number,
      default: 0,
    },
    shoulders: {
      type: Number,
      default: 0,
    },
    abs: {
      type: Number,
      default: 0,
    },
  },
  calisthenics: {
    arms: {
      type: Number,
      default: 0,
    },
    legs: {
      type: Number,
      default: 0,
    },
    back: {
      type: Number,
      default: 0,
    },
    chest: {
      type: Number,
      default: 0,
    },
    shoulders: {
      type: Number,
      default: 0,
    },
    abs: {
      type: Number,
      default: 0,
    },
  },
  yoga: {
    arms: {
      type: Number,
      default: 0,
    },
    legs: {
      type: Number,
      default: 0,
    },
    back: {
      type: Number,
      default: 0,
    },
    chest: {
      type: Number,
      default: 0,
    },
    shoulders: {
      type: Number,
      default: 0,
    },
    abs: {
      type: Number,
      default: 0,
    },
  },
});

const Exercise =
  models.Exercise || model<IExercise>("Exercise", exerciseSchema);

export default Exercise;
