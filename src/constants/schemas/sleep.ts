import { ISleep, ISleepClient } from "@/types/sleep";

export const SLEEP: ISleep = {
  wake: undefined,
  sleep: undefined,
  sleepQuality: undefined,
  napStart: undefined,
  napEnd: undefined,
};

export const SLEEP_CLIENT: ISleepClient = {
  wake: "",
  sleep: "",
  sleepQuality: "",
  napStart: "",
  napEnd: "",
};

export const SLEEP_FIELDS: { name: keyof ISleepClient; type: string }[] = [
  {
    name: "wake",
    type: "time",
  },
  {
    name: "sleep",
    type: "time",
  },
  {
    name: "sleepQuality",
    type: "number",
  },
  {
    name: "napStart",
    type: "time",
  },
  {
    name: "napEnd",
    type: "time",
  },
];

export function sleepReducer(state: ISleepClient, action: any) {
  switch (action.type) {
    case "replaceAllData":
      return action.payload;
    case "wake":
      return {
        ...state,
        wake: action.payload,
      };
    case "sleep":
      return {
        ...state,
        sleep: action.payload,
      };
    case "sleepQuality":
      return {
        ...state,
        sleepQuality: action.payload,
      };
    case "napStart":
      return {
        ...state,
        napStart: action.payload,
      };
    case "napEnd":
      return {
        ...state,
        napEnd: action.payload,
      };
    default:
      throw new Error();
  }
}

// TODO: Add sleepQuality
// TODO: Add avgNapTime
// TODO: Add avgNapStart
// TODO: Add avgNapEnd
export const SLEEP_AGGREGATION_STAGES = [
  {
    $addFields: {
      sleep: { $ifNull: ["$sleep", {}] },
    },
  },
  {
    $replaceRoot: { newRoot: "$sleep" },
  },
  {
    $match: {
      $or: [
        { wake: { $exists: true } },
        { sleep: { $exists: true } },
        { napStart: { $exists: true } },
        { napEnd: { $exists: true } },
      ],
    },
  },
  {
    $project: {
      wakeHour: { $hour: "$wake" }, // Extract hour
      wakeMinute: { $minute: "$wake" }, // Extract minute
      sleepHour: { $hour: "$sleep" },
      sleepMinute: { $minute: "$sleep" },
      napStartHour: { $hour: "$napStart" },
      napStartMinute: { $minute: "$napStart" },
      napEndHour: { $hour: "$napEnd" },
      napEndMinute: { $minute: "$napEnd" },
    },
  },
  {
    $addFields: {
      avgWake: {
        $dateToString: {
          format: "%H:%M",
          date: {
            $toDate: {
              $multiply: [
                {
                  $round: [
                    {
                      $divide: [
                        {
                          $add: [
                            { $multiply: ["$wakeHour", 60] }, // Convert hours to minutes
                            "$wakeMinute",
                          ],
                        },
                        60, // Convert minutes to hours
                      ],
                    },
                    2,
                  ],
                },
                60 * 60 * 1000,
              ],
            }, // Convert avgWakeMinutes to milliseconds
          },
        },
      },
      avgSleep: {
        $dateToString: {
          format: "%H:%M",
          date: {
            $toDate: {
              $multiply: [
                {
                  $round: [
                    {
                      $divide: [
                        {
                          $add: [
                            { $multiply: ["$sleepHour", 60] },
                            "$sleepMinute",
                          ],
                        },
                        60,
                      ],
                    },
                    2,
                  ],
                },
                60 * 60 * 1000,
              ],
            },
          },
        },
      },
      avgNapStart: {
        $dateToString: {
          format: "%H:%M",
          date: {
            $toDate: {
              $multiply: [
                {
                  $round: [
                    {
                      $divide: [
                        {
                          $add: [
                            { $multiply: ["$napStartHour", 60] }, // Convert hours to minutes
                            "$napStartMinute",
                          ],
                        },
                        60, // Convert minutes to hours
                      ],
                    },
                    2,
                  ],
                },
                60 * 60 * 1000,
              ],
            }, // Convert avgWakeMinutes to milliseconds
          },
        },
      },
      avgNapEnd: {
        $dateToString: {
          format: "%H:%M",
          date: {
            $toDate: {
              $multiply: [
                {
                  $round: [
                    {
                      $divide: [
                        {
                          $add: [
                            { $multiply: ["$napEndHour", 60] },
                            "$napEndMinute",
                          ],
                        },
                        60,
                      ],
                    },
                    2,
                  ],
                },
                60 * 60 * 1000,
              ],
            },
          },
        },
      },
    },
  },
  {
    $project: {
      _id: 0, // Exclude _id field from the result
      avgSleep: 1, // Include only the avgSleep field
      avgWake: 1, // Include only the avgWake field
      // The two fields below always return null?
      // avgNapStart: 1,
      // avgNapEnd: 1,
    },
  },
];
