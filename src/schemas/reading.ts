import { Schema } from "mongoose";
import { IReading } from "@/types/reading";

export const READING: IReading = {
  educational: {
    words: 0,
    pages: 0,
  },
  recreational: {
    words: 0,
    pages: 0,
  },
  articles: 0,
};

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
