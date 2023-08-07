export enum sleepQuality {
  poor = "poor",
  fair = "fair",
  good = "good",
  excellent = "excellent",
}

export interface ISleep {
  sleepStart?: Date;
  sleepEnd?: Date;
  sleepQuality?: sleepQuality;
  napStart?: Date;
  napEnd?: Date;
}

export interface ISleepClient {
  sleepStart?: Date | string;
  sleepEnd?: Date | string;
  sleepQuality?: sleepQuality | string;
  napStart?: Date | string;
  napEnd?: Date | string;
}
