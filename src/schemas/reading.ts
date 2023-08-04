import { Schema, model, models } from "mongoose";
import { IReading } from "@/types/reading";

mongoose.Promise = global.Promise;

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

const readingSchema = new Schema<IReading>({
  educational: {
    words: {
      type: Number,
      default: 0,
    },
    pages: {
      type: Number,
      default: 0,
    },
  },
  recreational: {
    words: {
      type: Number,
      default: 0,
    },
    pages: {
      type: Number,
      default: 0,
    },
  },
  articles: {
    type: Number,
    default: 0,
  },
});

const Reading = models.Reading || model<IReading>("Reading", readingSchema);

export default Reading;
