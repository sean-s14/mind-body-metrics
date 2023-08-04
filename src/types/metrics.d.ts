import { Types } from "mongoose";
import { IChores } from "./chores";
import { IExercise } from "./exercise";
import { IGeneral } from "./general";
import { IHygiene } from "./hygiene";
import { INutrition } from "./nutrition";
import { IReading } from "./reading";
import { ISleep } from "./sleep";

interface IMetrics {
  _id?: Types.ObjectId;
  chores?: IChores;
  exercise?: IExercise;
  general?: IGeneral;
  hygiene?: IHygiene;
  nutrition?: INutrition;
  reading?: IReading;
  sleep?: ISleep;
  createdAt?: Date;
  updatedAt?: Date;
}
