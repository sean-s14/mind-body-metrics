export enum sleepQuality {
  poor = "poor",
  fair = "fair",
  good = "good",
  excellent = "excellent",
}

export interface ISleep {
  wake?: Date;
  sleep?: Date;
  sleepQuality?: sleepQuality;
  napStart?: Date;
  napEnd?: Date;
}

export interface ISleepClient {
  wake?: string;
  sleep?: string;
  sleepQuality?: sleepQuality | string;
  napStart?: string;
  napEnd?: string;
}
