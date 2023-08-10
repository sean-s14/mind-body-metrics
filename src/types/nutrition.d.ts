export interface INutrition {
  water?: number; // in milliliters
  calories?: number;
  protein?: IProtein;
  fat?: IFat;
  carbs?: ICarbs;
}

interface IUnknown {
  unknown?: number;
}

interface IProtein extends IUnknown {
  animal?: number;
  plant?: number;
}

interface IFat extends IUnknown {
  saturated?: number;
  monounsaturated?: number;
  polyunsaturated?: number;
  trans?: number;
}

interface ICarbs extends IUnknown {
  starch?: number;
  fiber?: IFiber;
  sugar?: ISugar;
}

interface IFiber extends IUnknown {
  soluble?: number;
  insoluble?: number;
}

interface ISugar extends IUnknown {
  natural?: number;
  added?: number;
}
