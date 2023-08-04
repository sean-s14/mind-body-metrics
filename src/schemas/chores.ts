import { Schema, model, models } from "mongoose";
import { IChores } from "@/types/chores";

mongoose.Promise = global.Promise;

export const CHORES: IChores = {
  dishWashing: 0,
};

const choresSchema = new Schema<IChores>({
  dishWashing: {
    type: Number,
    default: 0,
  },
});

const Chores = models.Chores || model<IChores>("Chores", choresSchema);

export default Chores;
