import { Schema } from "mongoose";
import { IReading } from "@/types/reading";

export const readingSchemaObject: Record<keyof IReading, any> = {
  educational: {
    words: Number,
    pages: Number,
  },
  recreational: {
    words: Number,
    pages: Number,
  },
  articles: Number,
};

export const readingSchema = new Schema<IReading>(readingSchemaObject, {
  _id: false,
});
