import { Schema } from "mongoose";
import { IChores } from "@/types/chores";

export const CHORES: IChores = {
  dishWashing: 0,
};

export const choresSchemaObject: Record<keyof IChores, any> = {
  dishWashing: Number,
};

export const choresSchema = new Schema<IChores>(choresSchemaObject, {
  _id: false,
});
