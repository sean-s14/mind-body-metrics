import { Schema } from "mongoose";
import { IHygiene } from "@/types/hygiene";

export const HYGIENE: IHygiene = {
  shaved: false,
  showered: false,
  brushedTeeth: 0,
  replacedBedding: false,
  washedClothes: false,
};

export const hygieneSchemaObject: Record<keyof IHygiene, any> = {
  shaved: Boolean,
  showered: Boolean,
  brushedTeeth: Number,
  replacedBedding: Boolean,
  washedClothes: Boolean,
};

export const hygieneSchema = new Schema<IHygiene>(hygieneSchemaObject, {
  _id: false,
});
