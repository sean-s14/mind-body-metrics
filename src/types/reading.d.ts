export interface IReading {
  educational?: IUnitsOfReading;
  recreational?: IUnitsOfReading;
  articles?: number;
}

export interface IUnitsOfReading {
  words?: number;
  pages?: number;
}
