import { IReading, IUnitsOfReading } from "@/types/reading";

export const UNITS: IUnitsOfReading = {
  words: 0,
  pages: 0,
};

export const READING: IReading = {
  educational: UNITS,
  recreational: UNITS,
  articles: 0,
};

export interface IReadingFlattened extends IReading {
  "educational.words": number;
  "educational.pages": number;
  "recreational.words": number;
  "recreational.pages": number;
}

export const READING_FIELDS: { name: keyof IReadingFlattened; type: string }[] =
  [
    {
      name: "articles",
      type: "number",
    },
    {
      name: "educational",
      type: "h1",
    },
    {
      name: "educational.words",
      type: "number",
    },
    {
      name: "educational.pages",
      type: "number",
    },
    {
      name: "recreational",
      type: "h1",
    },
    {
      name: "recreational.words",
      type: "number",
    },
    {
      name: "recreational.pages",
      type: "number",
    },
  ];

export function readingReducer(state: IReading, action: any) {
  switch (action.type) {
    case "replaceAllData":
      return action.payload;
    case "articles":
      return {
        ...state,
        articles: action.payload,
      };
    case "educational.words":
      return {
        ...state,
        educational: {
          ...state.educational,
          words: action.payload,
        },
      };
    case "educational.pages":
      return {
        ...state,
        educational: {
          ...state.educational,
          pages: action.payload,
        },
      };
    case "recreational.words":
      return {
        ...state,
        recreational: {
          ...state.recreational,
          words: action.payload,
        },
      };
    case "recreational.pages":
      return {
        ...state,
        recreational: {
          ...state.recreational,
          pages: action.payload,
        },
      };
    default:
      throw new Error();
  }
}

export const READING_AGGREGATION_STAGES = [
  {
    $addFields: {
      reading: { $ifNull: ["$reading", {}] },
    },
  },
  {
    $replaceRoot: { newRoot: "$reading" },
  },
  {
    $group: {
      _id: null,
      articles: { $avg: { $sum: "$articles" } },
      educationalWords: { $avg: { $sum: "$educational.words" } },
      educationalPages: { $avg: { $sum: "$educational.pages" } },
      recreationalWords: { $avg: { $sum: "$recreational.words" } },
      recreationalPages: { $avg: { $sum: "$recreational.pages" } },
    },
  },
  {
    $project: {
      _id: 0,
      articles: { $round: ["$articles", 2] },
      educationalWords: { $round: ["$educationalWords", 2] },
      educationalPages: { $round: ["$educationalPages", 2] },
      recreationalWords: { $round: ["$recreationalWords", 2] },
      recreationalPages: { $round: ["$recreationalPages", 2] },
    },
  },
];
