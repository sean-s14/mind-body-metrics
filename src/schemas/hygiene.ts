import { Schema, model, models } from "mongoose";
import { IHygiene } from "@/types/hygiene";

mongoose.Promise = global.Promise;

export const HYGIENE: IHygiene = {
  shaved: false,
  showered: false,
  brushedTeeth: false,
  replacedBedding: false,
  washedClothes: false,
};

const hygieneSchema = new Schema<IHygiene>({
  shaved: {
    type: Boolean,
    default: false,
  },
  showered: {
    type: Boolean,
    default: false,
  },
  brushedTeeth: {
    type: Boolean,
    default: false,
  },
  replacedBedding: {
    type: Boolean,
    default: false,
  },
  washedClothes: {
    type: Boolean,
    default: false,
  },
});

const Hygiene = models.Hygiene || model<IHygiene>("Hygiene", hygieneSchema);

export default Hygiene;
