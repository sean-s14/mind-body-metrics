import { Schema } from "mongoose";
import { IHygiene } from "@/types/hygiene";

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
