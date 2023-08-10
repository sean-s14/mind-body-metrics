export interface IDocument<T> {
  general?: T;
  chores?: T;
  hygiene?: T;
  nutrition?: T;
  sleep?: T;
  reading?: T;
  exercise?: T;
  _id?: string;
  date?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TCategories =
  | "general"
  | "chores"
  | "hygiene"
  | "nutrition"
  | "sleep"
  | "reading"
  | "exercise";
