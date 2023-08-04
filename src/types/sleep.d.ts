export enum sleepQuality {
  poor = "poor",
  fair = "fair",
  good = "good",
  excellent = "excellent",
}

export interface ISleep {
  sleepStart: Date | null;
  sleepEnd: Date | null;
  sleepQuality: sleepQuality | null;
  napStart: Date | null;
  napEnd: Date | null;
}
